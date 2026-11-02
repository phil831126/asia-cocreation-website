<script setup lang="ts">
import { computed, ref } from 'vue'
import { prefersReducedMotion } from '@/composables/motion'

/**
 * 品牌核心視覺：3D 玻璃放大鏡
 * 概念：探索知識、聚焦需求、連結資源、共創未來
 * 背景為科技節點網絡，鏡片內呈現「被放大聚焦」的黃色節點群。
 */
const props = withDefaults(defineProps<{ keywords?: string[] }>(), { keywords: () => [] })

/* 背景節點網絡（座標系 500 x 500） */
const nodes = [
  { x: 64, y: 118, r: 4, hot: false },
  { x: 132, y: 54, r: 3, hot: false },
  { x: 250, y: 26, r: 3.5, hot: true },
  { x: 392, y: 70, r: 4, hot: false },
  { x: 462, y: 176, r: 3, hot: false },
  { x: 476, y: 300, r: 4.5, hot: true },
  { x: 404, y: 470, r: 3, hot: false },
  { x: 248, y: 482, r: 3.5, hot: false },
  { x: 92, y: 420, r: 4, hot: true },
  { x: 30, y: 280, r: 3, hot: false },
  { x: 472, y: 430, r: 3, hot: false },
]
const links: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 10], [10, 6], [6, 7], [7, 8], [8, 9], [9, 0], [3, 5], [8, 7],
]

/* 鏡片內被放大的節點（座標系 260 x 260） */
const lensNodes = [
  { x: 130, y: 128, r: 13 },
  { x: 62, y: 92, r: 6 },
  { x: 140, y: 52, r: 5 },
  { x: 206, y: 104, r: 7 },
  { x: 186, y: 190, r: 5.5 },
  { x: 86, y: 182, r: 6.5 },
]
const lensLinks: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 2], [3, 4], [5, 1],
]

const particles = Array.from({ length: 10 }, (_, i) => ({
  left: `${(i * 37 + 11) % 92 + 4}%`,
  top: `${(i * 53 + 7) % 88 + 6}%`,
  size: `${3 + (i % 3) * 2}px`,
  delay: `${-(i * 1.3).toFixed(1)}s`,
  duration: `${9 + (i % 4) * 3}s`,
}))

/* 滑鼠視差（僅桌面、未開啟減少動態時） */
const tilt = ref({ x: 0, y: 0 })
const reduced = prefersReducedMotion()

function onMove(e: PointerEvent) {
  if (reduced || e.pointerType !== 'mouse') return
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  tilt.value = {
    x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
    y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
  }
}

function reset() {
  tilt.value = { x: 0, y: 0 }
}

const toolStyle = computed(() => ({
  transform: `perspective(1200px) rotateX(${(-tilt.value.y * 7).toFixed(2)}deg) rotateY(${(tilt.value.x * 9).toFixed(2)}deg)`,
}))
const netStyle = computed(() => ({
  transform: `translate3d(${(-tilt.value.x * 10).toFixed(1)}px, ${(-tilt.value.y * 10).toFixed(1)}px, 0)`,
}))
</script>

