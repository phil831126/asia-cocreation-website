<script setup lang="ts">
import { computed } from 'vue'
import { ChevronRight } from '@lucide/vue'

const props = defineProps<{
  eyebrow: string
  title: string
  /** 副標；字串裡的換行字元會分成多行顯示 */
  desc?: string
  crumbs?: { label: string; to?: string }[]
  /** 說明文字固定一行：依寬度自動縮小字級，不換行 */
  singleLineDesc?: boolean
  /** 縮小上下留白，讓下方內容（例如篩選區）在第一個畫面就能完整看到 */
  compact?: boolean
}>()

const descLines = computed(() => (props.desc ?? '').split('\n'))
/** 單行模式以最長的一行計算字級縮放 */
const descChars = computed(() => Math.max(...descLines.value.map((l) => l.length)) + 0.6)
</script>

<template>
  <section class="ph" :class="{ 'ph--compact': compact, 'ph--action': $slots.action }">
    <div class="ph__dots" aria-hidden="true"></div>
    <!-- 右側放大鏡裝飾：有 aside 內容（例如課程總覽的熱門課程輪播）時改顯示該內容 -->
    <svg v-if="!$slots.aside" class="ph__ring" viewBox="0 0 300 300" aria-hidden="true">
      <circle cx="130" cy="130" r="92" fill="rgba(255,255,255,0.5)" stroke="#d6d6d3" stroke-width="12" />
      <circle cx="130" cy="130" r="40" fill="#F8BE20" fill-opacity="0.35" />
      <circle cx="130" cy="130" r="14" fill="#F8BE20" />
      <path d="M198 198 L262 262" stroke="#9a9a98" stroke-width="20" stroke-linecap="round" />
    </svg>
    <!-- 右側放大鏡下方的操作按鈕（平板與手機改放在文字下方） -->
    <div v-if="$slots.action" class="ph__action ph__action--deco"><slot name="action" /></div>
    <div class="container ph__layout" :class="{ 'ph__layout--aside': $slots.aside }">
      <div class="ph__inner">
        <nav v-if="crumbs" class="ph__crumbs" aria-label="麵包屑">
          <ol>
            <li><RouterLink to="/">首頁</RouterLink></li>
            <li v-for="c in crumbs" :key="c.label">
              <ChevronRight :size="14" aria-hidden="true" />
              <RouterLink v-if="c.to" :to="c.to">{{ c.label }}</RouterLink>
              <span v-else aria-current="page">{{ c.label }}</span>
            </li>
          </ol>
        </nav>
        <span class="eyebrow ph__eyebrow">{{ eyebrow }}</span>
        <h1 class="ph__title">{{ title }}</h1>
        <p
          v-if="desc"
          class="ph__desc"
          :class="{ 'ph__desc--line': singleLineDesc }"
          :style="singleLineDesc ? { '--chars': descChars } : undefined"
        >
          <span v-for="(line, i) in descLines" :key="i" class="ph__line">{{ line }}</span>
        </p>
        <slot />
        <div v-if="$slots.action" class="ph__action ph__action--inline"><slot name="action" /></div>
      </div>
      <div v-if="$slots.aside" class="ph__aside">
        <slot name="aside" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.ph {
  position: relative;
  isolation: isolate;
  padding: calc(var(--nav-h) + var(--section-y)) 0 var(--section-y);
  background: linear-gradient(180deg, #fff, var(--c-bg-alt));
  overflow: hidden;
}

.ph__dots {
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
  width: 60%;
  height: 100%;
  background-image: radial-gradient(rgba(224, 165, 0, 0.5) 1.3px, transparent 1.5px);
  background-size: 16px 16px;
  -webkit-mask-image: radial-gradient(ellipse at 80% 40%, #000, transparent 65%);
  mask-image: radial-gradient(ellipse at 80% 40%, #000, transparent 65%);
  opacity: 0.55;
}

.ph__ring {
  position: absolute;
  right: max(var(--gutter), calc((100% - var(--container)) / 2));
  top: 50%;
  z-index: -1;
  width: clamp(180px, 24vw, 300px);
  transform: translateY(-40%) rotate(-8deg);
  animation: ph-float 10s ease-in-out infinite;
}

@keyframes ph-float {
  50% {
    transform: translateY(-46%) rotate(-4deg);
  }
}

/* 有右側內容時：左文右卡片 */
.ph__layout--aside {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 400px);
  align-items: center;
  gap: clamp(32px, 5vw, 72px);
}

.ph__aside {
  min-width: 0;
  animation: ph-in 0.8s var(--ease-out) both 0.3s;
}

.ph__inner {
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
  /* 讓單行說明文字依內容寬度縮放字級（cqi） */
  container-type: inline-size;
}

/* 精簡版：上下留白較少 */
.ph--compact {
  padding: calc(var(--nav-h) + 28px) 0 24px;
}

.ph--compact /* 有右側內容時：左文右卡片 */
.ph__layout--aside {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 460px);
  align-items: center;
  gap: clamp(32px, 5vw, 72px);
}

.ph__aside {
  min-width: 0;
  animation: ph-in 0.8s var(--ease-out) both 0.3s;
}

.ph__inner {
  min-width: 0;
  gap: 14px;
}

.ph__crumbs ol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  font-size: 0.88rem;
  color: var(--c-text-2);
}

