<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Swiper from 'swiper'
import { A11y, Keyboard, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import { ArrowLeft, ArrowRight } from '@lucide/vue'
import CaseCard from './CaseCard.vue'
import type { CaseItem } from '@/data/cases'
import { prefersReducedMotion } from '@/composables/motion'

defineProps<{ items: CaseItem[] }>()

const root = ref<HTMLElement | null>(null)
const pagination = ref<HTMLElement | null>(null)
const prevBtn = ref<HTMLButtonElement | null>(null)
const nextBtn = ref<HTMLButtonElement | null>(null)
let swiper: Swiper | null = null

onMounted(() => {
  if (!root.value) return
  swiper = new Swiper(root.value, {
    modules: [Navigation, Pagination, Keyboard, A11y],
    slidesPerView: 1.08,
    spaceBetween: 16,
    speed: prefersReducedMotion() ? 0 : 600,
    grabCursor: true,
    watchOverflow: true,
    keyboard: { enabled: true, onlyInViewport: true },
    navigation: { prevEl: prevBtn.value, nextEl: nextBtn.value, disabledClass: 'is-disabled' },
    pagination: { el: pagination.value, clickable: true, bulletClass: 'cw__dot', bulletActiveClass: 'is-active' },
    a11y: {
      prevSlideMessage: '上一則案例',
      nextSlideMessage: '下一則案例',
      paginationBulletMessage: '前往第 {{index}} 則案例',
      firstSlideMessage: '已是第一則',
      lastSlideMessage: '已是最後一則',
    },
    breakpoints: {
      640: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 24 },
    },
  })
})

onBeforeUnmount(() => swiper?.destroy(true, true))
</script>

<template>
  <div class="cw">
    <div ref="root" class="swiper cw__swiper">
      <ul class="swiper-wrapper">
        <li v-for="item in items" :key="item.id" class="swiper-slide cw__slide">
          <CaseCard :item="item" />
        </li>
      </ul>
    </div>

    <div class="cw__controls">
      <div ref="pagination" class="cw__pagination"></div>
      <div class="cw__arrows">
        <button ref="prevBtn" type="button" class="cw__arrow" aria-label="上一則案例">
          <ArrowLeft :size="18" aria-hidden="true" />
        </button>
        <button ref="nextBtn" type="button" class="cw__arrow" aria-label="下一則案例">
          <ArrowRight :size="18" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cw__swiper {
  /* 保留卡片懸浮位移與陰影的空間 */
  padding: 10px 4px 32px;
  margin: -10px -4px -32px;
}

.cw__slide {
  height: auto;
}

.cw__controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 36px;
}

.cw__pagination {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.cw__pagination :deep(.cw__dot) {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--c-gray-300);
  cursor: pointer;
  transition:
    width 0.4s var(--ease-out),
    background-color 0.3s;
}

.cw__pagination :deep(.cw__dot.is-active) {
  width: 28px;
  background: var(--c-text);
}

.cw__arrows {
  display: flex;
  gap: 10px;
}

.cw__arrow {
  display: grid;
  place-items: center;
  width: 50px;
  height: 50px;
  border: 1px solid var(--c-line-strong);
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  transition:
    background-color 0.3s,
    border-color 0.3s,
    transform 0.3s var(--ease-out),
    opacity 0.3s;
}

.cw__arrow:hover {
  background: var(--c-yellow);
  border-color: var(--c-yellow);
  transform: translateY(-2px);
}

.cw__arrow.is-disabled {
  opacity: 0.35;
  cursor: default;
  pointer-events: none;
}

/* 項目不足一頁時，Swiper 會在按鈕加上 swiper-button-lock */
.cw__arrows:has(.swiper-button-lock) {
  display: none;
}
</style>
