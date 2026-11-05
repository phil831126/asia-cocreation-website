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
    <!-- 四顆等大的毛玻璃圓球，一上一下錯落；第一顆（累計開課）為品牌黃 -->
    <dl class="dash__orbs">
      <div v-for="(k, i) in kpis" :key="k.key" class="orb" :class="{ 'orb--main': i === 0 }" :style="{ '--i': i }">
        <dt class="orb__label">{{ k.label }}<template v-if="i === 0">（{{ k.unit }}）</template></dt>
        <dd class="orb__value">
          <component :is="icons[k.key]" class="orb__icon" :size="18" :stroke-width="1.8" aria-hidden="true" />
          <RollingNumber class="num orb__num" :value="k.value" :suffix="k.suffix" :active="inView" />
          <span class="sr-only">逾 {{ k.value.toLocaleString('zh-TW') }} {{ k.unit }}</span>
        </dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.dash {
  --orb: clamp(72px, 17vh, 116px);
}

.dash__orbs {
  display: flex;
  gap: 16px;
  margin: 0;
}

/* 淺色毛玻璃圓：無外框，以內側光暈表現玻璃感 */
.orb {
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  flex: none;
  width: var(--orb);
  height: var(--orb);
  border-radius: 50%;
  text-align: center;
  color: var(--c-text);
  background: radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.95), rgba(246, 245, 240, 0.85) 55%, rgba(233, 231, 224, 0.8));
  box-shadow:
    inset 0 10px 20px rgba(255, 255, 255, 0.9),
    inset 0 -14px 26px rgba(120, 110, 80, 0.12),
    0 18px 30px -16px rgba(80, 70, 40, 0.45);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  animation: orb-float 9s ease-in-out infinite;
  animation-delay: calc(var(--i) * -2s);
}

/* 上下錯落 */
.orb:nth-child(odd) {
  top: -3.4vh;
}

.orb:nth-child(even) {
  top: 2.4vh;
}

/* 左上的玻璃反光 */
.orb::before {
  content: '';
  position: absolute;
  left: 18%;
  top: 10%;
  z-index: -1;
  width: 44%;
  height: 24%;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(255, 255, 255, 0.9), transparent 70%);
  pointer-events: none;
}

@keyframes orb-float {
  50% {
    transform: translateY(-6px);
  }
}

.orb--main {
  background: radial-gradient(circle at 30% 25%, rgba(255, 226, 130, 0.95), rgba(248, 190, 32, 0.8) 55%, rgba(224, 165, 0, 0.7));
}

.orb__value {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
}

.orb__icon {
  color: rgba(34, 34, 34, 0.7);
}

.orb__num {
  margin-top: 4px;
  font-size: clamp(15px, 3.5vh, 24px);
  font-weight: 600;
  line-height: 1.15;
}

/* 標籤：粗體，維持比上方數字小 */
.orb__label {
  margin-top: 2px;
  font-size: clamp(11px, 1.9vh, 13px);
  font-weight: 700;
  color: rgba(34, 34, 34, 0.8);
  white-space: nowrap;
}

/* 平板與手機：改成置中的 2×2，不錯落 */
@media (max-width: 1080px) {
  .dash {
    --orb: clamp(120px, 34vw, 150px);
  }

  .dash__orbs {
    display: grid;
    grid-template-columns: repeat(2, var(--orb));
    justify-content: center;
  }

  .orb:nth-child(odd),
  .orb:nth-child(even) {
    top: 0;
  }

  .orb__num {
    font-size: 1.35rem;
  }

  .orb__label {
    font-size: 0.8rem;
  }
}

@media (min-width: 640px) and (max-width: 1080px) {
  .dash {
    --orb: clamp(110px, 18vw, 140px);
  }

  .dash__orbs {
    grid-template-columns: repeat(4, var(--orb));
  }
}
</style>
