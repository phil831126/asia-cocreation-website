<script setup lang="ts">
import { Sparkles } from '@lucide/vue'
import HeroDashboard from './HeroDashboard.vue'
import HeroCases from './HeroCases.vue'
import { hero } from '@/data/home'

function splitLine(line: string) {
  const i = line.indexOf(hero.titleHighlight)
  if (i < 0) return { before: line, mark: '', after: '' }
  return { before: line.slice(0, i), mark: hero.titleHighlight, after: line.slice(i + hero.titleHighlight.length) }
}
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__bg" aria-hidden="true">
      <div class="hero__glow"></div>
      <div class="hero__dots"></div>
    </div>
    <Sparkles class="hero__spark" :size="26" :stroke-width="1.8" aria-hidden="true" />

    <!-- 版面：左上文字、右上主視覺插圖、左下案例輪播、右下成果數據 -->
    <div class="container hero__grid">
      <!-- 波浪色帶：以下排為基準定位，色帶上緣在右側維持於圓球上方 -->
      <div class="hero__wave" aria-hidden="true">
        <svg viewBox="0 0 1440 140" preserveAspectRatio="none">
          <defs>
            <linearGradient id="hero-dash-fade" gradientUnits="userSpaceOnUse" x1="560" y1="0" x2="760" y2="0">
              <stop offset="0" stop-color="#f8be20" stop-opacity="1" />
              <stop offset="1" stop-color="#f8be20" stop-opacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 70 C 240 20, 470 120, 700 70 S 1100 30, 1440 40 L1440 140 L0 140Z" fill="#f6f4ee" />
          <!-- 黃虛線只走左半部（案例卡片後方），在圓球前淡出 -->
          <path class="hero__dash" d="M0 90 C 240 40, 470 140, 700 90" fill="none" stroke="url(#hero-dash-fade)" />
        </svg>
      </div>

      <div class="hero__copy">
        <h1 id="hero-title" class="hero__title">
          <span v-for="(line, i) in hero.titleLines" :key="line" class="hero__line hero__in" :style="{ '--d': `${0.15 + i * 0.12}s` }">
            {{ splitLine(line).before }}<span v-if="splitLine(line).mark" class="hero__mark">{{ splitLine(line).mark }}</span>{{ splitLine(line).after }}
          </span>
        </h1>
        <p class="hero__sub hero__in" style="--d: 0.45s">{{ hero.subtitle }}</p>
      </div>

      <!-- 主視覺：去框並融入白色背景；不撐高上排（高度由左側文字決定） -->
      <figure class="hero__art">
        <img :src="hero.illustration.src" :alt="hero.illustration.alt" width="1672" height="941" />
      </figure>

      <div class="hero__cases hero__in" style="--d: 0.6s">
        <HeroCases />
      </div>

      <div class="hero__stats hero__in" style="--d: 0.5s">
        <HeroDashboard />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: min(100svh, 960px);
  padding: calc(var(--nav-h) + 24px) 0 48px;
  background: #fff;
  color: var(--c-text);
  overflow: hidden;
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

/* 插圖後方的淡黃光暈與點陣，讓插圖與背景融為一體 */
.hero__glow {
  position: absolute;
  right: 8%;
  top: 6%;
  width: 46%;
  height: 62%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(248, 190, 32, 0.16), transparent 68%);
}

