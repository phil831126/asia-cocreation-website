<script setup lang="ts">
import { BrainCircuit, Megaphone, Layers, Plus } from 'lucide-vue-next'
import PageHeader from '@/components/PageHeader.vue'
import CtaBanner from '@/components/CtaBanner.vue'
import { courseCategories } from '@/data/courses'

const icons: Record<string, unknown> = { ai: BrainCircuit, marketing: Megaphone, others: Layers }
const PLACEHOLDER_SLOTS = 3
</script>

<template>
  <div class="page">
    <PageHeader
      eyebrow="Learning Map"
      title="學習地圖"
      desc="依學習需求探索專業課程領域。課程內容規劃中，將陸續更新。"
      :crumbs="[{ label: '學習地圖' }]"
    >
      <span class="pending-tag">課程內容待補</span>
    </PageHeader>

    <section class="section">
      <div class="container">
        <!-- 地圖路徑 -->
        <div v-reveal class="route" aria-hidden="true">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" class="route__line">
            <path d="M40 60 C 240 0, 360 120, 600 60 S 960 0, 1160 60" fill="none" stroke="#c9c9c6" stroke-width="2" stroke-dasharray="4 10" />
            <path class="route__glow" d="M40 60 C 240 0, 360 120, 600 60 S 960 0, 1160 60" fill="none" stroke="#F8BE20" stroke-width="3" />
          </svg>
          <span v-for="(c, i) in courseCategories" :key="c.id" class="route__stop" :style="{ left: `${[8, 50, 92][i]}%` }">
            <span class="num">{{ c.code }}</span>
          </span>
        </div>

        <div class="map">
          <article v-for="(c, i) in courseCategories" :id="c.id" :key="c.id" v-reveal="i * 120" class="cat">
            <header class="cat__head">
              <span class="cat__icon"><component :is="icons[c.id]" :size="26" :stroke-width="1.6" aria-hidden="true" /></span>
              <span class="num cat__code">{{ c.code }}</span>
            </header>
            <h2 class="cat__title">{{ c.title }}</h2>
            <p class="cat__desc">{{ c.desc }}</p>

            <ul class="cat__list">
              <template v-if="c.courses.length">
                <li v-for="course in c.courses" :key="course.title" class="course">
                  <span class="course__level">{{ course.level }}</span>
                  <h3 class="course__title">{{ course.title }}</h3>
                  <p class="course__desc">{{ course.desc }}</p>
                </li>
              </template>
              <template v-else>
                <li v-for="n in PLACEHOLDER_SLOTS" :key="n" class="course course--empty">
                  <Plus :size="16" aria-hidden="true" />
                  <span>課程 {{ n }}｜待補</span>
                </li>
              </template>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <CtaBanner />
  </div>
</template>

<style scoped>
.route {
  position: relative;
  height: 120px;
  margin-bottom: var(--space-4);
}

.route__line {
  width: 100%;
  height: 100%;
}

.route__glow {
  stroke-dasharray: 1400;
  stroke-dashoffset: 1400;
  transition: stroke-dashoffset 2.2s var(--ease-in-out) 0.3s;
}

.route.is-visible .route__glow {
  stroke-dashoffset: 0;
}

.route__stop {
  position: absolute;
  top: 50%;
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid #fff;
  box-shadow: var(--shadow-md);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  font-size: 0.85rem;
  font-weight: 700;
  transform: translate(-50%, -50%);
}

.route__stop::after {
  content: '';
  position: absolute;
  inset: 8px;
  z-index: -1;
  border-radius: 50%;
  background: var(--c-yellow);
  opacity: 0.4;
}

.map {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.cat {
  display: flex;
  flex-direction: column;
  padding: 32px;
  border-radius: var(--radius-lg);
  background: var(--c-bg-alt);
  scroll-margin-top: calc(var(--nav-h) + 24px);
}

.cat__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cat__icon {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 18px;
  background: #fff;
  box-shadow: var(--shadow-sm);
}

.cat:hover .cat__icon {
  background: var(--c-yellow);
}

.cat__code {
  font-size: 2rem;
  font-weight: 600;
  color: var(--c-gray-300);
}

.cat__title {
  margin-top: 28px;
  font-size: 1.5rem;
  letter-spacing: 0.06em;
}

.cat__desc {
  margin-top: 8px;
  color: var(--c-text-2);
}

.cat__list {
  display: grid;
  gap: 10px;
  margin-top: 28px;
}

.course {
  padding: 16px 18px;
  border-radius: var(--radius-sm);
  background: #fff;
}

.course--empty {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px dashed var(--c-gray-300);
  background: transparent;
  color: var(--c-text-3);
  font-size: 0.92rem;
}

.course__level {
  font-size: 0.78rem;
  color: var(--c-text-3);
}

.course__title {
  font-size: 1.05rem;
}

.course__desc {
  font-size: 0.9rem;
  color: var(--c-text-2);
}

@media (max-width: 960px) {
  .route {
    display: none;
  }

  .map {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .cat {
    padding: 26px;
  }
}
</style>
