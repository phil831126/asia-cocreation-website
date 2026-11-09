<script setup lang="ts">
/*
 * SECTION 04｜亞洲共創的課程發展歷程（原學習地圖頁）：垂直時間軸
 * 下方連結前往學習地圖的七大主題。
 */
import { ArrowRight } from '@lucide/vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { aboutEvolution as evolution } from '@/data/about'
</script>

<template>
  <section :id="evolution.id" class="section" aria-labelledby="evolution-title">
    <div class="container">
      <SectionHeading id="evolution-title" :title="evolution.title" />
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
      <RouterLink v-reveal :to="evolution.nextTo" class="link-arrow tl__next">
        {{ evolution.next }} <ArrowRight :size="16" aria-hidden="true" />
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
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
}
</style>
