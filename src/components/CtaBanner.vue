<script setup lang="ts">
import BaseButton from './BaseButton.vue'
import { ctaSection as copy } from '@/data/home'
</script>

<template>
  <section class="section cta-wrap" aria-labelledby="cta-title">
    <div class="container">
      <div v-reveal class="cta">
        <!-- 放大鏡與科技軌跡的視覺延伸 -->
        <svg class="cta__art" viewBox="0 0 520 420" aria-hidden="true">
          <path
            class="cta__trail"
            d="M-20 360 C 120 300, 160 140, 300 150 S 470 260, 540 90"
            fill="none"
            stroke="#222222"
            stroke-opacity="0.22"
            stroke-width="1.5"
            stroke-dasharray="3 8"
          />
          <path d="M-20 400 C 160 340, 240 250, 380 260 S 520 330, 560 250" fill="none" stroke="#ffffff" stroke-opacity="0.6" stroke-width="2" />
          <circle cx="330" cy="170" r="92" fill="rgba(255,255,255,0.28)" stroke="#222222" stroke-width="10" />
          <circle cx="330" cy="170" r="80" fill="none" stroke="#ffffff" stroke-opacity="0.7" stroke-width="1.5" />
          <path d="M398 238 L470 310" stroke="#222222" stroke-width="22" stroke-linecap="round" />
          <circle cx="300" cy="150" r="8" fill="#222222" />
          <circle cx="360" cy="190" r="5" fill="#222222" fill-opacity="0.5" />
          <line x1="300" y1="150" x2="360" y2="190" stroke="#222222" stroke-opacity="0.5" />
          <circle cx="120" cy="320" r="4" fill="#222222" fill-opacity="0.5" />
          <circle cx="490" cy="120" r="5" fill="#ffffff" />
        </svg>
        <span class="cta__glass" aria-hidden="true"></span>

        <div class="cta__content">
          <span class="eyebrow cta__eyebrow">{{ copy.eyebrow }}</span>
          <h2 id="cta-title" class="cta__title">{{ copy.title }}</h2>
          <p class="cta__desc">{{ copy.desc }}</p>
          <BaseButton :to="copy.button.to" variant="dark">{{ copy.button.label }}</BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-wrap {
  padding-block: var(--section-y);
}

.cta {
  position: relative;
  isolation: isolate;
  padding: clamp(40px, 6vw, 72px) clamp(28px, 6vw, 80px);
  border-radius: var(--radius-xl);
  background:
    radial-gradient(circle at 85% 20%, rgba(255, 255, 255, 0.45), transparent 40%),
    linear-gradient(135deg, #ffcf45 0%, var(--c-yellow) 45%, #f2b10c 100%);
  overflow: hidden;
}

.cta::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image: radial-gradient(rgba(34, 34, 34, 0.14) 1px, transparent 1.2px);
  background-size: 18px 18px;
  -webkit-mask-image: linear-gradient(90deg, transparent 30%, #000);
  mask-image: linear-gradient(90deg, transparent 30%, #000);
}

.cta__art {
  position: absolute;
  right: -2%;
  top: 50%;
  z-index: -1;
  width: min(54%, 560px);
  transform: translateY(-50%);
}

.cta__trail {
  animation: trail 6s linear infinite;
}

@keyframes trail {
  to {
    stroke-dashoffset: -110;
  }
}

.cta__glass {
  position: absolute;
  left: 46%;
  bottom: -60px;
  z-index: -1;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.7);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}

.cta__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  max-width: 700px;
}

.cta__eyebrow {
  color: var(--c-text);
}

.cta__eyebrow::before {
  background: var(--c-text);
  box-shadow: 0 0 0 4px rgba(34, 34, 34, 0.12);
}

.cta__title {
  font-size: clamp(2rem, 4.4vw, 3.4rem);
  text-wrap: balance;
  font-weight: 900;
  line-height: 1.25;
  letter-spacing: 0.02em;
}

.cta__desc {
  margin-bottom: 10px;
  font-size: 1.08rem;
  color: #3a3a3a;
}

@media (max-width: 768px) {
  .cta__art {
    top: auto;
    bottom: -40px;
    right: -60px;
    width: 300px;
    transform: none;
    opacity: 0.6;
  }
}
</style>
