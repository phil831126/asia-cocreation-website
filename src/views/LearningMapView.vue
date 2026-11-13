<script setup lang="ts">
/*
 * 學習地圖：大標與副標下方是學習行銷的七大主題、培訓案例。
 * （成果數據 Dashboard 已移到實務總覽頁；「從自媒體課堂開始的學習旅程」與「課程發展歷程」在關於亞創頁）
 */
import PageHeader from '@/components/PageHeader.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import AboutCases from '@/components/about/AboutCases.vue'
import CtaBanner from '@/components/CtaBanner.vue'
import { anchors, topics } from '@/data/courseMap'
</script>

<template>
  <div class="page">
    <PageHeader
      eyebrow="Learning Map"
      title="學習地圖"
      desc="從觀念到實作，整理亞洲共創累計的開課成果與學習行銷的七大主題，幫助你找到適合自己的學習起點。"
      :crumbs="[{ label: '學習地圖' }]"
    />

    <!-- 學習行銷的七大主題 -->
    <section :id="anchors.topics" class="section">
      <div class="container">
        <SectionHeading :title="topics.title" :desc="topics.intro" />
        <ul class="topics">
          <li
            v-for="(t, i) in topics.items"
            :key="t.key"
            v-reveal="(i % 2) * 100"
            class="topic"
            :class="{ 'topic--wide': t.wide }"
          >
            <span class="topic__icon">
              <component :is="t.icon" :size="24" :stroke-width="1.6" aria-hidden="true" />
            </span>
            <div class="topic__body">
              <h3 class="topic__title">{{ t.title }}</h3>
              <p class="topic__sub">{{ t.subtitle }}</p>
              <p v-for="(p, j) in t.paragraphs" :key="j" class="topic__text">{{ p }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- 培訓案例（文案在 about.ts 的 aboutCases） -->
    <AboutCases class="section--alt" />

    <CtaBanner />
  </div>
</template>

<style scoped>
/* ---------- 七大學習主題 ---------- */
.topics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin-top: var(--block-gap);
}

.topic {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: clamp(24px, 3vw, 34px);
  border: 1px solid var(--c-line);
  border-radius: var(--radius-lg);
  background: #fff;
  transition:
    border-color 0.3s,
    box-shadow 0.5s var(--ease-out);
}

.topic:hover {
  border-color: transparent;
  box-shadow: var(--shadow-md);
}

.topic--wide {
  grid-column: 1 / -1;
}

.topic__icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 52px;
  height: 52px;
  border-radius: var(--radius-md);
  background: var(--c-yellow-tint);
  transition: background-color 0.3s;
}

.topic:hover .topic__icon {
  background: var(--c-yellow);
}

.topic__body {
  min-width: 0;
}

.topic__title {
  padding-top: 2px;
  font-size: 1.2rem;
  letter-spacing: 0.04em;
}

/* 主題名稱下方的小標題：字級較小、顏色較淡，不搶主題名稱 */
.topic__sub {
  margin-top: 4px;
  color: var(--c-text-2);
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.topic__text {
  margin-top: 10px;
  color: var(--c-text-2);
  line-height: 1.95;
}

.topic__sub + .topic__text {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--c-line);
}

/* 跨兩欄的卡片：兩段內文並排 */
.topic--wide .topic__body {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 32px;
}

.topic--wide .topic__title,
.topic--wide .topic__sub {
  grid-column: 1 / -1;
}

/* 跨欄卡片的兩段內文並排，上方細線一起對齊 */
.topic--wide .topic__text {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--c-line);
}

/* ---------- 平板 ---------- */
@media (max-width: 960px) {
  .topics {
    grid-template-columns: minmax(0, 1fr);
  }

  .topic--wide .topic__body {
    display: block;
  }

  /* 單欄時兩段內文上下排，第二段不再加分隔線 */
  .topic--wide .topic__text + .topic__text {
    margin-top: 10px;
    padding-top: 0;
    border-top: 0;
  }
}

/* ---------- 手機 ---------- */
@media (max-width: 640px) {
  .topic {
    flex-direction: column;
    gap: 14px;
  }

  .topic__title {
    padding-top: 0;
  }
}
</style>
