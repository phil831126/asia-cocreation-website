<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { MessageCircleQuestionMark, X, ArrowUp, ArrowRight, RotateCcw } from '@lucide/vue'
import BaseButton from './BaseButton.vue'
import { audiences, faqCopy, pageGreetings, type Audience, type AudienceOption, type FaqItem } from '@/data/faq'
import { nearestFaq, popularFaq, relatedFaq, searchFaq, type SearchContext } from '@/composables/faqSearch'
import { prefersReducedMotion } from '@/composables/motion'

type Msg =
  | { id: number; from: 'user'; text: string }
  | { id: number; from: 'bot'; kind: 'text'; text: string; chips?: FaqItem[] }
  | { id: number; from: 'bot'; kind: 'audience'; text: string; done: boolean }
  | { id: number; from: 'bot'; kind: 'answer'; faq: FaqItem; related: FaqItem[] }
  | { id: number; from: 'bot'; kind: 'fallback'; text: string; chips: FaqItem[] }

type BotMsg = Exclude<Msg, { from: 'user' }>
type DistributiveOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never

const AUDIENCE_KEY = 'acc-faq-audience'
const HINT_KEY = 'acc-faq-hint-dismissed'
/** 進站後多久跳出提示泡泡 */
const HINT_DELAY = 1800

const route = useRoute()

const open = ref(false)
const messages = ref<Msg[]>([])
const typing = ref(false)
const input = ref('')
const activeSuggestion = ref(-1)
const listEl = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLInputElement | null>(null)
const launcherEl = ref<HTMLButtonElement | null>(null)

/* ---------- 瀏覽器儲存（無痕模式等情況無法儲存時，不影響使用） ---------- */
function readStore(key: string) {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}
function writeStore(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* 忽略 */
  }
}

/* ---------- 單位類型（記住選擇，下次不用再選） ---------- */
const stored = readStore(AUDIENCE_KEY)
const initial = stored === 'enterprise' || stored === 'academia' || stored === 'none' ? stored : null
const audience = ref<Audience | null>(initial === 'none' ? null : initial)
const audienceChosen = ref(initial !== null)
const audienceOption = computed(() => audiences.find((a) => a.key === audience.value))

const ctx = computed<SearchContext>(() => ({ audience: audience.value, page: String(route.name ?? '') }))
const contactLink = computed(() =>
  audienceOption.value ? `/contact?topic=${audienceOption.value.contactTopic}` : '/contact',
)

/* ---------- 提示泡泡 ---------- */
const hintVisible = ref(false)
let hintTimer = 0

function dismissHint() {
  hintVisible.value = false
  writeStore(HINT_KEY, '1')
}

onMounted(() => {
  if (readStore(HINT_KEY)) return
  hintTimer = window.setTimeout(() => {
    if (!open.value) hintVisible.value = true
  }, HINT_DELAY)
})
onBeforeUnmount(() => clearTimeout(hintTimer))

/* ---------- 對話 ---------- */
let nextId = 1
let queue: Promise<void> = Promise.resolve()
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

function scrollToEnd() {
  nextTick(() => {
    const el = listEl.value
    if (el) el.scrollTop = el.scrollHeight
  })
}

function pushUser(text: string) {
  messages.value.push({ id: nextId++, from: 'user', text })
  scrollToEnd()
}

/** 機器人回覆：先顯示「輸入中…」再出現，讓對話有節奏 */
function botSay(msg: DistributiveOmit<BotMsg, 'id' | 'from'>) {
  queue = queue.then(async () => {
    typing.value = true
    scrollToEnd()
    await wait(prefersReducedMotion() ? 0 : 450 + Math.random() * 250)
    typing.value = false
    messages.value.push({ ...msg, id: nextId++, from: 'bot' } as Msg)
    scrollToEnd()
  })
}

function greeting() {
  const h = new Date().getHours()
  const hello = h >= 5 && h < 11 ? '早安' : h >= 11 && h < 18 ? '午安' : h >= 18 ? '晚安' : '您好'
  return `${hello}！${pageGreetings[String(route.name ?? '')] ?? '有什麼想了解的嗎？'}`
}

function start() {
  botSay({ kind: 'text', text: greeting() })
  if (!audienceChosen.value) {
    botSay({ kind: 'audience', text: faqCopy.askAudience, done: false })
  } else {
    const text = audienceOption.value ? faqCopy.welcomeBack(audienceOption.value.label) : faqCopy.afterSkip
    botSay({ kind: 'text', text, chips: popularFaq(ctx.value) })
  }
}

