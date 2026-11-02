<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import BaseButton from '@/components/BaseButton.vue'
</script>

<template>
  <div class="page">
    <PageHeader eyebrow="404" title="找不到這個頁面" desc="頁面可能已移除，或網址輸入有誤。">
      <BaseButton to="/">回到首頁</BaseButton>
    </PageHeader>
  </div>
</template>
