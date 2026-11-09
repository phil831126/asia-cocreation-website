<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import CaseShowcase from '@/components/CaseShowcase.vue'
import HotCourseCarousel from '@/components/HotCourseCarousel.vue'
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
      <!-- 右側：熱門課程輪播（與首頁 Hero 的熱門課程共用試算表「亞創網站｜熱門課程」） -->
      <template #aside>
        <HotCourseCarousel />
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
