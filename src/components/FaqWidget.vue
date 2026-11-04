<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { MessageCircleQuestionMark, X, SendHorizontal, ArrowRight, RotateCcw } from '@lucide/vue'
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

const STORAGE_KEY = 'acc-faq-audience'
const route = useRoute()

const open = ref(false)
const messages = ref<Msg[]>([])
const typing = ref(false)
const input = ref('')
const activeSuggestion = ref(-1)
const listEl = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLInputElement | null>(null)
const launcherEl = ref<HTMLButtonElement | null>(null)

/* ---------- 單位類型（記在瀏覽器，下次不用再選） ---------- */
function readAudience(): Audience | 'none' | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === 'enterprise' || v === 'academia' || v === 'none' ? v : null
  } catch {
    return null
  }
}
function saveAudience(v: Audience | 'none') {
  try {
    localStorage.setItem(STORAGE_KEY, v)
  } catch {
    /* 無痕模式等情況無法儲存，不影響使用 */
  }
}

const stored = readAudience()
const audience = ref<Audience | null>(stored === 'none' ? null : stored)
const audienceChosen = ref(stored !== null)
const audienceOption = computed(() => audiences.find((a) => a.key === audience.value))

const ctx = computed<SearchContext>(() => ({ audience: audience.value, page: String(route.name ?? '') }))
const contactLink = computed(() =>
  audienceOption.value ? `/contact?topic=${audienceOption.value.contactTopic}` : '/contact',
)

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
  saveAudience(opt?.key ?? 'none')
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
            <h2 class="faq__title">{{ faqCopy.title }}</h2>
            <p class="faq__subtitle">
              {{ faqCopy.subtitle }}
              <template v-if="audienceOption"> · {{ audienceOption.label }}</template>
            </p>
          </div>
          <button type="button" class="faq__icon-btn" aria-label="重新開始對話" title="重新開始" @click="restart">
            <RotateCcw :size="18" aria-hidden="true" />
          </button>
          <button type="button" class="faq__icon-btn" aria-label="關閉常見問題" @click="toggle(false)">
            <X :size="20" aria-hidden="true" />
          </button>
        </header>

        <div ref="listEl" class="faq__list" aria-live="polite">
          <template v-for="m in messages" :key="m.id">
            <p v-if="m.from === 'user'" class="bubble bubble--user">{{ m.text }}</p>

            <div v-else class="bubble bubble--bot">
              <!-- 一般訊息 / 找不到 -->
              <template v-if="m.kind === 'text' || m.kind === 'fallback'">
                <p>{{ m.text }}</p>
              </template>

              <!-- 詢問單位類型 -->
              <template v-else-if="m.kind === 'audience'">
                <p>{{ m.text }}</p>
                <div v-if="!m.done" class="choices">
                  <button
                    v-for="a in audiences"
                    :key="a.key"
                    type="button"
                    class="choice choice--primary"
                    @click="chooseAudience(a)"
                  >
                    {{ a.label }}
                  </button>
                  <button type="button" class="choice" @click="chooseAudience(null)">{{ faqCopy.skipAudience }}</button>
                </div>
              </template>

              <!-- 答案 -->
              <template v-else-if="m.kind === 'answer'">
                <p class="answer__q">{{ m.faq.question }}</p>
                <p>{{ m.faq.answer }}</p>
                <span v-if="m.faq.pending" class="pending-tag answer__pending">{{ faqCopy.pendingNote }}</span>
                <div v-if="m.faq.actions?.length" class="actions">
                  <RouterLink
                    v-for="a in m.faq.actions"
                    :key="a.to"
                    :to="a.to"
                    class="action"
                    @click="onNavigate"
                  >
                    {{ a.label }} <ArrowRight :size="14" aria-hidden="true" />
                  </RouterLink>
                </div>
              </template>

              <!-- 題目按鈕 -->
              <div v-if="(m.kind === 'text' || m.kind === 'fallback') && m.chips?.length" class="chips">
                <button v-for="f in m.chips" :key="f.id" type="button" class="chip" @click="ask(f)">
                  {{ f.question }}
                </button>
              </div>
              <div v-if="m.kind === 'answer' && m.related.length" class="chips">
                <span class="chips__label">{{ faqCopy.related }}</span>
                <button v-for="f in m.related" :key="f.id" type="button" class="chip" @click="ask(f)">
                  {{ f.question }}
                </button>
              </div>
              <div v-if="m.kind === 'fallback'" class="actions">
                <RouterLink :to="contactLink" class="action" @click="onNavigate">
                  {{ faqCopy.fallbackContact }} <ArrowRight :size="14" aria-hidden="true" />
                </RouterLink>
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
              <SendHorizontal :size="18" aria-hidden="true" />
            </button>
          </form>

          <button v-if="audienceChosen" type="button" class="faq__switch" @click="switchAudience">
            {{ faqCopy.switchAudience }}
          </button>
        </footer>
      </section>
    </Transition>

    <button
      ref="launcherEl"
      type="button"
      class="faq__launcher"
      :class="{ 'is-open': open }"
      :aria-expanded="open"
      aria-controls="faq-panel"
      :aria-label="open ? '關閉常見問題' : '開啟常見問題'"
      @click="toggle()"
    >
      <X v-if="open" :size="22" aria-hidden="true" />
      <template v-else>
        <MessageCircleQuestionMark :size="22" aria-hidden="true" />
        <span class="faq__launcher-text">{{ faqCopy.launcher }}</span>
      </template>
    </button>
  </div>
