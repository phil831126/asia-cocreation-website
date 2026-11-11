<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute, useRouter, type LocationQuery } from 'vue-router'
import { Search, X, UserRound, ArrowRight, SearchX } from '@lucide/vue'
import PageHeader from '@/components/PageHeader.vue'
import BaseButton from '@/components/BaseButton.vue'
import CtaBanner from '@/components/CtaBanner.vue'
import { lecturerAudiences, lecturerFields, lecturerFormats, type Lecturer } from '@/data/lecturers'
import { useLecturers } from '@/composables/sheetData'
import { lecturerApplySection } from '@/data/home'

const route = useRoute()
const router = useRouter()
const { lecturers, loading, hasSample } = useLecturers()

/** 照片網址失效時改顯示預設頭像 */
const brokenPhotos = ref(new Set<string>())
const showPhoto = (l: Lecturer) => !!l.photo && !brokenPhotos.value.has(l.id)
const markBroken = (id: string) => (brokenPhotos.value = new Set(brokenPhotos.value).add(id))

/* ---------- 篩選條件（同步到網址，篩選結果可以分享或加入書籤） ---------- */
const groups = [
  { key: 'field', label: '專業領域', options: lecturerFields as readonly string[] },
  { key: 'aud', label: '適合對象', options: lecturerAudiences as readonly string[] },
  { key: 'fmt', label: '授課形式', options: lecturerFormats as readonly string[] },
] as const
type GroupKey = (typeof groups)[number]['key']

function readList(query: LocationQuery, key: GroupKey, options: readonly string[]) {
  const raw = query[key]
  const text = Array.isArray(raw) ? raw.join(',') : (raw ?? '')
  return text.split(',').filter((v) => options.includes(v))
}

const keyword = ref(String(route.query.q ?? ''))
const selected = ref<Record<GroupKey, string[]>>({
  field: readList(route.query, 'field', lecturerFields),
  aud: readList(route.query, 'aud', lecturerAudiences),
  fmt: readList(route.query, 'fmt', lecturerFormats),
})

function toggle(key: GroupKey, option: string) {
  const list = selected.value[key]
  selected.value[key] = list.includes(option) ? list.filter((o) => o !== option) : [...list, option]
}

const hasFilters = computed(() => !!keyword.value.trim() || groups.some((g) => selected.value[g.key].length))

function clearAll() {
  keyword.value = ''
  selected.value = { field: [], aud: [], fmt: [] }
}

watch(
  [keyword, selected],
  () => {
    const query: Record<string, string> = {}
    if (keyword.value.trim()) query.q = keyword.value.trim()
    for (const g of groups) if (selected.value[g.key].length) query[g.key] = selected.value[g.key].join(',')
    router.replace({ query })
  },
  { deep: true },
)

/* ---------- 搜尋與篩選 ---------- */
const normalize = (s: string) => s.normalize('NFKC').toLowerCase().replace(/\s+/g, '')

const indexed = computed(() =>
  lecturers.value.map((l) => ({
    lecturer: l,
    text: normalize([l.name, l.title, l.bio, ...l.fields, ...l.topics, ...l.audiences, ...l.formats].join('|')),
  })),
)

/** 同一組內「任一符合」，不同組之間「全部符合」 */
function matchesGroup(values: readonly string[], picked: string[]) {
  return !picked.length || picked.some((p) => values.includes(p))
}

const results = computed(() => {
  const words = keyword.value.split(/\s+/).map(normalize).filter(Boolean)
  return indexed.value
    .filter(({ lecturer: l, text }) =>
      words.every((w) => text.includes(w)) &&
      matchesGroup(l.fields, selected.value.field) &&
      matchesGroup(l.audiences, selected.value.aud) &&
      matchesGroup(l.formats, selected.value.fmt),
    )
    .map((r) => r.lecturer)
})

/* ---------- 講師詳細介紹（彈出視窗） ---------- */
const dialogEl = ref<HTMLDialogElement | null>(null)
const current = ref<Lecturer | null>(null)
let opener: HTMLElement | null = null

async function openLecturer(l: Lecturer, e: Event) {
  opener = e.currentTarget as HTMLElement
  current.value = l
  await nextTick()
  dialogEl.value?.showModal()
  document.documentElement.style.overflow = 'hidden'
}

