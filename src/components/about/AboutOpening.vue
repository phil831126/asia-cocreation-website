<script setup lang="ts">
/* SECTION 01｜品牌開場：左側標題與品牌介紹，右側「分享、交流、合作匯聚成共創」概念圖 */
import { ChevronRight } from '@lucide/vue'
import { aboutOpening as copy } from '@/data/about'
import { splitPhrases } from '@/composables/phrases'

/** 標題依逗號分段，換行時不拆開詞語 */
const titlePhrases = splitPhrases(copy.title, copy.highlight)

/** 概念圖的三個節點（位置以 480 × 440 的畫布座標計算） */
const nodePos = [
  { x: 92, y: 96 },
  { x: 394, y: 132 },
  { x: 150, y: 350 },
]
const center = { x: 250, y: 222 }
const pct = (v: number, total: number) => `${(v / total) * 100}%`
</script>

<template>
  <section class="opening" aria-labelledby="about-title">
    <div class="opening__dots" aria-hidden="true"></div>

    <div class="container opening__grid">
      <div class="opening__copy">
        <nav class="opening__crumbs" aria-label="麵包屑">
          <ol>
            <li><RouterLink to="/">首頁</RouterLink></li>
            <li>
              <ChevronRight :size="14" aria-hidden="true" />
              <span aria-current="page">關於亞創</span>
            </li>
          </ol>
        </nav>
        <span class="eyebrow opening__in" style="--d: 0.05s">{{ copy.eyebrow }}</span>
        <h1 id="about-title" class="opening__title opening__in" style="--d: 0.12s">
<span v-for="(p, i) in titlePhrases" :key="i" class="opening__phrase">{{ p.before }}<span v-if="p.mark" class="highlight">{{ p.mark }}</span>{{ p.after }}</span>
        </h1>
        <p
          v-for="(p, i) in copy.paragraphs"
          :key="i"
          class="opening__text opening__in"
          :class="{ 'opening__text--lead': i === 0 }"
          :style="{ '--d': `${0.24 + i * 0.1}s` }"
        >
          {{ p }}
        </p>
      </div>

      <!-- 概念圖：人與人透過分享、交流與合作，匯聚成「共創」 -->
      <div class="concept" aria-hidden="true">
        <svg class="concept__lines" viewBox="0 0 480 440">
          <!-- 三方彼此之間的細點線 -->
          <path class="concept__mesh" :d="`M${nodePos[0].x} ${nodePos[0].y} L${nodePos[1].x} ${nodePos[1].y} L${nodePos[2].x} ${nodePos[2].y} Z`" />
          <!-- 匯聚到中心的線 -->
          <path class="concept__link" style="--d: 0.5s" :d="`M${nodePos[0].x} ${nodePos[0].y} Q 150 210 ${center.x} ${center.y}`" pathLength="1" />
          <path class="concept__link" style="--d: 0.65s" :d="`M${nodePos[1].x} ${nodePos[1].y} Q 340 220 ${center.x} ${center.y}`" pathLength="1" />
          <path class="concept__link" style="--d: 0.8s" :d="`M${nodePos[2].x} ${nodePos[2].y} Q 210 290 ${center.x} ${center.y}`" pathLength="1" />
          <circle class="concept__spark" cx="58" cy="232" r="5" />
          <circle class="concept__spark concept__spark--b" cx="438" cy="54" r="4" />
          <circle class="concept__spark concept__spark--c" cx="300" cy="410" r="3.5" />
          <!-- 品牌放大鏡 -->
          <g class="concept__lens">
            <circle cx="404" cy="338" r="30" fill="rgba(255,255,255,0.7)" stroke="#c9c9c6" stroke-width="7" />
            <circle cx="404" cy="338" r="9" fill="#f8be20" />
            <path d="M427 361 L452 386" stroke="#9a9a98" stroke-width="10" stroke-linecap="round" />
          </g>
        </svg>

        <span class="concept__core" :style="{ left: pct(center.x, 480), top: pct(center.y, 440) }">
          <span class="concept__halo"></span>
          <span class="concept__word">{{ copy.visual.center }}</span>
        </span>

        <span
          v-for="(node, i) in copy.visual.nodes"
          :key="node.label"
          class="concept__node"
          :style="{ left: pct(nodePos[i].x, 480), top: pct(nodePos[i].y, 440), '--d': `${0.35 + i * 0.15}s` }"
        >
          <span class="concept__bubble"><component :is="node.icon" :size="26" :stroke-width="1.6" /></span>
          <span class="concept__label">{{ node.label }}</span>
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.opening {
  position: relative;
  isolation: isolate;
  padding: calc(var(--nav-h) + clamp(28px, 5vh, 56px)) 0 clamp(48px, 8vh, 88px);
  background: #fff;
  overflow: hidden;
}

