<script setup lang="ts">
/* SECTION 02｜創辦人的故事：桌機交錯式時間軸，平板與手機改為單欄 */
import SectionHeading from '@/components/SectionHeading.vue'
import AboutPhoto from './AboutPhoto.vue'
import { aboutStory as copy, type AboutImage } from '@/data/about'

const isYear = (label: string) => /^\d{4}$/.test(label)
const isPortrait = (img: AboutImage) => img.width < img.height
</script>

<template>
  <section class="section section--alt story" aria-labelledby="story-title">
    <div class="container">
      <SectionHeading id="story-title" :eyebrow="copy.eyebrow" :title="copy.title" />

      <ol class="story__list">
        <li
          v-for="(c, i) in copy.chapters"
          :key="c.title"
          v-reveal
          class="story__item"
          :class="i % 2 === 0 ? 'story__item--left' : 'story__item--right'"
        >
          <span class="story__node" aria-hidden="true"></span>

          <div class="story__card">
            <span class="story__label" :class="{ num: isYear(c.label) }">{{ c.label }}</span>
            <h3 class="story__title">{{ c.title }}</h3>
            <p v-for="(p, j) in c.paragraphs" :key="j" class="story__text">{{ p }}</p>
          </div>

          <div
            class="story__aside"
            :class="{ 'story__aside--photo': c.image, 'story__aside--portrait': c.image && isPortrait(c.image) }"
          >
            <AboutPhoto v-if="c.image" :image="c.image" :ratio="isPortrait(c.image) ? '4 / 5' : '4 / 3'" />
            <span v-else-if="isYear(c.label)" class="num story__bigyear" aria-hidden="true">{{ c.label }}</span>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.story__list {
  --rail-w: 72px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: clamp(36px, 5vw, 56px);
  margin-top: calc(var(--block-gap) + 12px);
}

/* 中央細線 */
.story__list::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 8px;
  bottom: 8px;
  width: 1px;
  background: var(--c-gray-300);
  transform: translateX(-50%);
}

.story__item {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) var(--rail-w) minmax(0, 1fr);
  align-items: start;
}

.story__node {
  grid-column: 2;
  grid-row: 1;
  justify-self: center;
  width: 16px;
  height: 16px;
  margin-top: 30px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--c-gray-300);
  transition:
    background-color 0.6s var(--ease-out) 0.3s,
    border-color 0.6s var(--ease-out) 0.3s,
    box-shadow 0.6s var(--ease-out) 0.3s;
}

/* 捲到這一段時，節點亮起 */
.story__item.is-visible .story__node {
  background: var(--c-yellow);
  border-color: var(--c-yellow);
  box-shadow: 0 0 0 7px rgba(248, 190, 32, 0.22);
}

.story__item--left .story__card {
  grid-column: 1;
}

.story__item--left .story__aside {
  grid-column: 3;
  justify-self: start;
}

.story__item--right .story__card {
  grid-column: 3;
}

.story__item--right .story__aside {
  grid-column: 1;
  justify-self: end;
}

.story__card,
.story__aside {
  grid-row: 1;
}

.story__card {
  padding: clamp(24px, 2.6vw, 34px);
  border-radius: var(--radius-lg);
  background: #fff;
  box-shadow: var(--shadow-sm);
  transition:
    box-shadow 0.5s var(--ease-out),
    transform 0.5s var(--ease-out);
}

.story__card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
}

.story__label {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 999px;
  background: var(--c-yellow);
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.story__title {
  margin-top: 16px;
  font-size: clamp(1.15rem, 1.6vw, 1.32rem);
  line-height: 1.55;
  letter-spacing: 0.02em;
}

.story__text {
  margin-top: 12px;
  color: var(--c-text-2);
  line-height: 2;
}

.story__aside--photo {
  width: min(100%, 380px);
  padding-top: 6px;
}

/* 直式人像照片窄一點，避免撐高這一段 */
.story__aside--portrait {
  width: min(100%, 260px);
}

/* 沒有照片的年份：以大字裝飾 */
.story__bigyear {
  display: block;
  padding-top: 4px;
  font-size: clamp(4rem, 8vw, 6.5rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.02em;
  color: transparent;
  -webkit-text-stroke: 1.5px var(--c-gray-300);
}

/* ---------- 平板與手機：線在左側的單欄時間軸 ---------- */
@media (max-width: 1023px) {
  .story__list {
    --rail-w: 36px;
    gap: 32px;
  }

  .story__list::before {
    left: calc(var(--rail-w) / 2);
  }

  .story__item {
    grid-template-columns: var(--rail-w) minmax(0, 1fr);
    column-gap: 12px;
  }

  .story__node {
    grid-column: 1;
    margin-top: 28px;
  }

  .story__item--left .story__card,
  .story__item--right .story__card {
    grid-column: 2;
  }

  .story__item--left .story__aside,
  .story__item--right .story__aside {
    grid-column: 2;
    grid-row: 2;
    justify-self: start;
  }

  .story__aside--photo {
    width: min(100%, 420px);
    padding-top: 16px;
  }

  .story__aside--portrait {
    width: min(100%, 240px);
  }

  .story__bigyear {
    display: none;
  }
}

@media (max-width: 767px) {
  .story__list {
    --rail-w: 20px;
  }

  .story__item {
    column-gap: 14px;
  }

  .story__node {
    width: 14px;
    height: 14px;
    margin-top: 26px;
  }

  .story__card {
    padding: 22px 20px;
  }

  .story__text {
    font-size: 0.98rem;
    line-height: 1.95;
  }
}
</style>
