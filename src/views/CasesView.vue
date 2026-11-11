<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import CaseShowcase from '@/components/CaseShowcase.vue'
import NewsCarousel from '@/components/NewsCarousel.vue'
import StatsDashboard from '@/components/StatsDashboard.vue'
import CtaBanner from '@/components/CtaBanner.vue'
import { useCases } from '@/composables/sheetData'

const { hasSample } = useCases()
</script>

<template>
  <div class="page">
    <PageHeader
      eyebrow="Course Overview"
      title="課程總覽"
      desc="整理亞洲共創的熱門課程，以及政府計畫、產學合作與企業內訓的合作案例，了解我們如何規劃學習與實作。"
      :crumbs="[{ label: '課程總覽' }]"
    >
      <!-- 成果數據：副標下方（原本在學習地圖頁） -->
      <div class="cases-stats">
        <StatsDashboard />
      </div>
      <span v-if="hasSample" class="pending-tag">示意內容／待補案例</span>
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
/* 副標下方的成果數據 */
.cases-stats {
  width: 100%;
  max-width: 680px;
  margin-top: 6px;
}
</style>