.opening__dots {
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
  width: 58%;
  height: 100%;
  background-image: radial-gradient(rgba(224, 165, 0, 0.4) 1.2px, transparent 1.4px);
  background-size: 18px 18px;
  -webkit-mask-image: radial-gradient(ellipse at 70% 45%, #000, transparent 62%);
  mask-image: radial-gradient(ellipse at 70% 45%, #000, transparent 62%);
  opacity: 0.5;
}

/* 左右不對稱：文字略寬 */
.opening__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  align-items: center;
  gap: clamp(32px, 5vw, 80px);
}

.opening__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.opening__crumbs ol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  font-size: 0.88rem;
  color: var(--c-text-2);
}

.opening__crumbs li {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.opening__crumbs a:hover {
  color: var(--c-text);
  text-decoration: underline;
  text-underline-offset: 4px;
}

.opening__copy .eyebrow {
  margin-top: clamp(24px, 4vh, 40px);
}

.opening__title {
  margin-top: 18px;
  font-size: clamp(2.1rem, 3.8vw, 3.2rem);
  font-weight: 900;
  line-height: 1.32;
  letter-spacing: 0.03em;
  text-wrap: balance;
}

.opening__phrase {
  display: inline-block;
}

.opening__text {
  max-width: 600px;
  margin-top: 18px;
  color: var(--c-text-2);
  line-height: 2;
}

.opening__text--lead {
  margin-top: 28px;
  color: var(--c-text);
  font-size: clamp(1.02rem, 1.3vw, 1.1rem);
}

/* 載入時依序淡入 */
.opening__in {
  animation: opening-in 0.9s var(--ease-out) both;
  animation-delay: var(--d, 0s);
}

@keyframes opening-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
}

/* ---------- 概念圖 ---------- */
.concept {
  position: relative;
  width: 100%;
  max-width: 520px;
  justify-self: end;
  aspect-ratio: 480 / 440;
}

.concept::before {
  content: '';
  position: absolute;
  left: 52%;
  top: 50%;
  z-index: -1;
  width: 74%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, var(--c-yellow-tint) 0%, rgba(255, 246, 220, 0.6) 55%, transparent 72%);
  transform: translate(-50%, -50%);
}

.concept__lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.concept__mesh {
  fill: none;
  stroke: var(--c-gray-300);
  stroke-width: 1.5;
  stroke-dasharray: 2 7;
  stroke-linecap: round;
}

/* 匯聚線：載入時由節點畫向中心 */
.concept__link {
  fill: none;
  stroke: var(--c-yellow-deep);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: link-draw 1.1s var(--ease-out) forwards;
  animation-delay: var(--d, 0s);
}

@keyframes link-draw {
  to {
    stroke-dashoffset: 0;
  }
}

.concept__spark {
  fill: var(--c-yellow);
  animation: spark-float 5s ease-in-out infinite;
}

.concept__spark--b {
  fill: var(--c-gray-300);
  animation-delay: -1.6s;
}

.concept__spark--c {
  animation-delay: -3.2s;
}

@keyframes spark-float {
  50% {
    transform: translateY(-8px);
  }
}

.concept__lens {
  transform-box: fill-box;
  transform-origin: center;
  animation: lens-float 9s ease-in-out infinite;
}

@keyframes lens-float {
  50% {
    transform: translate(-6px, -8px) rotate(-6deg);
  }
}

.concept__core {
  position: absolute;
  display: grid;
  place-items: center;
  width: 27%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--c-yellow);
  box-shadow: var(--shadow-md);
  transform: translate(-50%, -50%);
  animation: core-in 0.9s var(--ease-out) both 1.1s;
}

@keyframes core-in {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.7);
  }
}

.concept__halo {
  position: absolute;
  inset: -16%;
  border: 1.5px dashed rgba(224, 165, 0, 0.7);
  border-radius: 50%;
  animation: halo-spin 26s linear infinite;
}

@keyframes halo-spin {
  to {
    transform: rotate(360deg);
  }
}

.concept__word {
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  font-weight: 900;
  letter-spacing: 0.12em;
  padding-left: 0.12em;
}

.concept__node {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transform: translate(-50%, -32px);
  animation: node-in 0.8s var(--ease-out) both;
  animation-delay: var(--d, 0s);
}

@keyframes node-in {
  from {
    opacity: 0;
    transform: translate(-50%, -16px);
  }
}

.concept__bubble {
  display: grid;
  place-items: center;
  width: clamp(54px, 5.4vw, 64px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: #fff;
  border: 1px solid var(--c-line);
  box-shadow: var(--shadow-md);
}

.concept__label {
  padding: 4px 12px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid var(--c-line);
  font-size: 0.86rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

/* ---------- 平板與手機：上下排列 ---------- */
@media (max-width: 1023px) {
  .opening__grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .concept {
    justify-self: center;
    max-width: 460px;
  }
}

@media (max-width: 767px) {
  .opening__title {
    font-size: clamp(1.9rem, 8.4vw, 2.4rem);
    line-height: 1.35;
  }

  .opening__text {
    font-size: 0.98rem;
    line-height: 1.95;
  }

  .opening__text--lead {
    margin-top: 22px;
    font-size: 1.02rem;
  }

  .concept {
    width: calc(100% - 24px);
  }

  .concept__label {
    padding: 3px 10px;
    font-size: 0.8rem;
  }
}
</style>
