<script setup lang="ts">
import { ref } from 'vue'
import { BookOpen, GraduationCap, Users, Handshake, Compass, Megaphone, Smartphone } from '@lucide/vue'
import { kpis, learnersFootnote, focusAreas, coreBusiness, partnerNames } from '@/data/dashboard'
import { dashboardCopy } from '@/data/home'
import { useCountUp, useInView } from '@/composables/motion'

const panel = ref<HTMLElement | null>(null)
const inView = useInView(panel, 0.2)
const counts = kpis.map((k) => useCountUp(k.value, inView, 1800))

const kpiIcons: Record<string, unknown> = { courses: BookOpen, learners: GraduationCap, teachers: Users, partners: Handshake }
const focusIcons = [Compass, Megaphone, Smartphone]
const allPartners = [...partnerNames.public, ...partnerNames.business]
</script>

<template>
  <div ref="panel" class="dash">
    <span class="dash__glow" aria-hidden="true"></span>

    <section class="dash__panel" aria-labelledby="dash-title">
      <header class="dash__head">
        <h2 id="dash-title" class="dash__title">
          <span class="dash__live" aria-hidden="true"></span>{{ dashboardCopy.title }}
        </h2>
        <span class="dash__badge">{{ dashboardCopy.badge }}</span>
      </header>

      <!-- 核心數據 -->
      <dl class="kpis">
        <div v-for="(k, i) in kpis" :key="k.key" class="kpi" :class="{ 'kpi--featured': i === 0 }">
          <dt class="kpi__label">
            <component :is="kpiIcons[k.key]" :size="16" aria-hidden="true" />
            {{ k.label }}<sup v-if="k.footnote" aria-hidden="true">*</sup>
          </dt>
          <dd class="kpi__value">
            <span class="num kpi__num" aria-hidden="true">{{ counts[i].value.toLocaleString('zh-TW') }}{{ k.suffix }}</span>
            <span class="kpi__unit" aria-hidden="true">{{ k.unit }}</span>
            <span class="sr-only">逾 {{ k.value.toLocaleString('zh-TW') }} {{ k.unit }}</span>
          </dd>
          <dd class="kpi__note">{{ k.note }}</dd>
        </div>
      </dl>

      <!-- 發展主軸 -->
      <div class="dash__block">
        <h3 class="dash__label">發展主軸</h3>
        <ul class="focus">
          <li v-for="(f, i) in focusAreas" :key="f">
            <component :is="focusIcons[i]" :size="16" aria-hidden="true" />{{ f }}
          </li>
        </ul>
      </div>

      <!-- 核心業務 -->
      <div class="dash__block">
        <h3 class="dash__label">核心業務</h3>
        <ul class="biz">
          <li v-for="b in coreBusiness" :key="b">{{ b }}</li>
        </ul>
      </div>

      <!-- 合作單位（部分） -->
      <div class="dash__block">
        <h3 class="dash__label">合作單位（部分）</h3>
        <div class="ticker">
          <ul v-for="n in 2" :key="n" class="ticker__group" :aria-hidden="n === 2 ? 'true' : undefined">
            <li v-for="p in allPartners" :key="p">{{ p }}</li>
          </ul>
        </div>
      </div>

      <p class="dash__foot"><span aria-hidden="true">* </span>{{ learnersFootnote }}</p>
    </section>
  </div>
</template>

<style scoped>
.dash {
  position: relative;
  width: 100%;
  animation: dash-float 10s ease-in-out infinite;
}

@keyframes dash-float {
  50% {
    transform: translateY(-8px);
  }
}

.dash__glow {
  position: absolute;
  left: 10%;
  top: 6%;
  z-index: -1;
  width: 70%;
  height: 60%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(248, 190, 32, 0.35), transparent 70%);
  filter: blur(40px);
  pointer-events: none;
}

.dash__panel {
  position: relative;
  padding: 22px;
  border-radius: var(--radius-lg);
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.03));
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow:
    0 30px 60px -30px rgba(0, 0, 0, 0.8),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
  -webkit-backdrop-filter: blur(20px) saturate(140%);
  backdrop-filter: blur(20px) saturate(140%);
  color: #fff;
}

.dash__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.dash__title {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  letter-spacing: 0.12em;
}

.dash__live {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--c-yellow);
  box-shadow: 0 0 0 0 rgba(248, 190, 32, 0.6);
  animation: live 2.4s ease-out infinite;
}

@keyframes live {
  70%,
  100% {
    box-shadow: 0 0 0 8px rgba(248, 190, 32, 0);
  }
}

.dash__badge {
  padding: 3px 12px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.7);
}

/* KPI */
.kpis {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 0;
}

.kpi {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 14px 16px;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition:
    background-color 0.3s,
    transform 0.4s var(--ease-out);
}

.kpi:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.kpi--featured {
  background: linear-gradient(140deg, #ffd24d, var(--c-yellow) 55%, #eaa900);
  border-color: transparent;
  color: var(--c-text);
}

.kpi--featured:hover {
  background: linear-gradient(140deg, #ffd960, #ffc62e 55%, #f0b000);
}

.kpi__label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.72);
}

.kpi--featured .kpi__label {
  color: rgba(34, 34, 34, 0.75);
}

.kpi__value {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin: 2px 0 0;
}

.kpi__num {
  font-size: clamp(1.9rem, 3vw, 2.6rem);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.01em;
}

.kpi__unit {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.kpi--featured .kpi__unit {
  color: rgba(34, 34, 34, 0.75);
}

.kpi__note {
  margin: 0;
  font-size: 0.76rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.55);
}

.kpi--featured .kpi__note {
  color: rgba(34, 34, 34, 0.7);
}

/* 區塊 */
.dash__block {
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.dash__label {
  margin-bottom: 10px;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  color: rgba(255, 255, 255, 0.55);
}

.focus {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.focus li {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 9px 6px;
  border-radius: var(--radius-sm);
  background: rgba(248, 190, 32, 0.12);
  border: 1px solid rgba(248, 190, 32, 0.3);
  font-size: 0.88rem;
  font-weight: 500;
  color: #ffe08a;
  white-space: nowrap;
}

.biz {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.biz li {
  padding: 4px 11px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.82);
}

/* 合作單位跑動列 */
.ticker {
  display: flex;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
}

.ticker__group {
  display: flex;
  flex: none;
  gap: 22px;
  padding-right: 22px;
  animation: ticker 40s linear infinite;
}

.ticker:hover .ticker__group {
  animation-play-state: paused;
}

.ticker__group li {
  position: relative;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.78);
  white-space: nowrap;
}

.ticker__group li::after {
  content: '';
  position: absolute;
  right: -13px;
  top: 50%;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--c-yellow);
  transform: translateY(-50%);
}

@keyframes ticker {
  to {
    transform: translateX(-100%);
  }
}

.dash__foot {
  margin-top: 14px;
  font-size: 0.72rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 560px) {
  .dash__panel {
    padding: 16px;
  }

  .kpi {
    padding: 14px;
  }

  .focus li {
    font-size: 0.8rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ticker {
    flex-wrap: wrap;
    -webkit-mask-image: none;
    mask-image: none;
  }

  .ticker__group {
    flex-wrap: wrap;
    gap: 6px 22px;
    animation: none !important;
  }

  .ticker__group[aria-hidden='true'] {
    display: none;
  }
}
</style>
