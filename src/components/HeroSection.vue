<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Sparkles } from '@lucide/vue'
import HeroServices from './HeroServices.vue'
import HotCourseCard from './HotCourseCard.vue'
import { hero } from '@/data/home'
import { navDockEl } from '@/composables/navDock'

function splitLine(line: string) {
  const i = line.indexOf(hero.titleHighlight)
  if (i < 0) return { before: line, mark: '', after: '' }
  return { before: line.slice(0, i), mark: hero.titleHighlight, after: line.slice(i + hero.titleHighlight.length) }
}

/** 底部色帶：桌機版導覽列一開始停在這裡（見 AppNavbar.vue） */
const dock = ref<HTMLElement | null>(null)
onMounted(() => (navDockEl.value = dock.value))
onBeforeUnmount(() => {
  if (navDockEl.value === dock.value) navDockEl.value = null
})
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__bg" aria-hidden="true">
      <div class="hero__glow"></div>
      <div class="hero__dots"></div>
    </div>
    <Sparkles class="hero__spark" :size="26" :stroke-width="1.8" aria-hidden="true" />

    <!-- 版面：左上標題與說明、左下四大服務項目、右側熱門課程圖卡 -->
    <div class="container hero__grid">
      <div class="hero__copy">
        <h1 id="hero-title" class="hero__title">
          <span v-for="(line, i) in hero.titleLines" :key="line" class="hero__line hero__in" :style="{ '--d': `${0.15 + i * 0.12}s` }">
            {{ splitLine(line).before }}<span v-if="splitLine(line).mark" class="hero__mark">{{ splitLine(line).mark }}</span>{{ splitLine(line).after }}
          </span>
        </h1>
        <p class="hero__sub hero__in" :style="{ '--d': '0.45s', '--chars': hero.subtitle.length + 0.6 }">{{ hero.subtitle }}</p>
      </div>

      <div class="hero__services hero__in" style="--d: 0.55s">
        <p class="eyebrow hero__guide">{{ hero.servicesLabel }}</p>
        <HeroServices />
      </div>

      <div class="hero__course hero__in" style="--d: 0.35s">
        <HotCourseCard />
      </div>
    </div>

    <!-- 底部色帶：導覽列停靠的位置（平板與手機不顯示） -->
    <div class="hero__band">
      <div ref="dock" class="hero__dock"></div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  --band-y: 14px;
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  min-height: max(100svh, 640px);
  /* 透明底，讓首頁最底層的點綴透出來（頁面本身為白底） */
  background: transparent;
  color: var(--c-text);
  overflow: hidden;
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

/* 輪播後方的淡黃光暈與點陣 */
.hero__glow {
  position: absolute;
  right: 4%;
  top: 4%;
  width: 50%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(248, 190, 32, 0.16), transparent 66%);
}

.hero__dots {
  position: absolute;
  right: 0;
  top: 0;
  width: 55%;
  height: 80%;
  background-image: radial-gradient(rgba(224, 165, 0, 0.35) 1.2px, transparent 1.4px);
  background-size: 18px 18px;
  -webkit-mask-image: radial-gradient(ellipse at 70% 35%, #000, transparent 65%);
  mask-image: radial-gradient(ellipse at 70% 35%, #000, transparent 65%);
  opacity: 0.5;
}

.hero__spark {
  position: absolute;
  left: 47%;
  top: 7vh;
  color: var(--c-yellow);
  animation: spark 4s ease-in-out infinite;
}

@keyframes spark {
  50% {
    transform: rotate(12deg) scale(1.1);
    opacity: 0.7;
  }
}

/* 左欄：標題（上）＋服務項目（下）；右欄：熱門課程圖卡
   上方留白讓出左上角的 Logo（桌機版導覽列停在底部時，Logo 留在左上角） */
.hero__grid {
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  grid-template-rows: auto auto;
  grid-template-areas:
    'copy course'
    'services course';
  align-content: center;
  column-gap: clamp(40px, 5vw, 80px);
  row-gap: clamp(24px, 5vh, 52px);
  padding-block: calc(76px + clamp(12px, 3vh, 32px)) clamp(24px, 3.5vh, 44px);
}

.hero__copy {
  grid-area: copy;
  align-self: end;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* 讓說明文字依左欄寬度縮放字級（cqi） */
  container-type: inline-size;
}

.hero__title {
  display: flex;
  flex-direction: column;
  font-size: clamp(40px, 8.4vh, 68px);
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: 0.03em;
}

/* 標題與說明都固定一行 */
.hero__line {
  display: block;
  white-space: nowrap;
}

/* 黃色螢光底線（黃字放在白底上對比不足） */
.hero__mark {
  background: linear-gradient(transparent 58%, rgba(248, 190, 32, 0.7) 58%, rgba(248, 190, 32, 0.7) 90%, transparent 90%);
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  padding-inline: 0.06em;
}

/* 說明文字固定一行：字級依左欄寬度縮放（--chars 為字數），最大 17px */
.hero__sub {
  margin-top: 2.6vh;
  font-size: min(17px, 2.3vh + 2px, calc(100cqi / var(--chars)));
  line-height: 1.85;
  white-space: nowrap;
  color: var(--c-text-2);
}

.hero__services {
  grid-area: services;
  align-self: start;
}

/* 「快速導引」小標籤：純標示 */
.hero__guide {
  margin-bottom: 14px;
}

/* 右欄：熱門課程圖卡，寬度依畫面高度限制，讓整張卡片留在第一個畫面內 */
.hero__course {
  grid-area: course;
  align-self: center;
  justify-self: end;
  width: 100%;
  max-width: min(640px, calc((100svh - 400px) * 1.6 + 12px));
  min-width: 0;
}

/* ---------- 底部色帶（導覽列停靠處） ---------- */
.hero__band {
  position: relative;
  padding-block: var(--band-y);
  background: var(--c-bg-alt);
  border-top: 1px solid var(--c-line);
}

/* 與導覽列本體同高（64px），導覽列會對齊這個位置 */
.hero__dock {
  height: 64px;
}

/* 載入時逐步淡入 */
.hero__in {
  animation: hero-in 1s var(--ease-out) both;
  animation-delay: var(--d, 0s);
}

@keyframes hero-in {
  from {
    opacity: 0;
    transform: translateY(24px);
    filter: blur(6px);
  }
}

/* 側邊留白不足時，讓出右下角「共創諮詢台」按鈕的位置 */
@media (min-width: 1081px) and (max-width: 1500px) {
  .hero__course {
    margin-right: 48px;
  }
}

/* 平板與手機：上下堆疊（文字 → 服務 → 熱門課程），導覽列固定在頂端 */
@media (max-width: 1080px) {
  .hero {
    min-height: auto;
    padding: calc(var(--nav-h) + 24px) 0 56px;
  }

  .hero__grid {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      'copy'
      'services'
      'course';
    row-gap: 36px;
    padding-block: 0;
  }

  .hero__title {
    font-size: clamp(2.2rem, 7vw, 3.4rem);
  }

  .hero__sub {
    font-size: min(17px, calc(100cqi / var(--chars)));
  }

  .hero__course {
    justify-self: stretch;
    max-width: none;
  }

  .hero__band,
  .hero__spark {
    display: none;
  }

  .hero__glow {
    right: 0;
    top: 360px;
    width: 90vw;
    max-width: 640px;
  }

  .hero__dots {
    height: 640px;
  }
}
</style>
