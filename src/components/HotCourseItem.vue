<script setup lang="ts">
/*
 * 熱門課程圖卡（單張）：上方 16:10 封面、下方「熱門課程」標示／分類／課程名稱／摘要／連結。
 * 首頁 Hero 的固定圖卡（HotCourseCard）與課程總覽頁的輪播（HotCourseCarousel）共用。
 * course 為 null 時顯示載入中的佔位卡。
 */
import { computed, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, ArrowUpRight, Flame, ImageIcon } from '@lucide/vue'
import type { HotCourse } from '@/data/hotCourse'

const props = withDefaults(defineProps<{ course: HotCourse | null; titleTag?: 'h2' | 'h3' }>(), { titleTag: 'h2' })

const external = computed(() => /^https:\/\//.test(props.course?.link ?? ''))
const linkTag = computed(() => (!props.course?.link ? 'div' : external.value ? 'a' : RouterLink))
const linkAttrs = computed(() => {
  const link = props.course?.link
  if (!link) return {}
  return external.value ? { href: link, target: '_blank', rel: 'noopener' } : { to: link }
})

/** 封面讀不到時改顯示佔位底圖 */
const broken = ref(false)
watch(
  () => props.course?.cover,
  () => (broken.value = false),
)
</script>

<template>
  <component :is="linkTag" v-if="course" v-bind="linkAttrs" class="hot__card">
    <div class="hot__media">
      <img
        v-if="course.cover && !broken"
        class="hot__img"
        :src="course.cover"
        :alt="course.coverAlt"
        @error="broken = true"
      />
      <div v-else class="hot__ph" aria-hidden="true"><ImageIcon :size="32" :stroke-width="1.4" /></div>
    </div>

    <div class="hot__body">
      <!-- 「熱門課程」標示放在文字區，不遮住課程海報 -->
      <p class="hot__meta">
        <span class="hot__badge"><Flame :size="14" :stroke-width="2.2" aria-hidden="true" />熱門課程</span>
        <span v-if="course.tag" class="hot__tag">{{ course.tag }}</span>
      </p>
      <component :is="titleTag" class="hot__title">{{ course.title }}</component>
      <p v-if="course.summary" class="hot__summary">{{ course.summary }}</p>
      <ul v-if="course.info.length" class="hot__info">
        <li v-for="t in course.info" :key="t">{{ t }}</li>
      </ul>
      <span v-if="course.link" class="link-arrow hot__more">
        {{ course.linkLabel }}
        <ArrowUpRight v-if="external" :size="16" aria-hidden="true" />
        <ArrowRight v-else :size="16" aria-hidden="true" />
        <span v-if="external" class="sr-only">（另開新視窗）</span>
      </span>
    </div>
  </component>

  <!-- 資料載入中：保留卡片位置 -->
  <div v-else class="hot__card hot__card--loading" aria-hidden="true">
    <div class="hot__media"><div class="hot__ph"></div></div>
    <div class="hot__body"><span class="hot__line"></span><span class="hot__line hot__line--short"></span></div>
  </div>
</template>

<style scoped>
.hot__card {
  display: flex;
  flex-direction: column;
  border-radius: 18px;
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

/* ---------- 封面 16:10 ---------- */
.hot__media {
  position: relative;
  aspect-ratio: 16 / 10;
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

/* ---------- 文字 ---------- */
.hot__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

/* 「熱門課程」標示：品牌黃底 */
.hot__badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 12px 3px 9px;
  border-radius: 999px;
  background: var(--c-yellow);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.hot__body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2vh 22px 2.2vh;
}

.hot__tag {
  padding: 3px 12px;
  border-radius: 999px;
  background: var(--c-text);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.hot__title {
  margin-top: 8px;
  font-size: clamp(1rem, 2.2vh, 1.15rem);
  font-weight: 700;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  overflow: hidden;
}

.hot__summary {
  margin-top: 4px;
  color: var(--c-text-2);
  font-size: 0.9rem;
  line-height: 1.7;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
}

.hot__info {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.hot__info li {
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid var(--c-line-strong);
  color: var(--c-text-2);
  font-size: 0.78rem;
}

.hot__more {
  padding-top: 8px;
  font-size: 0.85rem;
}

/* ---------- 載入中 ---------- */
.hot__line {
  display: block;
  width: 70%;
  height: 14px;
  margin-top: 10px;
  border-radius: 6px;
  background: var(--c-bg-alt);
}

.hot__line--short {
  width: 40%;
}
</style>
