<script setup lang="ts">
import { ArrowDown, Mic, Smartphone, Video } from '@lucide/vue'
import PageHeader from '@/components/PageHeader.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import BaseButton from '@/components/BaseButton.vue'
import CtaBanner from '@/components/CtaBanner.vue'
import { anchors, evolution, origin, topics } from '@/data/courseMap'
</script>

<template>
  <div class="page">
    <PageHeader eyebrow="Learning Map" title="學習地圖" :crumbs="[{ label: '學習地圖' }]" />

    <!-- 1. 課程的起點：桌機左文右圖 -->
    <section class="section origin" aria-labelledby="origin-title">
      <div class="container origin__grid">
        <div class="origin__copy">
          <span v-reveal class="origin__tag">{{ origin.tag }}</span>
          <h2 id="origin-title" v-reveal="80" class="origin__title">{{ origin.title }}</h2>
          <p v-for="(p, i) in origin.paragraphs" :key="i" v-reveal="160 + i * 80" class="origin__text">{{ p }}</p>
          <BaseButton v-reveal="320" :to="{ hash: `#${anchors.evolution}` }" class="origin__cta">{{ origin.cta }}</BaseButton>
        </div>

        <figure v-reveal="120" class="origin__figure">
          <img
            v-if="origin.photo.src"
            class="origin__photo"
            :src="origin.photo.src"
            :alt="origin.photo.alt"
            :width="origin.photo.width"
            :height="origin.photo.height"
            loading="lazy"
          />
          <!-- 照片尚未提供：以手機腳架、麥克風與攝影圖示示意，尺寸與照片相同 -->
          <div v-else class="origin__placeholder">
            <div class="ph-art" aria-hidden="true">
              <span class="ph-art__item ph-art__item--mic"><Mic :size="30" :stroke-width="1.5" /></span>
              <span class="ph-art__tripod">
                <span class="ph-art__phone"><Smartphone :size="46" :stroke-width="1.4" /></span>
                <span class="ph-art__legs"></span>
              </span>
              <span class="ph-art__item ph-art__item--cam"><Video :size="30" :stroke-width="1.5" /></span>
            </div>
            <span class="pending-tag origin__pending">課堂照片待補</span>
          </div>
          <figcaption v-if="origin.photo.src" class="origin__caption">{{ origin.photo.caption }}</figcaption>
        </figure>
      </div>
    </section>

    <!-- 2. 課程如何演進：垂直時間軸 -->
    <section :id="anchors.evolution" class="section section--alt">
      <div class="container">
        <SectionHeading :title="evolution.title" />
        <ol class="tl">
          <li v-for="(s, i) in evolution.stages" :key="s.years" v-reveal="i * 100" class="tl__stage">
            <p class="tl__years num">{{ s.years }}</p>
            <span class="tl__rail" aria-hidden="true"><span class="tl__dot"></span></span>
            <div class="tl__body">
              <h3 class="tl__title">{{ s.title }}</h3>
              <p class="tl__text">{{ s.body }}</p>
            </div>
          </li>
        </ol>
        <RouterLink v-reveal :to="{ hash: `#${anchors.topics}` }" class="link-arrow tl__next">
          {{ evolution.next }} <ArrowDown :size="16" aria-hidden="true" />
        </RouterLink>
      </div>
    </section>

    <!-- 3. 上課會學什麼？：七個學習主題 -->
    <section :id="anchors.topics" class="section">
      <div class="container">
        <SectionHeading :title="topics.title" :desc="topics.intro" />
        <ul class="topics">
          <li
            v-for="(t, i) in topics.items"
            :key="t.key"
            v-reveal="(i % 2) * 100"
            class="topic"
            :class="{ 'topic--wide': t.wide }"
          >
            <span class="topic__icon">
              <component :is="t.icon" :size="24" :stroke-width="1.6" aria-hidden="true" />
            </span>
            <div class="topic__body">
              <h3 class="topic__title">{{ t.title }}</h3>
              <p v-for="(p, j) in t.paragraphs" :key="j" class="topic__text">{{ p }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <CtaBanner />
  </div>
</template>

<style scoped>
/* ---------- 1. 課程的起點 ---------- */
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

/* ---------- 2. 課程如何演進 ---------- */
.tl {
  margin-top: var(--block-gap);
  max-width: 980px;
}

.tl__stage {
  --rail: 28px;
  display: grid;
  grid-template-columns: 168px var(--rail) minmax(0, 1fr);
  column-gap: 24px;
  padding-bottom: 44px;
}

.tl__stage:last-child {
  padding-bottom: 0;
}

.tl__years {
  padding-top: 2px;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-align: right;
}

/* 黃點＋細灰線 */
.tl__rail {
  position: relative;
  display: flex;
  justify-content: center;
}

.tl__rail::before {
  content: '';
  position: absolute;
  top: 18px;
  bottom: -44px;
  left: 50%;
  width: 1px;
  background: var(--c-gray-300);
  transform: translateX(-50%);
}

.tl__stage:last-child .tl__rail::before {
  display: none;
}

.tl__dot {
  position: relative;
  width: 14px;
  height: 14px;
  margin-top: 8px;
  border-radius: 50%;
  background: var(--c-yellow);
  box-shadow: 0 0 0 6px rgba(248, 190, 32, 0.22);
}

.tl__title {
  font-size: clamp(1.15rem, 1.8vw, 1.35rem);
  line-height: 1.5;
}

.tl__text {
  margin-top: 10px;
  color: var(--c-text-2);
  line-height: 1.95;
}

.tl__next {
  margin-top: 40px;
  margin-left: calc(168px + 28px + 48px);
}

/* ---------- 3. 上課會學什麼？ ---------- */
.topics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin-top: var(--block-gap);
}

