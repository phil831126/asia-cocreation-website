<script setup lang="ts">
import { UserRound } from '@lucide/vue'
import SectionHeading from './SectionHeading.vue'
import { lecturers } from '@/data/lecturers'
import { lecturersSection as copy } from '@/data/home'
</script>

<template>
  <section id="lecturers" class="section section--alt la">
    <div class="container">
      <SectionHeading :eyebrow="copy.eyebrow" :title="copy.title" :highlight="copy.highlight" :desc="copy.desc" />

      <ul class="la__grid">
        <li v-for="(l, i) in lecturers" :key="l.id" v-reveal="i * 120">
          <article class="lc">
            <div class="lc__photo">
              <img v-if="l.photo" :src="l.photo" :alt="`${l.name} 照片`" loading="lazy" />
              <div v-else class="lc__ph" role="img" aria-label="講師照片（待補）">
                <UserRound :size="56" :stroke-width="1.3" aria-hidden="true" />
                <span class="lc__ph-label">講師照片｜待補</span>
              </div>
              <span class="lc__field">{{ l.field }}</span>
            </div>

            <div class="lc__body">
              <header class="lc__head">
                <div>
                  <h3 class="lc__name">{{ l.name }}</h3>
                  <p class="lc__title">{{ l.title }}</p>
                </div>
                <span v-if="l.placeholder" class="pending-tag">示意內容</span>
              </header>

              <div class="lc__block">
                <h4 class="lc__label">經歷</h4>
                <ul class="lc__exp">
                  <li v-for="e in l.experience" :key="e">{{ e }}</li>
                </ul>
              </div>

              <div class="lc__block">
                <h4 class="lc__label">專業領域</h4>
                <ul class="lc__tags">
                  <li v-for="t in l.expertise" :key="t" :class="{ 'is-pending': t.includes('待補') }">{{ t }}</li>
                </ul>
              </div>
            </div>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.la__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: var(--block-gap);
}

.la__grid > li {
  display: flex;
}

.lc {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: var(--radius-lg);
  background: #fff;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition:
    transform 0.5s var(--ease-out),
    box-shadow 0.5s var(--ease-out);
}

.lc:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
}

/* 照片 */
.lc__photo {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--c-gray-100);
}

.lc__photo img,
.lc__ph {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s var(--ease-out);
}

.lc:hover .lc__photo img,
.lc:hover .lc__ph {
  transform: scale(1.05);
}

.lc__ph {
  display: grid;
  place-items: center;
  align-content: center;
  gap: 8px;
  color: var(--c-gray);
  background:
    radial-gradient(circle at 70% 20%, rgba(248, 190, 32, 0.28), transparent 45%),
    linear-gradient(160deg, #f4f4f1, #e6e6e2);
}

.lc__ph-label {
  padding: 2px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.85);
  font-size: 0.75rem;
  color: var(--c-text-2);
}

.lc__field {
  position: absolute;
  left: 14px;
  top: 14px;
  padding: 4px 12px;
  border-radius: 999px;
  background: var(--c-yellow);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

/* 內容 */
.lc__body {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px 22px 22px;
}

.lc__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}

.lc__name {
  font-size: 1.2rem;
  letter-spacing: 0.04em;
}

.lc__title {
  margin-top: 2px;
  font-size: 0.88rem;
  color: var(--c-text-2);
}

.lc__block {
  padding-top: 12px;
  border-top: 1px solid var(--c-line);
}

.lc__label {
  margin-bottom: 6px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--c-text-3);
}

.lc__exp li {
  position: relative;
  padding-left: 14px;
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--c-text-2);
}

.lc__exp li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.75em;
  width: 6px;
  height: 2px;
  background: var(--c-yellow-deep);
}

.lc__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.lc__tags li {
  padding: 3px 12px;
  border-radius: 999px;
  background: var(--c-yellow-tint);
  font-size: 0.82rem;
  font-weight: 500;
}

.lc__tags li.is-pending {
  background: transparent;
  border: 1px dashed var(--c-gray-300);
  color: var(--c-text-3);
  font-weight: 400;
}

/* 桌面：照片高度跟著畫面高度縮放，讓整區放進一個畫面 */
@media (min-width: 1024px) {
  .lc__photo {
    aspect-ratio: auto;
    height: clamp(120px, 20vh, 210px);
  }
}

@media (min-width: 1024px) and (max-height: 760px) {
  .lc__body {
    gap: 10px;
    padding: 16px 20px 18px;
  }

  .lc__block {
    padding-top: 8px;
  }

  .lc__exp li {
    font-size: 0.85rem;
    line-height: 1.6;
  }
}

@media (max-width: 960px) {
  .la__grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

@media (min-width: 640px) and (max-width: 960px) {
  .la__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
