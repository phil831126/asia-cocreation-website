<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import BaseButton from './BaseButton.vue'
import HeroDashboard from './HeroDashboard.vue'
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
      <div class="hero__orb"></div>
      <svg class="hero__lines" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <path d="M-40 720 C 260 640, 420 820, 720 700 S 1180 420, 1480 520" fill="none" stroke="#ffffff" stroke-opacity="0.1" />
        <path d="M-40 780 C 300 700, 480 880, 780 760 S 1200 500, 1480 600" fill="none" stroke="#F8BE20" stroke-opacity="0.45" />
        <line x1="0" y1="140" x2="1440" y2="140" stroke="#ffffff" stroke-opacity="0.05" />
        <line x1="760" y1="0" x2="760" y2="900" stroke="#ffffff" stroke-opacity="0.05" />
      </svg>
    </div>

    <div class="container hero__grid">
      <div class="hero__copy">
        <h1 id="hero-title" class="hero__title">
          <span v-for="(line, i) in hero.titleLines" :key="line" class="hero__line hero__in" :style="{ '--d': `${0.15 + i * 0.12}s` }">
            {{ splitLine(line).before }}<span v-if="splitLine(line).mark" class="hero__mark">{{ splitLine(line).mark }}</span>{{ splitLine(line).after }}
          </span>
        </h1>

        <p class="hero__sub hero__in" style="--d: 0.45s">{{ hero.subtitle }}</p>

        <div class="hero__actions hero__in" style="--d: 0.58s">
          <BaseButton :href="`#${hero.primaryCta.sectionId}`" @click.prevent="scrollToSection(hero.primaryCta.sectionId)">
            {{ hero.primaryCta.label }}
          </BaseButton>
        </div>

        <ul class="hero__tags hero__in" style="--d: 0.72s" aria-label="核心服務">
          <li v-for="s in services" :key="s.id">
            <RouterLink to="/about#services" class="hero__tag">
              <ServiceIcon :name="s.icon" :size="16" />
              {{ s.title }}
              <ArrowRight :size="14" class="hero__tag-arrow" aria-hidden="true" />
            </RouterLink>
          </li>
        </ul>
      </div>

      <div class="hero__visual hero__in" style="--d: 0.25s">
        <HeroDashboard />
      </div>
    </div>
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
  padding: calc(var(--nav-h) + 24px) 0 88px;
  /* 深灰背景：維持白字的閱讀對比（白字對最淺處約 6.6:1） */
  background: radial-gradient(ellipse 80% 60% at 75% 40%, #5c5c5c 0%, #4b4b4b 60%, #424242 100%);
  color: #fff;
  overflow: hidden;
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

/* 黃色漸層點陣 */
.hero__dots {
  position: absolute;
  right: -4%;
  top: 6%;
  width: 62%;
  height: 90%;
  background-image: radial-gradient(rgba(248, 190, 32, 0.55) 1.3px, transparent 1.5px);
  background-size: 18px 18px;
  -webkit-mask-image: radial-gradient(ellipse at 55% 45%, #000 0%, transparent 62%);
  mask-image: radial-gradient(ellipse at 55% 45%, #000 0%, transparent 62%);
  opacity: 0.35;
}

.hero__orb {
  position: absolute;
  left: -10%;
  bottom: -30%;
  width: 50%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(248, 190, 32, 0.14), transparent 65%);
}

.hero__lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(32px, 5vw, 80px);
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
  font-size: clamp(2.5rem, 5.2vw, 4.6rem);
  font-weight: 900;
  line-height: 1.18;
  letter-spacing: 0.03em;
}

.hero__line {
  display: block;
}

.hero__mark {
  color: var(--c-yellow);
}

.hero__sub {
  max-width: 520px;
  font-size: clamp(1.02rem, 1.3vw, 1.15rem);
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.72);
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
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.hero__tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  transition:
    background-color 0.3s,
    color 0.3s,
    transform 0.3s var(--ease-out);
}

.hero__tag:hover {
  background: var(--c-yellow);
  color: var(--c-text);
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
  max-width: 560px;
  justify-self: end;
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


@media (max-width: 1080px) {
  .hero__grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 48px;
  }

  .hero__visual {
    max-width: 640px;
    justify-self: stretch;
  }

  .hero__dots {
    width: 100%;
    height: 60%;
    right: 0;
    top: auto;
    bottom: 0;
  }

  .hero {
    min-height: auto;
    padding-bottom: 80px;
  }
}

@media (max-width: 560px) {
  .hero {
    padding-top: calc(var(--nav-h) + 24px);
    padding-bottom: 64px;
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