.hero__dots {
  position: absolute;
  right: 0;
  top: 0;
  width: 55%;
  height: 70%;
  background-image: radial-gradient(rgba(224, 165, 0, 0.35) 1.2px, transparent 1.4px);
  background-size: 18px 18px;
  -webkit-mask-image: radial-gradient(ellipse at 70% 30%, #000, transparent 65%);
  mask-image: radial-gradient(ellipse at 70% 30%, #000, transparent 65%);
  opacity: 0.5;
}

.hero__spark {
  position: absolute;
  left: 45%;
  top: calc(var(--nav-h) + 5vh);
  color: var(--c-yellow);
  animation: spark 4s ease-in-out infinite;
}

@keyframes spark {
  50% {
    transform: rotate(12deg) scale(1.1);
    opacity: 0.7;
  }
}

/* 2 × 2 格局：上下兩排靠攏，尺寸依畫面高度縮放 */
.hero__grid {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  grid-template-areas:
    'copy art'
    'cases stats';
  align-content: start;
  column-gap: clamp(32px, 4vw, 56px);
  row-gap: 1.5vh;
}

/* 色帶：放在第二排、橫跨整個畫面寬度 */
.hero__wave {
  position: absolute;
  grid-column: 1 / -1;
  grid-row: 2;
  left: calc(50% - 50vw);
  right: calc(50% - 50vw);
  top: -24px;
  z-index: -1;
  height: 140px;
  pointer-events: none;
}

.hero__wave svg {
  display: block;
  width: 100%;
  height: 140px;
}

/* 色帶下方的底色延伸到畫面最底 */
.hero__wave::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 139px;
  height: 100vh;
  background: #f6f4ee;
}

.hero__dash {
  stroke-width: 2.5;
  stroke-dasharray: 4 10;
  stroke-linecap: round;
  animation: dash-flow 6s linear infinite;
}

@keyframes dash-flow {
  to {
    stroke-dashoffset: -140;
  }
}

.hero__copy {
  grid-area: copy;
  align-self: start;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 1vh;
}

.hero__title {
  display: flex;
  flex-direction: column;
  font-size: clamp(34px, 8.6vh, 62px);
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: 0.03em;
}

.hero__line {
  display: block;
}

/* 黃色螢光底線（黃字放在白底上對比不足） */
.hero__mark {
  background: linear-gradient(transparent 58%, rgba(248, 190, 32, 0.7) 58%, rgba(248, 190, 32, 0.7) 90%, transparent 90%);
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  padding-inline: 0.06em;
}

.hero__sub {
  max-width: 500px;
  margin-top: 2vh;
  font-size: clamp(13px, 2.4vh, 16px);
  line-height: 1.85;
  color: var(--c-text-2);
}

/* 主視覺插圖：放大、往左移；以白色混合＋邊緣淡出融入背景，並降低飽和度 */
.hero__art {
  grid-area: art;
  position: relative;
  align-self: stretch;
  justify-self: end;
  width: min(calc(100% + 40px), calc(44vh * 1672 / 941), 540px);
  margin: 0 3.5vw 0 0;
}

.hero__art img {
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  width: 100%;
  height: auto;
  mix-blend-mode: multiply;
  filter: saturate(0.68) brightness(1.03);
  -webkit-mask-image: radial-gradient(ellipse 72% 70% at 52% 48%, #000 58%, transparent 100%);
  mask-image: radial-gradient(ellipse 72% 70% at 52% 48%, #000 58%, transparent 100%);
  animation: art-in 1.1s var(--ease-out) both 0.25s;
}

/* 只淡入圖片本身（父層若有 filter 會讓混合模式失效） */
@keyframes art-in {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
}

.hero__cases {
  grid-area: cases;
  align-self: start;
  width: 100%;
  /* 依可用高度限制寬度，讓 16:9 圖片仍完整放進一個畫面 */
  max-width: min(560px, calc((57vh - 200px) * 32 / 9 + 14px));
}

.hero__stats {
  grid-area: stats;
  align-self: center;
  justify-self: end;
  position: relative;
  top: 12px;
  padding-top: 2vh;
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

/* 很矮的視窗：插圖略縮，避免底部壓到右下圓球 */
@media (min-width: 1081px) and (max-height: 600px) {
  .hero__art {
    width: min(calc(100% + 40px), calc(40vh * 1672 / 941), 540px);
  }
}

/* 側邊留白不足時，讓出右下角「共創諮詢台」按鈕的位置 */
@media (min-width: 1081px) and (max-width: 1500px) {
  .hero__stats {
    padding-right: 56px;
  }
}

/* 平板與手機：上下堆疊（文字 → 插圖 → 數據 → 案例） */
@media (max-width: 1080px) {
  .hero {
    min-height: auto;
    padding-bottom: 56px;
  }

  .hero__grid {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      'copy'
      'art'
      'stats'
      'cases';
    row-gap: 28px;
  }

  .hero__wave {
    display: none;
  }

  .hero__title {
    font-size: clamp(2.2rem, 7vw, 3.4rem);
  }

  .hero__sub {
    font-size: 1rem;
  }

  .hero__art {
    justify-self: center;
    width: 100%;
    max-width: 640px;
    margin: 0;
  }

  .hero__art img {
    position: static;
  }

  .hero__stats {
    justify-self: stretch;
    top: 0;
    padding-top: 0;
  }

  .hero__cases {
    max-width: none;
  }

  .hero__spark {
    display: none;
  }

  /* 直式長頁面：光暈固定為圓形，只放在插圖後方 */
  .hero__glow {
    right: 0;
    top: 240px;
    width: 90vw;
    max-width: 640px;
    height: auto;
    aspect-ratio: 1;
  }

  .hero__dots {
    height: 640px;
  }
}
</style>
