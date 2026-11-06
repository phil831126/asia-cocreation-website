<script setup lang="ts">
/*
 * SECTION 03｜教學理念：行銷內容 → 行銷數據 → AI 輔助 → AI 素養 × SEL
 * 桌機為橫向路徑（四欄），平板與手機改為垂直流程。
 * 捲動到這一區時，路徑線段與節點依序亮起。
 */
import { ref } from 'vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { useInView } from '@/composables/motion'
import { aboutTeaching as copy } from '@/data/about'

const list = ref<HTMLElement | null>(null)
const on = useInView(list, 0.2)
</script>

<template>
  <section class="section teach" aria-labelledby="teach-title">
    <div class="container">
      <SectionHeading id="teach-title" :eyebrow="copy.eyebrow" :title="copy.title" />

      <ol ref="list" class="teach__path" :class="{ 'is-on': on }">
        <li
          v-for="(s, i) in copy.stages"
          :key="s.key"
          class="stage"
          :class="{ 'stage--future': s.future }"
          :style="{ '--i': i }"
        >
          <div class="stage__head">
            <span class="stage__node">
              <component :is="s.icon" :size="26" :stroke-width="1.6" aria-hidden="true" />
            </span>
            <span class="stage__path">{{ s.pathLabel }}</span>
          </div>

          <article class="stage__card">
            <p class="stage__step">
              {{ s.step }}
              <span v-if="s.future" class="stage__tag">{{ copy.futureTag }}</span>
            </p>
            <h3 class="stage__title">{{ s.title }}</h3>
            <p class="stage__body">{{ s.body }}</p>
          </article>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.teach__path {
  --node: 64px;
  --gap: 20px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--gap);
  margin-top: calc(var(--block-gap) + 12px);
}

.stage {
  position: relative;
  display: flex;
  flex-direction: column;
}

/* ---------- 節點與路徑線 ---------- */
.stage__head {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding-left: 22px;
}

/* 灰色底線：從本節點連到下一個節點 */
.stage:not(:last-child) .stage__head::before,
.stage:not(:last-child) .stage__head::after {
  content: '';
  position: absolute;
  top: calc(var(--node) / 2);
  left: calc(22px + var(--node));
  width: calc(100% + var(--gap) - var(--node));
  height: 2px;
  transform-origin: left;
}

.stage:not(:last-child) .stage__head::before {
  background: var(--c-gray-200);
}

/* 黃色線段：捲動到此區時依序畫出 */
.stage:not(:last-child) .stage__head::after {
  background: var(--c-yellow);
  transform: scaleX(0);
  transition: transform 0.7s var(--ease-out);
  transition-delay: calc(var(--i) * 0.45s + 0.35s);
}

.is-on .stage:not(:last-child) .stage__head::after {
  transform: scaleX(1);
}

/* 通往「未來探索」的線段改為虛線 */
.stage:nth-last-child(2) .stage__head::before {
  background: repeating-linear-gradient(90deg, var(--c-gray-300) 0 6px, transparent 6px 12px);
}

.stage:nth-last-child(2) .stage__head::after {
  background: repeating-linear-gradient(90deg, var(--c-yellow-deep) 0 6px, transparent 6px 12px);
}

.stage__node {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: var(--node);
  height: var(--node);
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--c-gray-200);
  color: var(--c-text-3);
  transition:
    background-color 0.5s var(--ease-out),
    border-color 0.5s var(--ease-out),
    color 0.5s var(--ease-out),
    transform 0.5s var(--ease-out);
  transition-delay: calc(var(--i) * 0.45s);
}

.is-on .stage__node {
  background: var(--c-yellow);
  border-color: var(--c-yellow);
  color: var(--c-text);
}

.is-on .stage--future .stage__node {
  background: #fff;
  border-style: dashed;
  border-color: var(--c-yellow-deep);
}

.stage:hover .stage__node {
  transform: scale(1.06);
}

