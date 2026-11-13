<script setup lang="ts">
/*
 * 首頁主視覺：導覽列下方的滿版「熱門課程」輪播，只放圖片（不放任何文字）。
 * 圖片來自試算表「熱門課程」分頁的 cover 欄位（與實務總覽頁共用同一份資料）；
 * 點圖片會前往該則的連結（沒填連結就不能點）。
 * 目前這張置中，左右露出前後張；沒有「循環」，到最後一張回到第一張。
 */
import { computed, nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import Swiper from 'swiper'
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import { ArrowLeft, ArrowRight, ImageIcon } from '@lucide/vue'
import { brand } from '@/data/site'
import { useNews } from '@/composables/sheetData'
import { prefersReducedMotion } from '@/composables/motion'

const { news, loading } = useNews()

const root = ref<HTMLElement | null>(null)
const pagination = ref<HTMLElement | null>(null)
const prevBtn = ref<HTMLButtonElement | null>(null)
const nextBtn = ref<HTMLButtonElement | null>(null)
let swiper: Swiper | null = null

/** 讀不到的圖片改顯示佔位底圖（以網址記錄） */
const broken = reactive(new Set<string>())

const multiple = computed(() => news.value.length > 1)

const isExternal = (link: string) => /^https:\/\//.test(link)
const slideTag = (link: string) => (!link ? 'div' : isExternal(link) ? 'a' : RouterLink)
const slideAttrs = (link: string) => {
  if (!link) return {}
  return isExternal(link) ? { href: link, target: '_blank', rel: 'noopener' } : { to: link }
}

function init() {
  swiper?.destroy(true, true)
  swiper = null
  if (!root.value || !multiple.value) return
  const reduced = prefersReducedMotion()
  swiper = new Swiper(root.value, {
    modules: [Navigation, Pagination, A11y, Autoplay],
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 20,
    speed: reduced ? 0 : 700,
    grabCursor: true,
    rewind: true,
    autoplay: reduced ? false : { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true },
    navigation: { prevEl: prevBtn.value, nextEl: nextBtn.value, disabledClass: 'is-disabled' },
    pagination: { el: pagination.value, clickable: true, bulletClass: 'hb__dot', bulletActiveClass: 'is-active' },
    a11y: {
      prevSlideMessage: '上一張',
      nextSlideMessage: '下一張',
      paginationBulletMessage: '前往第 {{index}} 張',
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
  <section class="hero" aria-label="熱門課程">
    <h1 class="sr-only">{{ brand.name }}</h1>

    <div class="hb">
      <!-- 載入中：保留一張的位置 -->
      <div v-if="loading" class="hb__single">
        <div class="hb__item"><div class="hb__img hb__ph"></div></div>
      </div>

      <!-- 只有一則：不輪播 -->
      <div v-else-if="news.length === 1" class="hb__single">
        <component :is="slideTag(news[0].link)" v-bind="slideAttrs(news[0].link)" class="hb__item">
          <img
            v-if="news[0].cover && !broken.has(news[0].cover)"
            class="hb__img"
            :src="news[0].cover"
            :alt="news[0].coverAlt || news[0].title"
            @error="broken.add(news[0].cover)"
          />
          <div v-else class="hb__img hb__ph"><ImageIcon :size="36" :stroke-width="1.4" aria-hidden="true" /></div>
        </component>
      </div>

      <template v-else>
        <div ref="root" class="swiper hb__swiper">
          <ul class="swiper-wrapper">
            <li v-for="(c, i) in news" :key="`${i}-${c.cover}`" class="swiper-slide hb__slide">
              <component :is="slideTag(c.link)" v-bind="slideAttrs(c.link)" class="hb__item">
                <img
                  v-if="c.cover && !broken.has(c.cover)"
                  class="hb__img"
                  :src="c.cover"
                  :alt="c.coverAlt || c.title"
                  @error="broken.add(c.cover)"
                />
                <div v-else class="hb__img hb__ph"><ImageIcon :size="36" :stroke-width="1.4" aria-hidden="true" /></div>
              </component>
            </li>
          </ul>
        </div>

        <button ref="prevBtn" type="button" class="hb__arrow hb__arrow--prev" aria-label="上一張">
          <ArrowLeft :size="22" aria-hidden="true" />
        </button>
        <button ref="nextBtn" type="button" class="hb__arrow hb__arrow--next" aria-label="下一張">
          <ArrowRight :size="22" aria-hidden="true" />
        </button>
        <div ref="pagination" class="hb__pagination"></div>
      </template>
    </div>
  </section>
</template>

<style scoped>
.hero {
  --hb-gap: 18px;
  --hb-dots: 40px;
  position: relative;
  display: flex;
  align-items: center;
  min-height: max(100svh, 520px);
  /* 上方讓出固定在頂端的導覽列 */
  padding: calc(var(--nav-h) + var(--hb-gap)) 0 0;
  background: transparent;
  overflow: hidden;
}

.hb {
  position: relative;
  width: 100%;
  /* 圖片高度＝畫面高度扣掉導覽列、上方留白與頁碼區 */
  --hb-h: calc(max(100svh, 520px) - var(--nav-h) - var(--hb-gap) - var(--hb-dots));
}

.hb__swiper {
  overflow: hidden;
}

/* 每張 16:10；寬度依高度推算，窄螢幕不超過畫面寬度（左右留一點露出鄰張） */
.hb__slide,
.hb__single {
  width: min(calc(var(--hb-h) * 1.6), calc(100% - 2 * var(--gutter) - 56px));
  transition: opacity 0.5s;
}

.hb__single {
  margin-inline: auto;
}

/* 沒有被選中的相鄰張：淡化 */
.hb__slide:not(.swiper-slide-active) {
  opacity: 0.45;
}

.hb__item {
  display: block;
  aspect-ratio: 16 / 10;
  border-radius: 20px;
  overflow: hidden;
  background: var(--c-bg-alt);
  box-shadow: 0 22px 44px -26px rgba(60, 50, 20, 0.55);
}

.hb__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hb__ph {
  display: grid;
  place-items: center;
  color: var(--c-gray);
  background:
    radial-gradient(rgba(224, 165, 0, 0.3) 1.2px, transparent 1.4px) 0 0 / 18px 18px,
    linear-gradient(150deg, #fff 10%, var(--c-yellow-tint));
}

a.hb__item .hb__img {
  transition: transform 0.7s var(--ease-out);
}

a.hb__item:hover .hb__img {
  transform: scale(1.03);
}

/* ---------- 左右箭頭：貼在畫面兩側 ---------- */
.hb__arrow {
  position: absolute;
  top: calc(var(--hb-h) / 2);
  z-index: 2;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  color: var(--c-text);
  box-shadow: 0 8px 22px -10px rgba(34, 34, 34, 0.55);
  cursor: pointer;
  transform: translateY(-50%);
  transition:
    background-color 0.3s,
    opacity 0.3s;
}

.hb__arrow--prev {
  left: clamp(10px, 2vw, 28px);
}

.hb__arrow--next {
  right: clamp(10px, 2vw, 28px);
}

.hb__arrow:hover {
  background: var(--c-yellow);
}

.hb__arrow.is-disabled {
  opacity: 0.35;
  pointer-events: none;
}

/* ---------- 頁碼點：圖片正下方置中 ---------- */
.hb__pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: var(--hb-dots);
}

.hb__pagination :deep(.hb__dot) {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--c-gray-300);
  cursor: pointer;
  transition:
    width 0.4s var(--ease-out),
    background-color 0.3s;
}

.hb__pagination :deep(.hb__dot.is-active) {
  width: 26px;
  background: var(--c-yellow);
}

/* 平板與手機：不再要求整張圖在第一個畫面內，圖片依寬度顯示 */
@media (max-width: 1080px) {
  .hero {
    min-height: auto;
    padding-bottom: 24px;
  }

  .hb {
    --hb-h: calc(100vw * 0.55);
  }

  .hb__arrow {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 600px) {
  .hb__arrow {
    display: none;
  }
}
</style>
