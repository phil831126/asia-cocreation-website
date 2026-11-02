<script setup lang="ts">
import PartnerLogo from './PartnerLogo.vue'
import { partners } from '@/data/partners'
import { partnersStrip } from '@/data/home'
</script>

<template>
  <section class="strip" aria-labelledby="partners-strip-title">
    <div class="container strip__inner">
      <div class="strip__label">
        <h2 id="partners-strip-title" class="strip__title">{{ partnersStrip.label }}</h2>
        <span class="pending-tag">{{ partnersStrip.note }}</span>
      </div>
      <div class="marquee">
        <div class="marquee__track">
          <ul v-for="n in 2" :key="n" class="marquee__group" :aria-hidden="n === 2 ? 'true' : undefined">
            <li v-for="(p, i) in partners" :key="p.id">
              <PartnerLogo :partner="p" :index="i" variant="strip" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.strip {
  border-block: 1px solid var(--c-line);
  background: #fff;
}

.strip__inner {
  display: flex;
  align-items: center;
  gap: 32px;
  padding-block: 18px;
}

.strip__label {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex: none;
  padding-right: 32px;
  border-right: 1px solid var(--c-line);
}

.strip__title {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.marquee {
  position: relative;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}

.marquee__track {
  display: flex;
  width: max-content;
  animation: marquee 48s linear infinite;
}

.marquee:hover .marquee__track,
.marquee:focus-within .marquee__track {
  animation-play-state: paused;
}

.marquee__group {
  display: flex;
  gap: 16px;
  padding-right: 16px;
}

@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}

@media (max-width: 768px) {
  .strip__inner {
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
  }

  .strip__label {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-right: 0;
    border-right: 0;
  }

  .marquee__track {
    animation-duration: 36s;
  }
}

/* 減少動態：改為可手動橫向捲動 */
@media (prefers-reduced-motion: reduce) {
  .marquee {
    overflow-x: auto;
    -webkit-mask-image: none;
    mask-image: none;
  }

  .marquee__track {
    animation: none !important;
  }

  .marquee__group[aria-hidden='true'] {
    display: none;
  }
}
</style>
