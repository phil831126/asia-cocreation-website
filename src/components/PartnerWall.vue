<script setup lang="ts">
import { computed } from 'vue'
import SectionHeading from './SectionHeading.vue'
import PartnerLogo from './PartnerLogo.vue'
import { partners } from '@/data/partners'
import { partnerWallSection as copy } from '@/data/home'

/** 跑馬燈排數；Logo 依序平均分到各排，奇數排向左、偶數排向右 */
const ROWS = 4

/** 每個 Logo 約停留的秒數：每排 Logo 數不同時，捲動速度仍一致 */
const SECONDS_PER_LOGO = 3.6

const rows = computed(() => {
  const base = Math.floor(partners.length / ROWS)
  const extra = partners.length % ROWS
  let start = 0
  return Array.from({ length: ROWS }, (_, r) => {
    const size = base + (r < extra ? 1 : 0)
    const row = partners.slice(start, start + size)
    start += size
    return row
  }).filter((row) => row.length)
})
</script>

<template>
  <section id="partners" class="section section--alt wall">
    <div class="container">
      <div class="wall__head">
        <SectionHeading :eyebrow="copy.eyebrow" :title="copy.title" :highlight="copy.highlight" :desc="copy.desc" />
      </div>

      <div v-reveal="120" class="wall__frame">
        <div class="marquee" aria-label="合作單位">
          <div
            v-for="(row, r) in rows"
            :key="r"
            class="marquee__row"
            :class="{ 'is-reverse': r % 2 === 1 }"
            :style="{ '--dur': `${row.length * SECONDS_PER_LOGO}s` }"
          >
            <ul class="marquee__track">
              <li v-for="(p, i) in row" :key="p.id">
                <PartnerLogo :partner="p" :index="i" />
              </li>
            </ul>
            <!-- 複製一份接在後面，讓捲動可以無縫循環；不給螢幕報讀器與鍵盤重複讀取 -->
            <ul class="marquee__track marquee__track--clone" aria-hidden="true" inert>
              <li v-for="(p, i) in row" :key="p.id">
                <PartnerLogo :partner="p" :index="i" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.wall__head {
  margin-bottom: var(--block-gap);
}

/* 包住所有 Logo 的大框 */
.wall__frame {
  overflow: hidden;
  padding-block: clamp(12px, 2vh, 22px);
  border: 1px solid var(--c-line);
  border-radius: var(--radius-xl);
  background: #fff;
  box-shadow:
    0 24px 50px -32px rgba(34, 34, 34, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.marquee {
  --logo-gap: 16px;
  display: flex;
  flex-direction: column;
  /* 左右兩端在框內淡出 */
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
}

.marquee__row {
  display: flex;
  overflow: hidden;
  /* 預留 Logo 滑過時上浮的空間 */
  padding-block: 4px;
}

.marquee__track {
  display: flex;
  flex: none;
  gap: var(--logo-gap);
  padding-right: var(--logo-gap);
  animation: marquee var(--dur, 60s) linear infinite;
}

.marquee__row.is-reverse .marquee__track {
  animation-direction: reverse;
}

/* 滑過或用鍵盤聚焦時暫停，方便看清楚 */
.marquee__row:hover .marquee__track,
.marquee__row:focus-within .marquee__track {
  animation-play-state: paused;
}

@keyframes marquee {
  to {
    transform: translateX(-100%);
  }
}

/* 開啟「減少動態效果」時不自動捲動，改為可左右手動滑動 */
@media (prefers-reduced-motion: reduce) {
  .marquee {
    -webkit-mask-image: none;
    mask-image: none;
  }

  .marquee__row {
    overflow-x: auto;
    padding-inline: 16px;
  }

  .marquee__track {
    animation: none;
  }

  .marquee__track--clone {
    display: none;
  }
}

@media (max-width: 768px) {
  .wall__frame {
    border-radius: var(--radius-lg);
  }

  .marquee {
    --logo-gap: 10px;
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
    mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
  }
}
</style>