function chooseAudience(opt: AudienceOption | null) {
  for (const m of messages.value) if (m.from === 'bot' && m.kind === 'audience') m.done = true
  audience.value = opt?.key ?? null
  audienceChosen.value = true
  writeStore(AUDIENCE_KEY, opt?.key ?? 'none')
  pushUser(opt?.says ?? faqCopy.skipAudience)
  botSay({ kind: 'text', text: opt ? faqCopy.afterAudience(opt.label) : faqCopy.afterSkip, chips: popularFaq(ctx.value) })
}

function switchAudience() {
  botSay({ kind: 'audience', text: faqCopy.askAudience, done: false })
}

function answer(faq: FaqItem, extra: FaqItem[] = []) {
  const related = [...new Map([...extra, ...relatedFaq(faq, ctx.value)].map((f) => [f.id, f])).values()]
    .filter((f) => f.id !== faq.id)
    .slice(0, 3)
  botSay({ kind: 'answer', faq, related })
}

function ask(faq: FaqItem) {
  pushUser(faq.question)
  answer(faq)
}

function submit() {
  const pick = suggestions.value[activeSuggestion.value]
  if (pick) {
    input.value = ''
    ask(pick)
    return
  }
  const text = input.value.trim()
  if (!text) return
  input.value = ''
  pushUser(text)
  const [best, ...others] = searchFaq(text, ctx.value)
  if (best) answer(best, others)
  else {
    const chips = nearestFaq(text, ctx.value)
    botSay({ kind: 'fallback', text: chips.length ? faqCopy.fallback : faqCopy.fallbackEmpty, chips })
  }
}

/* ---------- 輸入時即時建議 ---------- */
const suggestions = computed(() => (input.value.trim() ? searchFaq(input.value, ctx.value, 4) : []))
watch(input, () => (activeSuggestion.value = -1))

function moveSuggestion(step: 1 | -1) {
  const n = suggestions.value.length
  if (!n) return
  // -1 代表沒有選取，上下鍵在「沒有選取 → 第 1 則 … → 最後一則」之間循環
  const slots = n + 1
  activeSuggestion.value = ((activeSuggestion.value + 1 + step + slots) % slots) - 1
}

/* ---------- 開關 ---------- */
const isPhone = () => window.matchMedia('(max-width: 600px)').matches

function toggle(force?: boolean) {
  open.value = force ?? !open.value
  if (open.value) {
    // 客人已經找到小幫手，提示泡泡就不用再出現
    if (hintVisible.value || hintTimer) {
      clearTimeout(hintTimer)
      dismissHint()
    }
    if (!messages.value.length) start()
    nextTick(() => {
      scrollToEnd()
      if (!isPhone()) inputEl.value?.focus()
    })
  } else {
    launcherEl.value?.focus()
  }
}

/** 手機版小幫手是全螢幕，點按鈕跳頁後要收起來，才看得到新頁面 */
function onNavigate() {
  if (isPhone()) open.value = false
}

function restart() {
  messages.value = []
  queue = Promise.resolve()
  typing.value = false
  start()
}
</script>

