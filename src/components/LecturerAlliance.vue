<script setup lang="ts">
import { ref } from 'vue'
import { UserRound, ArrowRight } from '@lucide/vue'
import SectionHeading from './SectionHeading.vue'
import { useLecturers } from '@/composables/sheetData'
import { lecturersSection as copy } from '@/data/home'

const { featured: lecturers, loading } = useLecturers()

/** 照片網址失效時改顯示預設頭像 */
const broken = ref(new Set<string>())
const markBroken = (id: string) => (broken.value = new Set(broken.value).add(id))
</script>

<template>
  <section id="lecturers" class="section section--alt la">
    <div class="container">
      <SectionHeading :eyebrow="copy.eyebrow" :title="copy.title" :highlight="copy.highlight" :desc="copy.desc" />

      <!-- 載入中：先放三張空白卡片，避免版面跳動 -->
      <ul v-if="loading" class="la__grid" aria-hidden="true">
        <li v-for="n in 3" :key="n">
          <article class="lc lc--loading">
            <div class="lc__photo"><div class="lc__ph"></div></div>
            <p class="lc__name">&nbsp;</p>
          </article>
        </li>
      </ul>

      <ul v-else class="la__grid">
        <li v-for="(l, i) in lecturers" :key="l.id" v-reveal="i * 120">
          <article class="lc">
            <div class="lc__photo">
              <img
                v-if="l.photo && !broken.has(l.id)"
                :src="l.photo"
                :alt="`${l.name} 照片`"
                loading="lazy"
                @error="markBroken(l.id)"
              />
              <div v-else class="lc__ph" role="img" aria-label="講師照片（待補）">
                <UserRound :size="52" :stroke-width="1.3" aria-hidden="true" />
              </div>
            </div>
            <h3 class="lc__name">{{ l.name }}</h3>
            <p class="lc__title">{{ l.title }}</p>
            <p class="lc__field">{{ l.field }}</p>
          </article>
        </li>
      </ul>

      <p class="la__more">
        <RouterLink to="/lecturers" class="link-arrow">查看全部講師 <ArrowRight :size="16" aria-hidden="true" /></RouterLink>
      </p>
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
  align-items: center;
  width: 100%;
  padding: clamp(24px, 4vh, 40px) 24px;
  border-radius: var(--radius-lg);
  background: #fff;
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition:
    transform 0.5s var(--ease-out),
    box-shadow 0.5s var(--ease-out);
}

.lc:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
}

/* 圓形照片，外圈一道品牌黃 */
.lc__photo {
  width: clamp(108px, 18vh, 156px);
  aspect-ratio: 1;
  padding: 5px;
  /* 照片比例不一（例如直式照片）時，外框仍維持正圓 */
  min-height: 0;
  overflow: hidden;
  border-radius: 50%;
  background: conic-gradient(from 200deg, var(--c-yellow), #ffe08a, var(--c-yellow-deep), var(--c-yellow));
  transition: transform 0.5s var(--ease-out);
}

.lc:hover .lc__photo {
  transform: scale(1.04);
}

.lc__photo img,
.lc__ph {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4px solid #fff;
  object-fit: cover;
}

.lc__ph {
  display: grid;
  place-items: center;
  color: var(--c-gray);
  background: linear-gradient(160deg, #f4f4f1, #e3e3df);
}

.lc__name {
  margin-top: 20px;
  font-size: 1.2rem;
  letter-spacing: 0.04em;
}

.lc__title {
  margin-top: 4px;
  font-size: 0.92rem;
  color: var(--c-text-2);
}

.lc__field {
  margin-top: 12px;
  padding: 4px 14px;
  border-radius: 999px;
  background: var(--c-yellow-tint);
  font-size: 0.86rem;
  font-weight: 600;
  letter-spacing: 0.06em;
}

.lc--loading {
  opacity: 0.55;
}

.lc--loading:hover {
  transform: none;
  box-shadow: var(--shadow-sm);
}

.la__more {
  margin-top: clamp(16px, 3vh, 28px);
  text-align: center;
}

@media (max-width: 960px) {
  .la__grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

@media (min-width: 640px) and (max-width: 960px) {
  .la__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