</template>

<style scoped>
.faq {
  --faq-gap: 24px;
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

/* ---------- 浮動按鈕 ---------- */
.faq__launcher {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 52px;
  padding: 0 20px 0 16px;
  border: 0;
  border-radius: 999px;
  background: var(--c-yellow);
  color: var(--c-text);
  font: inherit;
  font-weight: 700;
  font-size: 15px;
  box-shadow: var(--shadow-md), 0 0 0 1px rgba(34, 34, 34, 0.06);
  cursor: pointer;
  transition: transform 0.25s var(--ease-out), background 0.2s;
}

.faq__launcher:hover {
  background: var(--c-yellow-deep);
  transform: translateY(-2px);
}

.faq__launcher:focus-visible {
  outline: 3px solid var(--c-text);
  outline-offset: 3px;
}

.faq__launcher.is-open {
  width: 52px;
  padding: 0;
  justify-content: center;
  background: var(--c-text);
  color: #fff;
}

/* ---------- 視窗 ---------- */
.faq__panel {
  display: flex;
  flex-direction: column;
  width: 372px;
  height: min(580px, calc(100dvh - 120px));
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--c-bg);
  box-shadow: var(--shadow-lg), 0 0 0 1px var(--c-line);
  transform-origin: bottom right;
}

.faq__head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 10px 14px 16px;
  background: var(--c-text);
  color: #fff;
}

.faq__avatar {
  display: grid;
  flex: none;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--c-yellow);
  color: var(--c-text);
}

.faq__titles {
  flex: 1;
  min-width: 0;
}

.faq__title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.3;
}

.faq__subtitle {
  margin: 2px 0 0;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.faq__icon-btn {
  display: grid;
  flex: none;
  place-items: center;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
}

.faq__icon-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}

.faq__icon-btn:focus-visible {
  outline: 2px solid var(--c-yellow);
  outline-offset: 1px;
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
  background: var(--c-bg-alt);
}

.bubble {
  max-width: 88%;
  margin: 0;
  padding: 11px 14px;
  font-size: 14px;
  line-height: 1.65;
  animation: bubble-in 0.3s var(--ease-out);
}

.bubble p {
  margin: 0;
}

.bubble--bot {
  align-self: flex-start;
  border-radius: 4px var(--radius-md) var(--radius-md) var(--radius-md);
  background: var(--c-bg);
  color: var(--c-text);
  box-shadow: var(--shadow-sm);
}