.topic {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: clamp(24px, 3vw, 34px);
  border: 1px solid var(--c-line);
  border-radius: var(--radius-lg);
  background: #fff;
  transition:
    border-color 0.3s,
    box-shadow 0.5s var(--ease-out);
}

.topic:hover {
  border-color: transparent;
  box-shadow: var(--shadow-md);
}

.topic--wide {
  grid-column: 1 / -1;
}

.topic__icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 52px;
  height: 52px;
  border-radius: var(--radius-md);
  background: var(--c-yellow-tint);
  transition: background-color 0.3s;
}

.topic:hover .topic__icon {
  background: var(--c-yellow);
}

.topic__body {
  min-width: 0;
}

.topic__title {
  padding-top: 12px;
  font-size: 1.2rem;
  letter-spacing: 0.04em;
}

.topic__text {
  margin-top: 10px;
  color: var(--c-text-2);
  line-height: 1.95;
}

.topic__title + .topic__text {
  margin-top: 12px;
}

/* 跨兩欄的卡片：兩段內文並排 */
.topic--wide .topic__body {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 32px;
}

.topic--wide .topic__title {
  grid-column: 1 / -1;
}

/* ---------- 平板 ---------- */
@media (max-width: 960px) {
  .origin__grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .origin__figure {
    max-width: 640px;
  }

  .topics {
    grid-template-columns: minmax(0, 1fr);
  }

  .topic--wide .topic__body {
    display: block;
  }
}

/* ---------- 手機：年份 → 標題 → 內文，時間軸在左 ---------- */
@media (max-width: 640px) {
  .tl__stage {
    --rail: 20px;
    grid-template-columns: var(--rail) minmax(0, 1fr);
    grid-template-areas:
      'rail years'
      'rail body';
    column-gap: 16px;
    padding-bottom: 36px;
  }

  .tl__rail {
    grid-area: rail;
  }

  .tl__rail::before {
    bottom: -36px;
  }

  .tl__dot {
    margin-top: 6px;
  }

  .tl__years {
    grid-area: years;
    padding-top: 0;
    text-align: left;
    font-size: 1.05rem;
  }

  .tl__body {
    grid-area: body;
    margin-top: 6px;
  }

  .tl__next {
    margin-left: 36px;
  }

  .topic {
    flex-direction: column;
    gap: 14px;
  }

  .topic__title {
    padding-top: 0;
  }
}
</style>
