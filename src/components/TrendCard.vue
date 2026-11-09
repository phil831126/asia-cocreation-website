<script setup lang="ts">
/*
 * 趨勢專欄文章卡片：上方 16:9 封面、下方分類／日期／標題／摘要。
 * 有內文 → 前往站內文章頁 /trends/{id}；只有外部連結 → 另開新視窗；兩者都沒有 → 不可點。
 */
import { computed, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, ArrowUpRight, ImageIcon } from '@lucide/vue'
import type { Article } from '@/data/trends'

const props = withDefaults(defineProps<{ item: Article; titleTag?: 'h2' | 'h3' }>(), { titleTag: 'h2' })

const internal = computed(() => props.item.content.length > 0)
const external = computed(() => !internal.value && !!props.item.link)
const tag = computed(() => (internal.value ? RouterLink : external.value ? 'a' : 'div'))
const attrs = computed(() => {
  if (internal.value) return { to: `/trends/${props.item.id}` }
  if (external.value) return { href: props.item.link, target: '_blank', rel: 'noopener' }
  return {}
})

const broken = ref(false)
watch(
  () => props.item.cover,
  () => (broken.value = false),
)
</script>

<template>
  <component :is="tag" v-bind="attrs" class="tc">
    <div class="tc__media">
      <img v-if="item.cover && !broken" class="tc__img" :src="item.cover" :alt="item.coverAlt" loading="lazy" @error="broken = true" />
      <div v-else class="tc__ph" aria-hidden="true"><ImageIcon :size="30" :stroke-width="1.4" /></div>
    </div>
    <div class="tc__body">
      <p class="tc__meta">
        <span v-if="item.category" class="tc__cat">{{ item.category }}</span>
        <time v-if="item.date" class="num">{{ item.date }}</time>
      </p>
      <component :is="titleTag" class="tc__title">{{ item.title }}</component>
      <p v-if="item.excerpt" class="tc__excerpt">{{ item.excerpt }}</p>
      <span v-if="internal || external" class="link-arrow tc__more">
        閱讀文章
        <ArrowUpRight v-if="external" :size="16" aria-hidden="true" />
        <ArrowRight v-else :size="16" aria-hidden="true" />
        <span v-if="external" class="sr-only">（另開新視窗）</span>
      </span>
    </div>
  </component>
</template>

<style scoped>
.tc {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: var(--radius-lg);
  background: #fff;
  color: var(--c-text);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--c-line);
  transition:
    transform 0.5s var(--ease-out),
    box-shadow 0.5s var(--ease-out);
}

a.tc:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.tc__media {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--c-bg-alt);
}

.tc__img,
.tc__ph {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s var(--ease-out);
}

a.tc:hover .tc__img {
  transform: scale(1.05);
}

.tc__ph {
  display: grid;
  place-items: center;
  color: var(--c-gray);
  background:
    radial-gradient(rgba(224, 165, 0, 0.3) 1.2px, transparent 1.4px) 0 0 / 18px 18px,
    linear-gradient(150deg, #fff 10%, var(--c-yellow-tint));
}

.tc__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  padding: 18px 22px 22px;
}

.tc__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
  color: var(--c-text-3);
  font-size: 0.82rem;
}

.tc__cat {
  padding: 3px 12px;
  border-radius: 999px;
  background: var(--c-yellow-tint);
  color: var(--c-text);
  font-weight: 700;
}

.tc__title {
  margin-top: 10px;
  font-size: 1.12rem;
  font-weight: 700;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
}

.tc__excerpt {
  margin-top: 6px;
  color: var(--c-text-2);
  font-size: 0.92rem;
  line-height: 1.75;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  overflow: hidden;
}

.tc__more {
  margin-top: auto;
  padding-top: 14px;
  font-size: 0.88rem;
}
</style>
