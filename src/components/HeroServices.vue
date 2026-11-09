<script setup lang="ts">
/*
 * 首頁 Hero 左下：「服務項目」四張圖卡（2 × 2）：教育培訓、講師顧問聯盟、講師經紀、合作單位
 * 內容在 src/data/home.ts 的 quickGuide。
 * 桌機畫面高度不足時隱藏簡介，只留標題與分類標籤，讓 Hero 維持在第一個畫面內。
 */
import { ArrowUpRight } from '@lucide/vue'
import { quickGuide } from '@/data/home'
</script>

<template>
  <ul class="hs" aria-label="服務項目">
    <li v-for="(s, i) in quickGuide" :key="s.key" class="hs__item">
      <RouterLink :to="s.to" class="hs__card" :class="`hs__card--${i + 1}`">
        <div class="hs__head">
          <span class="hs__icon"><component :is="s.icon" :size="20" :stroke-width="1.6" aria-hidden="true" /></span>
          <h2 class="hs__title">{{ s.title }}</h2>
          <span class="num hs__no" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          <ArrowUpRight class="hs__arrow" :size="18" aria-hidden="true" />
        </div>
        <p class="hs__summary">{{ s.summary }}</p>
        <ul class="hs__points">
          <li v-for="p in s.points" :key="p">{{ p }}</li>
        </ul>
      </RouterLink>
    </li>
  </ul>
</template>

<style scoped>
.hs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.hs__item {
  display: flex;
}

.hs__card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 14px 14px 15px;
  border-radius: var(--radius-lg);
  border: 1px solid transparent;
  overflow: hidden;
  transition:
    transform 0.5s var(--ease-out),
    box-shadow 0.5s var(--ease-out),
    border-color 0.4s;
}

/* 與原本的服務卡片相同：以白、灰、黃建立層次 */
.hs__card--1 {
  background: #fff;
  border-color: var(--c-line);
}

.hs__card--2,
.hs__card--4 {
  background: var(--c-bg-alt);
}

.hs__card--3 {
  background: linear-gradient(160deg, var(--c-yellow-tint), #fff 85%);
  border-color: rgba(248, 190, 32, 0.35);
}

.hs__card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: transparent;
}

.hs__head {
  display: flex;
  align-items: center;
  gap: 10px;
}

.hs__icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 38px;
  height: 38px;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: var(--shadow-sm);
  transition:
    background-color 0.4s,
    transform 0.5s var(--ease-out);
}

.hs__card:hover .hs__icon {
  background: var(--c-yellow);
  transform: rotate(-8deg);
}

.hs__title {
  font-size: 1.08rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

/* 右上角：平常顯示編號，滑鼠移入時換成箭頭 */
.hs__no,
.hs__arrow {
  margin-left: auto;
  transition:
    opacity 0.3s,
    transform 0.4s var(--ease-out);
}

.hs__no {
  font-size: 1.3rem;
  font-weight: 300;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px var(--c-gray);
}

.hs__arrow {
  position: absolute;
  top: 24px;
  right: 14px;
  opacity: 0;
  transform: translate(-4px, 4px);
}

.hs__card:hover .hs__no {
  opacity: 0;
}

.hs__card:hover .hs__arrow {
  opacity: 1;
  transform: none;
}

.hs__summary {
  margin-top: 10px;
  color: var(--c-text-2);
  font-size: 0.88rem;
  line-height: 1.75;
}

.hs__points {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: auto;
  padding-top: 10px;
}

.hs__points li {
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid var(--c-line-strong);
  background: rgba(255, 255, 255, 0.6);
  color: var(--c-text-2);
  font-size: 0.75rem;
  white-space: nowrap;
}

/* 桌機畫面高度不足：隱藏簡介，只留標題與標籤 */
@media (min-width: 1081px) and (max-height: 879px) {
  .hs__summary {
    display: none;
  }
}

/* 手機：單欄 */
@media (max-width: 600px) {
  .hs {
    grid-template-columns: minmax(0, 1fr);
  }

  .hs__card {
    padding: 16px 18px 18px;
  }
}
</style>
