<script setup lang="ts">
/* SECTION 04｜合作服務：桌機三欄卡片，手機改為單欄（id="services" 供首頁「了解更多」連結使用） */
import SectionHeading from '@/components/SectionHeading.vue'
import { aboutServices as copy } from '@/data/about'
</script>

<template>
  <section id="services" class="section section--alt" aria-labelledby="services-title">
    <div class="container">
      <SectionHeading id="services-title" :eyebrow="copy.eyebrow" :title="copy.title" />

      <ul class="svc">
        <li v-for="(s, i) in copy.items" :key="s.key" v-reveal="i * 120" class="svc__item">
          <article class="svc__card">
            <div class="svc__top">
              <span class="svc__icon">
                <component :is="s.icon" :size="28" :stroke-width="1.6" aria-hidden="true" />
              </span>
              <span class="num svc__no" aria-hidden="true">{{ s.no }}</span>
            </div>
            <h3 class="svc__title">{{ s.title }}</h3>
            <p class="svc__desc">{{ s.desc }}</p>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.svc {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
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
  padding: clamp(28px, 3vw, 36px);
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

/* 平板：卡片內容較長，改為單欄、圖示放左側 */
@media (max-width: 1023px) {
  .svc {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
    max-width: 820px;
  }

  .svc__card {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    column-gap: 22px;
  }

  .svc__top {
    grid-row: 1 / span 2;
  }

  .svc__no {
    display: none;
  }

  .svc__title {
    margin-top: 2px;
  }
}

@media (max-width: 767px) {
  .svc__card {
    display: flex;
    padding: 24px 22px;
  }

  .svc__no {
    display: block;
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
