<script setup lang="ts">
/*
 * 熱門課程輪播：首頁主視覺右側與實務總覽頁頁首右側共用
 * 內容來自試算表「熱門課程」分頁（最多 5 則，取捨方式見「設定」分頁），一次顯示一張；
 * 只有一則時不顯示頁碼與箭頭。showAll＝在下方加上「實務總覽」連結（首頁使用）。
 */
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import Swiper from 'swiper'
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import { ArrowLeft, ArrowRight } from '@lucide/vue'
import NewsItem from './NewsItem.vue'
import { useNews } from '@/composables/sheetData'
import { prefersReducedMotion } from '@/composables/motion'

withDefaults(defineProps<{ showAll?: boolean; titleTag?: 'h2' | 'h3' }>(), { showAll: false, titleTag: 'h3' })

const { news, loading } = useNews()

const root = ref<HTMLElement | null>(null)
const pagination = ref<HTMLElement | null>(null)
const prevBtn = ref<HTMLButtonElement | null>(null)
const nextBtn = ref<HTMLButtonElement | null>(null)
let swiper: Swiper | null = null

function init() {
  swiper?.destroy(true, true)
  swiper = null
  if (!root.value || news.value.length < 2) return
  const reduced = prefersReducedMotion()
  swiper = new Swiper(root.value, {
    modules: [Navigation, Pagination, A11y, Autoplay],
    slidesPerView: 1,
    spaceBetween: 16,
    speed: reduced ? 0 : 600,
    grabCursor: true,
    loop: news.value.length > 2,
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
  () => [loading.value, news.value.length] as const,
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
      <NewsItem :item="null" />
    </div>

    <div v-else-if="news.length === 1" class="hcc__single">
      <NewsItem :item="news[0]" :title-tag="titleTag" />
    </div>

    <template v-else>
      <div ref="root" class="swiper hcc__swiper">
        <ul class="swiper-wrapper">
          <li v-for="(c, i) in news" :key="`${i}-${c.title}`" class="swiper-slide hcc__slide">
            <NewsItem :item="c" :title-tag="titleTag" />
          </li>
        </ul>
      </div>
    </template>

    <!-- 下方控制列：頁碼、左右箭頭（兩則以上），以及首頁的「實務總覽」連結 -->
    <div v-if="!loading && (news.length > 1 || showAll)" class="hcc__foot">
      <div ref="pagination" class="hcc__pagination"></div>
      <div class="hcc__nav">
        <template v-if="news.length > 1">
          <button ref="prevBtn" type="button" class="hcc__arrow" aria-label="上一個熱門課程">
            <ArrowLeft :size="16" aria-hidden="true" />
          </button>
          <button ref="nextBtn" type="button" class="hcc__arrow" aria-label="下一個熱門課程">
            <ArrowRight :size="16" aria-hidden="true" />
          </button>
        </template>
        <RouterLink v-if="showAll" to="/cases" class="hcc__all">實務總覽</RouterLink>
      </div>
    </div>
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

/* 首頁：前往實務總覽 */
.hcc__all {
  margin-left: 8px;
  padding: 2px 0;
  font-size: 0.85rem;
  font-weight: 700;
  border-bottom: 2px solid var(--c-yellow);
}

.hcc__all:hover {
  color: var(--c-yellow-deep);
}

.hcc__arrow.is-disabled {
  opacity: 0.35;
  pointer-events: none;
}
</style>