/** 解開頁面捲動、把焦點還給原本的卡片；關閉方式不同都會呼叫，重複呼叫也無妨 */
function cleanup() {
  if (!opener) return
  document.documentElement.style.overflow = ''
  opener.focus()
  opener = null
}

function closeLecturer() {
  dialogEl.value?.close()
  cleanup()
}

/** 按 Esc 時瀏覽器會先觸發 cancel，再自行關閉視窗 */
function onDialogCancel() {
  cleanup()
}

/** 保險：任何方式關閉時都再清一次 */
function onDialogClose() {
  cleanup()
}

// 在視窗開著時點「邀請這位講師」會直接換頁，要把頁面捲動鎖解開
onBeforeUnmount(() => (document.documentElement.style.overflow = ''))

/** 點視窗外的暗色背景也能關閉 */
function onDialogClick(e: MouseEvent) {
  if (e.target === dialogEl.value) closeLecturer()
}

/** 申請加入講師聯盟：前往聯絡我們，需求預選「講師經紀」並帶入申請留言 */
const joinLink = lecturerApplySection.primary.to

const inviteLink = computed(() =>
  current.value ? { path: '/contact', query: { topic: 'lecturer', lecturer: current.value.name } } : '/contact',
)
</script>

<template>
  <div class="page">
    <PageHeader
      eyebrow="Lecturers"
      title="講師聯盟"
      desc="集結逾百位合作業師，涵蓋職涯探索、品牌行銷與自媒體經營等領域，可依專業、對象與授課形式找到合適講師。"
      :crumbs="[{ label: '講師聯盟' }]"
      single-line-desc
      compact
    >
      <span v-if="hasSample" class="pending-tag">講師資料待補（目前為示意內容）</span>
      <!-- 邀請講師加入：首頁「加入講師聯盟，讓專業走進更多課堂」的濃縮版 -->
      <p class="join">
        有實務經驗、願意分享專業？歡迎加入講師聯盟，我們協助課程媒合、規劃與曝光。
        <RouterLink :to="joinLink" class="link-arrow join__link">申請加入 <ArrowRight :size="16" aria-hidden="true" /></RouterLink>
      </p>
    </PageHeader>

    <!-- 頁首下方不留大片空白，讓篩選區在進入頁面時就完整出現 -->
    <section class="section lec-main">
      <div class="container">
        <!-- 搜尋與篩選 -->
        <div class="finder" role="search">
          <label class="search">
            <Search :size="18" class="search__icon" aria-hidden="true" />
            <span class="sr-only">搜尋講師</span>
            <input
              v-model="keyword"
              type="search"
              class="search__input"
              placeholder="搜尋講師姓名、專長或主題，例如：簡報、AI、品牌"
              autocomplete="off"
            />
            <button v-if="keyword" type="button" class="search__clear" aria-label="清除搜尋文字" @click="keyword = ''">
              <X :size="16" aria-hidden="true" />
            </button>
          </label>

          <div class="filters">
            <div v-for="g in groups" :key="g.key" class="filter" role="group" :aria-label="g.label">
              <span class="filter__label">{{ g.label }}</span>
              <div class="filter__chips">
                <button
                  v-for="o in g.options"
                  :key="o"
                  type="button"
                  class="chip"
                  :class="{ 'is-on': selected[g.key].includes(o) }"
                  :aria-pressed="selected[g.key].includes(o)"
                  @click="toggle(g.key, o)"
                >
                  {{ o }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="bar" aria-live="polite">
          <p v-if="loading" class="bar__count">講師資料載入中…</p>
          <p v-else class="bar__count">共 <strong class="num">{{ results.length }}</strong> 位講師</p>
          <button v-if="hasFilters" type="button" class="bar__clear" @click="clearAll">清除全部條件</button>
        </div>

        <!-- 載入中：先放空白卡片，避免版面跳動 -->
        <ul v-if="loading" class="grid" aria-hidden="true">
          <li v-for="n in 6" :key="n"><span class="card card--skeleton"></span></li>
        </ul>

        <!-- 講師列表 -->
        <ul v-else-if="results.length" class="grid">
          <li v-for="l in results" :key="l.id">
            <button type="button" class="card" :aria-label="`查看 ${l.name} 的介紹`" @click="openLecturer(l, $event)">
              <span v-if="l.placeholder" class="card__badge">示意</span>
              <span class="card__photo">
                <img v-if="showPhoto(l)" :src="l.photo" :alt="`${l.name} 照片`" loading="lazy" @error="markBroken(l.id)" />
                <span v-else class="card__ph" aria-hidden="true"><UserRound :size="38" :stroke-width="1.3" /></span>
              </span>
              <span class="card__name">{{ l.name }}</span>
              <span class="card__title">{{ l.title }}</span>
              <span class="card__tags">
                <span v-for="f in l.fields" :key="f" class="tag">{{ f }}</span>
              </span>
              <span class="card__meta">{{ l.formats.join('・') }}</span>
              <span class="card__more">查看介紹 <ArrowRight :size="14" aria-hidden="true" /></span>
            </button>
          </li>
        </ul>

        <div v-else class="empty">
          <SearchX :size="36" :stroke-width="1.5" aria-hidden="true" />
          <p class="empty__title">找不到符合條件的講師</p>
          <p class="empty__desc">試試減少篩選條件，或直接告訴我們您的需求，由專人為您推薦。</p>
          <div class="empty__actions">
            <button type="button" class="bar__clear" @click="clearAll">清除全部條件</button>
            <BaseButton to="/contact?topic=lecturer" size="sm" variant="dark">請專人推薦講師</BaseButton>
          </div>
        </div>
      </div>
    </section>

    <CtaBanner />

    <!-- 講師詳細介紹 -->
    <dialog
      ref="dialogEl"
      class="detail"
      :aria-labelledby="current ? 'lecturer-name' : undefined"
      @close="onDialogClose"
      @cancel="onDialogCancel"
      @click="onDialogClick"
    >
      <div v-if="current" class="detail__inner">
        <button type="button" class="detail__close" aria-label="關閉講師介紹" @click="closeLecturer">
          <X :size="20" aria-hidden="true" />
        </button>

        <header class="detail__head">
          <span class="card__photo detail__photo">
            <img v-if="showPhoto(current)" :src="current.photo" :alt="`${current.name} 照片`" @error="markBroken(current.id)" />
            <span v-else class="card__ph" aria-hidden="true"><UserRound :size="44" :stroke-width="1.3" /></span>
          </span>
          <div>
            <span v-if="current.placeholder" class="pending-tag">示意內容</span>
            <h2 id="lecturer-name" class="detail__name">{{ current.name }}</h2>
            <p class="detail__title">{{ current.title }}</p>
            <div class="card__tags detail__tags">
              <span v-for="f in current.fields" :key="f" class="tag">{{ f }}</span>
            </div>
          </div>
        </header>

        <p class="detail__bio">{{ current.bio }}</p>

        <div class="detail__cols">
          <section>
            <h3 class="detail__h">可授課主題</h3>
            <ul class="detail__list">
              <li v-for="t in current.topics" :key="t">{{ t }}</li>
            </ul>
          </section>
          <section>
            <h3 class="detail__h">經歷</h3>
            <ul class="detail__list">
              <li v-for="x in current.experience" :key="x">{{ x }}</li>
            </ul>
          </section>
        </div>

        <dl class="detail__facts">
          <div>
            <dt>適合對象</dt>
            <dd>{{ current.audiences.join('、') }}</dd>
          </div>
          <div>
            <dt>授課形式</dt>
            <dd>{{ current.formats.join('、') }}</dd>
          </div>
        </dl>

        <div class="detail__cta">
          <BaseButton :to="inviteLink" variant="primary">邀請這位講師</BaseButton>
        </div>
      </div>
    </dialog>
  </div>
</template>

<style scoped>
/* 頁首：邀請講師加入 */
.join {
  color: var(--c-text-2);
  font-size: 0.95rem;
  line-height: 1.8;
}

@media (max-width: 600px) {
  .join {
    font-size: 0.9rem;
  }
}

.join__link {
  display: inline-flex;
  margin-left: 6px;
  font-size: 0.95rem;
  white-space: nowrap;
}

/* 篩選區緊接在頁首下方 */
.lec-main {
  padding-top: 20px;
}

/* ---------- 搜尋與篩選 ---------- */
.finder {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: clamp(18px, 3vw, 28px);
  border: 1px solid var(--c-line);
  border-radius: var(--radius-xl);
  background: #fff;
  box-shadow: var(--shadow-sm);
}

.search {
  position: relative;
  display: flex;
  align-items: center;
  height: 54px;
  padding: 0 8px 0 20px;
  border: 1px solid var(--c-line-strong);
  border-radius: 999px;
  background: var(--c-bg-alt);
  transition: border-color 0.25s, box-shadow 0.25s, background-color 0.25s;
}

.search:focus-within {
  border-color: var(--c-text);
  background: #fff;
  box-shadow: 0 0 0 4px rgba(248, 190, 32, 0.22);
}

.search__icon {
  flex: none;
  color: var(--c-text-3);
}

.search__input {
  flex: 1;
  min-width: 0;
  height: 100%;
  padding: 0 12px;
  border: 0;
  background: transparent;
  font-size: 1rem;
}

.search__input:focus {
  outline: none;
}

/* 使用自訂的清除按鈕 */
.search__input::-webkit-search-cancel-button {
  display: none;
}

.search__clear {
  display: grid;
  flex: none;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 0;
  border-radius: 50%;
  background: var(--c-gray-100);
  cursor: pointer;
}

.search__clear:hover {
  background: var(--c-yellow-tint);
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.filter {
  display: grid;
  grid-template-columns: 88px 1fr;
  align-items: start;
  gap: 12px;
}

.filter__label {
  padding-top: 7px;
  color: var(--c-text-2);
  font-size: 0.88rem;
  font-weight: 700;
}

.filter__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* 與導覽列相同的膠囊：選取時為黃底 */
.chip {
  padding: 7px 16px;
  border: 1px solid var(--c-line);
  border-radius: 999px;
  background: var(--c-bg-alt);
  color: var(--c-text-2);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.25s, color 0.25s, border-color 0.25s, box-shadow 0.25s;
}

.chip:hover {
  border-color: var(--c-line-strong);
  background: #fff;
  color: var(--c-text);
}

.chip.is-on {
  border-color: transparent;
  background: var(--c-yellow);
  color: var(--c-text);
  font-weight: 700;
  box-shadow: 0 6px 16px -8px rgba(224, 165, 0, 0.8);
}

/* ---------- 結果列 ---------- */
.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin: 28px 0 18px;
}

.bar__count {
  color: var(--c-text-2);
}

.bar__count strong {
  margin: 0 2px;
  color: var(--c-text);
  font-size: 1.15rem;
}

.bar__clear {
  padding: 0 0 2px;
  border: 0;
  background: linear-gradient(var(--c-yellow), var(--c-yellow)) left bottom / 100% 2px no-repeat;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
}

/* ---------- 講師卡片 ---------- */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.grid > li {
  display: flex;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 28px 22px 22px;
  border: 1px solid var(--c-line);
  border-radius: var(--radius-lg);
  background: #fff;
  text-align: center;
  cursor: pointer;
  transition: transform 0.4s var(--ease-out), box-shadow 0.4s var(--ease-out), border-color 0.3s;
}

.card:hover {
  border-color: transparent;
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
}

.card--skeleton {
  min-height: 300px;
  cursor: default;
  background: linear-gradient(100deg, #fff 30%, var(--c-bg-alt) 50%, #fff 70%) 0 0 / 300% 100%;
  animation: skeleton 1.4s ease-in-out infinite;
}

.card--skeleton:hover {
  border-color: var(--c-line);
  box-shadow: none;
  transform: none;
}

@keyframes skeleton {
  to {
    background-position: -150% 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .card--skeleton {
    animation: none;
  }
}

.card__badge {
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 2px 10px;
  border: 1px dashed rgba(136, 136, 136, 0.55);
  border-radius: 999px;
  color: var(--c-text-3);
  font-size: 0.72rem;
}

/* 圓形照片，外圈品牌黃（與首頁講師卡一致） */
.card__photo {
  display: block;
  width: 104px;
  aspect-ratio: 1;
  padding: 4px;
  /* 照片比例不一（例如直式照片）時，外框仍維持正圓 */
  min-height: 0;
  overflow: hidden;
  border-radius: 50%;
  background: conic-gradient(from 200deg, var(--c-yellow), #ffe08a, var(--c-yellow-deep), var(--c-yellow));
}

.card__photo img,
.card__ph {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  border: 3px solid #fff;
  border-radius: 50%;
  object-fit: cover;
  color: var(--c-gray);
  background: linear-gradient(160deg, #f4f4f1, #e3e3df);
}

.card__name {
  margin-top: 16px;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.03em;
}

.card__title {
  margin-top: 2px;
  color: var(--c-text-2);
  font-size: 0.88rem;
}

.card__tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
  margin-top: 12px;
}

.tag {
  padding: 3px 12px;
  border-radius: 999px;
  background: var(--c-yellow-tint);
  font-size: 0.8rem;
  font-weight: 600;
}

.card__meta {
  margin-top: 10px;
  color: var(--c-text-3);
  font-size: 0.82rem;
}

.card__more {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: auto;
  padding-top: 16px;
  font-size: 0.86rem;
  font-weight: 600;
}

.card__more svg {
  transition: transform 0.3s var(--ease-out);
}

.card:hover .card__more svg {
  transform: translateX(4px);
}

/* ---------- 沒有結果 ---------- */
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 56px 24px;
  border: 1px dashed var(--c-line-strong);
  border-radius: var(--radius-lg);
  color: var(--c-text-3);
  text-align: center;
}

.empty__title {
  margin-top: 8px;
  color: var(--c-text);
  font-size: 1.1rem;
  font-weight: 700;
}

.empty__desc {
  max-width: 420px;
  font-size: 0.92rem;
}

.empty__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 16px;
}

/* ---------- 講師介紹視窗 ---------- */
.detail {
  width: min(680px, calc(100% - 32px));
  max-height: calc(100dvh - 48px);
  padding: 0;
  border: 0;
  border-radius: var(--radius-xl);
  background: #fff;
  color: var(--c-text);
  box-shadow: var(--shadow-lg);
}

.detail::backdrop {
  background: rgba(34, 34, 34, 0.45);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
}

.detail[open] {
  animation: detail-in 0.3s var(--ease-out);
}

@keyframes detail-in {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
  }
}

.detail__inner {
  position: relative;
  padding: clamp(24px, 4vw, 40px);
}

.detail__close {
  position: absolute;
  top: 16px;
  right: 16px;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--c-line);
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
}

