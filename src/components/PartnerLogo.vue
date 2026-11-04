<script setup lang="ts">
import { ImageIcon } from '@lucide/vue'
import type { Partner } from '@/data/partners'

defineProps<{ partner: Partner; index: number }>()
</script>

<template>
  <component
    :is="partner.url ? 'a' : 'div'"
    :href="partner.url || undefined"
    :target="partner.url ? '_blank' : undefined"
    :rel="partner.url ? 'noopener' : undefined"
    class="pl"
    :class="{ 'pl--empty': !partner.logo }"
  >
    <img v-if="partner.logo" :src="partner.logo" :alt="partner.name" class="pl__img" decoding="async" />
    <template v-else>
      <ImageIcon :size="22" class="pl__icon" aria-hidden="true" />
      <span class="pl__text">
        <span class="pl__label">合作單位 Logo 待提供</span>
        <span class="num pl__no">#{{ String(index + 1).padStart(2, '0') }}</span>
      </span>
    </template>
  </component>
</template>

<style scoped>
.pl {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  /* 五排要在一個畫面內放得下，依螢幕高度微調 */
  height: clamp(64px, 11vh, 104px);
  border-radius: var(--radius-md);
  /* 不加卡片外框，Logo 直接放在大框的白底上（圖片背景已去白） */
  background: transparent;
  border: 1px solid transparent;
  text-align: center;
}

.pl--empty {
  border: 1px dashed rgba(136, 136, 136, 0.45);
  background: rgba(247, 247, 245, 0.6);
}

.pl--empty:hover {
  border-color: var(--c-gray);
  background: var(--c-yellow-tint);
}

/* 保留各單位 Logo 原色，不做灰階或透明處理 */
.pl__img {
  max-width: 90%;
  max-height: 82%;
  object-fit: contain;
}

@media (max-width: 600px) {
  .pl {
    height: 76px;
  }
}

.pl__icon {
  flex: none;
  color: var(--c-gray);
}

.pl__text {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.35;
}

.pl__label {
  font-size: 0.82rem;
  color: var(--c-text-2);
  white-space: nowrap;
}

.pl__no {
  font-size: 0.75rem;
  color: var(--c-text-3);
  letter-spacing: 0.08em;
}
</style>
