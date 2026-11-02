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

const stage = ref<HTMLElement | null>(null)
const root = ref<HTMLElement | null>(null)
const pagination = ref<HTMLElement | null>(null)
const prevBtn = ref<HTMLButtonElement | null>(null)
const nextBtn = ref<HTMLButtonElement | null>(null)
let swiper: Swiper | null = null

/** 讓左右箭頭對齊卡片圖片的垂直中心 */
function alignArrows(s: Swiper) {
  const media = s.slides[0]?.querySelector<HTMLElement>('.cc__media')
  if (!media || !stage.value) return
  const top = media.getBoundingClientRect().top - stage.value.getBoundingClientRect().top + media.offsetHeight / 2
  stage.value.style.setProperty('--cw-arrow-top', `${Math.round(top)}px`)
}

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
    on: {
      afterInit: alignArrows,
      resize: alignArrows,
    },
  })
})

onBeforeUnmount(() => swiper?.destroy(true, true))
</script>

<template>
  <div class="cw">
    <div ref="stage" class="cw__stage">
      <div ref="root" class="swiper cw__swiper">
        <ul class="swiper-wrapper">
          <li v-for="item in items" :key="item.id" class="swiper-slide cw__slide">
            <CaseCard :item="item" />
          </li>
        </ul>
      </div>

      <button ref="prevBtn" type="button" class="cw__arrow cw__arrow--prev" aria-label="上一則案例">
        <ArrowLeft :size="20" aria-hidden="true" />
      </button>
      <button ref="nextBtn" type="button" class="cw__arrow cw__arrow--next" aria-label="下一則案例">
        <ArrowRight :size="20" aria-hidden="true" />
      </button>
    </div>

    <div ref="pagination" class="cw__pagination"></div>
  </div>
</template>

<style scoped>
.cw__stage {
  position: relative;
  --cw-arrow-top: 140px;
}

.cw__swiper {
  /* 保留卡片懸浮位移與陰影的空間 */
  padding: 10px 4px 32px;
  margin: -10px -4px -32px;
}

.cw__slide {
  height: auto;
}

/* 左右箭頭：位於卡片兩側、對齊圖片中央 */
.cw__arrow {
  position: absolute;
  top: var(--cw-arrow-top);
  z-index: 2;
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border: 1px solid var(--c-line);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: var(--shadow-md);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  cursor: pointer;
  transform: translateY(-50%);
  transition:
    background-color 0.3s,
    border-color 0.3s,
    transform 0.3s var(--ease-out),
    opacity 0.3s;
}

.cw__arrow--prev {
  left: -26px;
}

.cw__arrow--next {
  right: -26px;
}

.cw__arrow:hover {
  background: var(--c-yellow);
  border-color: var(--c-yellow);
  transform: translateY(-50%) scale(1.06);
}

.cw__arrow.is-disabled {
  opacity: 0.4;
  pointer-events: none;
}

/* 項目不足一頁時，Swiper 會在按鈕加上 swiper-button-lock */
.cw__arrow.swiper-button-lock {
  display: none;
}

.cw__pagination {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 32px;
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

/* 窄螢幕：側邊留白不足，箭頭改在卡片內側 */
@media (max-width: 768px) {
  .cw__arrow {
    width: 44px;
    height: 44px;
  }

  .cw__arrow--prev {
    left: 8px;
  }

  .cw__arrow--next {
    right: 8px;
  }
}
</style>
