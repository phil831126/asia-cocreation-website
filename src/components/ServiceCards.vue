<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import SectionHeading from './SectionHeading.vue'
import ServiceIcon from './ServiceIcon.vue'
import { services } from '@/data/services'
import { servicesSection as copy } from '@/data/home'
</script>

<template>
  <section id="services" class="section svc">
    <div class="container">
      <SectionHeading :eyebrow="copy.eyebrow" :title="copy.title" :highlight="copy.highlight" :desc="copy.desc" />

      <ul class="svc__grid">
        <li v-for="(s, i) in services" :key="s.id" v-reveal="i * 120">
          <article class="card" :class="`card--${i + 1}`">
            <div class="card__top">
              <span class="num card__no">{{ s.no }}</span>
              <span class="card__icon"><ServiceIcon :name="s.icon" :size="26" /></span>
            </div>
            <h3 class="card__title">{{ s.title }}</h3>
            <p class="card__summary">{{ s.summary }}</p>
            <ul class="card__points">
              <li v-for="p in s.points" :key="p">{{ p }}</li>
            </ul>
            <div class="card__foot">
              <span v-if="s.pending" class="pending-tag">內容待企業補充</span>
              <RouterLink :to="`/about#service-${s.id}`" class="link-arrow card__link">
                了解更多<span class="sr-only">：{{ s.title }}</span>
                <ArrowRight :size="16" aria-hidden="true" />
              </RouterLink>
            </div>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.svc__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: var(--space-6);
}

.svc__grid > li {
  display: flex;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 36px 32px 30px;
  border-radius: var(--radius-lg);
  border: 1px solid transparent;
  overflow: hidden;
  transition:
    transform 0.5s var(--ease-out),
    box-shadow 0.5s var(--ease-out),
    background-color 0.4s,
    border-color 0.4s;
}

/* 以白、灰、黃建立層次 */
.card--1 {
  background: #fff;
  border-color: var(--c-line);
}

.card--2 {
  background: var(--c-bg-alt);
}

.card--3 {
  background: linear-gradient(160deg, var(--c-yellow-tint), #fff 85%);
  border-color: rgba(248, 190, 32, 0.35);
}

.card::before {
  content: '';
  position: absolute;
  right: -40px;
  bottom: -40px;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 1px solid var(--c-line);
  box-shadow:
    0 0 0 24px rgba(136, 136, 136, 0.04),
    0 0 0 48px rgba(136, 136, 136, 0.03);
  transition: transform 0.7s var(--ease-out);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
  border-color: transparent;
}

.card:hover::before {
  transform: scale(1.25);
}

.card__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.card__no {
  font-size: 3.2rem;
  font-weight: 300;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px var(--c-gray);
  transition: color 0.4s;
}

.card:hover .card__no {
  color: var(--c-text);
  -webkit-text-stroke-color: var(--c-text);
}

.card__icon {
  display: grid;
  place-items: center;
  width: 58px;
  height: 58px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: var(--shadow-sm);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  transition:
    background-color 0.4s,
    transform 0.5s var(--ease-out);
}

.card:hover .card__icon {
  background: var(--c-yellow);
  transform: rotate(-8deg);
}

.card__title {
  margin-top: 40px;
  font-size: 1.6rem;
  letter-spacing: 0.08em;
}

.card__summary {
  margin-top: 14px;
  color: var(--c-text-2);
}

.card__points {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 22px;
}

.card__points li {
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid var(--c-line-strong);
  font-size: 0.85rem;
  color: var(--c-text-2);
  background: rgba(255, 255, 255, 0.6);
}

.card__foot {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: auto;
  padding-top: 32px;
}

.card__link {
  margin-left: auto;
}

@media (max-width: 960px) {
  .svc__grid {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-top: var(--space-5);
  }

  .card {
    padding: 28px 24px 24px;
  }

  .card__title {
    margin-top: 24px;
  }
}
</style>
