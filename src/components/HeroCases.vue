<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import Swiper from 'swiper'
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import { ArrowLeft, ArrowRight } from '@lucide/vue'
import CaseCard from './CaseCard.vue'
import { useCases } from '@/composables/sheetData'
import { prefersReducedMotion } from '@/composables/motion'

/**
 * 首頁 Hero 右側的案例輪播：
 * 與「讓每一次合作，成為共創的成果」相同的卡片格式，放大為一次一張、圖片 16:10。
 */
const { cases, loading } = useCases()
const items = computed(() => cases.value.slice(0, 6))

const root = ref<HTMLElement | null>(null)
const pagination = ref<HTMLElement | null>(null)
const prevBtn = ref<HTMLButtonElement | null>(null)
const nextBtn = ref<HTMLButtonElement | null>(null)
let swiper: Swiper | null = null

function init() {
  swiper?.destroy(true, true)
  if (!root.value || !items.value.length) return
  const reduced = prefersReducedMotion()
  swiper = new Swiper(root.value, {
    modules: [Navigation, Pagination, A11y, Autoplay],
    slidesPerView: 1,
    spaceBetween: 16,
    speed: reduced ? 0 : 600,
    grabCursor: true,
    watchOverflow: true,
    loop: items.value.length > 2,
    autoplay: reduced ? false : { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true },
    navigation: { prevEl: prevBtn.value, nextEl: nextBtn.value, disabledClass: 'is-disabled' },
    pagination: { el: pagination.value, clickable: true, bulletClass: 'hc__dot', bulletActiveClass: 'is-active' },
    a11y: {
      prevSlideMessage: '上一則案例',
      nextSlideMessage: '下一則案例',
      paginationBulletMessage: '前往第 {{index}} 則案例',
    },
  })
}

// 案例資料（試算表）載入完成後再建立輪播
watch(
  () => [loading.value, items.value.length] as const,
  async ([isLoading]) => {
    if (isLoading) return
    await nextTick()
    init()
  },
  { immediate: true },
)

onBeforeUnmount(() => swiper?.destroy(true, true))
</script>

<template>
  <section class="hc" aria-label="合作案例">
    <div ref="root" class="swiper hc__swiper">
      <ul class="swiper-wrapper">
        <li v-for="item in items" :key="item.id" class="swiper-slide hc__slide">
          <CaseCard :item="item" />
        </li>
      </ul>
    </div>

    <!-- 頁碼在左；箭頭與「全部案例」在右 -->
    <div class="hc__foot">
      <div ref="pagination" class="hc__pagination"></div>
      <div class="hc__nav">
        <button ref="prevBtn" type="button" class="hc__arrow" aria-label="上一則案例"><ArrowLeft :size="16" aria-hidden="true" /></button>
        <button ref="nextBtn" type="button" class="hc__arrow" aria-label="下一則案例"><ArrowRight :size="16" aria-hidden="true" /></button>
        <RouterLink to="/cases" class="hc__all">全部案例</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hc {
  width: 100%;
}

.hc__swiper {
  /* 保留卡片懸浮位移與陰影的空間 */
  padding: 8px 6px 18px;
  margin: -8px -6px -18px;
}

.hc__slide {
  height: auto;
}

/* ---------- 案例卡：沿用案例區格式，圖片 16:9 ---------- */
.hc__slide :deep(.cc) {
  border: 0;
  border-radius: 18px;
  color: var(--c-text);
  box-shadow: 0 16px 30px -18px rgba(60, 50, 20, 0.45);
}

.hc__slide :deep(.cc:hover) {
  transform: translateY(-4px);
}

.hc__slide :deep(.cv) {
  aspect-ratio: 16 / 10;
}

.hc__slide :deep(.cv__label) {
  display: none;
}

.hc__slide :deep(.cc__body) {
  padding: 2vh 22px 2.2vh;
}

.hc__slide :deep(.cc__meta .pending-tag) {
  display: none;
}

.hc__slide :deep(.cc__title) {
  margin-top: 8px;
  font-size: clamp(1rem, 2.2vh, 1.15rem);
  line-height: 1.45;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  overflow: hidden;
}

.hc__slide :deep(.cc__excerpt) {
  margin-top: 6px;
  font-size: 0.9rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
}

.hc__slide :deep(.cc__more) {
  padding-top: 8px;
  font-size: 0.85rem;
}

/* ---------- 下方控制列 ---------- */
.hc__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 1.8vh;
}

.hc__pagination {
  display: flex;
  gap: 5px;
}

.hc__pagination :deep(.hc__dot) {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--c-gray-300);
  cursor: pointer;
  transition:
    width 0.4s var(--ease-out),
    background-color 0.3s;
}

.hc__pagination :deep(.hc__dot.is-active) {
  width: 20px;
  background: var(--c-yellow);
}

.hc__nav {
  display: flex;
  align-items: center;
  gap: 6px;
}

.hc__arrow {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 50%;
  background: rgba(34, 34, 34, 0.07);
  color: var(--c-text);
  cursor: pointer;
  transition:
    background-color 0.3s,
    opacity 0.3s;
}

.hc__arrow:hover {
  background: var(--c-yellow);
}

.hc__arrow.is-disabled {
  opacity: 0.35;
  pointer-events: none;
}

.hc__arrow.swiper-button-lock {
  display: none;
}

.hc__all {
  margin-left: 4px;
  font-size: 0.82rem;
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: var(--c-yellow);
  text-underline-offset: 4px;
}

.hc__all:hover {
  color: var(--c-yellow-deep);
}
</style>
