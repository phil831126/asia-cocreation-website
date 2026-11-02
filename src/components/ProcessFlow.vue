<script setup lang="ts">
import { ref } from 'vue'
import SectionHeading from './SectionHeading.vue'
import { processSteps } from '@/data/process'
import { processSection as copy } from '@/data/home'
import { useInView } from '@/composables/motion'

const listEl = ref<HTMLElement | null>(null)
const inView = useInView(listEl, 0.25)
</script>

<template>
  <section id="process" class="section section--alt flow">
    <div class="container">
      <SectionHeading :eyebrow="copy.eyebrow" :title="copy.title" :highlight="copy.highlight" :desc="copy.desc" />

      <div ref="listEl" class="flow__body" :class="{ 'is-active': inView }">
      <span class="flow__track" aria-hidden="true"><span class="flow__fill"></span></span>
      <ol class="flow__list">
        <li v-for="(step, i) in processSteps" :key="step.no" class="step" :style="{ '--i': i }">
          <div class="step__node" aria-hidden="true">
            <span class="step__glass"></span>
            <span class="step__core"></span>
          </div>
          <span class="num step__no">{{ step.no }}</span>
          <h3 class="step__title">{{ step.title }}</h3>
          <p class="step__desc">{{ step.desc }}</p>
        </li>
      </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.flow {
  overflow: hidden;
}

.flow__body {
  position: relative;
  margin-top: var(--block-gap);
}

.flow__list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

/* 連結細線：由第一個節點中心延伸至最後一個節點中心 */
.flow__track {
  position: absolute;
  top: 36px;
  left: 36px;
  right: calc(25% - 54px);
  height: 1px;
  background: var(--c-line-strong);
}

.flow__fill {
  position: absolute;
  inset: -1px 0;
  background: linear-gradient(90deg, var(--c-yellow), var(--c-yellow-deep));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 1.6s var(--ease-in-out) 0.2s;
}

.is-active .flow__fill {
  transform: scaleX(1);
}

.step {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-right: 12px;
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.8s var(--ease-out),
    transform 0.8s var(--ease-out);
  transition-delay: calc(var(--i) * 0.3s + 0.1s);
}

.is-active .step {
  opacity: 1;
  transform: none;
}

/* 玻璃裝置感節點 */
.step__node {
  position: relative;
  width: 72px;
  height: 72px;
}

.step__core {
  position: absolute;
  right: 6px;
  bottom: 6px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #ffe08a, var(--c-yellow) 55%, var(--c-yellow-deep));
  box-shadow: 0 8px 18px -6px rgba(224, 165, 0, 0.7);
  transition: transform 0.6s var(--ease-out);
}

.step__glass {
  position: absolute;
  inset: 0 14px 14px 0;
  z-index: 1;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.95);
  box-shadow:
    0 10px 24px -12px rgba(34, 34, 34, 0.3),
    inset 0 1px 0 #fff;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}

.step:nth-child(odd) .step__core {
  right: auto;
  left: 30px;
  bottom: 0;
  border-radius: 6px;
  transform: rotate(18deg);
}

.step:hover .step__core {
  transform: translate(4px, 4px) rotate(30deg);
}

.step__no {
  margin-top: 20px;
  font-size: 3rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.02em;
}

.step__title {
  margin-top: 14px;
  font-size: 1.3rem;
  letter-spacing: 0.08em;
}

.step__desc {
  margin-top: 10px;
  color: var(--c-text-2);
  font-size: 0.98rem;
}

@media (max-width: 960px) {
  .flow__list {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 48px;
  }

  .flow__track {
    display: none;
  }
}

/* 手機：垂直時間軸 */
@media (max-width: 640px) {
  .flow__body {
    margin-top: var(--block-gap);
  }

  .flow__list {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .flow__track {
    display: block;
    top: 24px;
    bottom: 60px;
    left: 24px;
    right: auto;
    width: 1px;
    height: auto;
  }

  .flow__fill {
    inset: 0 -1px;
    transform: scaleY(0);
    transform-origin: top;
  }

  .is-active .flow__fill {
    transform: scaleY(1);
  }

  .step {
    display: grid;
    grid-template-columns: 48px 1fr;
    column-gap: 20px;
    padding: 0 0 40px;
  }

  .step__node {
    grid-row: 1 / span 3;
    width: 48px;
    height: 48px;
  }

  .step__glass {
    inset: 0 8px 8px 0;
  }

  .step__core {
    width: 20px;
    height: 20px;
    right: 2px;
    bottom: 2px;
  }

  .step:nth-child(odd) .step__core {
    left: 22px;
  }

  .step__no {
    margin-top: 0;
    font-size: 2.2rem;
  }

  .step__title {
    margin-top: 8px;
  }
}
</style>
