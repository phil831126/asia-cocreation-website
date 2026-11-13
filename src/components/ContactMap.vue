<script setup lang="ts">
/*
 * 公司地址的 Google 地圖小地圖（聯絡我們頁、頁尾共用）
 * 以地址文字搜尋並嵌入，不需要 API 金鑰；地址在 src/data/site.ts 的 contact.address。
 * 要換成更精準的標記，可到 Google 地圖按「分享 → 嵌入地圖」，把複製到的 src 網址填到 site.ts 的 mapEmbedSrc。
 */
import { contact, mapEmbedSrc } from '@/data/site'

withDefaults(defineProps<{ height?: number }>(), { height: 180 })
</script>

<template>
  <div class="map" :style="{ height: `${height}px` }">
    <iframe
      :src="mapEmbedSrc"
      :title="`Google 地圖：${contact.address}`"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      allowfullscreen
    ></iframe>
  </div>
</template>

<style scoped>
.map {
  overflow: hidden;
  border: 1px solid var(--c-line);
  border-radius: var(--radius-md);
  background: var(--c-bg-alt);
}

.map iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}
</style>
