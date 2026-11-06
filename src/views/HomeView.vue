<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRight } from '@lucide/vue'
import HeroSection from '@/components/HeroSection.vue'
import ServiceCards from '@/components/ServiceCards.vue'
import LecturerAlliance from '@/components/LecturerAlliance.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import CaseShowcase from '@/components/CaseShowcase.vue'
import PartnerWall from '@/components/PartnerWall.vue'
import CtaBanner from '@/components/CtaBanner.vue'
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
    <!-- 03 講師顧問聯盟 -->
    <LecturerAlliance data-snap="講師顧問" />
    <!-- 04 案例分享（Swiper） -->
    <section id="cases" class="section" data-snap="案例分享">
      <div class="container">
        <CaseShowcase layout="swiper">
          <template #head>
            <SectionHeading
              :eyebrow="casesSection.eyebrow"
              :title="casesSection.title"
              :highlight="casesSection.highlight"
              :desc="casesSection.desc"
            />
          </template>
          <template #actions>
            <RouterLink to="/cases" class="link-arrow">查看全部案例 <ArrowRight :size="16" aria-hidden="true" /></RouterLink>
          </template>
        </CaseShowcase>
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
/* 桌面：每個區塊佔滿一個畫面，內容垂直置中，頂端預留導覽列（搭配區塊快捷捲動）
   Hero 自行處理版面（桌機版導覽列在 Hero 底部），不套用這裡的留白 */
@media (min-width: 1024px) {
  .home > [data-snap]:not(.hero) {
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
  .home > [data-snap]:not(.hero) {
    padding-bottom: 16px;
  }
}

</style>
