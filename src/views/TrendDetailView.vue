<script setup lang="ts">
/*
 * 趨勢專欄：文章內頁 /trends/:id
 * 內文每一行是一個段落；以「## 」開頭的行顯示為小標題（文字一律以純文字輸出，不解析 HTML）。
 */
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, ArrowUpRight } from '@lucide/vue'
import PageHeader from '@/components/PageHeader.vue'
import TrendCard from '@/components/TrendCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useArticles } from '@/composables/sheetData'

const route = useRoute()
const { articles, loading } = useArticles()
const item = computed(() => articles.value.find((a) => a.id === route.params.id && a.content.length))

const blocks = computed(() =>
  (item.value?.content ?? []).map((line) =>
    /^#{2,}\s+/.test(line) ? { type: 'h2' as const, text: line.replace(/^#+\s+/, '') } : { type: 'p' as const, text: line },
  ),
)

/** 更多文章：同分類優先，最多 3 篇 */
const more = computed(() => {
  if (!item.value) return []
  const others = articles.value.filter((a) => a.id !== item.value!.id)
  const same = others.filter((a) => a.category === item.value!.category)
  return [...same, ...others.filter((a) => a.category !== item.value!.category)].slice(0, 3)
})

// 文章標題寫進分頁標題與描述
watchEffect(() => {
  if (!item.value) return
  document.title = `${item.value.title}｜趨勢專欄｜亞洲共創學院`
  document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', item.value.excerpt || item.value.title)
})
</script>

<template>
  <div class="page">
    <template v-if="item">
      <PageHeader
        :eyebrow="item.category || 'Trends'"
        :title="item.title"
        :crumbs="[{ label: '趨勢專欄', to: '/trends' }, { label: item.title }]"
      >
        <p v-if="item.date || item.author" class="art__meta">
          <time v-if="item.date" class="num">{{ item.date }}</time>
          <span v-if="item.author">{{ item.author }}</span>
        </p>
      </PageHeader>

      <article class="section art">
        <div class="container art__inner">
          <img v-if="item.cover" class="art__cover" :src="item.cover" :alt="item.coverAlt" />
          <p v-if="item.excerpt" class="art__lead">{{ item.excerpt }}</p>
          <div class="art__body">
            <template v-for="(b, i) in blocks" :key="i">
              <h2 v-if="b.type === 'h2'" class="art__h">{{ b.text }}</h2>
              <p v-else>{{ b.text }}</p>
            </template>
          </div>
          <a v-if="item.link" :href="item.link" target="_blank" rel="noopener" class="link-arrow art__ext">
            延伸閱讀 <ArrowUpRight :size="16" aria-hidden="true" /><span class="sr-only">（另開新視窗）</span>
          </a>
          <RouterLink to="/trends" class="link-arrow art__back">
            <ArrowLeft :size="16" aria-hidden="true" /> 返回趨勢專欄
          </RouterLink>
        </div>
      </article>

      <section v-if="more.length" class="section section--alt">
        <div class="container">
          <h2 class="more__title">更多文章</h2>
          <ul class="more__grid">
            <li v-for="a in more" :key="a.id"><TrendCard :item="a" title-tag="h3" /></li>
          </ul>
        </div>
      </section>
    </template>

    <template v-else-if="loading">
      <PageHeader eyebrow="Trends" title="文章載入中…" :crumbs="[{ label: '趨勢專欄', to: '/trends' }]" />
    </template>

    <template v-else>
      <PageHeader eyebrow="Not Found" title="找不到這篇文章" desc="文章可能已移除或網址有誤。" :crumbs="[{ label: '趨勢專欄', to: '/trends' }]">
        <BaseButton to="/trends">返回趨勢專欄</BaseButton>
      </PageHeader>
    </template>
  </div>
</template>

<style scoped>
.art__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 18px;
  margin-top: 14px;
  color: var(--c-text-3);
  font-size: 0.92rem;
}

.art__inner {
  max-width: 820px;
}

.art__cover {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: var(--radius-lg);
  background: var(--c-bg-alt);
}

.art__lead {
  margin-top: 28px;
  font-size: 1.15rem;
  font-weight: 500;
  line-height: 1.9;
}

.art__body {
  margin-top: 20px;
  color: var(--c-text-2);
  font-size: 1.02rem;
  line-height: 2;
}

.art__body p + p {
  margin-top: 1em;
}

.art__h {
  margin: 1.8em 0 0.5em;
  color: var(--c-text);
  font-size: 1.3rem;
  line-height: 1.5;
}

.art__ext {
  display: inline-flex;
  margin-top: 28px;
}

.art__back {
  display: flex;
  width: fit-content;
  margin-top: 32px;
}

.art__back:hover svg {
  transform: translateX(-4px);
}

.more__title {
  margin-bottom: var(--space-4);
  font-size: 1.6rem;
}

.more__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

@media (max-width: 960px) {
  .more__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
