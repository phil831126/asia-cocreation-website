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
    <!-- 四格數據：大字數字＋字距較寬的小標籤，下方一條裝飾底線 -->
    <dl class="dash__grid">
      <div v-for="(k, i) in kpis" :key="k.key" class="stat" :style="{ '--i': i }">
        <dt class="stat__label">{{ k.label }}</dt>
        <dd class="stat__value">
          <RollingNumber class="num stat__num" :value="k.value" :suffix="k.suffix" :active="inView" />
          <span class="sr-only">{{ k.value.toLocaleString('zh-TW') }}{{ k.suffix }} {{ k.unit }}</span>
        </dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.dash__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(16px, 2vw, 28px);
  margin: 0;
}

/* 數字在上、標籤在下（dt 在 dd 之前以維持語意） */
.stat {
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  padding-bottom: 14px;
}

/* 裝飾底線：灰色細線，左側一段品牌黃（滑鼠移入時延長） */
.stat::before,
.stat::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  border-radius: 2px;
}

.stat::before {
  right: 0;
  background: var(--c-gray-200);
}

.stat::after {
  width: 28px;
  background: var(--c-yellow);
  transition: width 0.5s var(--ease-out);
}

.stat:hover::after {
  width: 100%;
}

.stat__value {
  margin: 0;
}

.stat__num {
  /* 依畫面寬高縮放，四格並排時數字不會互相重疊 */
  font-size: clamp(24px, min(4.8vh, 2.5vw), 40px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.01em;
}

.stat__label {
  margin-top: 8px;
  color: var(--c-text-3);
  font-size: clamp(12px, 1.7vh, 13px);
  font-weight: 500;
  letter-spacing: 0.24em;
  white-space: nowrap;
}

/* 平板：四格並排，數字依寬度放大 */
@media (min-width: 640px) and (max-width: 1080px) {
  .stat__num {
    font-size: clamp(28px, 4.6vw, 40px);
  }
}

/* 手機：改為 2 × 2 */
@media (max-width: 639px) {
  .dash__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 26px;
  }

  .stat__num {
    font-size: 2.1rem;
  }

  .stat__label {
    font-size: 0.8rem;
  }
}
</style>
