<script setup lang="ts">
/*
 * 熱門課程圖卡（單張）：只顯示圖片（圖片比例約 2.55:1 的橫幅），不放任何文字。
 * 實務總覽頁頁首的輪播（NewsCarousel）使用；有填連結的點圖片會前往該連結。
 * item 為 null 時顯示載入中的佔位卡。
 */
import { computed, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { ImageIcon } from '@lucide/vue'
import type { NewsItem } from '@/data/news'

const props = defineProps<{ item: NewsItem | null }>()

const external = computed(() => /^https:\/\//.test(props.item?.link ?? ''))
const linkTag = computed(() => (!props.item?.link ? 'div' : external.value ? 'a' : RouterLink))
const linkAttrs = computed(() => {
  const link = props.item?.link
  if (!link) return {}
  return external.value ? { href: link, target: '_blank', rel: 'noopener' } : { to: link }
})

/** 封面讀不到時改顯示佔位底圖 */
const broken = ref(false)
watch(
  () => props.item?.cover,
  () => (broken.value = false),
)
</script>

<template>
  <component :is="linkTag" v-if="item" v-bind="linkAttrs" class="hot__card">
    <div class="hot__media">
      <img
        v-if="item.cover && !broken"
        class="hot__img"
        :src="item.cover"
        :alt="item.coverAlt || item.title"
        @error="broken = true"
      />
      <div v-else class="hot__ph" aria-hidden="true"><ImageIcon :size="32" :stroke-width="1.4" /></div>
    </div>
    <span v-if="external" class="sr-only">（另開新視窗）</span>
  </component>

  <!-- 資料載入中：保留卡片位置 -->
  <div v-else class="hot__card hot__card--loading" aria-hidden="true">
    <div class="hot__media"><div class="hot__ph"></div></div>
  </div>
</template>

<style scoped>
.hot__card {
  display: block;
  /* 長方形，不用圓角 */
  border-radius: 0;
  background: #fff;
  color: var(--c-text);
  overflow: hidden;
  box-shadow: 0 16px 30px -18px rgba(60, 50, 20, 0.45);
  transition:
    transform 0.5s var(--ease-out),
    box-shadow 0.5s var(--ease-out);
}

a.hot__card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

/* ---------- 圖片：橫幅 2.55:1 ---------- */
.hot__media {
  position: relative;
  aspect-ratio: 2.55 / 1;
  overflow: hidden;
  background: var(--c-bg-alt);
}

.hot__img,
.hot__ph {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s var(--ease-out);
}

a.hot__card:hover .hot__img {
  transform: scale(1.05);
}

.hot__ph {
  display: grid;
  place-items: center;
  color: var(--c-gray);
  background:
    radial-gradient(rgba(224, 165, 0, 0.3) 1.2px, transparent 1.4px) 0 0 / 18px 18px,
    linear-gradient(150deg, #fff 10%, var(--c-yellow-tint));
}
</style>
