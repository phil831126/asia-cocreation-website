<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import CaseShowcase from '@/components/CaseShowcase.vue'
import NewsCarousel from '@/components/NewsCarousel.vue'
import StatsDashboard from '@/components/StatsDashboard.vue'
import CtaBanner from '@/components/CtaBanner.vue'
</script>

<template>
  <div class="page">
    <PageHeader eyebrow="Practice Overview" title="實務總覽" :crumbs="[{ label: '實務總覽' }]">
      <!-- 副標與成果數據同寬：寬度由下方四格數據決定，副標超過就換行 -->
      <div class="cases-intro">
        <p class="cases-intro__desc">整理亞洲共創的熱門課程，以及政府計畫、產學合作與企業內訓的合作案例，了解我們如何規劃學習與實作。</p>
        <StatsDashboard />
      </div>
      <!-- 右側：熱門課程輪播（與首頁主視覺共用試算表「熱門課程」分頁） -->
      <template #aside>
        <NewsCarousel />
      </template>
    </PageHeader>

    <section class="section">
      <div class="container">
        <CaseShowcase />
      </div>
    </section>

    <CtaBanner />
  </div>
</template>

<style scoped>
.cases-intro {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: fit-content;
  max-width: 100%;
}

/* width: 0 ＋ min-width: 100%：副標不撐寬，寬度完全跟著下方的數據走 */
.cases-intro__desc {
  width: 0;
  min-width: 100%;
  font-size: 1.1rem;
  color: var(--c-text);
  text-wrap: pretty;
}
</style>