<template>
  <div class="faq" :class="{ 'is-open': open }" data-snap-ignore @keydown.esc="open && toggle(false)">
    <Transition name="faq-pop">
      <section
        v-show="open"
        id="faq-panel"
        class="faq__panel"
        role="dialog"
        :aria-label="faqCopy.title"
      >
        <header class="faq__head">
          <span class="faq__avatar" aria-hidden="true"><MessageCircleQuestionMark :size="20" /></span>
          <div class="faq__titles">
            <p class="faq__eyebrow">
              {{ faqCopy.subtitle }}<template v-if="audienceOption"> · {{ audienceOption.label }}</template>
            </p>
            <h2 class="faq__title">{{ faqCopy.title }}</h2>
          </div>
          <button type="button" class="faq__icon-btn" aria-label="重新開始對話" title="重新開始" @click="restart">
            <RotateCcw :size="16" aria-hidden="true" />
          </button>
          <button type="button" class="faq__icon-btn" :aria-label="`關閉${faqCopy.title}`" @click="toggle(false)">
            <X :size="18" aria-hidden="true" />
          </button>
        </header>

        <div ref="listEl" class="faq__list" aria-live="polite">
          <template v-for="m in messages" :key="m.id">
            <p v-if="m.from === 'user'" class="bubble bubble--user">{{ m.text }}</p>

            <div v-else class="bubble bubble--bot">
              <!-- 一般訊息 / 找不到 -->
              <p v-if="m.kind === 'text' || m.kind === 'fallback'">{{ m.text }}</p>

              <!-- 詢問單位類型 -->
              <template v-else-if="m.kind === 'audience'">
                <p>{{ m.text }}</p>
                <div v-if="!m.done" class="choices">
                  <button
                    v-for="a in audiences"
                    :key="a.key"
                    type="button"
                    class="chip chip--strong"
                    @click="chooseAudience(a)"
                  >
                    {{ a.label }}
                  </button>
                  <button type="button" class="chip" @click="chooseAudience(null)">{{ faqCopy.skipAudience }}</button>
                </div>
              </template>

              <!-- 答案 -->
              <template v-else-if="m.kind === 'answer'">
                <p class="answer__q">{{ m.faq.question }}</p>
                <p>{{ m.faq.answer }}</p>
                <span v-if="m.faq.pending" class="pending-tag answer__pending">{{ faqCopy.pendingNote }}</span>
                <div v-if="m.faq.actions?.length" class="actions">
                  <BaseButton
                    v-for="a in m.faq.actions"
                    :key="a.to"
                    :to="a.to"
                    variant="dark"
                    size="sm"
                    @click="onNavigate"
                  >
                    {{ a.label }}
                  </BaseButton>
                </div>
              </template>

              <!-- 題目按鈕 -->
              <div v-if="(m.kind === 'text' || m.kind === 'fallback') && m.chips?.length" class="chips">
                <button v-for="f in m.chips" :key="f.id" type="button" class="chip" @click="ask(f)">
                  {{ f.question }}<ArrowRight :size="14" class="chip__arrow" aria-hidden="true" />
                </button>
              </div>
              <div v-if="m.kind === 'answer' && m.related.length" class="chips chips--related">
                <span class="chips__label">{{ faqCopy.related }}</span>
                <button v-for="f in m.related" :key="f.id" type="button" class="chip" @click="ask(f)">
                  {{ f.question }}<ArrowRight :size="14" class="chip__arrow" aria-hidden="true" />
                </button>
              </div>
              <div v-if="m.kind === 'fallback'" class="actions">
                <BaseButton :to="contactLink" variant="dark" size="sm" @click="onNavigate">
                  {{ faqCopy.fallbackContact }}
                </BaseButton>
              </div>
            </div>
          </template>

          <div v-if="typing" class="bubble bubble--bot bubble--typing" aria-label="輸入中">
            <span></span><span></span><span></span>
          </div>
        </div>

        <footer class="faq__foot">
          <ul v-if="suggestions.length" id="faq-suggest" class="suggest" role="listbox" aria-label="建議問題">
            <li
              v-for="(f, i) in suggestions"
              :id="`faq-suggest-${i}`"
              :key="f.id"
              role="option"
              :aria-selected="i === activeSuggestion"
              class="suggest__item"
              :class="{ 'is-active': i === activeSuggestion }"
              @mousedown.prevent="input = ''; ask(f)"
            >
              {{ f.question }}
            </li>
          </ul>

          <form class="ask" @submit.prevent="submit">
            <input
              ref="inputEl"
              v-model="input"
              class="ask__input"
              type="text"
              enterkeyhint="send"
              autocomplete="off"
              :placeholder="faqCopy.placeholder"
              aria-label="輸入想詢問的關鍵字"
              role="combobox"
              aria-autocomplete="list"
              aria-controls="faq-suggest"
              :aria-expanded="suggestions.length > 0"
              :aria-activedescendant="activeSuggestion >= 0 ? `faq-suggest-${activeSuggestion}` : undefined"
              @keydown.down.prevent="moveSuggestion(1)"
              @keydown.up.prevent="moveSuggestion(-1)"
            />
            <button type="submit" class="ask__send" aria-label="送出" :disabled="!input.trim()">
              <ArrowUp :size="18" aria-hidden="true" />
            </button>
          </form>

          <button v-if="audienceChosen" type="button" class="faq__switch" @click="switchAudience">
            {{ faqCopy.switchAudience }}
          </button>
        </footer>
      </section>
    </Transition>

    <!-- 提示泡泡：告訴客人這裡可以詢問，按 ✕ 後不再出現 -->
    <Transition name="faq-hint">
      <div v-if="hintVisible && !open" class="faq__hint">
        <button type="button" class="faq__hint-body" @click="toggle(true)">
          <span class="faq__hint-title">{{ faqCopy.hintTitle }}</span>
          <span class="faq__hint-text">{{ faqCopy.hintText }}</span>
        </button>
        <button type="button" class="faq__hint-close" :aria-label="faqCopy.hintClose" @click="dismissHint">
          <X :size="14" aria-hidden="true" />
        </button>
      </div>
    </Transition>

    <button
      ref="launcherEl"
      type="button"
      class="faq__launcher"
      :class="{ 'is-open': open }"
      :aria-expanded="open"
      aria-controls="faq-panel"
      :aria-label="open ? `關閉${faqCopy.title}` : `開啟${faqCopy.title}`"
      :title="open ? undefined : faqCopy.title"
      @click="toggle()"
    >
      <X v-if="open" :size="24" aria-hidden="true" />
      <MessageCircleQuestionMark v-else :size="26" aria-hidden="true" />
    </button>
  </div>
