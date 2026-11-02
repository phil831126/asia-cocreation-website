<script setup lang="ts">
import { computed } from 'vue'

/**
 * 滾輪式數字：每一位數由 0 向上滾動，最後停在指定數字。
 * active 由 false 變為 true 時開始滾動。
 */
const props = withDefaults(defineProps<{ value: number; active: boolean; suffix?: string }>(), { suffix: '' })

const DIGITS = Array.from({ length: 20 }, (_, i) => i % 10)

const chars = computed(() =>
  props.value
    .toLocaleString('zh-TW')
    .split('')
    .map((ch) => ({ ch, digit: /\d/.test(ch) ? Number(ch) : null })),
)
</script>

<template>
  <span class="roll" :class="{ 'is-active': active }" aria-hidden="true">
    <template v-for="(c, i) in chars" :key="i">
      <span v-if="c.digit !== null" class="roll__col">
        <span
          class="roll__strip"
          :style="{
            transform: `translateY(${active ? -(10 + c.digit) * 1.1 : 0}em)`,
            transitionDelay: `${0.3 + i * 0.12}s`,
          }"
        >
          <span v-for="(d, j) in DIGITS" :key="j" class="roll__digit">{{ d }}</span>
        </span>
      </span>
      <span v-else class="roll__sep">{{ c.ch }}</span>
    </template>
    <span v-if="suffix" class="roll__sep">{{ suffix }}</span>
  </span>
</template>

<style scoped>
.roll {
  display: inline-flex;
  align-items: flex-start;
}

.roll__col {
  display: inline-block;
  height: 1.1em;
  overflow: hidden;
}

.roll__strip {
  display: flex;
  flex-direction: column;
  transition: transform 1.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.roll__digit,
.roll__sep {
  display: block;
  height: 1.1em;
  line-height: 1.1em;
  text-align: center;
}
</style>
