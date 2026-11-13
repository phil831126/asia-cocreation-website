<script setup lang="ts">
/*
 * 照片輪播（共用）：案例詳情頁（CaseGallery）、關於亞創「課程的起點」使用
 * - 先確認每張照片都能載入（連結失效、沒開權限的會自動略過），能顯示的不到兩張時不輪播，
 *   改顯示 fallback 插槽的內容（單張圖片或佔位圖）
 * - 兩張以上：左右箭頭、頁碼點、鍵盤左右鍵、每 5 秒自動換片（滑鼠停留或操作後暫停）
 */
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import Swiper from 'swiper'
import { A11y, Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import { ArrowLeft, ArrowRight } from '@lucide/vue'
import { prefersReducedMotion } from '@/composables/motion'

const props = withDefaults(
  defineProps<{
    /** 照片網址（依序顯示，重複的會略過） */
    photos: string[]
    /** 照片說明（給視障者與搜尋引擎） */
    alt: string
    /** 每張照片的圖說（與 photos 同順序，選填）：顯示在照片左下角，也當作該張的替代文字 */
    captions?: string[]
    /** 照片比例，例如 '16 / 10'、'4 / 3' */
    aspect?: string
    /** 自動換片（毫秒）；0＝不自動換片 */
    autoplay?: number
    /** 圓角（CSS 值） */
    radius?: string
  }>(),
  { aspect: '16 / 10', autoplay: 0, radius: '0' },
)

const PROBE_MS = 8000

/** 照片網址 → 圖說（同一張照片以第一個為準） */
const captionOf = (src: string) => {
  const i = props.photos.indexOf(src)
  return (i >= 0 && props.captions?.[i]) || ''
}

/** 能順利載入的照片；確認完成前或不到兩張時為空陣列（顯示 fallback） */
const good = ref<string[]>([])

function probe(src: string) {
  return new Promise<boolean>((resolve) => {
    const img = new Image()
    const timer = setTimeout(() => resolve(false), PROBE_MS)
    img.onload = () => (clearTimeout(timer), resolve(true))
    img.onerror = () => (clearTimeout(timer), resolve(false))
    img.src = src
  })
}

const root = ref<HTMLElement | null>(null)
const pagination = ref<HTMLElement | null>(null)
const prevBtn = ref<HTMLButtonElement | null>(null)
const nextBtn = ref<HTMLButtonElement | null>(null)
let swiper: Swiper | null = null
let run = 0

function teardown() {
  swiper?.destroy(true, true)
  swiper = null
}

async function setup() {
  const mine = ++run
  teardown()
  good.value = []
  const all = [...new Set(props.photos.filter(Boolean))]
  if (all.length < 2) return
  const ok = await Promise.all(all.map(probe))
  if (mine !== run) return
  const loaded = all.filter((_, i) => ok[i])
  if (loaded.length < 2) return
  good.value = loaded
  await nextTick()
  if (mine !== run || !root.value) return
  const reduced = prefersReducedMotion()
  swiper = new Swiper(root.value, {
    modules: [Navigation, Pagination, A11y, Keyboard, Autoplay],
    slidesPerView: 1,
    speed: reduced ? 0 : 500,
    grabCursor: true,
    loop: loaded.length > 2,
    rewind: loaded.length === 2,
    keyboard: { enabled: true, onlyInViewport: true },
    autoplay: props.autoplay && !reduced ? { delay: props.autoplay, disableOnInteraction: true, pauseOnMouseEnter: true } : false,
    navigation: { prevEl: prevBtn.value, nextEl: nextBtn.value, disabledClass: 'is-disabled' },
    pagination: { el: pagination.value, clickable: true, bulletClass: 'pc__dot', bulletActiveClass: 'is-active' },
    a11y: {
      prevSlideMessage: '上一張照片',
      nextSlideMessage: '下一張照片',
      paginationBulletMessage: '前往第 {{index}} 張照片',
    },
  })
}

// 照片清單變動（例如試算表載入完成）時重新確認
watch(() => props.photos.join('\n'), setup, { immediate: true })

onBeforeUnmount(() => {
  run++
  teardown()
})
</script>

<template>
  <!-- 兩張以上：輪播 -->
  <div v-if="good.length > 1" class="pc" role="group" aria-roledescription="輪播" :aria-label="alt" :style="{ '--pc-radius': radius }">
    <div ref="root" class="swiper pc__swiper" :style="{ aspectRatio: aspect }">
      <ul class="swiper-wrapper">
        <li v-for="(src, i) in good" :key="src" class="swiper-slide pc__slide">
          <img :src="src" :alt="captionOf(src) || `${alt}（${i + 1} / ${good.length}）`" class="pc__img" />
          <p v-if="captionOf(src)" class="pc__caption">{{ captionOf(src) }}</p>
        </li>
      </ul>
    </div>
    <button ref="prevBtn" type="button" class="pc__arrow pc__arrow--prev" aria-label="上一張照片">
      <ArrowLeft :size="18" aria-hidden="true" />
    </button>
    <button ref="nextBtn" type="button" class="pc__arrow pc__arrow--next" aria-label="下一張照片">
      <ArrowRight :size="18" aria-hidden="true" />
    </button>
    <div ref="pagination" class="pc__pagination"></div>
  </div>

  <!-- 一張或沒有照片：由使用的地方決定怎麼顯示 -->
  <slot v-else name="fallback" />
</template>

<style scoped>
.pc {
  position: relative;
}

.pc__swiper {
  overflow: hidden;
  border-radius: var(--pc-radius);
  background: var(--c-bg-alt);
}

.pc__slide {
  position: relative;
  height: 100%;
}

/* 圖說：照片左下角（頁碼點在中央，留出空間） */
.pc__caption {
  position: absolute;
  left: 14px;
  bottom: 14px;
  max-width: calc(100% - 28px);
  margin: 0;
  padding: 5px 12px;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.88);
  color: var(--c-text);
  font-size: 0.85rem;
  line-height: 1.5;
}

.pc__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ---------- 左右箭頭：疊在照片兩側 ---------- */
.pc__arrow {
  position: absolute;
  top: 50%;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.88);
  color: var(--c-text);
  box-shadow: 0 6px 16px -8px rgba(34, 34, 34, 0.5);
  cursor: pointer;
  transform: translateY(-50%);
  transition:
    background-color 0.3s,
    opacity 0.3s;
}

.pc__arrow--prev {
  left: 12px;
}

.pc__arrow--next {
  right: 12px;
}

.pc__arrow:hover {
  background: var(--c-yellow);
}

.pc__arrow.is-disabled {
  opacity: 0.35;
  pointer-events: none;
}

/* ---------- 頁碼點：疊在照片底部 ---------- */
.pc__pagination {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 12px;
  z-index: 2;
  display: flex;
  justify-content: center;
  gap: 6px;
  pointer-events: none;
}

.pc__pagination :deep(.pc__dot) {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 0 0 1px rgba(34, 34, 34, 0.18);
  cursor: pointer;
  pointer-events: auto;
  transition:
    width 0.4s var(--ease-out),
    background-color 0.3s;
}

.pc__pagination :deep(.pc__dot.is-active) {
  width: 22px;
  background: var(--c-yellow);
}
</style>
