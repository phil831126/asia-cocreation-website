<script setup lang="ts">
/*
 * 案例詳情頁的照片區：多張照片輪播
 * 照片 = 封面（cover）＋ 試算表「案例」分頁 gallery 欄位的其他照片（同一張不重複）。
 * 輪播本體在 PhotoCarousel.vue；能顯示的照片不到兩張時，維持原本的單張圖片（或示意圖）。
 * 列表卡片與首頁只用封面；要換封面，改試算表的 cover 欄位。
 */
import { computed } from 'vue'
import PhotoCarousel from './PhotoCarousel.vue'
import CaseVisual from './CaseVisual.vue'
import type { CaseItem } from '@/data/cases'

const props = defineProps<{ item: CaseItem }>()

const photos = computed(() => [props.item.image, ...(props.item.gallery ?? [])].filter(Boolean))
</script>

<template>
  <PhotoCarousel :photos="photos" :alt="item.imageAlt" aspect="16 / 10">
    <template #fallback><CaseVisual :item="item" /></template>
  </PhotoCarousel>
</template>
