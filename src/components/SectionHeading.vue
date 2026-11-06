<script setup lang="ts">
import { computed } from 'vue'
import { splitPhrases } from '@/composables/phrases'

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

/** 依標點切成短句，換行時不拆開詞語 */
const phrases = computed(() => splitPhrases(props.title, props.highlight))
</script>

<template>
  <div class="sh" :class="`sh--${align}`">
    <span v-if="eyebrow" v-reveal class="eyebrow">{{ eyebrow }}</span>
    <component :is="as" :id="id" v-reveal="80" class="sh__title">
<span v-for="(p, i) in phrases" :key="i" class="sh__phrase">{{ p.before }}<span v-if="p.mark" class="highlight">{{ p.mark }}</span>{{ p.after }}</span>
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

.sh__phrase {
  display: inline-block;
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
