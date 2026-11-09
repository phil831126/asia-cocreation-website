<script setup lang="ts">
/*
 * 關於亞創頁
 * - 文字與圖片路徑：src/data/about.ts
 * - 各區塊版面與樣式：src/components/about/ 底下對應的元件
 */
import AboutOpening from '@/components/about/AboutOpening.vue'
import AboutTeaching from '@/components/about/AboutTeaching.vue'
import AboutOrigin from '@/components/about/AboutOrigin.vue'
import AboutEvolution from '@/components/about/AboutEvolution.vue'
import AboutServices from '@/components/about/AboutServices.vue'
import AboutCases from '@/components/about/AboutCases.vue'
import CtaBanner from '@/components/CtaBanner.vue'
import { aboutContact } from '@/data/about'
</script>

<template>
  <div class="page">
    <!-- SECTION 01｜品牌開場（AboutOpening.vue） -->
    <AboutOpening />

    <!-- SECTION 02｜教學理念（AboutTeaching.vue） -->
    <AboutTeaching />

    <!-- SECTION 03｜課程的起點：從自媒體課堂開始的學習旅程（AboutOrigin.vue） -->
    <AboutOrigin />

    <!-- SECTION 04｜課程發展歷程（AboutEvolution.vue） -->
    <AboutEvolution />

    <!-- SECTION 05｜合作服務：四張服務卡片（AboutServices.vue，內容見 services.ts） -->
    <AboutServices />

    <!-- SECTION 06｜培訓案例（AboutCases.vue） -->
    <AboutCases />

    <!-- SECTION 07｜合作洽詢（沿用共用的 CtaBanner.vue，文案在 about.ts 的 aboutContact） -->
    <CtaBanner :content="aboutContact" />
  </div>
</template>