<template>
  <div class="mg" @pointermove="onMove" @pointerleave="reset">
    <div class="mg__glow mg__glow--a" aria-hidden="true"></div>
    <div class="mg__glow mg__glow--b" aria-hidden="true"></div>

    <!-- 背景科技網絡 -->
    <svg class="mg__net" :style="netStyle" viewBox="0 0 500 500" aria-hidden="true">
      <defs>
        <pattern id="mg-dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill="#888888" />
        </pattern>
        <radialGradient id="mg-dots-fade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff" stop-opacity="0.75" />
          <stop offset="100%" stop-color="#fff" stop-opacity="0" />
        </radialGradient>
        <mask id="mg-dots-mask">
          <rect width="500" height="500" fill="url(#mg-dots-fade)" />
        </mask>
      </defs>
      <rect width="500" height="500" fill="url(#mg-dots)" mask="url(#mg-dots-mask)" opacity="0.55" />
      <g class="mg__orbits" fill="none">
        <ellipse cx="250" cy="250" rx="236" ry="96" stroke="#888888" stroke-opacity="0.28" stroke-dasharray="2 7" />
        <ellipse cx="250" cy="250" rx="210" ry="210" stroke="#888888" stroke-opacity="0.16" />
        <ellipse cx="250" cy="250" rx="96" ry="236" stroke="#F8BE20" stroke-opacity="0.45" stroke-dasharray="1 9" />
      </g>
      <g class="mg__links">
        <line
          v-for="([a, b], i) in links"
          :key="`l${i}`"
          :x1="nodes[a].x"
          :y1="nodes[a].y"
          :x2="nodes[b].x"
          :y2="nodes[b].y"
          :class="{ 'is-flow': i % 3 === 0 }"
        />
      </g>
      <g class="mg__nodes">
        <g v-for="(n, i) in nodes" :key="`n${i}`">
          <circle v-if="n.hot" class="mg__pulse" :cx="n.x" :cy="n.y" :r="n.r * 3" :style="{ animationDelay: `${-i * 0.7}s` }" />
          <circle :cx="n.x" :cy="n.y" :r="n.r" :fill="n.hot ? '#F8BE20' : '#ffffff'" stroke="#888888" stroke-width="1.2" />
        </g>
      </g>
    </svg>

    <!-- 放大鏡主體 -->
    <div class="mg__tool" :style="toolStyle" aria-hidden="true">
      <div class="mg__float">
        <div class="mg__shadow"></div>
        <div class="mg__lens">
          <svg class="mg__lens-art" viewBox="0 0 260 260">
            <defs>
              <pattern id="mg-lens-dots" width="22" height="22" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="3" r="2" fill="#888888" fill-opacity="0.35" />
              </pattern>
              <radialGradient id="mg-lens-core" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#F8BE20" stop-opacity="0.55" />
                <stop offset="60%" stop-color="#F8BE20" stop-opacity="0.12" />
                <stop offset="100%" stop-color="#F8BE20" stop-opacity="0" />
              </radialGradient>
            </defs>
            <rect width="260" height="260" fill="url(#mg-lens-dots)" />
            <circle cx="130" cy="128" r="110" fill="url(#mg-lens-core)" />
            <g class="mg__lens-grid" stroke="#888888" stroke-opacity="0.18">
              <line x1="0" y1="128" x2="260" y2="128" />
              <line x1="130" y1="0" x2="130" y2="260" />
              <circle cx="130" cy="128" r="58" fill="none" stroke-dasharray="3 6" />
            </g>
            <g stroke="#E0A500" stroke-width="2" stroke-linecap="round">
              <line
                v-for="([a, b], i) in lensLinks"
                :key="`ll${i}`"
                :x1="lensNodes[a].x"
                :y1="lensNodes[a].y"
                :x2="lensNodes[b].x"
                :y2="lensNodes[b].y"
                stroke-opacity="0.75"
              />
            </g>
            <circle class="mg__core-ring" cx="130" cy="128" r="24" fill="none" stroke="#F8BE20" stroke-width="2" />
            <circle
              v-for="(n, i) in lensNodes"
              :key="`ln${i}`"
              :cx="n.x"
              :cy="n.y"
              :r="n.r"
              :fill="i === 0 ? '#F8BE20' : '#ffffff'"
              stroke="#E0A500"
              stroke-width="2"
            />
          </svg>
          <div class="mg__lens-glass"></div>
          <div class="mg__lens-sweep"></div>
        </div>

        <svg class="mg__frame" viewBox="0 0 500 500">
          <defs>
            <linearGradient id="mg-rim" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#ffffff" />
              <stop offset="30%" stop-color="#d6d6d3" />
              <stop offset="52%" stop-color="#f7f7f5" />
              <stop offset="78%" stop-color="#9a9a98" />
              <stop offset="100%" stop-color="#e9e9e6" />
            </linearGradient>
            <linearGradient id="mg-grip" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#c9c9c6" />
              <stop offset="35%" stop-color="#f5f5f3" />
              <stop offset="70%" stop-color="#8f8f8d" />
              <stop offset="100%" stop-color="#6e6e6c" />
            </linearGradient>
            <linearGradient id="mg-collar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#ffd860" />
              <stop offset="45%" stop-color="#F8BE20" />
              <stop offset="100%" stop-color="#d49b00" />
            </linearGradient>
          </defs>

          <!-- 握把（沿 45 度方向） -->
          <g transform="rotate(45 215 215)">
            <rect x="350" y="196" width="40" height="38" rx="9" fill="url(#mg-collar)" />
            <rect x="386" y="198" width="140" height="34" rx="17" fill="url(#mg-grip)" />
            <g stroke="#ffffff" stroke-opacity="0.55" stroke-width="1.5">
              <line x1="408" y1="203" x2="408" y2="227" />
              <line x1="418" y1="203" x2="418" y2="227" />
              <line x1="428" y1="203" x2="428" y2="227" />
            </g>
            <rect x="506" y="198" width="20" height="34" rx="10" fill="#F8BE20" />
          </g>

          <!-- 鏡框 -->
          <circle cx="215" cy="215" r="146" fill="none" stroke="#222222" stroke-opacity="0.07" stroke-width="2" />
          <circle cx="215" cy="215" r="138" fill="none" stroke="url(#mg-rim)" stroke-width="16" />
          <circle
            class="mg__rim-accent"
            cx="215"
            cy="215"
            r="138"
            fill="none"
            stroke="#F8BE20"
            stroke-width="4"
            stroke-linecap="round"
            stroke-dasharray="120 747"
          />
          <circle cx="215" cy="215" r="129.5" fill="none" stroke="#ffffff" stroke-opacity="0.9" stroke-width="1.5" />
        </svg>
      </div>
    </div>

    <!-- 漂浮粒子 -->
    <span
      v-for="(p, i) in particles"
      :key="`p${i}`"
      class="mg__particle"
      :style="{ left: p.left, top: p.top, width: p.size, height: p.size, animationDelay: p.delay, animationDuration: p.duration }"
      aria-hidden="true"
    ></span>

    <!-- 概念關鍵字玻璃膠囊 -->
    <span
      v-for="(word, i) in props.keywords"
      :key="word"
      class="mg__chip glass"
      :class="`mg__chip--${i + 1}`"
    >
      <span class="mg__chip-dot" aria-hidden="true"></span>{{ word }}
    </span>
  </div>
