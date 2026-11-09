<script setup lang="ts">
/* SECTION 04｜培訓案例：大卡片，文字在左、照片在右；照片尚未提供時顯示中性佔位 */
import SectionHeading from '@/components/SectionHeading.vue'
import AboutPhoto from './AboutPhoto.vue'
import { aboutCases as copy } from '@/data/about'
</script>

<template>
  <section class="section cases" aria-labelledby="cases-title">
    <div class="container">
      <SectionHeading id="cases-title" :eyebrow="copy.eyebrow" :title="copy.title" />

      <div class="cases__list">
        <article
          v-for="c in copy.items"
          :key="c.key"
          v-reveal
          class="case"
          :aria-labelledby="`case-${c.key}`"
        >
          <div class="case__media">
            <AboutPhoto :image="c.image" ratio="3 / 2" />
          </div>
          <div class="case__body">
            <p class="case__meta">
              <span class="num case__year">{{ c.year }}</span>
              <span class="case__school">{{ c.school }}</span>
            </p>
            <h3 :id="`case-${c.key}`" class="case__course">{{ c.course }}</h3>
            <p class="case__label">課程內容</p>
            <p class="case__desc">{{ c.desc }}</p>
            <!-- 延伸介紹：在 about.ts 的 more 陣列加入段落後顯示 -->
            <div class="case__more">
              <template v-if="c.more.length">
                <p v-for="(p, j) in c.more" :key="j" class="case__desc">{{ p }}</p>
              </template>
              <span v-else class="pending-tag">{{ copy.morePending }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cases__list {
  display: flex;
  flex-direction: column;
  gap: clamp(28px, 4vw, 44px);
  margin-top: calc(var(--block-gap) + 8px);
}

.case {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
  align-items: center;
  gap: clamp(24px, 4vw, 56px);
  padding: clamp(16px, 1.6vw, 20px);
  border: 1px solid var(--c-line);
  border-radius: var(--radius-xl);
  background: #fff;
  transition: box-shadow 0.5s var(--ease-out);
}

.case:hover {
  box-shadow: var(--shadow-md);
}

/* 桌機：照片一律在右 */
.case__media {
  order: 2;
}

.case__body {
  padding: 8px clamp(4px, 2vw, 24px);
}

.case__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 14px;
}

.case__year {
  font-size: clamp(2.4rem, 4vw, 3.2rem);
  font-weight: 700;
  line-height: 1;
  background: linear-gradient(transparent 62%, rgba(248, 190, 32, 0.6) 62%);
  padding-inline: 0.04em;
}

.case__school {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.case__course {
  margin-top: 18px;
  font-size: clamp(1.25rem, 2vw, 1.55rem);
  line-height: 1.5;
  letter-spacing: 0.02em;
  text-wrap: balance;
}

.case__label {
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid var(--c-line);
  color: var(--c-text-3);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.case__desc {
  margin-top: 8px;
  color: var(--c-text-2);
  line-height: 1.95;
}

.case__more {
  margin-top: 18px;
}

.case__more .case__desc:first-child {
  margin-top: 0;
}

/* 平板與手機：照片在上、文字在下 */
@media (max-width: 1023px) {
  .case {
    grid-template-columns: minmax(0, 1fr);
    max-width: 720px;
    gap: 20px;
  }

  .case__media {
    order: 0;
  }

  .case__body {
    padding: 4px 8px 12px;
  }
}

@media (max-width: 767px) {
  .case {
    padding: 12px;
    border-radius: var(--radius-lg);
  }

  .case__body {
    padding: 0 6px 10px;
  }

  .case__year {
    font-size: 2.2rem;
  }

  .case__school {
    font-size: 1.02rem;
  }

  .case__desc {
    font-size: 0.98rem;
  }
}
</style>
