<script setup lang="ts">
/**
 * 關於亞創頁的照片欄位：有照片就顯示照片；
 * 尚未提供（src 為空）時顯示中性佔位區塊，不使用示意照片冒充活動紀錄。
 */
import { ImageIcon } from '@lucide/vue'
import type { AboutImage } from '@/data/about'

withDefaults(defineProps<{ image: AboutImage; ratio?: string }>(), { ratio: '4 / 3' })
</script>

<template>
  <img
    v-if="image.src"
    class="photo"
    :style="{ aspectRatio: ratio }"
    :src="image.src"
    :alt="image.alt"
    :width="image.width"
    :height="image.height"
    loading="lazy"
    decoding="async"
  />
  <div v-else class="photo photo--empty" :style="{ aspectRatio: ratio }" role="img" :aria-label="image.pendingLabel">
    <ImageIcon class="photo__icon" :size="34" :stroke-width="1.4" aria-hidden="true" />
    <span class="pending-tag photo__tag" aria-hidden="true">{{ image.pendingLabel }}</span>
  </div>
</template>

<style scoped>
.photo {
  display: block;
  width: 100%;
  height: auto;
  border-radius: var(--radius-lg);
  object-fit: cover;
}

.photo--empty {
  position: relative;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 14px;
  background: var(--c-gray-100);
  border: 1px dashed var(--c-line-strong);
  color: var(--c-text-3);
}

.photo__tag {
  background-color: #fff;
  color: var(--c-text-2);
}
</style>