.bubble--user {
  align-self: flex-end;
  border-radius: var(--radius-md) 4px var(--radius-md) var(--radius-md);
  background: var(--c-yellow);
  color: var(--c-text);
  font-weight: 500;
}

.bubble--typing {
  display: inline-flex;
  gap: 5px;
  padding: 14px 16px;
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
  margin-bottom: 4px !important;
  font-weight: 700;
}

.answer__pending {
  margin-top: 8px;
  font-size: 12px;
}

.choices,
.chips,
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.chips {
  flex-direction: column;
  align-items: flex-start;
}

.chips__label {
  color: var(--c-text-3);
  font-size: 12px;
  font-weight: 600;
}

.choice,
.chip {
  padding: 7px 14px;
  border: 1px solid var(--c-line-strong);
  border-radius: 999px;
  background: var(--c-bg);
  color: var(--c-text);
  font: inherit;
  font-size: 13px;
  line-height: 1.45;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}

.choice:hover,
.chip:hover {
  border-color: var(--c-yellow-deep);
  background: var(--c-yellow-tint);
}

.choice--primary {
  border-color: var(--c-text);
  font-weight: 600;
}

.choice:focus-visible,
.chip:focus-visible,
.action:focus-visible {
  outline: 2px solid var(--c-text);
  outline-offset: 2px;
}

.action {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 7px 14px;
  border-radius: 999px;
  background: var(--c-text);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}

.action:hover {
  background: #000;
}

/* ---------- 輸入區 ---------- */
.faq__foot {
  position: relative;
  padding: 12px 14px 10px;
  border-top: 1px solid var(--c-line);
  background: var(--c-bg);
}

.suggest {
  position: absolute;
  right: 14px;
  bottom: calc(100% - 4px);
  left: 14px;
  margin: 0;
  padding: 6px;
  list-style: none;
  border-radius: var(--radius-md);
  background: var(--c-bg);
  box-shadow: var(--shadow-md), 0 0 0 1px var(--c-line);
}

.suggest__item {
  padding: 8px 10px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  cursor: pointer;
}

.suggest__item:hover,
.suggest__item.is-active {
  background: var(--c-yellow-tint);
}

.ask {
  display: flex;
  gap: 8px;
}

.ask__input {
  flex: 1;
  min-width: 0;
  height: 42px;
  padding: 0 14px;
  border: 1px solid var(--c-line-strong);
  border-radius: 999px;
  background: var(--c-bg);
  color: var(--c-text);
  font: inherit;
  font-size: 14px;
}

.ask__input:focus {
  border-color: var(--c-text);
  outline: none;
  box-shadow: 0 0 0 3px var(--c-yellow-soft);
}

.ask__send {
  display: grid;
  flex: none;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 50%;
  background: var(--c-yellow);
  color: var(--c-text);
  cursor: pointer;
}

.ask__send:disabled {
  background: var(--c-gray-100);
  color: var(--c-gray);
  cursor: default;
}

.ask__send:focus-visible {
  outline: 2px solid var(--c-text);
  outline-offset: 2px;
}

.faq__switch {
  display: block;
  margin: 8px auto 0;
  padding: 2px 6px;
  border: 0;
  background: none;
  color: var(--c-text-3);
  font: inherit;
  font-size: 12px;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}

.faq__switch:hover {
  color: var(--c-text);
}

/* ---------- 動態 ---------- */
.faq-pop-enter-active,
.faq-pop-leave-active {
  transition: opacity 0.22s var(--ease-out), transform 0.22s var(--ease-out);
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
  .faq-pop-leave-active {
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
    width: 52px;
    padding: 0;
    justify-content: center;
  }

  .faq__launcher-text {
    display: none;
  }

  .faq__launcher.is-open {
    display: none;
  }

  .faq__panel {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100dvh;
    border-radius: 0;
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
