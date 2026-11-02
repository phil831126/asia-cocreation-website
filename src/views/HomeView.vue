<script setup lang="ts">
import { ref } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import ServiceCards from '@/components/ServiceCards.vue'
import ProcessFlow from '@/components/ProcessFlow.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import CaseShowcase from '@/components/CaseShowcase.vue'
import PartnerWall from '@/components/PartnerWall.vue'
import CtaBanner from '@/components/CtaBanner.vue'
import BaseButton from '@/components/BaseButton.vue'
import SectionDots from '@/components/SectionDots.vue'
import { casesSection } from '@/data/home'
import { useSectionSnap } from '@/composables/sectionSnap'

const root = ref<HTMLElement | null>(null)
const snap = useSectionSnap(root)
</script>

<template>
  <div ref="root" class="page home">
    <!-- 01 主視覺（含成果 Dashboard） -->
    <HeroSection data-snap="首頁" />
    <!-- 02 三大服務 -->
    <ServiceCards data-snap="服務項目" />
    <!-- 03 合作流程 -->
    <ProcessFlow data-snap="合作流程" />
    <!-- 04 案例分享（Swiper） -->
    <section id="cases" class="section" data-snap="案例分享">
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
        <CaseShowcase layout="swiper" />
      </div>
    </section>
    <!-- 05 合作單位展示 -->
    <PartnerWall data-snap="合作單位" />
    <!-- 06 合作邀請 -->
    <CtaBanner data-snap="洽詢合作" />

    <Teleport to="body">
      <SectionDots
        :sections="snap.sections.value"
        :active="snap.active.value"
        @go="snap.goTo"
      />
    </Teleport>
  </div>
</template>

<style scoped>
.home-cases__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: var(--block-gap);
}

/* 桌面：每個區塊佔滿一個畫面，內容垂直置中，頂端預留導覽列（搭配區塊快捷捲動） */
@media (min-width: 1024px) {
  .home > [data-snap] {
    min-height: 100vh;
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: calc(var(--nav-h) + 8px);
    padding-bottom: 32px;
  }
}

@media (min-width: 1024px) and (max-height: 820px) {
  .home > [data-snap] {
    padding-bottom: 16px;
  }
}

@media (max-width: 768px) {
  .home-cases__head {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
