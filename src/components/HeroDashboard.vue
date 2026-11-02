<script setup lang="ts">
import { ref } from 'vue'
import { BookOpen, GraduationCap, Users, Handshake } from '@lucide/vue'
import RollingNumber from './RollingNumber.vue'
import { kpis } from '@/data/dashboard'
import { dashboardCopy } from '@/data/home'
import { useInView } from '@/composables/motion'

const panel = ref<HTMLElement | null>(null)
const inView = useInView(panel, 0.2)

const kpiIcons: Record<string, unknown> = { courses: BookOpen, learners: GraduationCap, teachers: Users, partners: Handshake }
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

      <dl class="kpis">
        <div v-for="(k, i) in kpis" :key="k.key" class="kpi" :class="{ 'kpi--featured': i === 0 }">
          <dt class="kpi__label">
            <component :is="kpiIcons[k.key]" :size="16" aria-hidden="true" />
            {{ k.label }}
          </dt>
          <dd class="kpi__value">
            <RollingNumber class="num kpi__num" :value="k.value" :suffix="k.suffix" :active="inView" />
            <span class="kpi__unit" aria-hidden="true">{{ k.unit }}</span>
            <span class="sr-only">逾 {{ k.value.toLocaleString('zh-TW') }} {{ k.unit }}</span>
          </dd>
          <dd class="kpi__note">{{ k.note }}</dd>
        </div>
      </dl>
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
  height: 80%;
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
  margin-bottom: 18px;
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

.kpis {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 0;
}

.kpi {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 22px 20px;
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
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.72);
}

.kpi--featured .kpi__label {
  color: rgba(34, 34, 34, 0.75);
}

.kpi__value {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin: 6px 0 0;
}

.kpi__num {
  font-size: clamp(2.1rem, 3.4vw, 3rem);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.01em;
}

.kpi__unit {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
}

.kpi--featured .kpi__unit {
  color: rgba(34, 34, 34, 0.75);
}

.kpi__note {
  margin: 0;
  font-size: 0.78rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.55);
}

.kpi--featured .kpi__note {
  color: rgba(34, 34, 34, 0.7);
}

@media (max-width: 560px) {
  .dash__panel {
    padding: 16px;
  }

  .kpi {
    padding: 16px 14px;
  }
}
</style>
