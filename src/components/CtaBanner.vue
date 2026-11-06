<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import BaseButton from './BaseButton.vue'
import { ctaSection } from '@/data/home'

interface CtaLink {
  label: string
  to: string
}

/**
 * 合作邀請橫幅。不傳 content 時使用首頁預設文案（含合作流程）；
 * 個別頁面可傳入自己的標題、內文、標語與按鈕（例如關於我們頁）。
 */
const props = defineProps<{
  content?: {
    eyebrow?: string
    title: string
    /** 一段文字，或多段（字串陣列） */
    desc: string | string[]
    slogan?: string
    steps?: string[]
    primary: CtaLink
    secondary?: CtaLink
  }
}>()

const copy = computed(
  () =>
    props.content ?? {
      eyebrow: ctaSection.eyebrow,
      title: ctaSection.title,
      desc: ctaSection.desc,
      steps: ctaSection.steps,
      primary: ctaSection.button,
    },
)

const descParas = computed(() => (Array.isArray(copy.value.desc) ? copy.value.desc : [copy.value.desc]))

const box = ref<HTMLElement | null>(null)
const lens = ref<SVGCircleElement | null>(null)
const nodes: HTMLElement[] = []
const size = reactive({ w: 0, h: 0 })
const route = ref('')
let observer: ResizeObserver | null = null

/**
 * 虛線路徑：依序穿過四個流程節點，再彎進右側放大鏡的鏡片中心，
 * 讓流程與放大鏡的動態軌跡成為同一條線。
 */
function layoutRoute() {
  if (!box.value || !lens.value || nodes.length < 2) return
  const b = box.value.getBoundingClientRect()
  size.w = Math.round(b.width)
  size.h = Math.round(b.height)
  const center = (el: Element) => {
    const r = el.getBoundingClientRect()
    return { x: r.left - b.left + r.width / 2, y: r.top - b.top + r.height / 2 }
  }
  const pts = nodes.map(center)
  const first = pts[0]
  const last = pts[pts.length - 1]
  // 節點不在同一列（手機版換行）時不畫連線
  if (Math.abs(first.y - last.y) > 2) {
    route.value = ''
    return
  }
  const end = center(lens.value)
  const mid = (last.x + end.x) / 2
  route.value = `M ${first.x} ${first.y} L ${last.x} ${last.y} C ${mid} ${last.y}, ${mid} ${end.y}, ${end.x} ${end.y}`
}