</template>

<style scoped>
/* 視覺沿用網站既有語彙：
   - 毛玻璃：與捲動後的導覽列相同（白 72% + blur 22px）
   - 黃色膠囊：與導覽列「目前頁面」相同的黃底與光暈
   - 按鈕：直接使用全站 BaseButton（右側圓形箭頭）
   - 小標：與全站 .eyebrow 相同的黃點 */
.faq {
  --faq-gap: 24px;
  --faq-glass: rgba(255, 255, 255, 0.72);
  --faq-glass-border: rgba(255, 255, 255, 0.9);
  --faq-glow: 0 6px 16px -8px rgba(224, 165, 0, 0.8);
  position: fixed;
  right: var(--faq-gap);
  bottom: var(--faq-gap);
  z-index: 95;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;
  font-family: var(--font-sans);
}

/* ---------- 浮動按鈕：毛玻璃水滴（尖端朝右下角） ---------- */
.faq__launcher {
  position: relative;
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 50% 50% 10px 50%;
  background: linear-gradient(150deg, rgba(252, 223, 142, 0.82), rgba(248, 190, 32, 0.62));
  -webkit-backdrop-filter: blur(16px) saturate(170%);
  backdrop-filter: blur(16px) saturate(170%);
  color: var(--c-text);
  box-shadow:
    0 16px 32px -14px rgba(224, 165, 0, 0.6),
    0 4px 10px -4px rgba(34, 34, 34, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -8px 14px rgba(224, 165, 0, 0.28);
  cursor: pointer;
  transition:
    transform 0.4s var(--ease-out),
    border-radius 0.4s var(--ease-out),
    background 0.3s,
    color 0.3s;
}

/* 水滴左上角的反光 */
.faq__launcher::before {
  content: '';
  position: absolute;
  top: 11px;
  left: 14px;
  width: 15px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.75);
  transform: rotate(-35deg);
  pointer-events: none;
}

.faq__launcher:hover {
  border-radius: 50% 50% 16px 50%;
  transform: translateY(-3px) scale(1.04);
}

.faq__launcher:focus-visible {
  outline: 3px solid var(--c-text);
  outline-offset: 4px;
}

/* 開啟時變成深色毛玻璃水滴 */
.faq__launcher.is-open {
  border-color: rgba(255, 255, 255, 0.28);
  background: linear-gradient(150deg, rgba(60, 60, 60, 0.78), rgba(34, 34, 34, 0.72));
  color: #fff;
  box-shadow:
    0 16px 32px -14px rgba(34, 34, 34, 0.55),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

.faq__launcher.is-open::before {
  background: rgba(255, 255, 255, 0.3);
}

/* ---------- 提示泡泡 ---------- */
.faq__hint {
  position: relative;
  max-width: 250px;
  margin-right: 6px;
  border: 1px solid var(--faq-glass-border);
  border-radius: 18px 18px 6px 18px;
  background: var(--faq-glass);
  -webkit-backdrop-filter: blur(22px) saturate(170%);
  backdrop-filter: blur(22px) saturate(170%);
  box-shadow:
    0 14px 40px -20px rgba(34, 34, 34, 0.35),
    0 0 0 1px rgba(34, 34, 34, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.faq__hint-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  padding: 12px 36px 12px 16px;
  border: 0;
  border-radius: inherit;
  background: none;
  color: var(--c-text);
  text-align: left;
  cursor: pointer;
}

.faq__hint-title {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.5;
}

/* 與全站 .eyebrow 相同的黃點 */
.faq__hint-title::before {
  content: '';
  flex: none;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--c-yellow);
  box-shadow: 0 0 0 4px rgba(248, 190, 32, 0.22);
}

.faq__hint-text {
  color: var(--c-text-2);
  font-size: 0.8rem;
  line-height: 1.6;
}

.faq__hint-close {
  position: absolute;
  top: 8px;
  right: 8px;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--c-text-3);
  cursor: pointer;
  transition: background-color 0.25s, color 0.25s;
}

