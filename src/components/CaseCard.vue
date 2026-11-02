<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import CaseVisual from './CaseVisual.vue'
import { categoryLabel, type CaseItem } from '@/data/cases'

defineProps<{ item: CaseItem }>()
</script>

<template>
  <article class="cc">
    <RouterLink :to="`/cases/${item.id}`" class="cc__media" tabindex="-1" aria-hidden="true">
      <CaseVisual :item="item" />
    </RouterLink>
    <div class="cc__body">
      <div class="cc__meta">
        <span class="cc__cat">{{ categoryLabel[item.category] }}</span>
        <span v-if="item.placeholder" class="pending-tag">示意內容／待補案例</span>
      </div>
      <h3 class="cc__title">
        <RouterLink :to="`/cases/${item.id}`">{{ item.title }}</RouterLink>
      </h3>
      <p class="cc__excerpt">{{ item.excerpt }}</p>
      <RouterLink :to="`/cases/${item.id}`" class="link-arrow cc__more" tabindex="-1" aria-hidden="true">
        查看詳情 <ArrowRight :size="16" />
      </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.cc {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: var(--radius-lg);
  background: #fff;
  border: 1px solid var(--c-line);
  overflow: hidden;
  transition:
    transform 0.5s var(--ease-out),
    box-shadow 0.5s var(--ease-out),
    border-color 0.4s;
}

.cc:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: transparent;
}

.cc__media {
  display: block;
  overflow: hidden;
}

.cc:hover :deep(.cv__img),
.cc:hover :deep(.cv__ph) {
  transform: scale(1.06);
}

.cc__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px 22px 22px;
}

.cc__meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.cc__cat {
  padding: 3px 12px;
  border-radius: 999px;
  background: var(--c-text);
  color: #fff;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.06em;
}

.cc__title {
  margin-top: 12px;
  font-size: 1.2rem;
  line-height: 1.5;
}

/* 讓整張卡片可點擊，同時保留單一可聚焦連結 */
.cc__title a::after {
  content: '';
  position: absolute;
  inset: 0;
}

.cc__title a:focus-visible {
  outline: none;
}

.cc:has(.cc__title a:focus-visible) {
  outline: 2px solid var(--c-text);
  outline-offset: 3px;
}

.cc__excerpt {
  margin-top: 10px;
  font-size: 0.95rem;
  color: var(--c-text-2);
}

.cc__more {
  align-self: flex-start;
  margin-top: auto;
  padding-top: 14px;
  background-position: left calc(100% - 0px);
}

.cc:hover .cc__more {
  background-size: 100% 2px;
}

.cc:hover .cc__more :deep(svg) {
  transform: translateX(4px);
}
</style>