</template>

<style scoped>
.mg {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  isolation: isolate;
}

/* 柔和光暈 */
.mg__glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(50px);
  z-index: -1;
  pointer-events: none;
}

.mg__glow--a {
  left: 18%;
  top: 16%;
  width: 52%;
  height: 52%;
  background: radial-gradient(circle, rgba(248, 190, 32, 0.55), rgba(248, 190, 32, 0) 70%);
  animation: glow 9s ease-in-out infinite;
}

.mg__glow--b {
  right: 2%;
  bottom: 6%;
  width: 40%;
  height: 40%;
  background: radial-gradient(circle, rgba(136, 136, 136, 0.28), rgba(136, 136, 136, 0) 70%);
}

@keyframes glow {
  50% {
    transform: scale(1.12) translate(4%, 3%);
    opacity: 0.8;
  }
}

/* 背景網絡 */
.mg__net {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  transition: transform 0.8s var(--ease-out);
}

.mg__orbits {
  transform-origin: 250px 250px;
  animation: spin 60s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.mg__links line {
  stroke: #888888;
  stroke-opacity: 0.32;
  stroke-width: 1;
}

.mg__links line.is-flow {
  stroke: #e0a500;
  stroke-opacity: 0.7;
  stroke-dasharray: 4 10;
  animation: flow 3.5s linear infinite;
}

@keyframes flow {
  to {
    stroke-dashoffset: -56;
  }
}

.mg__pulse {
  fill: #f8be20;
  fill-opacity: 0.25;
  transform-box: fill-box;
  transform-origin: center;
  animation: pulse 3.2s ease-out infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.3);
    opacity: 1;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

/* 放大鏡 */
.mg__tool {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transition: transform 0.8s var(--ease-out);
}

.mg__float {
  position: absolute;
  inset: 0;
  animation: float 9s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
  50% {
    transform: translate3d(0, -14px, 0) rotate(-2.5deg);
  }
}

.mg__shadow {
  position: absolute;
  left: 22%;
  top: 76%;
  width: 58%;
  height: 10%;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(34, 34, 34, 0.16), transparent);
  filter: blur(6px);
  animation: shadow 9s ease-in-out infinite;
}

