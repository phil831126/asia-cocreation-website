<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import CaseShowcase from '@/components/CaseShowcase.vue'
import NewsCarousel from '@/components/NewsCarousel.vue'
import CtaBanner from '@/components/CtaBanner.vue'
import { useCases } from '@/composables/sheetData'

const { hasSample } = useCases()
</script>

<template>
  <div class="page">
    <PageHeader
      eyebrow="Course Overview"
      title="課程總覽"
      desc="政府計畫、產學合作與企業內訓相關合作案例。"
      :crumbs="[{ label: '課程總覽' }]"
    >
      <span v-if="hasSample" class="pending-tag">示意內容／待補案例</span>
      <!-- 右側：最新消息輪播（與首頁主視覺共用試算表「最新消息」分頁） -->
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
