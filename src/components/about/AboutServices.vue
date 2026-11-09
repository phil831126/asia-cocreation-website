<script setup lang="ts">
/*
 * SECTION 05｜合作服務：四張服務卡片，內容與首頁 Hero 的服務圖卡共用 src/data/services.ts
 * 桌機四欄、平板兩欄、手機單欄（id="services" 供首頁服務圖卡連結使用）
 */
import SectionHeading from '@/components/SectionHeading.vue'
import ServiceIcon from '@/components/ServiceIcon.vue'
import { aboutServices as copy } from '@/data/about'
import { services } from '@/data/services'
</script>

<template>
  <section id="services" class="section section--alt" aria-labelledby="services-title">
    <div class="container">
      <SectionHeading id="services-title" :eyebrow="copy.eyebrow" :title="copy.title" />

      <ul class="svc">
        <li v-for="(s, i) in services" :key="s.id" v-reveal="i * 120" class="svc__item">
          <article class="svc__card">
            <div class="svc__top">
              <span class="svc__icon">
                <ServiceIcon :name="s.icon" :size="28" />
              </span>
              <span class="num svc__no" aria-hidden="true">{{ s.no }}</span>
            </div>
            <h3 class="svc__title">{{ s.title }}</h3>
            <p class="svc__desc">{{ s.summary }}</p>
            <ul class="svc__points" aria-label="服務內容">
              <li v-for="p in s.points" :key="p">{{ p }}</li>
            </ul>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.svc {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  margin-top: calc(var(--block-gap) + 8px);
}

.svc__item {
  display: flex;
}

.svc__card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: clamp(26px, 2.4vw, 32px) clamp(22px, 2vw, 28px);
  border-radius: var(--radius-lg);
  background: #fff;
  border: 1px solid var(--c-line);
  overflow: hidden;
  transition:
    transform 0.5s var(--ease-out),
    box-shadow 0.5s var(--ease-out),
    border-color 0.3s;
}

/* 滑鼠移入：卡片浮起、底部黃線展開、圖示轉黃 */
.svc__card::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 4px;
  background: var(--c-yellow);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.6s var(--ease-out);
}

.svc__card:hover {
  border-color: transparent;
  box-shadow: var(--shadow-md);
  transform: translateY(-6px);
}

.svc__card:hover::after {
  transform: scaleX(1);
}

.svc__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.svc__icon {
  display: grid;
  place-items: center;
  width: 58px;
  height: 58px;
  border-radius: var(--radius-md);
  background: var(--c-yellow-tint);
  transition:
    background-color 0.3s,
    transform 0.5s var(--ease-out);
}

.svc__card:hover .svc__icon {
  background: var(--c-yellow);
  transform: rotate(-6deg);
}

.svc__no {
  font-size: 2.6rem;
  font-weight: 700;
  line-height: 1;
  color: var(--c-gray-200);
}

.svc__title {
  margin-top: 26px;
  font-size: clamp(1.2rem, 1.7vw, 1.35rem);
  letter-spacing: 0.04em;
}

.svc__desc {
  margin-top: 12px;
  color: var(--c-text-2);
  line-height: 1.95;
}

/* 分類標籤：放在卡片底部，各卡片對齊 */
.svc__points {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
  padding-top: 20px;
}

.svc__points li {
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid var(--c-line-strong);
  color: var(--c-text-2);
  font-size: 0.85rem;
}

/* 平板：2 × 2 */
@media (max-width: 1199px) {
  .svc {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* 手機：單欄 */
@media (max-width: 640px) {
  .svc {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }

  .svc__card {
    padding: 24px 22px;
  }

  .svc__no {
    font-size: 2.1rem;
  }

  .svc__icon {
    width: 52px;
    height: 52px;
  }

  .svc__title {
    margin-top: 20px;
  }

  .svc__desc {
    font-size: 0.98rem;
  }
}
</style>
