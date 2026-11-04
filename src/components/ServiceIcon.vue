<script setup lang="ts">
import { computed } from 'vue'
import { GraduationCap, Mic, Megaphone } from '@lucide/vue'
import type { ServiceIcon } from '@/data/services'

const props = withDefaults(defineProps<{ name: ServiceIcon; size?: number }>(), { size: 24 })
const map = { graduation: GraduationCap, mic: Mic, megaphone: Megaphone }
const icon = computed(() => map[props.name])
</script>

<template>
  <component :is="icon" :size="size" :stroke-width="1.6" aria-hidden="true" />
</template>