.ph__crumbs li {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.ph__crumbs a:hover {
  color: var(--c-text);
  text-decoration: underline;
  text-underline-offset: 4px;
}

.ph__eyebrow {
  animation: ph-in 0.8s var(--ease-out) both 0.05s;
}

.ph__title {
  max-width: 760px;
  font-size: clamp(2.3rem, 5.4vw, 4.2rem);
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: 0.03em;
  animation: ph-in 0.8s var(--ease-out) both 0.15s;
}

.ph__desc {
  max-width: 620px;
  font-size: 1.1rem;
  color: var(--c-text-2);
  animation: ph-in 0.8s var(--ease-out) both 0.25s;
}

/* 單行說明：不換行，字級最大 1.1rem，空間不足時依寬度縮小（--chars 為字數） */
.ph__line {
  display: block;
}

/* 有右側操作按鈕時：放大鏡縮小一點，下方留出按鈕的位置 */
.ph--action {
  --ring-w: clamp(150px, 17vw, 210px);
}

.ph--action .ph__ring {
  width: var(--ring-w);
}

.ph__action--deco {
  position: absolute;
  right: max(var(--gutter), calc((100% - var(--container)) / 2));
  top: calc(50% + var(--ring-w) * 0.51 - 14px);
  z-index: 2;
  display: flex;
  justify-content: center;
  width: var(--ring-w);
}

.ph__action--inline {
  display: none;
}

.ph__desc--line {
  max-width: none;
  white-space: nowrap;
  font-size: min(1.1rem, calc(100cqi / var(--chars)));
}

/* 手機：一行放不下時改為正常換行，避免字級縮得太小 */
@media (max-width: 600px) {
  .ph__line {
  display: block;
}

/* 有右側操作按鈕時：放大鏡縮小一點，下方留出按鈕的位置 */
.ph--action {
  --ring-w: clamp(150px, 17vw, 210px);
}

.ph--action .ph__ring {
  width: var(--ring-w);
}

.ph__action--deco {
  position: absolute;
  right: max(var(--gutter), calc((100% - var(--container)) / 2));
  top: calc(50% + var(--ring-w) * 0.51 - 14px);
  z-index: 2;
  display: flex;
  justify-content: center;
  width: var(--ring-w);
}

.ph__action--inline {
  display: none;
}

.ph__desc--line {
    white-space: normal;
    font-size: 1rem;
  }
}

@keyframes ph-in {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
}

@media (max-width: 960px) {
  .ph__layout--aside {
    grid-template-columns: minmax(0, 1fr);
  }

  .ph__aside {
    max-width: 520px;
  }
}

@media (max-width: 768px) {
  .ph__action--deco {
    display: none;
  }

  .ph__action--inline {
    display: block;
  }

  .ph__ring {
    top: auto;
    bottom: -40px;
    right: -40px;
    opacity: 0.5;
    animation: none;
    transform: rotate(-8deg);
  }
}
</style>