@keyframes shadow {
  50% {
    transform: scale(0.88);
    opacity: 0.7;
  }
}

.mg__lens {
  position: absolute;
  left: 17%;
  top: 17%;
  width: 52%;
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
  background: radial-gradient(circle at 50% 50%, rgba(255, 248, 225, 0.85), rgba(255, 255, 255, 0.5) 62%, rgba(236, 236, 232, 0.65));
  -webkit-backdrop-filter: blur(6px) saturate(140%);
  backdrop-filter: blur(6px) saturate(140%);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.7),
    inset 0 -28px 50px rgba(136, 136, 136, 0.22),
    inset 0 22px 40px rgba(255, 255, 255, 0.75);
}

.mg__lens-art {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  animation: lens-drift 14s ease-in-out infinite;
}

@keyframes lens-drift {
  50% {
    transform: scale(1.06) translate(-2%, 1%);
  }
}

.mg__core-ring {
  transform-box: fill-box;
  transform-origin: center;
  animation: core 4s ease-in-out infinite;
}

@keyframes core {
  50% {
    transform: scale(1.35);
    opacity: 0.3;
  }
}

.mg__lens-glass {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background:
    radial-gradient(ellipse 58% 34% at 36% 20%, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0) 70%),
    radial-gradient(circle at 78% 82%, rgba(248, 190, 32, 0.35), rgba(248, 190, 32, 0) 42%),
    linear-gradient(160deg, rgba(255, 255, 255, 0) 55%, rgba(136, 136, 136, 0.12));
}

.mg__lens-sweep {
  position: absolute;
  inset: -20%;
  background: linear-gradient(115deg, transparent 40%, rgba(255, 255, 255, 0.75) 50%, transparent 60%);
  transform: translateX(-70%);
  animation: sweep 7s var(--ease-in-out) infinite;
}

@keyframes sweep {
  0%,
  55% {
    transform: translateX(-70%);
  }
  85%,
  100% {
    transform: translateX(70%);
  }
}

.mg__frame {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  filter: drop-shadow(0 18px 24px rgba(34, 34, 34, 0.16));
}

.mg__rim-accent {
  transform-origin: 215px 215px;
  animation: spin 18s linear infinite;
}

/* 粒子 */
.mg__particle {
  position: absolute;
  border-radius: 50%;
  background: var(--c-yellow);
  opacity: 0.55;
  pointer-events: none;
  animation: drift 12s ease-in-out infinite;
}

.mg__particle:nth-of-type(even) {
  background: var(--c-gray-300);
}

@keyframes drift {
  0%,
  100% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(10px, -16px);
  }
  66% {
    transform: translate(-8px, 8px);
  }
}

/* 概念膠囊 */
.mg__chip {
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px 8px 12px;
  border-radius: 999px;
  font-size: 0.88rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  white-space: nowrap;
  animation: chip 8s ease-in-out infinite;
}

.mg__chip-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--c-yellow);
  box-shadow: 0 0 0 4px rgba(248, 190, 32, 0.25);
}

.mg__chip--1 {
  right: 4%;
  top: 10%;
}

.mg__chip--2 {
  left: -2%;
  top: 44%;
  animation-delay: -2s;
}

.mg__chip--3 {
  left: 8%;
  bottom: 8%;
  animation-delay: -4s;
}

.mg__chip--4 {
  right: -2%;
  bottom: 30%;
  animation-delay: -6s;
}

@keyframes chip {
  50% {
    transform: translateY(-8px);
  }
}

@media (max-width: 768px) {
  .mg__particle,
  .mg__glow--b {
    display: none;
  }

  .mg__lens-sweep,
  .mg__lens-art,
  .mg__orbits {
    animation: none;
  }

  .mg__chip {
    font-size: 0.78rem;
    padding: 6px 12px 6px 10px;
  }

  .mg__chip--2 {
    left: 0;
  }

  .mg__chip--4 {
    right: 0;
  }
}
</style>
