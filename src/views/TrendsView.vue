<script setup lang="ts">
/*
 * 趨勢專欄（建置中）
 * 目前尚無內容，畫面置中顯示「建置中」；背景沿用首頁 Hero 的白底、淡黃光暈與點陣。
 */
import { Sparkles } from '@lucide/vue'
</script>

<template>
  <div class="page">
    <section class="trends" aria-labelledby="trends-title">
      <div class="trends__bg" aria-hidden="true">
        <div class="trends__glow"></div>
        <div class="trends__dots"></div>
      </div>
      <Sparkles class="trends__spark" :size="26" :stroke-width="1.8" aria-hidden="true" />

      <div class="container trends__inner">
        <span class="eyebrow trends__in" style="--d: 0.05s">Trends</span>
        <h1 id="trends-title" class="trends__title trends__in" style="--d: 0.12s">趨勢專欄</h1>
        <p class="trends__status trends__in" style="--d: 0.22s"><span class="highlight">建置中</span></p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.trends {
  position: relative;
  isolation: isolate;
  display: grid;
  place-items: center;
  min-height: max(100svh, 560px);
  padding: calc(var(--nav-h) + 24px) 0 64px;
  background: #fff;
  overflow: hidden;
}

/* ---------- 背景：與首頁 Hero 相同的光暈與點陣 ---------- */
.trends__bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

.trends__glow {
  position: absolute;
  left: 50%;
  top: 50%;
  width: min(760px, 110vw);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(248, 190, 32, 0.18), transparent 66%);
  transform: translate(-50%, -50%);
}

.trends__dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(224, 165, 0, 0.35) 1.2px, transparent 1.4px);
  background-size: 18px 18px;
  -webkit-mask-image: radial-gradient(ellipse at 50% 50%, #000, transparent 62%);
  mask-image: radial-gradient(ellipse at 50% 50%, #000, transparent 62%);
  opacity: 0.5;
}

.trends__spark {
  position: absolute;
  left: 50%;
  top: calc(50% - 150px);
  color: var(--c-yellow);
  transform: translateX(-50%);
  animation: spark 4s ease-in-out infinite;
}

@keyframes spark {
  50% {
    transform: translateX(-50%) rotate(12deg) scale(1.1);
    opacity: 0.7;
  }
}

/* ---------- 置中的文字 ---------- */
.trends__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.trends__title {
  margin-top: 16px;
  font-size: clamp(1.4rem, 2.6vw, 1.9rem);
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--c-text-2);
}

.trends__status {
  margin-top: 12px;
  font-size: clamp(3rem, 9vw, 6rem);
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: 0.16em;
  padding-left: 0.16em;
}

.trends__in {
  animation: trends-in 0.9s var(--ease-out) both;
  animation-delay: var(--d, 0s);
}

@keyframes trends-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
}
</style>
