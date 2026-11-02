<script setup lang="ts">
import { ArrowRight, ArrowDown } from 'lucide-vue-next'
import BaseButton from './BaseButton.vue'
import MagnifierVisual from './MagnifierVisual.vue'
import ServiceIcon from './ServiceIcon.vue'
import { hero } from '@/data/home'
import { services } from '@/data/services'
import { scrollToSection } from '@/composables/motion'

function splitLine(line: string) {
  const i = line.indexOf(hero.titleHighlight)
  if (i < 0) return { before: line, mark: '', after: '' }
  return { before: line.slice(0, i), mark: hero.titleHighlight, after: line.slice(i + hero.titleHighlight.length) }
}
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__bg" aria-hidden="true">
      <div class="hero__dots"></div>
      <svg class="hero__lines" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <path d="M-40 720 C 260 640, 420 820, 720 700 S 1180 420, 1480 520" fill="none" stroke="#888888" stroke-opacity="0.18" />
        <path d="M-40 780 C 300 700, 480 880, 780 760 S 1200 500, 1480 600" fill="none" stroke="#F8BE20" stroke-opacity="0.45" />
        <line x1="0" y1="140" x2="1440" y2="140" stroke="#222222" stroke-opacity="0.04" />
        <line x1="960" y1="0" x2="960" y2="900" stroke="#222222" stroke-opacity="0.04" />
      </svg>
    </div>

    <div class="container hero__grid">
      <div class="hero__copy">
        <span class="eyebrow hero__in" style="--d: 0.05s">{{ hero.eyebrow }}</span>

        <h1 id="hero-title" class="hero__title">
          <span v-for="(line, i) in hero.titleLines" :key="line" class="hero__line hero__in" :style="{ '--d': `${0.15 + i * 0.12}s` }">
            {{ splitLine(line).before }}<span v-if="splitLine(line).mark" class="highlight">{{ splitLine(line).mark }}</span>{{ splitLine(line).after }}
          </span>
        </h1>

        <p class="hero__sub hero__in" style="--d: 0.45s">{{ hero.subtitle }}</p>

        <div class="hero__actions hero__in" style="--d: 0.58s">
          <BaseButton :href="`#${hero.primaryCta.sectionId}`" @click.prevent="scrollToSection(hero.primaryCta.sectionId)">
            {{ hero.primaryCta.label }}
          </BaseButton>
          <BaseButton :to="hero.secondaryCta.to" variant="ghost">{{ hero.secondaryCta.label }}</BaseButton>
        </div>

        <ul class="hero__tags hero__in" style="--d: 0.72s" aria-label="核心服務">
          <li v-for="s in services" :key="s.id">
            <RouterLink :to="`/about#service-${s.id}`" class="hero__tag">
              <ServiceIcon :name="s.icon" :size="16" />
              {{ s.title }}
              <ArrowRight :size="14" class="hero__tag-arrow" aria-hidden="true" />
            </RouterLink>
          </li>
        </ul>
      </div>

      <div class="hero__visual hero__in" style="--d: 0.2s">
        <MagnifierVisual :keywords="hero.keywords" />
      </div>
    </div>

    <a href="#achievements" class="hero__scroll" @click.prevent="scrollToSection('achievements')">
      <span>向下探索</span>
      <span class="hero__scroll-line" aria-hidden="true"><ArrowDown :size="14" /></span>
    </a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: min(100svh, 960px);
  padding: calc(var(--nav-h) + 40px) 0 96px;
  background: linear-gradient(180deg, #fff 0%, #fbfbf9 70%, #fff 100%);
  overflow: hidden;
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

/* 範例 3：黃色漸層點陣 */
.hero__dots {
  position: absolute;
  right: -4%;
  top: 6%;
  width: 62%;
  height: 90%;
  background-image: radial-gradient(rgba(224, 165, 0, 0.6) 1.4px, transparent 1.6px);
  background-size: 18px 18px;
  -webkit-mask-image: radial-gradient(ellipse at 55% 45%, #000 0%, transparent 62%);
  mask-image: radial-gradient(ellipse at 55% 45%, #000 0%, transparent 62%);
  opacity: 0.4;
}

.hero__lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.hero__grid {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  align-items: center;
  gap: clamp(24px, 4vw, 64px);
}

.hero__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 26px;
}

.hero__title {
  display: flex;
  flex-direction: column;
  font-size: clamp(2.5rem, 5.4vw, 4.75rem);
  font-weight: 900;
  line-height: 1.18;
  letter-spacing: 0.03em;
}

.hero__line {
  display: block;
}

.hero__sub {
  max-width: 520px;
  font-size: clamp(1.02rem, 1.3vw, 1.15rem);
  line-height: 1.9;
  color: var(--c-text-2);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 6px;
}

.hero__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
  padding-top: 26px;
  border-top: 1px solid var(--c-line);
}

.hero__tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  border-radius: 999px;
  background: var(--c-bg-alt);
  font-size: 0.9rem;
  font-weight: 500;
  transition:
    background-color 0.3s,
    transform 0.3s var(--ease-out);
}

.hero__tag:hover {
  background: var(--c-yellow-tint);
  transform: translateY(-2px);
}

.hero__tag-arrow {
  width: 0;
  opacity: 0;
  margin-left: -8px;
  transition:
    width 0.3s var(--ease-out),
    opacity 0.3s,
    margin 0.3s var(--ease-out);
}

.hero__tag:hover .hero__tag-arrow {
  width: 14px;
  opacity: 1;
  margin-left: 0;
}

.hero__visual {
  width: 100%;
  max-width: 600px;
  justify-self: center;
}

/* 載入時逐步淡入 */
.hero__in {
  animation: hero-in 1s var(--ease-out) both;
  animation-delay: var(--d, 0s);
}

@keyframes hero-in {
  from {
    opacity: 0;
    transform: translateY(24px);
    filter: blur(6px);
  }
}

.hero__scroll {
  position: absolute;
  left: 50%;
  bottom: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 0.78rem;
  letter-spacing: 0.2em;
  color: var(--c-text-3);
  transform: translateX(-50%);
}

.hero__scroll-line {
  display: grid;
  place-items: center;
  width: 30px;
  height: 46px;
  border: 1px solid var(--c-line-strong);
  border-radius: 999px;
}

.hero__scroll-line svg {
  animation: nudge 2s ease-in-out infinite;
}

@keyframes nudge {
  50% {
    transform: translateY(6px);
  }
}

@media (max-width: 960px) {
  .hero {
    min-height: auto;
    padding-bottom: 72px;
  }

  .hero__grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .hero__visual {
    order: -1;
    max-width: 440px;
  }

  .hero__dots {
    width: 100%;
    height: 60%;
    right: 0;
  }

  .hero__scroll {
    display: none;
  }
}

@media (max-width: 560px) {
  .hero {
    padding-top: calc(var(--nav-h) + 8px);
  }

  .hero__visual {
    max-width: 340px;
  }

  .hero__actions {
    width: 100%;
  }

  .hero__actions :deep(.btn) {
    flex: 1 1 100%;
    justify-content: space-between;
  }
}
</style>
