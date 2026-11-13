<script setup lang="ts">
/*
 * 首頁主視覺：導覽列下方的滿版「熱門課程」輪播，只放圖片（不放任何文字）。
 * 圖片來自試算表「熱門課程」分頁的 cover 欄位（與實務總覽頁共用同一份資料）；
 * 點圖片會前往該則的連結（沒填連結就不能點）。
 * 一次一張、鋪滿導覽列下方整個畫面（圖片以 cover 裁切）；沒有頁碼點，只有左右箭頭與自動換片，
 * 到最後一張回到第一張。
 */
import { computed, nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import Swiper from 'swiper'
import { A11y, Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import { ArrowLeft, ArrowRight, ImageIcon } from '@lucide/vue'
import { brand } from '@/data/site'
import { useNews } from '@/composables/sheetData'
import { prefersReducedMotion } from '@/composables/motion'

const { news, loading } = useNews()

const root = ref<HTMLElement | null>(null)
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
    modules: [Navigation, A11y, Autoplay],
    slidesPerView: 1,
    speed: reduced ? 0 : 700,
    grabCursor: true,
    rewind: true,
    autoplay: reduced ? false : { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true },
    navigation: { prevEl: prevBtn.value, nextEl: nextBtn.value, disabledClass: 'is-disabled' },
    a11y: {
      prevSlideMessage: '上一張',
      nextSlideMessage: '下一張',
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
      </template>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: max(100svh, 520px);
  /* 上方讓出固定在頂端的導覽列；導覽列以下整個畫面都是輪播 */
  padding: var(--nav-h) 0 0;
  background: transparent;
  overflow: hidden;
}

.hb {
  position: relative;
  width: 100%;
  height: calc(max(100svh, 520px) - var(--nav-h));
}

.hb__swiper,
.hb__slide,
.hb__single,
.hb__item {
  height: 100%;
}

.hb__swiper {
  overflow: hidden;
}

.hb__item {
  display: block;
  overflow: hidden;
  background: var(--c-bg-alt);
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
  top: 50%;
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

/* 平板與手機：高度依圖片比例（16:10），整張顯示不裁切 */
@media (max-width: 1080px) {
  .hero {
    min-height: auto;
  }

  .hb {
    height: auto;
  }

  .hb__swiper,
  .hb__slide,
  .hb__single,
  .hb__item {
    height: auto;
    aspect-ratio: 16 / 10;
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
