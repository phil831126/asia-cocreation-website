<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft } from '@lucide/vue'
import PageHeader from '@/components/PageHeader.vue'
import CaseVisual from '@/components/CaseVisual.vue'
import CaseCard from '@/components/CaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import { categoryLabel } from '@/data/cases'
import { useCases } from '@/composables/sheetData'

const route = useRoute()
const { cases, loading } = useCases()
const item = computed(() => cases.value.find((c) => c.id === route.params.id))
const related = computed(() =>
  item.value ? cases.value.filter((c) => c.category === item.value!.category && c.id !== item.value!.id).slice(0, 2) : [],
)

/** 詳情三個區塊：試算表有填就顯示內容，沒填顯示「待補」 */
const blocks = computed(() => [
  { label: '合作背景', text: item.value?.background },
  { label: '執行內容', text: item.value?.execution },
  { label: '合作成果', text: item.value?.result },
])
</script>

<template>
  <div class="page">
    <template v-if="item">
      <PageHeader
        :eyebrow="categoryLabel[item.category]"
        :title="item.title"
        :crumbs="[{ label: '案例分享', to: '/cases' }, { label: item.title }]"
      >
        <span v-if="item.placeholder" class="pending-tag">示意內容／待補案例</span>
      </PageHeader>

      <section class="section detail">
        <div class="container detail__grid">
          <div v-reveal class="detail__media">
            <CaseVisual :item="item" />
          </div>
          <div class="detail__body">
            <p v-reveal class="detail__excerpt">{{ item.excerpt }}</p>
            <p v-if="item.partner || item.date" class="detail__meta">
              <span v-if="item.partner">合作單位：{{ item.partner }}</span>
              <span v-if="item.date">{{ item.date }}</span>
            </p>
            <dl class="detail__blocks">
              <div v-for="(b, i) in blocks" :key="b.label" v-reveal="i * 80">
                <dt>{{ b.label }}</dt>
                <dd v-if="b.text" class="detail__text">{{ b.text }}</dd>
                <dd v-else><span class="pending-tag">待補</span></dd>
              </div>
            </dl>
            <RouterLink to="/cases" class="link-arrow detail__back">
              <ArrowLeft :size="16" aria-hidden="true" /> 返回案例列表
            </RouterLink>
          </div>
        </div>
      </section>

      <section v-if="related.length" class="section section--alt">
        <div class="container">
          <h2 class="related__title">相關案例</h2>
          <ul class="related__grid">
            <li v-for="c in related" :key="c.id"><CaseCard :item="c" /></li>
          </ul>
        </div>
      </section>
    </template>

    <template v-else-if="loading">
      <PageHeader eyebrow="Case Studies" title="案例載入中…" :crumbs="[{ label: '案例分享', to: '/cases' }]" />
    </template>

    <template v-else>
      <PageHeader eyebrow="Not Found" title="找不到這則案例" desc="案例可能已移除或網址有誤。" :crumbs="[{ label: '案例分享', to: '/cases' }]">
        <BaseButton to="/cases">返回案例列表</BaseButton>
      </PageHeader>
    </template>
  </div>
</template>

<style scoped>
.detail__grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: clamp(32px, 5vw, 72px);
  align-items: start;
}

.detail__media {
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.detail__excerpt {
  font-size: 1.15rem;
  line-height: 1.9;
}

.detail__blocks {
  margin: 32px 0 0;
  border-top: 1px solid var(--c-line-strong);
}

.detail__blocks div {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 16px;
  padding: 18px 0;
  border-bottom: 1px solid var(--c-line);
}

.detail__blocks dt {
  font-weight: 700;
}

.detail__blocks dd {
  margin: 0;
}

/* 保留試算表格子裡的換行（Alt+Enter） */
.detail__text {
  color: var(--c-text-2);
  line-height: 1.85;
  white-space: pre-line;
}

.detail__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 20px;
  margin-top: 14px;
  color: var(--c-text-3);
  font-size: 0.92rem;
}

.detail__back {
  margin-top: 32px;
}

.detail__back:hover svg {
  transform: translateX(-4px);
}

.related__title {
  margin-bottom: var(--space-4);
  font-size: 1.6rem;
}

.related__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

@media (max-width: 860px) {
  .detail__grid,
  .related__grid {
    grid-template-columns: 1fr;
  }
}
</style>
