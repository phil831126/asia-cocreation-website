<script setup lang="ts">
/*
 * 課程總覽頁：熱門課程輪播
 * 卡片與首頁 Hero 的熱門課程圖卡相同（HotCourseItem），內容來自試算表「亞創網站｜熱門課程」，
 * 依排序欄位一次顯示一張；只有一筆時不顯示頁碼與箭頭。
 */
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import Swiper from 'swiper'
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import { ArrowLeft, ArrowRight } from '@lucide/vue'
import HotCourseItem from './HotCourseItem.vue'
import { useHotCourse } from '@/composables/sheetData'
import { prefersReducedMotion } from '@/composables/motion'

const { courses, loading } = useHotCourse()

const root = ref<HTMLElement | null>(null)
const pagination = ref<HTMLElement | null>(null)
const prevBtn = ref<HTMLButtonElement | null>(null)
const nextBtn = ref<HTMLButtonElement | null>(null)
let swiper: Swiper | null = null

function init() {
  swiper?.destroy(true, true)
  swiper = null
  if (!root.value || courses.value.length < 2) return
  const reduced = prefersReducedMotion()
  swiper = new Swiper(root.value, {
    modules: [Navigation, Pagination, A11y, Autoplay],
    slidesPerView: 1,
    spaceBetween: 16,
    speed: reduced ? 0 : 600,
    grabCursor: true,
    loop: courses.value.length > 2,
    autoplay: reduced ? false : { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true },
    navigation: { prevEl: prevBtn.value, nextEl: nextBtn.value, disabledClass: 'is-disabled' },
    pagination: { el: pagination.value, clickable: true, bulletClass: 'hcc__dot', bulletActiveClass: 'is-active' },
    a11y: {
      prevSlideMessage: '上一個熱門課程',
      nextSlideMessage: '下一個熱門課程',
      paginationBulletMessage: '前往第 {{index}} 個熱門課程',
    },
  })
}

// 試算表載入完成後再建立輪播
watch(
  () => [loading.value, courses.value.length] as const,
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
  <section class="hcc" aria-label="熱門課程">
    <div v-if="loading" class="hcc__single">
      <HotCourseItem :course="null" />
    </div>

    <div v-else-if="courses.length === 1" class="hcc__single">
      <HotCourseItem :course="courses[0]" title-tag="h3" />
    </div>

    <template v-else>
      <div ref="root" class="swiper hcc__swiper">
        <ul class="swiper-wrapper">
          <li v-for="(c, i) in courses" :key="`${i}-${c.title}`" class="swiper-slide hcc__slide">
            <HotCourseItem :course="c" title-tag="h3" />
          </li>
        </ul>
      </div>

      <div class="hcc__foot">
        <div ref="pagination" class="hcc__pagination"></div>
        <div class="hcc__nav">
          <button ref="prevBtn" type="button" class="hcc__arrow" aria-label="上一個熱門課程">
            <ArrowLeft :size="16" aria-hidden="true" />
          </button>
          <button ref="nextBtn" type="button" class="hcc__arrow" aria-label="下一個熱門課程">
            <ArrowRight :size="16" aria-hidden="true" />
          </button>
        </div>
      </div>
    </template>
  </section>
</template>

<style scoped>
.hcc {
  width: 100%;
}

.hcc__swiper {
  /* 保留卡片懸浮位移與陰影的空間 */
  padding: 8px 6px 18px;
  margin: -8px -6px -18px;
}

.hcc__slide {
  height: auto;
}

.hcc__slide :deep(.hot__card) {
  height: 100%;
}

/* ---------- 下方控制列 ---------- */
.hcc__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 16px;
}

.hcc__pagination {
  display: flex;
  gap: 5px;
}

.hcc__pagination :deep(.hcc__dot) {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--c-gray-300);
  cursor: pointer;
  transition:
    width 0.4s var(--ease-out),
    background-color 0.3s;
}

.hcc__pagination :deep(.hcc__dot.is-active) {
  width: 20px;
  background: var(--c-yellow);
}

.hcc__nav {
  display: flex;
  align-items: center;
  gap: 6px;
}

.hcc__arrow {
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

.hcc__arrow:hover {
  background: var(--c-yellow);
}

.hcc__arrow.is-disabled {
  opacity: 0.35;
  pointer-events: none;
}
</style>
