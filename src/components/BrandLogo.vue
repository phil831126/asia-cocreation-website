<script setup lang="ts">
import { brand } from '@/data/site'

withDefaults(defineProps<{ showCompany?: boolean }>(), { showCompany: false })
</script>

<template>
  <span class="logo">
    <img v-if="brand.logoSrc" :src="brand.logoSrc" :alt="brand.logoAlt" class="logo__img" />
    <template v-else>
      <img v-if="brand.markSrc" :src="brand.markSrc" alt="" class="logo__mark" />
      <!-- 暫代標誌：未設定 markSrc 時使用 -->
      <svg v-else class="logo__mark" viewBox="0 0 44 44" aria-hidden="true">
        <circle cx="19" cy="19" r="13" fill="none" stroke="#888888" stroke-width="4.5" />
        <circle cx="19" cy="19" r="6.5" fill="#F8BE20" />
        <path d="M29 29 L39 39" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      </svg>
      <span class="logo__text">
        <span class="logo__name">{{ brand.name }}</span>
        <span v-if="showCompany" class="logo__company">{{ brand.company }}</span>
      </span>
    </template>
  </span>
</template>

<style scoped>
.logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.logo__img {
  height: 40px;
  width: auto;
}

.logo__mark {
  width: 38px;
  height: 38px;
  flex: none;
  object-fit: contain;
  transition: transform 0.5s var(--ease-out);
}

.logo:hover .logo__mark {
  transform: scale(1.06);
}

.logo__text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.logo__name {
  font-size: 1.12rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  white-space: nowrap;
}

.logo__company {
  margin-top: 2px;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: var(--c-text-2);
}
</style>
