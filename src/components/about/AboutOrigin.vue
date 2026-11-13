<script setup lang="ts">
/*
 * SECTION 03｜課程的起點：從自媒體課堂開始的學習旅程（原學習地圖頁）
 * 桌機左文右圖，平板與手機改為上下排。
 * 右側照片由試算表「關於亞創輪播」分頁控制（一列一張，見 sheetData.ts 的 useOriginPhotos）：
 * 兩張以上輪播、一張顯示單張、沒有照片時以圖示示意。
 */
import { computed, ref, watch } from 'vue'
import { Mic, Smartphone, Video } from '@lucide/vue'
import BaseButton from '@/components/BaseButton.vue'
import PhotoCarousel from '@/components/PhotoCarousel.vue'
import { aboutEvolution, aboutOrigin as origin } from '@/data/about'
import { useOriginPhotos } from '@/composables/sheetData'

const { photos, loading } = useOriginPhotos()

/** 試算表有填就用試算表的照片，否則沿用 about.ts 的 photo.src */
const items = computed(() =>
  photos.value.length ? photos.value : origin.photo.src ? [{ src: origin.photo.src, caption: origin.photo.caption }] : [],
)
const photoList = computed(() => items.value.map((p) => p.src))
const captionList = computed(() => items.value.map((p) => p.caption))
/** 只有一張照片時，圖說放在照片下方（多張輪播時圖說在各張照片上） */
const figureCaption = computed(() => (photoList.value.length === 1 ? captionList.value[0] : ''))

/** 單張照片讀不到時改顯示圖示 */
const broken = ref(false)
watch(
  () => photoList.value[0],
  () => (broken.value = false),
)
</script>

<template>
  <section class="section section--alt origin" aria-labelledby="origin-title">
    <div class="container origin__grid">
      <div class="origin__copy">
        <span v-reveal class="origin__tag">{{ origin.tag }}</span>
        <h2 id="origin-title" v-reveal="80" class="origin__title">{{ origin.title }}</h2>
        <p v-for="(p, i) in origin.paragraphs" :key="i" v-reveal="160 + i * 80" class="origin__text">{{ p }}</p>
        <BaseButton v-reveal="320" :to="{ hash: `#${aboutEvolution.id}` }" class="origin__cta">{{ origin.cta }}</BaseButton>
      </div>

      <figure v-reveal="120" class="origin__figure">
        <PhotoCarousel :photos="photoList" :captions="captionList" :alt="origin.photo.alt" aspect="4 / 3" :autoplay="5000" radius="var(--radius-xl)">
          <template #fallback>
            <img
              v-if="photoList[0] && !broken"
              class="origin__photo"
              :src="photoList[0]"
              :alt="origin.photo.alt"
              :width="origin.photo.width"
              :height="origin.photo.height"
              loading="lazy"
              @error="broken = true"
            />
            <!-- 沒有照片：以手機腳架、麥克風與攝影圖示示意，尺寸與照片相同 -->
            <div v-else class="origin__placeholder">
              <div class="ph-art" aria-hidden="true">
                <span class="ph-art__item ph-art__item--mic"><Mic :size="30" :stroke-width="1.5" /></span>
                <span class="ph-art__tripod">
                  <span class="ph-art__phone"><Smartphone :size="46" :stroke-width="1.4" /></span>
                  <span class="ph-art__legs"></span>
                </span>
                <span class="ph-art__item ph-art__item--cam"><Video :size="30" :stroke-width="1.5" /></span>
              </div>
              <span v-if="!loading" class="pending-tag origin__pending">課堂照片待補</span>
            </div>
          </template>
        </PhotoCarousel>
        <figcaption v-if="figureCaption" class="origin__caption">{{ figureCaption }}</figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.origin__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(32px, 6vw, 88px);
}

.origin__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.origin__tag {
  padding: 5px 14px;
  border-radius: 999px;
  background: var(--c-yellow);
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.origin__title {
  margin-top: 18px;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 900;
  line-height: 1.35;
  letter-spacing: 0.02em;
  text-wrap: balance;
}

.origin__text {
  margin-top: 18px;
  color: var(--c-text-2);
  line-height: 2;
}

.origin__title + .origin__text {
  margin-top: 24px;
}

.origin__cta {
  margin-top: 32px;
}

.origin__figure {
  margin: 0;
}

.origin__photo,
.origin__placeholder {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-xl);
  object-fit: cover;
}

.origin__placeholder {
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  background:
    radial-gradient(rgba(224, 165, 0, 0.32) 1.2px, transparent 1.4px) 0 0 / 18px 18px,
    linear-gradient(150deg, #fff 10%, var(--c-yellow-tint));
  border: 1px solid var(--c-line);
}

.ph-art {
  display: flex;
  align-items: flex-end;
  gap: clamp(18px, 4vw, 44px);
}

.ph-art__item {
  display: grid;
  place-items: center;
  width: clamp(64px, 8vw, 84px);
  aspect-ratio: 1;
  margin-bottom: 18%;
  border-radius: 50%;
  background: #fff;
  box-shadow: var(--shadow-md);
}

.ph-art__item--mic {
  transform: rotate(-10deg);
}

.ph-art__item--cam {
  transform: rotate(8deg);
}

.ph-art__tripod {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ph-art__phone {
  display: grid;
  place-items: center;
  width: clamp(92px, 11vw, 118px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--c-yellow);
  box-shadow: var(--shadow-md);
}

/* 腳架：三支細腳 */
.ph-art__legs {
  position: relative;
  width: 64px;
  height: clamp(70px, 9vw, 96px);
  background: linear-gradient(var(--c-text), var(--c-text)) center / 2px 100% no-repeat;
  opacity: 0.55;
}

.ph-art__legs::before,
.ph-art__legs::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 104%;
  background: var(--c-text);
  transform-origin: top;
}

.ph-art__legs::before {
  transform: rotate(18deg);
}

.ph-art__legs::after {
  transform: rotate(-18deg);
}

.origin__pending {
  position: absolute;
  left: 16px;
  bottom: 16px;
  background-color: #fff;
}

.origin__caption {
  margin-top: 12px;
  color: var(--c-text-2);
  font-size: 0.9rem;
}

/* ---------- 平板與手機：上下排 ---------- */
@media (max-width: 960px) {
  .origin__grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .origin__figure {
    max-width: 640px;
  }
}
</style>
