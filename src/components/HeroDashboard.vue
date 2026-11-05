<script setup lang="ts">
import { ref } from 'vue'
import { BookOpen, Handshake, Presentation, GraduationCap } from '@lucide/vue'
import RollingNumber from './RollingNumber.vue'
import { kpis } from '@/data/dashboard'
import { useInView } from '@/composables/motion'

const root = ref<HTMLElement | null>(null)
/** 每次捲回成果區（往上或往下）都重新滾動數字 */
const inView = useInView(root, 0.2, { repeat: true })

/** 各數據的圖示：開課＝書本、合作單位＝握手、業師＝授課簡報、學員＝學士帽 */
const icons: Record<string, unknown> = {
  courses: BookOpen,
  partners: Handshake,
  teachers: Presentation,
  learners: GraduationCap,
}
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
          <component :is="icons[k.key]" class="orb__icon" :size="24" :stroke-width="1.8" aria-hidden="true" />
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

/* 毛玻璃圓：無外框，以柔和的內側光暈表現玻璃邊緣 */
.orb {
  position: absolute;
  isolation: isolate;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  border-radius: 50%;
  text-align: center;
  /* 白色毛玻璃：在灰色主視覺上更明亮，文字改深色維持對比 */
  color: var(--c-text);
  background: radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.87), rgba(255, 255, 255, 0.69) 55%, rgba(255, 255, 255, 0.53));
  box-shadow:
    inset 0 10px 22px rgba(255, 255, 255, 0.45),
    inset 0 -18px 36px rgba(34, 34, 34, 0.1),
    0 24px 48px -24px rgba(0, 0, 0, 0.6);
  -webkit-backdrop-filter: blur(26px) saturate(170%);
  backdrop-filter: blur(26px) saturate(170%);
  animation: orb-float 9s ease-in-out infinite;
}

/* 左上的玻璃反光 */
.orb::before {
  content: '';
  position: absolute;
  left: 16%;
  top: 9%;
  z-index: -1;
  width: 46%;
  height: 26%;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(255, 255, 255, 0.5), transparent 70%);
  pointer-events: none;
}

/* 右下的折射光：讓圓球更有玻璃的厚度 */
.orb::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: 50%;
  background:
    radial-gradient(circle at 72% 82%, rgba(255, 255, 255, 0.32), transparent 38%),
    linear-gradient(160deg, rgba(255, 255, 255, 0.18), transparent 45%);
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
  background: radial-gradient(circle at 30% 25%, rgba(255, 224, 128, 0.83), rgba(248, 190, 32, 0.57) 50%, rgba(224, 165, 0, 0.45));
  box-shadow:
    inset 0 14px 30px rgba(255, 240, 190, 0.45),
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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
}

/* 數字上方的圖示 */
.orb__icon {
  width: clamp(16.5px, 3.7cqw, 24.7px);
  height: clamp(16.5px, 3.7cqw, 24.7px);
  margin-bottom: clamp(4px, 1cqw, 8px);
  color: rgba(34, 34, 34, 0.72);
}

.orb--main .orb__icon {
  width: clamp(26.4px, 6.6cqw, 44px);
  height: clamp(26.4px, 6.6cqw, 44px);
  color: rgba(34, 34, 34, 0.75);
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
