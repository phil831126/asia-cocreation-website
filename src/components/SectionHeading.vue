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
  gap: 12px;
  max-width: 760px;
}

.sh--center {
  align-items: center;
  margin-inline: auto;
  text-align: center;
}

.sh__title {
  font-size: clamp(1.75rem, 3vw, 2.6rem);
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0.02em;
  text-wrap: balance;
}

.sh__desc {
  max-width: 620px;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--c-text-2);
}

/* 較矮的桌面螢幕再收緊，讓區塊完整放進一個畫面 */
@media (min-width: 1024px) and (max-height: 820px) {
  .sh {
    gap: 8px;
  }

  .sh__title {
    font-size: 2.1rem;
  }

  .sh__desc {
    font-size: 0.94rem;
  }
}
</style>
