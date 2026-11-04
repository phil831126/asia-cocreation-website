<script setup lang="ts">
import { computed, ref } from 'vue'
import CaseCard from './CaseCard.vue'
import CaseSwiper from './CaseSwiper.vue'
import { caseCategories, type CaseCategory } from '@/data/cases'
import { useCases } from '@/composables/sheetData'

const props = withDefaults(defineProps<{ limit?: number; layout?: 'grid' | 'swiper' }>(), {
  limit: 0,
  layout: 'grid',
})

const { cases, loading } = useCases()
const active = ref<'all' | CaseCategory>('all')

const filtered = computed(() => {
  const list = active.value === 'all' ? cases.value : cases.value.filter((c) => c.category === active.value)
  return props.limit ? list.slice(0, props.limit) : list
})

function countOf(key: 'all' | CaseCategory) {
  return key === 'all' ? cases.value.length : cases.value.filter((c) => c.category === key).length
}
</script>

<template>
  <div class="cs">
    <!-- 提供 head 插槽時：標題在左、分類與操作在右，壓成同一列 -->
    <div class="cs__top" :class="{ 'cs__top--row': $slots.head }">
      <slot name="head" />
      <div class="cs__tools">
        <div class="cs__filters" role="group" aria-label="案例分類篩選">
          <button
            v-for="cat in caseCategories"
            :key="cat.key"
            type="button"
            class="cs__filter"
            :class="{ 'is-active': active === cat.key }"
            :aria-pressed="active === cat.key"
            @click="active = cat.key"
          >
            {{ cat.label }}
            <span class="num cs__count">{{ countOf(cat.key) }}</span>
          </button>
        </div>
        <slot v-if="layout !== 'swiper'" name="actions" />
      </div>
    </div>

    <p class="sr-only" aria-live="polite">目前顯示 {{ filtered.length }} 則案例</p>

    <p v-if="loading" class="cs__loading">案例資料載入中…</p>

    <Transition v-else name="cs-fade" mode="out-in">
      <CaseSwiper v-if="layout === 'swiper'" :key="`swiper-${active}-${filtered.length}`" :items="filtered">
        <template #aside><slot name="actions" /></template>
      </CaseSwiper>
      <ul v-else :key="active" class="cs__grid">
        <li v-for="(item, i) in filtered" :key="item.id" :style="{ '--i': i }">
          <CaseCard :item="item" />
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.cs__top {
  margin-bottom: var(--block-gap);
}

.cs__loading {
  display: grid;
  place-items: center;
  min-height: 280px;
  border: 1px dashed var(--c-line-strong);
  border-radius: var(--radius-lg);
  color: var(--c-text-3);
}

.cs__top--row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px 32px;
}

.cs__tools {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px 20px;
}

.cs__top--row .cs__tools {
  justify-content: flex-end;
}

/* 同列時，標題下的說明縮成一行小字 */
.cs__top--row :deep(.sh__desc) {
  font-size: 0.9rem;
}

.cs__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.cs__filter {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 46px;
  padding: 0 8px 0 20px;
  border-radius: 999px;
  border: 1px solid var(--c-line-strong);
  background: #fff;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color 0.3s,
    border-color 0.3s,
    color 0.3s,
    transform 0.3s var(--ease-out);
}

.cs__filter:hover {
  border-color: var(--c-text);
  transform: translateY(-1px);
}

.cs__filter.is-active {
  background: var(--c-text);
  border-color: var(--c-text);
  color: #fff;
}

.cs__count {
  display: grid;
  place-items: center;
  min-width: 30px;
  height: 30px;
  padding: 0 6px;
  border-radius: 999px;
  background: var(--c-bg-alt);
  color: var(--c-text-2);
  font-size: 0.8rem;
  font-weight: 600;
  transition: background-color 0.3s;
}

.cs__filter.is-active .cs__count {
  background: var(--c-yellow);
  color: var(--c-text);
}

.cs__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.cs__grid > li {
  animation: card-in 0.6s var(--ease-out) both;
  animation-delay: calc(var(--i) * 70ms);
}

@keyframes card-in {
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.98);
  }
}

.cs-fade-enter-active,
.cs-fade-leave-active {
  transition: opacity 0.25s ease;
}

.cs-fade-enter-from,
.cs-fade-leave-to {
  opacity: 0;
}

@media (max-width: 1024px) {
  .cs__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }
}

/* 空間不夠並排時，回到上下堆疊 */
@media (max-width: 1100px) {
  .cs__top--row {
    flex-direction: column;
    align-items: stretch;
  }

  .cs__top--row .cs__tools {
    justify-content: space-between;
  }
}

@media (max-width: 640px) {
  .cs__grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .cs__tools {
    flex-direction: column;
    align-items: stretch;
  }

  .cs__filters {
    flex-wrap: nowrap;
    overflow-x: auto;
    margin-inline: calc(var(--gutter) * -1);
    padding: 2px var(--gutter) 6px;
    scrollbar-width: none;
  }

  .cs__filter {
    flex: none;
  }
}
@media (min-width: 1024px) and (max-height: 820px) {
  .cs__filter {
    height: 40px;
  }

  .cs__count {
    min-width: 26px;
    height: 26px;
  }

  /* 矮螢幕直接隱藏標題下的說明 */
  .cs__top--row :deep(.sh__desc) {
    display: none;
  }
}
</style>