.stage__path {
  font-weight: 700;
  letter-spacing: 0.04em;
}

/* ---------- 階段卡片 ---------- */
.stage__card {
  flex: 1;
  margin-top: 20px;
  padding: 24px 22px 26px;
  border: 1px solid var(--c-line);
  border-radius: var(--radius-lg);
  background: #fff;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.7s var(--ease-out),
    transform 0.7s var(--ease-out),
    box-shadow 0.4s var(--ease-out),
    border-color 0.3s;
  transition-delay: calc(var(--i) * 0.45s + 0.1s), calc(var(--i) * 0.45s + 0.1s), 0s, 0s;
}

.is-on .stage__card {
  opacity: 1;
  transform: none;
}

.stage__card:hover {
  border-color: transparent;
  box-shadow: var(--shadow-md);
}

/* 未來探索：虛線框與淡黃底，與已開設的課程區分 */
.stage--future .stage__card {
  border: 1.5px dashed var(--c-yellow-deep);
  background: linear-gradient(160deg, #fff 40%, var(--c-yellow-tint));
}

.stage__step {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  color: var(--c-text-3);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.stage__tag {
  padding: 2px 10px;
  border-radius: 999px;
  background: var(--c-text);
  color: #fff;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
}

.stage__title {
  margin-top: 10px;
  font-size: 1.15rem;
  line-height: 1.55;
}

.stage__body {
  margin-top: 12px;
  color: var(--c-text-2);
  font-size: 0.97rem;
  line-height: 1.95;
}

/* ---------- 平板與手機：垂直流程 ---------- */
@media (max-width: 1199px) {
  .teach__path {
    --node: 56px;
    --gap: 28px;
    grid-template-columns: minmax(0, 1fr);
    max-width: 820px;
  }

  .stage {
    display: grid;
    grid-template-columns: var(--node) minmax(0, 1fr);
    column-gap: 20px;
  }

  .stage__head {
    display: contents;
  }

  .stage__node {
    grid-column: 1;
    grid-row: 1 / span 2;
  }

  .stage__path {
    grid-column: 2;
    grid-row: 1;
    align-self: center;
    min-height: var(--node);
    display: flex;
    align-items: center;
  }

  .stage__card {
    grid-column: 2;
    grid-row: 2;
    margin-top: 8px;
  }

  /* 垂直線：從節點往下連到下一個節點 */
  .stage:not(:last-child)::before,
  .stage:not(:last-child)::after {
    content: '';
    position: absolute;
    left: calc(var(--node) / 2 - 1px);
    top: var(--node);
    bottom: calc(var(--gap) * -1);
    width: 2px;
    transform-origin: top;
  }

  .stage:not(:last-child)::before {
    background: var(--c-gray-200);
  }

  .stage:not(:last-child)::after {
    background: var(--c-yellow);
    transform: scaleY(0);
    transition: transform 0.7s var(--ease-out);
    transition-delay: calc(var(--i) * 0.45s + 0.35s);
  }

  .is-on .stage:not(:last-child)::after {
    transform: scaleY(1);
  }

  .stage:nth-last-child(2)::before {
    background: repeating-linear-gradient(180deg, var(--c-gray-300) 0 6px, transparent 6px 12px);
  }

  .stage:nth-last-child(2)::after {
    background: repeating-linear-gradient(180deg, var(--c-yellow-deep) 0 6px, transparent 6px 12px);
  }

  /* 橫向線段不用 */
  .stage:not(:last-child) .stage__head::before,
  .stage:not(:last-child) .stage__head::after {
    display: none;
  }
}

@media (max-width: 767px) {
  .teach__path {
    --node: 48px;
    --gap: 24px;
  }

  .stage {
    column-gap: 14px;
  }

  .stage__node :deep(svg) {
    width: 22px;
    height: 22px;
  }

  .stage__card {
    padding: 20px 18px 22px;
  }

  .stage__body {
    font-size: 0.96rem;
  }
}
</style>
