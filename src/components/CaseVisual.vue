<script setup lang="ts">
import { computed } from 'vue'
import { Landmark, GraduationCap, Building2 } from '@lucide/vue'
import type { CaseItem } from '@/data/cases'

/** 案例圖片；未提供圖片時顯示抽象示意圖（非真實照片） */
const props = defineProps<{ item: CaseItem }>()
const icons = { government: Landmark, academia: GraduationCap, enterprise: Building2 }
const icon = computed(() => icons[props.item.category])
</script>

<template>
  <div class="cv" :class="`cv--${item.category}`">
    <img v-if="item.image" :src="item.image" :alt="item.imageAlt" class="cv__img" loading="lazy" />
    <div v-else class="cv__ph" role="img" :aria-label="`${item.imageAlt}（待補）`">
      <span class="cv__ring cv__ring--a"></span>
      <span class="cv__ring cv__ring--b"></span>
      <span class="cv__icon glass"><component :is="icon" :size="26" :stroke-width="1.6" /></span>
      <span class="cv__label">示意圖片｜待補</span>
    </div>
  </div>
</template>

<style scoped>
.cv {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--c-bg-alt);
}

.cv__img,
.cv__ph {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s var(--ease-out);
}

.cv__ph {
  position: relative;
  display: grid;
  place-items: center;
  background-image: radial-gradient(rgba(136, 136, 136, 0.35) 1px, transparent 1.2px);
  background-size: 14px 14px;
}

.cv--government .cv__ph {
  background-color: #f3f3f0;
}

.cv--academia .cv__ph {
  background-color: var(--c-yellow-tint);
}

.cv--enterprise .cv__ph {
  background-color: #ecece9;
}

.cv__ring {
  position: absolute;
  border-radius: 50%;
}

.cv__ring--a {
  width: 56%;
  aspect-ratio: 1;
  border: 1px solid rgba(136, 136, 136, 0.35);
}

.cv__ring--b {
  width: 15%;
  aspect-ratio: 1;
  right: 24%;
  top: 18%;
  background: radial-gradient(circle at 35% 30%, #ffe08a, var(--c-yellow) 60%, var(--c-yellow-deep));
  opacity: 0.75;
}

.cv__icon {
  position: relative;
  display: grid;
  place-items: center;
  width: 68px;
  height: 68px;
  border-radius: var(--radius-md);
}

.cv__label {
  position: absolute;
  left: 14px;
  bottom: 12px;
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.85);
  font-size: 0.75rem;
  color: var(--c-text-2);
}

/* 較矮的桌面螢幕：圖片改扁一點，讓案例區完整放進一個畫面 */
@media (min-width: 1024px) and (max-height: 820px) {
  .cv {
    aspect-ratio: 2 / 1;
  }
}

@media (min-width: 1024px) and (max-height: 740px) {
  .cv {
    aspect-ratio: 5 / 2;
  }
}
</style>
