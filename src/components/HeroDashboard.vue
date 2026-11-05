<script setup lang="ts">
import { ref } from 'vue'
import RollingNumber from './RollingNumber.vue'
import { kpis } from '@/data/dashboard'
import { useInView } from '@/composables/motion'

const root = ref<HTMLElement | null>(null)
/** 每次捲回成果區（往上或往下）都重新滾動數字 */
const inView = useInView(root, 0.2, { repeat: true })
</script>

<template>
  <section ref="root" class="dash" aria-label="成果總覽">
    <span class="dash__glow dash__glow--a" aria-hidden="true"></span>
    <span class="dash__glow dash__glow--b" aria-hidden="true"></span>
    <span class="dash__dots" aria-hidden="true"></span>

    <dl class="dash__orbs">
      <div v-for="(k, i) in kpis" :key="k.key" class="orb" :class="i === 0 ? 'orb--main' : `orb--s${i}`">
        <dt class="orb__label">{{ k.label }}<template v-if="i === 0">（{{ k.unit }}）</template></dt>
        <dd class="orb__value">
          <RollingNumber class="num orb__num" :value="k.value" :suffix="k.suffix" :active="inView" />
          <span class="sr-only">逾 {{ k.value.toLocaleString('zh-TW') }} {{ k.unit }}</span>
        </dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.dash {
  position: relative;
  width: 100%;
  aspect-ratio: 1.15;
  container-type: inline-size;
}

/* 背景光暈與點陣：讓毛玻璃有東西可以透出來 */
.dash__glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  pointer-events: none;
}

.dash__glow--a {
  left: 6%;
  top: 14%;
  width: 52%;
  height: 60%;
  background: radial-gradient(circle, rgba(248, 190, 32, 0.55), transparent 70%);
}

.dash__glow--b {
  right: 2%;
  top: 30%;
  width: 34%;
  height: 46%;
  background: radial-gradient(circle, rgba(248, 190, 32, 0.28), transparent 70%);
}

.dash__dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.28) 1px, transparent 1.3px);
  background-size: 16px 16px;
  -webkit-mask-image: radial-gradient(ellipse at 60% 50%, #000, transparent 70%);
  mask-image: radial-gradient(ellipse at 60% 50%, #000, transparent 70%);
  opacity: 0.6;
  pointer-events: none;
}

.dash__orbs {
  position: absolute;
  inset: 0;
  margin: 0;
}

/* 毛玻璃圓 */
.orb {
  position: absolute;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  border-radius: 50%;
  text-align: center;
  /* 白色毛玻璃：在灰色主視覺上更明亮，文字改深色維持對比 */
  color: var(--c-text);
  background: radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.74) 55%, rgba(255, 255, 255, 0.58));
  border: 1px solid rgba(255, 255, 255, 0.85);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.95),
    inset 0 -18px 36px rgba(34, 34, 34, 0.08),
    0 24px 48px -24px rgba(0, 0, 0, 0.6);
  -webkit-backdrop-filter: blur(18px) saturate(150%);
  backdrop-filter: blur(18px) saturate(150%);
  animation: orb-float 9s ease-in-out infinite;
}

/* 左上的玻璃反光 */
.orb::before {
  content: '';
  position: absolute;
  left: 16%;
  top: 9%;
  width: 46%;
  height: 26%;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(255, 255, 255, 0.35), transparent 70%);
  pointer-events: none;
}

@keyframes orb-float {
  50% {
    transform: translateY(-8px);
  }
}

.orb--main {
  left: 0;
  top: 50%;
  width: 64%;
  margin-top: -32%;
  color: var(--c-text);
  background: radial-gradient(circle at 30% 25%, rgba(255, 224, 128, 0.88), rgba(248, 190, 32, 0.62) 50%, rgba(224, 165, 0, 0.5));
  border-color: rgba(255, 228, 150, 0.7);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.55),
    inset 0 -24px 48px rgba(160, 110, 0, 0.3),
    0 30px 60px -28px rgba(0, 0, 0, 0.85);
}

.orb--s1 {
  right: 5%;
  top: 1%;
  width: 27%;
  animation-delay: -2s;
}

.orb--s2 {
  right: 0;
  top: 36%;
  width: 26%;
  animation-delay: -4s;
}

.orb--s3 {
  right: 13%;
  top: 70%;
  width: 25%;
  animation-delay: -6s;
}

.orb__value {
  margin: 0;
}

.orb__num {
  font-size: clamp(16px, 5cqw, 30px);
  font-weight: 600;
  line-height: 1.1;
}

.orb--main .orb__num {
  font-size: clamp(32px, 11cqw, 76px);
  letter-spacing: -0.01em;
}

/* 標籤：放大加粗，但各尺寸都維持比上方數字小 */
.orb__label {
  margin-top: 4px;
  font-size: clamp(13px, 3.3cqw, 19px);
  font-weight: 700;
  letter-spacing: 0.04em;
  color: rgba(34, 34, 34, 0.85);
}

.orb--main .orb__label {
  font-size: clamp(16px, 4.2cqw, 26px);
  color: rgba(34, 34, 34, 0.85);
}
</style>
