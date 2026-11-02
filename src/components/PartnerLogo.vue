<script setup lang="ts">
import { ImageIcon } from 'lucide-vue-next'
import type { Partner } from '@/data/partners'

defineProps<{ partner: Partner; index: number; variant?: 'strip' | 'wall' }>()
</script>

<template>
  <component
    :is="partner.url ? 'a' : 'div'"
    :href="partner.url || undefined"
    :target="partner.url ? '_blank' : undefined"
    :rel="partner.url ? 'noopener' : undefined"
    class="pl"
    :class="[`pl--${variant ?? 'strip'}`, { 'pl--empty': !partner.logo }]"
  >
    <img v-if="partner.logo" :src="partner.logo" :alt="partner.name" class="pl__img" loading="lazy" />
    <template v-else>
      <ImageIcon :size="variant === 'wall' ? 22 : 18" class="pl__icon" aria-hidden="true" />
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
  align-items: center;
  justify-content: center;
  gap: 12px;
  border-radius: var(--radius-md);
  transition:
    border-color 0.3s,
    background-color 0.3s,
    transform 0.4s var(--ease-out),
    box-shadow 0.4s var(--ease-out);
}

.pl--strip {
  width: 220px;
  height: 84px;
  padding: 0 20px;
}

.pl--wall {
  height: 120px;
  padding: 0 18px;
  background: #fff;
  border: 1px solid var(--c-line);
}

.pl--wall:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: transparent;
}

.pl--empty {
  border: 1px dashed rgba(136, 136, 136, 0.45);
  background: rgba(247, 247, 245, 0.6);
}

.pl--empty:hover {
  border-color: var(--c-gray);
  background: var(--c-yellow-tint);
}

.pl__img {
  max-height: 56%;
  max-width: 80%;
  object-fit: contain;
  filter: grayscale(1);
  opacity: 0.6;
  transition:
    filter 0.4s,
    opacity 0.4s;
}

.pl:hover .pl__img {
  filter: none;
  opacity: 1;
}

.pl__icon {
  flex: none;
  color: var(--c-gray);
}

.pl__text {
  display: flex;
  flex-direction: column;
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

.pl--wall {
  flex-direction: column;
  gap: 8px;
  text-align: center;
}

.pl--wall .pl__text {
  align-items: center;
}
</style>