onMounted(async () => {
  await nextTick()
  layoutRoute()
  if (box.value && 'ResizeObserver' in window) {
    observer = new ResizeObserver(layoutRoute)
    observer.observe(box.value)
  }
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section class="section cta-wrap" aria-labelledby="cta-title">
    <div class="container">
      <div ref="box" v-reveal class="cta">
        <!-- 流程與放大鏡共用的虛線軌跡 -->
        <svg class="cta__route" :viewBox="`0 0 ${size.w || 1} ${size.h || 1}`" aria-hidden="true">
          <path v-if="route" class="cta__trail" :d="route" />
        </svg>
        <span class="cta__glass" aria-hidden="true"></span>

        <div class="cta__content">
          <span v-if="copy.eyebrow" class="eyebrow cta__eyebrow">{{ copy.eyebrow }}</span>
          <h2 id="cta-title" class="cta__title">{{ copy.title }}</h2>
          <p v-for="(p, i) in descParas" :key="i" class="cta__desc">{{ p }}</p>
          <p v-if="copy.slogan" class="cta__slogan">{{ copy.slogan }}</p>

          <ol v-if="copy.steps?.length" class="cta__flow" aria-label="合作流程">
            <li v-for="(step, i) in copy.steps" :key="step" class="cta__step">
              <span :ref="(el) => { if (el) nodes[i] = el as HTMLElement }" class="num cta__node">0{{ i + 1 }}</span>
              <span class="cta__step-title">{{ step }}</span>
            </li>
          </ol>
        </div>

        <div class="cta__side">
          <svg class="cta__art" viewBox="0 0 520 420" aria-hidden="true">
            <path d="M-20 400 C 160 340, 240 250, 380 260 S 520 330, 560 250" fill="none" stroke="#ffffff" stroke-opacity="0.6" stroke-width="2" />
            <circle cx="330" cy="170" r="92" fill="rgba(255,255,255,0.28)" stroke="#222222" stroke-width="10" />
            <circle cx="330" cy="170" r="80" fill="none" stroke="#ffffff" stroke-opacity="0.7" stroke-width="1.5" />
            <path d="M398 238 L470 310" stroke="#222222" stroke-width="22" stroke-linecap="round" />
            <circle ref="lens" cx="300" cy="150" r="8" fill="#222222" />
            <circle cx="360" cy="190" r="5" fill="#222222" fill-opacity="0.5" />
            <line x1="300" y1="150" x2="360" y2="190" stroke="#222222" stroke-opacity="0.5" />
            <circle cx="490" cy="120" r="5" fill="#ffffff" />
          </svg>
          <div class="cta__btns">
            <BaseButton :to="copy.primary.to" variant="dark">{{ copy.primary.label }}</BaseButton>
            <BaseButton v-if="copy.secondary" :to="copy.secondary.to" variant="ghost">{{ copy.secondary.label }}</BaseButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-wrap {
  padding-block: var(--section-y);
}

.cta {
  position: relative;
  isolation: isolate;
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(24px, 4vw, 56px);
  padding: clamp(36px, 5vw, 64px) clamp(28px, 5vw, 72px);
  border-radius: var(--radius-xl);
  background:
    radial-gradient(circle at 85% 20%, rgba(255, 255, 255, 0.45), transparent 40%),
    linear-gradient(135deg, #ffcf45 0%, var(--c-yellow) 45%, #f2b10c 100%);
  overflow: hidden;
}

.cta::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -2;
  background-image: radial-gradient(rgba(34, 34, 34, 0.14) 1px, transparent 1.2px);
  background-size: 18px 18px;
  -webkit-mask-image: linear-gradient(90deg, transparent 30%, #000);
  mask-image: linear-gradient(90deg, transparent 30%, #000);
}

/* 虛線軌跡（流程 → 放大鏡） */
.cta__route {
  position: absolute;
  inset: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}

.cta__trail {
  fill: none;
  stroke: #222222;
  stroke-opacity: 0.4;
  stroke-width: 1.5;
  stroke-dasharray: 4 8;
  stroke-linecap: round;
  animation: trail 6s linear infinite;
}

@keyframes trail {
  to {
    stroke-dashoffset: -120;
  }
}

.cta__glass {
  position: absolute;
  left: 46%;
  bottom: -60px;
  z-index: -1;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.7);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}

.cta__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

.cta__eyebrow {
  color: var(--c-text);
}

.cta__eyebrow::before {
  background: var(--c-text);
  box-shadow: 0 0 0 4px rgba(34, 34, 34, 0.12);
}

.cta__title {
  font-size: clamp(2rem, 4vw, 3.2rem);
  text-wrap: balance;
  font-weight: 900;
  line-height: 1.25;
  letter-spacing: 0.02em;
}

.cta__desc {
  font-size: 1.05rem;
  color: #3a3a3a;
}

.cta__desc + .cta__desc {
  margin-top: 8px;
}

/* 流程：節點與階段主題 */
.cta__flow {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  width: 100%;
  margin-top: 12px;
}

.cta__step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
}

.cta__node {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.95);
  box-shadow:
    0 10px 24px -12px rgba(120, 80, 0, 0.5),
    inset 0 1px 0 #fff;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  font-size: 1rem;
  font-weight: 700;
  transition: transform 0.4s var(--ease-out);
}

.cta__step:hover .cta__node {
  transform: translateY(-3px);
}

.cta__step-title {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

/* 右側：放大鏡與按鈕 */
.cta__side {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cta__art {
  width: 100%;
  max-width: 420px;
}

.cta__btns {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: -8px;
}

/* 標語：黃底上的深色粗體，左側一道深色短線 */
.cta__slogan {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: clamp(1rem, 1.4vw, 1.15rem);
  font-weight: 700;
  letter-spacing: 0.04em;
}

.cta__slogan::before {
  content: '';
  flex: none;
  width: 28px;
  height: 3px;
  border-radius: 2px;
  background: var(--c-text);
}

@media (max-width: 900px) {
  .cta {
    grid-template-columns: 1fr;
  }

  .cta__side {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }

  .cta__art {
    width: 46%;
    max-width: 240px;
    order: 2;
  }

  .cta__btns {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 0;
  }
}

@media (max-width: 560px) {
  .cta__flow {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 18px;
  }
}
</style>