.faq__hint-close:hover {
  background: var(--c-gray-100);
  color: var(--c-text);
}

.faq-hint-enter-active {
  transition: opacity 0.4s var(--ease-out), transform 0.5s var(--ease-out);
}

.faq-hint-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.faq-hint-enter-from,
.faq-hint-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.94);
  transform-origin: bottom right;
}

/* ---------- 視窗：與導覽列相同的毛玻璃 ---------- */
.faq__panel {
  display: flex;
  flex-direction: column;
  width: 380px;
  height: min(600px, calc(100dvh - 130px));
  overflow: hidden;
  border: 1px solid var(--faq-glass-border);
  border-radius: 28px;
  background: var(--faq-glass);
  -webkit-backdrop-filter: blur(22px) saturate(170%);
  backdrop-filter: blur(22px) saturate(170%);
  box-shadow:
    0 30px 70px -30px rgba(34, 34, 34, 0.4),
    0 0 0 1px rgba(34, 34, 34, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  transform-origin: bottom right;
}

.faq__head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 12px 14px 16px;
  border-bottom: 1px solid var(--c-line);
}

.faq__avatar {
  display: grid;
  flex: none;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--c-yellow);
  color: var(--c-text);
  box-shadow: var(--faq-glow);
}

.faq__titles {
  flex: 1;
  min-width: 0;
}

.faq__eyebrow {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  color: var(--c-text-2);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.faq__eyebrow::before {
  content: '';
  flex: none;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--c-yellow);
  box-shadow: 0 0 0 3px rgba(248, 190, 32, 0.22);
}

.faq__title {
  font-size: 1.05rem;
  line-height: 1.35;
}

/* 與行動版選單按鈕相同的圓形按鈕 */
.faq__icon-btn {
  display: grid;
  flex: none;
  place-items: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 1px solid var(--c-line);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  color: var(--c-text);
  cursor: pointer;
  transition: background-color 0.25s;
}

.faq__icon-btn:hover {
  background: var(--c-yellow-tint);
}

/* ---------- 對話 ---------- */
.faq__list {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
  padding: 18px 16px;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.bubble {
  max-width: 90%;
  margin: 0;
  padding: 12px 15px;
  font-size: 0.875rem;
  line-height: 1.7;
  animation: bubble-in 0.3s var(--ease-out);
}

.bubble--bot {
  align-self: flex-start;
  border: 1px solid rgba(34, 34, 34, 0.06);
  border-radius: 6px 18px 18px 18px;
  background: rgba(255, 255, 255, 0.92);
  color: var(--c-text);
  box-shadow: var(--shadow-sm);
}

/* 與導覽列「目前頁面」相同的黃色膠囊 */
.bubble--user {
  align-self: flex-end;
  border-radius: 18px 6px 18px 18px;
  background: var(--c-yellow);
  color: var(--c-text);
  font-weight: 600;
  box-shadow: var(--faq-glow);
}

.bubble--typing {
  display: inline-flex;
  gap: 5px;
  padding: 15px 16px;
}

.bubble--typing span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--c-gray);
  animation: dot 1s infinite ease-in-out;
}

.bubble--typing span:nth-child(2) {
  animation-delay: 0.15s;
}

.bubble--typing span:nth-child(3) {
  animation-delay: 0.3s;
}

.answer__q {
  margin-bottom: 4px;
  font-weight: 700;
}

.answer__pending {
  margin-top: 10px;
}

.choices,
.chips,
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
}

.chips {
  flex-direction: column;
  align-items: flex-start;
}

.chips--related {
  padding-top: 12px;
  border-top: 1px solid var(--c-line);
}

.chips__label {
  margin-bottom: 2px;
  color: var(--c-text-3);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

/* 與首頁核心服務標籤相同：淺灰膠囊，滑過變黃並帶出箭頭 */
.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border: 0;
  border-radius: 16px;
  background: rgba(239, 239, 236, 0.85);
  color: var(--c-text);
  font-size: 0.82rem;
  font-weight: 500;
  line-height: 1.5;
  text-align: left;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.3s var(--ease-out),
    box-shadow 0.3s;
}

