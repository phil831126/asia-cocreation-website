<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRight } from '@lucide/vue'
import type { RouteLocationRaw } from 'vue-router'

const props = withDefaults(
  defineProps<{
    to?: RouteLocationRaw
    href?: string
    variant?: 'primary' | 'dark' | 'ghost'
    size?: 'md' | 'sm'
    block?: boolean
    type?: 'button' | 'submit'
  }>(),
  { variant: 'primary', size: 'md', block: false, type: 'button' },
)

const classes = computed(() => [
  'btn',
  `btn--${props.variant}`,
  { 'btn--sm': props.size === 'sm', 'btn--block': props.block },
])
</script>

<template>
  <RouterLink v-if="to" :to="to" :class="classes">
    <span><slot /></span>
    <span class="btn__icon" aria-hidden="true"><ArrowRight :size="size === 'sm' ? 16 : 18" /></span>
  </RouterLink>
  <a v-else-if="href" :href="href" :class="classes">
    <span><slot /></span>
    <span class="btn__icon" aria-hidden="true"><ArrowRight :size="size === 'sm' ? 16 : 18" /></span>
  </a>
  <button v-else :type="type" :class="classes">
    <span><slot /></span>
    <span class="btn__icon" aria-hidden="true"><ArrowRight :size="size === 'sm' ? 16 : 18" /></span>
  </button>
</template>
