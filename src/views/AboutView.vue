<script setup lang="ts">
/*
 * 關於亞創頁
 * - 文字與圖片路徑：src/data/about.ts
 * - 各區塊版面與樣式：src/components/about/ 底下對應的元件
 */
import AboutOpening from '@/components/about/AboutOpening.vue'
import AboutStory from '@/components/about/AboutStory.vue'
import AboutTeaching from '@/components/about/AboutTeaching.vue'
import AboutServices from '@/components/about/AboutServices.vue'
import AboutCases from '@/components/about/AboutCases.vue'
import CtaBanner from '@/components/CtaBanner.vue'
import { aboutContact } from '@/data/about'
</script>

<template>
  <div class="page">
    <!-- SECTION 01｜品牌開場（AboutOpening.vue） -->
    <AboutOpening />

    <!-- SECTION 02｜創辦人的故事（AboutStory.vue） -->
    <AboutStory />

    <!-- SECTION 03｜教學理念（AboutTeaching.vue） -->
    <AboutTeaching />

    <!-- SECTION 04｜合作服務（AboutServices.vue） -->
    <AboutServices />

    <!-- SECTION 05｜培訓案例（AboutCases.vue） -->
    <AboutCases />

    <!-- SECTION 06｜合作洽詢（沿用共用的 CtaBanner.vue，文案在 about.ts 的 aboutContact） -->
    <CtaBanner :content="aboutContact" />
  </div>
</template>