.detail__close:hover {
  background: var(--c-yellow-tint);
}

.detail__head {
  display: flex;
  align-items: center;
  gap: 24px;
  padding-right: 40px;
}

.detail__photo {
  flex: none;
  width: 120px;
}

.detail__name {
  margin-top: 8px;
  font-size: 1.5rem;
}

.detail__title {
  color: var(--c-text-2);
}

.detail__tags {
  justify-content: flex-start;
}

.detail__bio {
  margin-top: 24px;
  color: var(--c-text-2);
  line-height: 1.85;
}

.detail__cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 24px;
}

.detail__h {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.detail__h::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--c-yellow);
  box-shadow: 0 0 0 3px rgba(248, 190, 32, 0.22);
}

.detail__list li {
  padding: 6px 0;
  border-bottom: 1px solid var(--c-line);
  font-size: 0.92rem;
}

.detail__facts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 24px 0 0;
  padding: 16px 20px;
  border-radius: var(--radius-md);
  background: var(--c-bg-alt);
}

.detail__facts dt {
  color: var(--c-text-3);
  font-size: 0.8rem;
}

.detail__facts dd {
  margin: 2px 0 0;
  font-weight: 600;
}

.detail__cta {
  display: flex;
  justify-content: flex-end;
  margin-top: 28px;
}

@media (prefers-reduced-motion: reduce) {
  .detail[open] {
    animation: none;
  }
}

/* ---------- 手機 ---------- */
@media (max-width: 640px) {
  .filter {
    grid-template-columns: 1fr;
    gap: 6px;
  }

  .filter__label {
    padding-top: 0;
  }

  .detail__head {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .detail__photo {
    width: 96px;
  }

  .detail__cols,
  .detail__facts {
    grid-template-columns: 1fr;
  }

  .detail__cta {
    justify-content: stretch;
  }

  .detail__cta > * {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
