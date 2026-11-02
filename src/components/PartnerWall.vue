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
        <span v-reveal="200" class="pending-tag">合作單位資料待補</span>
      </div>
      <ul class="wall__grid">
        <li v-for="(p, i) in partners" :key="p.id" v-reveal="(i % 5) * 60">
          <PartnerLogo :partner="p" :index="i" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.wall__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: var(--block-gap);
}

.wall__grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}

@media (max-width: 1024px) {
  .wall__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .wall__head {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: var(--block-gap);
  }

  .wall__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}
</style>
