<script setup lang="ts">
/*
 * 趨勢專欄：文章列表（分類篩選）
 * 文章來自試算表「趨勢專欄」分頁（見 src/data/trends.ts）；還沒有任何文章時，畫面置中顯示「建置中」，
 * 背景沿用首頁 Hero 的白底、淡黃光暈與點陣。
 */
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Sparkles } from '@lucide/vue'
import PageHeader from '@/components/PageHeader.vue'
import TrendCard from '@/components/TrendCard.vue'
import CtaBanner from '@/components/CtaBanner.vue'
import { trendCategories } from '@/data/trends'
import { useArticles } from '@/composables/sheetData'

const { articles, loading } = useArticles()
const route = useRoute()
const router = useRouter()

/** 分類按鈕：固定分類在前，試算表裡出現的其他分類接在後面；只列出有文章的分類 */
const categories = computed(() => {
  const used = new Set(articles.value.map((a) => a.category).filter(Boolean))
  return [...trendCategories.filter((c) => used.has(c)), ...[...used].filter((c) => !(trendCategories as readonly string[]).includes(c))]
})

/** 目前選的分類（存在網址 ?cat=，可分享、上一頁會還原） */
const current = computed(() => {
  const cat = typeof route.query.cat === 'string' ? route.query.cat : ''
  return categories.value.includes(cat) ? cat : ''
})

function pick(cat: string) {
  router.replace({ query: cat ? { ...route.query, cat } : { ...route.query, cat: undefined } })
}

const list = computed(() => (current.value ? articles.value.filter((a) => a.category === current.value) : articles.value))
</script>

<template>
  <div class="page">
    <!-- 有文章：列表 -->
    <template v-if="!loading && articles.length">
      <PageHeader
        eyebrow="Trends"
        title="趨勢專欄"
        desc="整理 AI 應用、品牌行銷與職涯發展的產業觀察與實務分享。"
        :crumbs="[{ label: '趨勢專欄' }]"
      />

      <section class="section">
        <div class="container">
          <div v-if="categories.length > 1" class="cats" role="group" aria-label="文章分類">
            <button type="button" class="chip" :class="{ 'is-on': !current }" :aria-pressed="!current" @click="pick('')">全部</button>
            <button
              v-for="c in categories"
              :key="c"
              type="button"
              class="chip"
              :class="{ 'is-on': current === c }"
              :aria-pressed="current === c"
              @click="pick(c)"
            >
              {{ c }}
            </button>
          </div>

          <ul class="grid" aria-live="polite">
            <li v-for="(a, i) in list" :key="a.id" v-reveal="(i % 3) * 100">
              <TrendCard :item="a" />
            </li>
          </ul>
        </div>
      </section>

      <CtaBanner />
    </template>

    <!-- 還沒有文章（或載入中）：建置中 -->
    <section v-else class="trends" aria-labelledby="trends-title">
      <div class="trends__bg" aria-hidden="true">
        <div class="trends__glow"></div>
        <div class="trends__dots"></div>
      </div>
      <Sparkles class="trends__spark" :size="26" :stroke-width="1.8" aria-hidden="true" />

      <div class="container trends__inner">
        <span class="eyebrow trends__in" style="--d: 0.05s">Trends</span>
        <h1 id="trends-title" class="trends__title trends__in" style="--d: 0.12s">趨勢專欄</h1>
        <p v-if="!loading" class="trends__status trends__in" style="--d: 0.22s"><span class="highlight">建置中</span></p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.trends {
  position: relative;
  isolation: isolate;
  display: grid;
  place-items: center;
  min-height: max(100svh, 560px);
  padding: calc(var(--nav-h) + 24px) 0 64px;
  background: #fff;
  overflow: hidden;
}

/* ---------- 背景：與首頁 Hero 相同的光暈與點陣 ---------- */
.trends__bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

.trends__glow {
  position: absolute;
  left: 50%;
  top: 50%;
  width: min(760px, 110vw);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(248, 190, 32, 0.18), transparent 66%);
  transform: translate(-50%, -50%);
}

.trends__dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(224, 165, 0, 0.35) 1.2px, transparent 1.4px);
  background-size: 18px 18px;
  -webkit-mask-image: radial-gradient(ellipse at 50% 50%, #000, transparent 62%);
  mask-image: radial-gradient(ellipse at 50% 50%, #000, transparent 62%);
  opacity: 0.5;
}

.trends__spark {
  position: absolute;
  left: 50%;
  top: calc(50% - 150px);
  color: var(--c-yellow);
  transform: translateX(-50%);
  animation: spark 4s ease-in-out infinite;
}

@keyframes spark {
  50% {
    transform: translateX(-50%) rotate(12deg) scale(1.1);
    opacity: 0.7;
  }
}

/* ---------- 置中的文字 ---------- */
.trends__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.trends__title {
  margin-top: 16px;
  font-size: clamp(1.4rem, 2.6vw, 1.9rem);
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--c-text-2);
}

.trends__status {
  margin-top: 12px;
  font-size: clamp(3rem, 9vw, 6rem);
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: 0.16em;
  padding-left: 0.16em;
}

/* ---------- 文章列表 ---------- */
.cats {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: var(--space-4);
}

.chip {
  padding: 7px 16px;
  border: 1px solid var(--c-line);
  border-radius: 999px;
  background: var(--c-bg-alt);
  color: var(--c-text-2);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.25s, color 0.25s, border-color 0.25s, box-shadow 0.25s;
}

.chip:hover {
  border-color: var(--c-line-strong);
  background: #fff;
  color: var(--c-text);
}

.chip.is-on {
  border-color: transparent;
  background: var(--c-yellow);
  color: var(--c-text);
  font-weight: 700;
  box-shadow: 0 6px 16px -8px rgba(224, 165, 0, 0.8);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

@media (max-width: 960px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

.trends__in {
  animation: trends-in 0.9s var(--ease-out) both;
  animation-delay: var(--d, 0s);
}

@keyframes trends-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
}
</style>
