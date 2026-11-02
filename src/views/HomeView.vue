<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue'
import PartnerMarquee from '@/components/PartnerMarquee.vue'
import StatsDashboard from '@/components/StatsDashboard.vue'
import ServiceCards from '@/components/ServiceCards.vue'
import ProcessFlow from '@/components/ProcessFlow.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import CaseShowcase from '@/components/CaseShowcase.vue'
import PartnerWall from '@/components/PartnerWall.vue'
import CtaBanner from '@/components/CtaBanner.vue'
import BaseButton from '@/components/BaseButton.vue'
import { casesSection } from '@/data/home'
</script>

<template>
  <div class="page">
    <!-- 01 主視覺 -->
    <HeroSection />
    <!-- 02 合作單位跑馬燈 -->
    <PartnerMarquee />
    <!-- 03 合作成果數據 -->
    <StatsDashboard />
    <!-- 04 三大服務 -->
    <ServiceCards />
    <!-- 05 合作流程 -->
    <ProcessFlow />
    <!-- 06 案例分享 -->
    <section id="cases" class="section">
      <div class="container">
        <div class="home-cases__head">
          <SectionHeading
            :eyebrow="casesSection.eyebrow"
            :title="casesSection.title"
            :highlight="casesSection.highlight"
            :desc="casesSection.desc"
          />
          <div v-reveal="200">
            <BaseButton to="/cases" variant="ghost" size="sm">查看全部案例</BaseButton>
          </div>
        </div>
        <CaseShowcase :limit="6" />
      </div>
    </section>
    <!-- 07 合作單位展示 -->
    <PartnerWall />
    <!-- 08 合作邀請 -->
    <CtaBanner />
  </div>
</template>

<style scoped>
.home-cases__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: var(--space-5);
}

@media (max-width: 768px) {
  .home-cases__head {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
