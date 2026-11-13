<script setup lang="ts">
/*
 * 熱門課程輪播：實務總覽頁頁首右側，只顯示圖片（橫幅 2.55:1）
 * 內容來自試算表「熱門課程」分頁（最多 5 則，取捨方式見「設定」分頁），一次顯示一張；
 * 沒有頁碼點；左右箭頭疊在圖片兩側，只有一則時不顯示。
 */
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import Swiper from 'swiper'
import { A11y, Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import { ArrowLeft, ArrowRight } from '@lucide/vue'
import NewsItem from './NewsItem.vue'
import { useNews } from '@/composables/sheetData'
import { prefersReducedMotion } from '@/composables/motion'

const { news, loading } = useNews()

const root = ref<HTMLElement | null>(null)
const prevBtn = ref<HTMLButtonElement | null>(null)
const nextBtn = ref<HTMLButtonElement | null>(null)
let swiper: Swiper | null = null

function init() {
  swiper?.destroy(true, true)
  swiper = null
  if (!root.value || news.value.length < 2) return
  const reduced = prefersReducedMotion()
  swiper = new Swiper(root.value, {
    modules: [Navigation, A11y, Autoplay],
    slidesPerView: 1,
    spaceBetween: 16,
    speed: reduced ? 0 : 600,
    grabCursor: true,
    loop: news.value.length > 2,
    autoplay: reduced ? false : { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true },
    navigation: { prevEl: prevBtn.value, nextEl: nextBtn.value, disabledClass: 'is-disabled' },
    a11y: {
      prevSlideMessage: '上一個熱門課程',
      nextSlideMessage: '下一個熱門課程',
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
      <NewsItem :item="news[0]" />
    </div>

    <template v-else>
      <div ref="root" class="swiper hcc__swiper">
        <ul class="swiper-wrapper">
          <li v-for="(c, i) in news" :key="`${i}-${c.title}`" class="swiper-slide hcc__slide">
            <NewsItem :item="c" />
          </li>
        </ul>
      </div>
    </template>

    <!-- 左右箭頭：疊在圖片兩側（兩則以上） -->
    <template v-if="!loading && news.length > 1">
      <button ref="prevBtn" type="button" class="hcc__arrow hcc__arrow--prev" aria-label="上一個熱門課程">
        <ArrowLeft :size="18" aria-hidden="true" />
      </button>
      <button ref="nextBtn" type="button" class="hcc__arrow hcc__arrow--next" aria-label="下一個熱門課程">
        <ArrowRight :size="18" aria-hidden="true" />
      </button>
    </template>
  </section>
</template>

<style scoped>
.hcc {
  position: relative;
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

/* ---------- 左右箭頭：疊在圖片兩側 ---------- */
.hcc__arrow {
  position: absolute;
  top: 50%;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  color: var(--c-text);
  box-shadow: 0 6px 16px -8px rgba(34, 34, 34, 0.5);
  cursor: pointer;
  transform: translateY(-50%);
  transition:
    background-color 0.3s,
    opacity 0.3s;
}

.hcc__arrow--prev {
  left: 12px;
}

.hcc__arrow--next {
  right: 12px;
}

.hcc__arrow:hover {
  background: var(--c-yellow);
}

.hcc__arrow.is-disabled {
  opacity: 0.35;
  pointer-events: none;
}
</style>
