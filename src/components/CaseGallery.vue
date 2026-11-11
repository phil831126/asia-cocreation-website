<script setup lang="ts">
/*
 * 案例詳情頁的照片區：多張照片輪播
 * 照片 = 封面（cover）＋ 試算表「案例」分頁 gallery 欄位的其他照片（同一張不重複）。
 * 先確認每張照片都能載入（連結失效、沒開權限的會自動略過），能顯示的不到兩張時，
 * 維持原本的單張圖片（或示意圖）。
 * 列表卡片與首頁只用封面；要換封面，改試算表的 cover 欄位。
 */
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import Swiper from 'swiper'
import { A11y, Keyboard, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import { ArrowLeft, ArrowRight } from '@lucide/vue'
import CaseVisual from './CaseVisual.vue'
import type { CaseItem } from '@/data/cases'
import { prefersReducedMotion } from '@/composables/motion'

const props = defineProps<{ item: CaseItem }>()

const PROBE_MS = 8000

/** 能順利載入的照片（封面在前，同一張不重複）；確認完成前為空，先顯示單張圖片 */
const photos = ref<string[]>([])

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

onMounted(async () => {
  const all = [...new Set([props.item.image, ...(props.item.gallery ?? [])].filter(Boolean))]
  if (all.length < 2) return
  const ok = await Promise.all(all.map(probe))
  const good = all.filter((_, i) => ok[i])
  if (good.length < 2) return
  photos.value = good
  await nextTick()
  if (!root.value) return
  swiper = new Swiper(root.value, {
    modules: [Navigation, Pagination, A11y, Keyboard],
    slidesPerView: 1,
    speed: prefersReducedMotion() ? 0 : 500,
    grabCursor: true,
    loop: photos.value.length > 2,
    keyboard: { enabled: true, onlyInViewport: true },
    navigation: { prevEl: prevBtn.value, nextEl: nextBtn.value, disabledClass: 'is-disabled' },
    pagination: { el: pagination.value, clickable: true, bulletClass: 'cg__dot', bulletActiveClass: 'is-active' },
    a11y: {
      prevSlideMessage: '上一張照片',
      nextSlideMessage: '下一張照片',
      paginationBulletMessage: '前往第 {{index}} 張照片',
    },
  })
})

onBeforeUnmount(() => swiper?.destroy(true, true))
</script>

<template>
  <!-- 多張：輪播 -->
  <div v-if="photos.length > 1" class="cg" role="group" aria-roledescription="輪播" :aria-label="`${item.title} 照片`">
    <div ref="root" class="swiper cg__swiper">
      <ul class="swiper-wrapper">
        <li v-for="(src, i) in photos" :key="src" class="swiper-slide cg__slide">
          <img
            :src="src"
            :alt="`${item.imageAlt}（${i + 1} / ${photos.length}）`"
            class="cg__img"
          />
        </li>
      </ul>
    </div>
    <button ref="prevBtn" type="button" class="cg__arrow cg__arrow--prev" aria-label="上一張照片">
      <ArrowLeft :size="18" aria-hidden="true" />
    </button>
    <button ref="nextBtn" type="button" class="cg__arrow cg__arrow--next" aria-label="下一張照片">
      <ArrowRight :size="18" aria-hidden="true" />
    </button>
    <div ref="pagination" class="cg__pagination"></div>
  </div>

  <!-- 一張或沒有照片：原本的單張圖片／示意圖 -->
  <CaseVisual v-else :item="item" />
</template>

<style scoped>
.cg {
  position: relative;
}

.cg__swiper {
  aspect-ratio: 16 / 10;
  background: var(--c-bg-alt);
}

.cg__slide {
  height: 100%;
}

.cg__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ---------- 左右箭頭：疊在照片兩側 ---------- */
.cg__arrow {
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

.cg__arrow--prev {
  left: 12px;
}

.cg__arrow--next {
  right: 12px;
}

.cg__arrow:hover {
  background: var(--c-yellow);
}

.cg__arrow.is-disabled {
  opacity: 0.35;
  pointer-events: none;
}

/* ---------- 頁碼點：疊在照片底部 ---------- */
.cg__pagination {
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

.cg__pagination :deep(.cg__dot) {
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

.cg__pagination :deep(.cg__dot.is-active) {
  width: 22px;
  background: var(--c-yellow);
}
</style>
