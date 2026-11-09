<script setup lang="ts">
/*
 * 「講師經紀申請區」：邀請講師加入講師聯盟
 * 首頁（服務項目「講師經紀」卡片會捲到這裡）與講師聯盟頁的講師列表下方共用。
 * 在講師聯盟頁使用時傳入 :browse-link="false"，不顯示「查看講師聯盟」連結。
 * 桌機左側標題與按鈕、右側三項合作內容，下方為四步驟申請流程；平板與手機改為上下排。
 * 文案在 src/data/home.ts 的 lecturerApplySection。
 */
import { ArrowRight } from '@lucide/vue'
import SectionHeading from './SectionHeading.vue'
import BaseButton from './BaseButton.vue'
import { lecturerApplySection as copy } from '@/data/home'

withDefaults(defineProps<{ browseLink?: boolean }>(), { browseLink: true })
</script>

<template>
  <section id="lecturer-apply" class="section apply" aria-labelledby="apply-title">
    <div class="container">
      <div class="apply__grid">
        <div class="apply__intro">
          <SectionHeading id="apply-title" :eyebrow="copy.eyebrow" :title="copy.title" :highlight="copy.highlight" :desc="copy.desc" />
          <div v-reveal="200" class="apply__actions">
            <BaseButton :to="copy.primary.to" variant="primary">{{ copy.primary.label }}</BaseButton>
            <RouterLink v-if="browseLink" :to="copy.secondary.to" class="link-arrow">
              {{ copy.secondary.label }} <ArrowRight :size="16" aria-hidden="true" />
            </RouterLink>
          </div>
        </div>

        <ul class="apply__benefits">
          <li v-for="(b, i) in copy.benefits" :key="b.key" v-reveal="i * 120" class="benefit">
            <span class="benefit__icon">
              <component :is="b.icon" :size="24" :stroke-width="1.6" aria-hidden="true" />
            </span>
            <div>
              <h3 class="benefit__title">{{ b.title }}</h3>
              <p class="benefit__desc">{{ b.desc }}</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- 申請流程：四個步驟 -->
      <div v-reveal="120" class="steps">
        <h3 class="steps__title">
          <component :is="copy.icon" :size="20" :stroke-width="1.8" aria-hidden="true" />
          {{ copy.stepsTitle }}
        </h3>
        <ol class="steps__list">
          <li v-for="(s, i) in copy.steps" :key="s.title" class="step">
            <span class="num step__no">{{ String(i + 1).padStart(2, '0') }}</span>
            <div>
              <p class="step__title">{{ s.title }}</p>
              <p class="step__desc">{{ s.desc }}</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.apply__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(32px, 5vw, 72px);
}

.apply__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px 24px;
  margin-top: 28px;
}

/* ---------- 三項合作內容 ---------- */
.apply__benefits {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.benefit {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  padding: 20px 22px;
  border: 1px solid var(--c-line);
  border-radius: var(--radius-lg);
  background: #fff;
  transition:
    border-color 0.3s,
    box-shadow 0.5s var(--ease-out),
    transform 0.5s var(--ease-out);
}

.benefit:hover {
  border-color: transparent;
  box-shadow: var(--shadow-md);
  transform: translateX(4px);
}

.benefit__icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: var(--c-yellow-tint);
  transition: background-color 0.3s;
}

.benefit:hover .benefit__icon {
  background: var(--c-yellow);
}

.benefit__title {
  font-size: 1.1rem;
  letter-spacing: 0.04em;
}

.benefit__desc {
  margin-top: 4px;
  color: var(--c-text-2);
  font-size: 0.95rem;
  line-height: 1.8;
}

/* ---------- 申請流程 ---------- */
.steps {
  margin-top: clamp(28px, 4vh, 44px);
  padding: 22px clamp(20px, 3vw, 32px) 24px;
  border-radius: var(--radius-lg);
  background: linear-gradient(120deg, var(--c-yellow-tint), rgba(255, 246, 220, 0.25));
}

.steps__title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  letter-spacing: 0.08em;
}

.steps__list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-top: 16px;
  counter-reset: none;
}

.step {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

/* 步驟之間的箭頭線 */
.step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 15px;
  right: -12px;
  width: 8px;
  height: 8px;
  border-top: 2px solid var(--c-yellow-deep);
  border-right: 2px solid var(--c-yellow-deep);
  transform: rotate(45deg);
}

.step__no {
  display: grid;
  place-items: center;
  flex: none;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--c-yellow);
  font-size: 0.85rem;
  font-weight: 700;
}

.step__title {
  font-weight: 700;
  letter-spacing: 0.04em;
}

.step__desc {
  margin-top: 2px;
  color: var(--c-text-2);
  font-size: 0.88rem;
  line-height: 1.6;
}

/* 較矮的桌面螢幕：收緊卡片 */
@media (min-width: 1024px) and (max-height: 820px) {
  .benefit {
    padding: 14px 18px;
  }

  .benefit__desc {
    font-size: 0.9rem;
    line-height: 1.7;
  }

  .apply__actions {
    margin-top: 20px;
  }
}

/* 平板與手機：上下排 */
@media (max-width: 1023px) {
  .apply__grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .steps__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 18px;
  }

  .step::after {
    display: none;
  }
}

@media (max-width: 560px) {
  .steps__list {
    grid-template-columns: minmax(0, 1fr);
  }

  .benefit {
    padding: 18px;
    gap: 14px;
  }
}
</style>
