<script setup lang="ts">
import SectionHeading from './SectionHeading.vue'
import PartnerLogo from './PartnerLogo.vue'
import { partners } from '@/data/partners'
import { partnerWallSection as copy } from '@/data/home'
</script>

<template>
  <section id="partners" class="section section--alt wall">
    <div class="container">
      <div class="wall__head">
        <SectionHeading :eyebrow="copy.eyebrow" :title="copy.title" :highlight="copy.highlight" :desc="copy.desc" />
      </div>

      <!-- 包住所有 Logo 的大框；靜態排列，不做動畫 -->
      <div class="wall__frame">
        <ul class="wall__grid" aria-label="合作單位">
          <li v-for="(p, i) in partners" :key="p.id">
            <PartnerLogo :partner="p" :index="i" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.wall__head {
  margin-bottom: var(--block-gap);
}

.wall__frame {
  padding: clamp(14px, 2.4vh, 28px) clamp(16px, 3vw, 40px);
  border: 1px solid var(--c-line);
  border-radius: var(--radius-xl);
  background: #fff;
  box-shadow:
    0 24px 50px -32px rgba(34, 34, 34, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

/* 每排 7 個（與原始簡報相同），最後一排置中 */
.wall__grid {
  --cols: 7;
  --gap-x: clamp(8px, 1.4vw, 20px);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: clamp(2px, 0.6vh, 8px) var(--gap-x);
}

.wall__grid > li {
  flex: 0 0 calc((100% - (var(--cols) - 1) * var(--gap-x)) / var(--cols));
}

@media (max-width: 860px) {
  .wall__grid {
    --cols: 5;
  }
}

@media (max-width: 600px) {
  .wall__frame {
    border-radius: var(--radius-lg);
  }

  .wall__grid {
    --cols: 3;
  }
}
</style>
