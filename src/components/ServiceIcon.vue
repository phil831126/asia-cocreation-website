<script setup lang="ts">
import { computed } from 'vue'
import { Landmark, Building2, Sparkles } from '@lucide/vue'
import type { ServiceIcon } from '@/data/services'

const props = withDefaults(defineProps<{ name: ServiceIcon; size?: number }>(), { size: 24 })
const map = { landmark: Landmark, building: Building2, sparkles: Sparkles }
const icon = computed(() => map[props.name])
</script>

<template>
  <component :is="icon" :size="size" :stroke-width="1.6" aria-hidden="true" />
</template>
