<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import CaseShowcase from '@/components/CaseShowcase.vue'
import CtaBanner from '@/components/CtaBanner.vue'
import { useCases } from '@/composables/sheetData'

const { hasSample } = useCases()
</script>

<template>
  <div class="page">
    <PageHeader
      eyebrow="Case Studies"
      title="案例分享"
      desc="政府計畫、產學合作與企業內訓相關合作案例。"
      :crumbs="[{ label: '案例分享' }]"
    >
      <span v-if="hasSample" class="pending-tag">示意內容／待補案例</span>
    </PageHeader>

    <section class="section">
      <div class="container">
        <CaseShowcase />
      </div>
    </section>

    <CtaBanner />
  </div>
</template>
