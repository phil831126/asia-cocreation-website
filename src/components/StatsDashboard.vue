<script setup lang="ts">
import SectionHeading from './SectionHeading.vue'
import StatCard from './StatCard.vue'
import { stats } from '@/data/stats'
import { statsSection as copy } from '@/data/home'
</script>

<template>
  <section id="achievements" class="section section--alt dash">
    <div class="dash__dots" aria-hidden="true"></div>
    <div class="container">
      <div class="dash__head">
        <SectionHeading :eyebrow="copy.eyebrow" :title="copy.title" :highlight="copy.highlight" />
        <p v-reveal="160" class="dash__desc">{{ copy.desc }}</p>
      </div>
      <div class="dash__grid">
        <div v-for="(s, i) in stats" :key="s.key" v-reveal="i * 120">
          <StatCard :stat="s" :index="i" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dash {
  overflow: hidden;
}

/* 範例 3：黃色漸層點陣 */
.dash__dots {
  position: absolute;
  right: -80px;
  top: -40px;
  width: 520px;
  height: 420px;
  background-image: radial-gradient(rgba(224, 165, 0, 0.55) 1.4px, transparent 1.6px);
  background-size: 16px 16px;
  -webkit-mask-image: radial-gradient(closest-side, #000, transparent);
  mask-image: radial-gradient(closest-side, #000, transparent);
  opacity: 0.6;
  pointer-events: none;
}

.dash__head {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  align-items: end;
  gap: 40px;
  margin-bottom: var(--space-6);
}

.dash__desc {
  color: var(--c-text-2);
  font-size: 1.04rem;
}

.dash__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 960px) {
  .dash__head {
    grid-template-columns: 1fr;
    gap: 18px;
    margin-bottom: var(--space-5);
  }

  .dash__grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

@media (min-width: 640px) and (max-width: 960px) {
  .dash__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .dash__grid > :last-child {
    grid-column: 1 / -1;
  }
}
</style>