.chip:hover {
  background: var(--c-yellow);
  box-shadow: var(--faq-glow);
  transform: translateY(-1px);
}

.chip--strong {
  font-weight: 700;
}

.chip__arrow {
  flex: none;
  width: 0;
  margin-left: -6px;
  opacity: 0;
  transition:
    width 0.3s var(--ease-out),
    opacity 0.3s,
    margin 0.3s var(--ease-out);
}

.chip:hover .chip__arrow {
  width: 14px;
  margin-left: 0;
  opacity: 1;
}

/* ---------- 輸入區 ---------- */
.faq__foot {
  position: relative;
  padding: 12px 14px 10px;
  border-top: 1px solid var(--c-line);
}

.suggest {
  position: absolute;
  right: 14px;
  bottom: calc(100% - 4px);
  left: 14px;
  padding: 6px;
  border: 1px solid var(--faq-glass-border);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.92);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  box-shadow: var(--shadow-md), 0 0 0 1px rgba(34, 34, 34, 0.05);
}

.suggest__item {
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 0.82rem;
  cursor: pointer;
}

.suggest__item:hover,
.suggest__item.is-active {
  background: var(--c-yellow-tint);
}

/* 輸入框做成全站按鈕的形狀：膠囊 + 右側圓形按鈕 */
.ask {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 48px;
  padding: 0 5px 0 18px;
  border: 1px solid var(--c-line-strong);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.85);
  transition: border-color 0.25s, box-shadow 0.25s;
}

.ask:focus-within {
  border-color: var(--c-text);
  box-shadow: 0 0 0 4px rgba(248, 190, 32, 0.22);
}

.ask__input {
  flex: 1;
  min-width: 0;
  height: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  font-size: 0.875rem;
}

.ask__input:focus {
  outline: none;
}

.ask__send {
  display: grid;
  flex: none;
  place-items: center;
  width: 38px;
  height: 38px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: var(--c-text);
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.3s var(--ease-out);
}

.ask__send:not(:disabled):hover {
  background: var(--c-yellow);
  color: var(--c-text);
  transform: translateY(-1px);
}

.ask__send:disabled {
  background: var(--c-gray-100);
  color: var(--c-gray);
  cursor: default;
}

.faq__switch {
  display: block;
  margin: 8px auto 0;
  padding: 0 0 2px;
  border: 0;
  background: linear-gradient(var(--c-yellow), var(--c-yellow)) left bottom / 0 2px no-repeat;
  color: var(--c-text-3);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-size 0.4s var(--ease-out), color 0.25s;
}

.faq__switch:hover {
  background-size: 100% 2px;
  color: var(--c-text);
}

/* ---------- 動態 ---------- */
.faq-pop-enter-active,
.faq-pop-leave-active {
  transition: opacity 0.25s var(--ease-out), transform 0.3s var(--ease-out);
}

.faq-pop-enter-from,
.faq-pop-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.96);
}

@keyframes bubble-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
}

@keyframes dot {
  0%,
  80%,
  100% {
    opacity: 0.35;
    transform: translateY(0);
  }
  40% {
    opacity: 1;
    transform: translateY(-3px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .bubble,
  .bubble--typing span {
    animation: none;
  }
  .faq-pop-enter-active,
  .faq-pop-leave-active,
  .faq-hint-enter-active,
  .faq-hint-leave-active {
    transition: none;
  }
}

/* ---------- 手機：全螢幕，從底部滑上來 ---------- */
@media (max-width: 600px) {
  .faq {
    --faq-gap: 16px;
  }

  /* 全螢幕時要蓋過固定導覽列（z-index 100） */
  .faq.is-open {
    z-index: 120;
  }

  .faq__launcher {
    width: 58px;
    height: 58px;
  }

  .faq__launcher.is-open {
    display: none;
  }

  .faq__hint {
    max-width: 220px;
  }

  .faq__panel {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100dvh;
    border: 0;
    border-radius: 0;
    background: rgba(255, 255, 255, 0.88);
  }

  .faq-pop-enter-from,
  .faq-pop-leave-to {
    transform: translateY(24px);
  }

  .ask__input {
    font-size: 16px; /* 避免 iOS 聚焦時自動放大 */
  }
}
</style>
