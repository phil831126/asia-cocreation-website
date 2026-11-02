<script setup lang="ts">
import { computed, ref } from 'vue'
import CaseCard from './CaseCard.vue'
import CaseSwiper from './CaseSwiper.vue'
import { cases, caseCategories, type CaseCategory } from '@/data/cases'

const props = withDefaults(defineProps<{ limit?: number; layout?: 'grid' | 'swiper' }>(), {
  limit: 0,
  layout: 'grid',
})

const active = ref<'all' | CaseCategory>('all')

const filtered = computed(() => {
  const list = active.value === 'all' ? cases : cases.filter((c) => c.category === active.value)
  return props.limit ? list.slice(0, props.limit) : list
})

function countOf(key: 'all' | CaseCategory) {
  return key === 'all' ? cases.length : cases.filter((c) => c.category === key).length
}
</script>

<template>
  <div class="cs">
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

    <p class="sr-only" aria-live="polite">目前顯示 {{ filtered.length }} 則案例</p>

    <Transition name="cs-fade" mode="out-in">
      <CaseSwiper v-if="layout === 'swiper'" :key="`swiper-${active}`" :items="filtered" />
      <ul v-else :key="active" class="cs__grid">
        <li v-for="(item, i) in filtered" :key="item.id" :style="{ '--i': i }">
          <CaseCard :item="item" />
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.cs__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: var(--block-gap);
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

@media (max-width: 640px) {
  .cs__grid {
    grid-template-columns: 1fr;
    gap: 16px;
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
}
</style>
