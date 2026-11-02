<script setup lang="ts">
import { computed, ref } from 'vue'
import { GraduationCap, Landmark, Building2 } from '@lucide/vue'
import { useCountUp, useInView } from '@/composables/motion'
import type { StatItem } from '@/data/stats'

const props = defineProps<{ stat: StatItem; index: number }>()

const el = ref<HTMLElement | null>(null)
const inView = useInView(el, 0.4)
const count = useCountUp(props.stat.value, inView)

const icons = { academia: GraduationCap, government: Landmark, enterprise: Building2 } as const
const icon = computed(() => icons[props.stat.key as keyof typeof icons] ?? Landmark)
const hasValue = computed(() => props.stat.value !== null)
</script>

<template>
  <article ref="el" class="stat" :class="{ 'is-pending': !hasValue }">
    <header class="stat__head">
      <span class="num stat__index">0{{ index + 1 }}</span>
      <span class="stat__icon" aria-hidden="true"><component :is="icon" :size="22" /></span>
    </header>

    <h3 class="stat__label">{{ stat.label }}</h3>

    <p class="stat__value">
      <template v-if="hasValue">
        <span class="num stat__number">{{ stat.prefix }}{{ count.toLocaleString('zh-TW') }}</span>
        <span class="stat__unit">{{ stat.unit }}</span>
      </template>
      <template v-else>
        <span class="num stat__number" aria-hidden="true">—</span>
        <span class="sr-only">數據待提供</span>
      </template>
    </p>

    <footer class="stat__foot">
      <span v-if="stat.caption" class="stat__caption">{{ stat.caption }}</span>
      <span v-else class="pending-tag">數據待提供</span>
    </footer>
    <span class="stat__bar" aria-hidden="true"></span>
  </article>
</template>

<style scoped>
.stat {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 340px;
  padding: 32px;
  border-radius: var(--radius-lg);
  background: #fff;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition:
    transform 0.5s var(--ease-out),
    box-shadow 0.5s var(--ease-out);
}

.stat:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}

.stat::after {
  content: '';
  position: absolute;
  right: -60px;
  top: -60px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(248, 190, 32, 0.22), transparent 70%);
  transition: transform 0.6s var(--ease-out);
}

.stat:hover::after {
  transform: scale(1.3);
}

.stat__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.stat__index {
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  color: var(--c-text-3);
}

.stat__icon {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--c-bg-alt);
  transition: background-color 0.3s;
}

.stat:hover .stat__icon {
  background: var(--c-yellow);
}

.stat__label {
  margin-top: 28px;
  font-size: 1.25rem;
  letter-spacing: 0.08em;
}

.stat__value {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-top: auto;
  padding-top: 24px;
}

.stat__number {
  font-size: clamp(3.6rem, 6vw, 5.2rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.02em;
}

.is-pending .stat__number {
  font-weight: 300;
  color: #b3b3b0;
}

.stat__unit {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--c-text-2);
}

.stat__foot {
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid var(--c-line);
}

.stat__caption {
  font-size: 0.92rem;
  color: var(--c-text-2);
}

.stat__bar {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 4px;
  width: 100%;
  background: var(--c-yellow);
  transform: scaleX(0.18);
  transform-origin: left;
  transition: transform 0.6s var(--ease-out);
}

.stat:hover .stat__bar {
  transform: scaleX(1);
}

@media (max-width: 768px) {
  .stat {
    min-height: 260px;
    padding: 26px;
  }
}
</style>
