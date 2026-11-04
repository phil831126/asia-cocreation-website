<script setup lang="ts">
import AppNavbar from './components/AppNavbar.vue'
import AppFooter from './components/AppFooter.vue'
import FaqWidget from './components/FaqWidget.vue'
</script>

<template>
  <a class="skip-link" href="#main">跳至主要內容</a>
  <AppNavbar />
  <main id="main" tabindex="-1">
    <RouterView :key="$route.path" />
  </main>
  <AppFooter />
  <FaqWidget />
</template>

<style>
#main:focus {
  outline: none;
}
</style>
