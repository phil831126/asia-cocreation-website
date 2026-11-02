<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'

defineProps<{ eyebrow: string; title: string; desc?: string; crumbs?: { label: string; to?: string }[] }>()
</script>

<template>
  <section class="ph">
    <div class="ph__dots" aria-hidden="true"></div>
    <svg class="ph__ring" viewBox="0 0 300 300" aria-hidden="true">
      <circle cx="130" cy="130" r="92" fill="rgba(255,255,255,0.5)" stroke="#d6d6d3" stroke-width="12" />
      <circle cx="130" cy="130" r="40" fill="#F8BE20" fill-opacity="0.35" />
      <circle cx="130" cy="130" r="14" fill="#F8BE20" />
      <path d="M198 198 L262 262" stroke="#9a9a98" stroke-width="20" stroke-linecap="round" />
    </svg>
    <div class="container ph__inner">
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
      <p v-if="desc" class="ph__desc">{{ desc }}</p>
      <slot />
    </div>
  </section>
</template>

<style scoped>
.ph {
  position: relative;
  isolation: isolate;
  padding: calc(var(--nav-h) + clamp(56px, 8vw, 110px)) 0 clamp(56px, 7vw, 96px);
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

.ph__inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
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

@keyframes ph-in {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
}

@media (max-width: 768px) {
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
