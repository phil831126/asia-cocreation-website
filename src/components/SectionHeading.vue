<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    /** 標題中要以黃底線強調的片段 */
    highlight?: string
    desc?: string
    align?: 'left' | 'center'
    as?: 'h1' | 'h2'
    id?: string
  }>(),
  { align: 'left', as: 'h2' },
)

const parts = computed(() => {
  const { title, highlight } = props
  const i = highlight ? title.indexOf(highlight) : -1
  if (!highlight || i < 0) return { before: title, mark: '', after: '' }
  return { before: title.slice(0, i), mark: highlight, after: title.slice(i + highlight.length) }
})
</script>

<template>
  <div class="sh" :class="`sh--${align}`">
    <span v-if="eyebrow" v-reveal class="eyebrow">{{ eyebrow }}</span>
    <component :is="as" :id="id" v-reveal="80" class="sh__title">
      {{ parts.before }}<span v-if="parts.mark" class="highlight">{{ parts.mark }}</span>{{ parts.after }}
    </component>
    <p v-if="desc" v-reveal="160" class="sh__desc">{{ desc }}</p>
    <slot />
  </div>
</template>

<style scoped>
.sh {
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 760px;
}

.sh--center {
  align-items: center;
  margin-inline: auto;
  text-align: center;
}

.sh__title {
  font-size: clamp(1.85rem, 3.6vw, 3rem);
  font-weight: 700;
  line-height: 1.32;
  letter-spacing: 0.02em;
  text-wrap: balance;
}

.sh__desc {
  max-width: 620px;
  font-size: 1.06rem;
  color: var(--c-text-2);
}
</style>
