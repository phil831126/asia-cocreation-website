<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, X, ArrowUpRight } from 'lucide-vue-next'
import BrandLogo from './BrandLogo.vue'
import BaseButton from './BaseButton.vue'
import { navItems } from '@/data/site'

const route = useRoute()
const scrolled = ref(false)
const open = ref(false)
const headerEl = ref<HTMLElement | null>(null)

function isActive(to: string) {
  return to === '/' ? route.path === '/' : route.path.startsWith(to)
}

let openedAtY = 0
watch(open, (v) => v && (openedAtY = window.scrollY))

function onScroll() {
  scrolled.value = window.scrollY > 24
  // 行動版選單開啟後捲動頁面即自動收合
  if (open.value && Math.abs(window.scrollY - openedAtY) > 60) open.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) open.value = false
}

function onClickOutside(e: MouseEvent) {
  if (open.value && headerEl.value && !headerEl.value.contains(e.target as Node)) open.value = false
}

watch(() => route.fullPath, () => (open.value = false))

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  document.addEventListener('click', onClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  document.removeEventListener('click', onClickOutside)
})
</script>

<template>
  <header ref="headerEl" class="nav" :class="{ 'is-scrolled': scrolled || open, 'is-open': open }">
    <div class="nav__wrap">
      <div class="nav__bar">
        <RouterLink to="/" class="nav__brand" aria-label="亞洲共創學院 回到首頁">
          <BrandLogo />
        </RouterLink>

        <nav class="nav__pill" aria-label="主要導覽">
          <ul>
            <li v-for="item in navItems" :key="item.to">
              <RouterLink
                :to="item.to"
                class="nav__link"
                :class="{ 'is-active': isActive(item.to) }"
                :aria-current="isActive(item.to) ? 'page' : undefined"
              >
                {{ item.label }}
              </RouterLink>
            </li>
          </ul>
        </nav>

        <BaseButton to="/contact" size="sm" variant="dark" class="nav__cta">洽詢合作</BaseButton>

        <button
          type="button"
          class="nav__toggle"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          :aria-label="open ? '關閉選單' : '開啟選單'"
          @click.stop="open = !open"
        >
          <X v-if="open" :size="22" />
          <Menu v-else :size="22" />
        </button>
      </div>

      <Transition name="menu">
        <nav v-show="open" id="mobile-menu" class="nav__mobile" aria-label="行動版導覽">
          <ul>
            <li v-for="(item, i) in navItems" :key="item.to" :style="{ '--i': i }">
              <RouterLink
                :to="item.to"
                class="nav__mlink"
                :class="{ 'is-active': isActive(item.to) }"
                :aria-current="isActive(item.to) ? 'page' : undefined"
              >
                <span class="num nav__mnum">0{{ i + 1 }}</span>
                <span>{{ item.label }}</span>
                <ArrowUpRight :size="18" class="nav__marrow" aria-hidden="true" />
              </RouterLink>
            </li>
          </ul>
          <BaseButton to="/contact" variant="primary" block>洽詢合作</BaseButton>
        </nav>
      </Transition>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 100;
  padding-top: 14px;
  transition: padding 0.4s var(--ease-out);
}

.nav.is-scrolled {
  padding-top: 10px;
}

.nav__wrap {
  width: calc(100% - var(--gutter) * 2);
  max-width: var(--container);
  margin-inline: auto;
  border: 1px solid transparent;
  border-radius: 32px;
  transition:
    background-color 0.4s,
    border-color 0.4s,
    box-shadow 0.4s,
    -webkit-backdrop-filter 0.4s,
    backdrop-filter 0.4s;
}

.nav.is-scrolled .nav__wrap {
  background: rgba(255, 255, 255, 0.72);
  border-color: rgba(255, 255, 255, 0.9);
  box-shadow:
    0 14px 40px -20px rgba(34, 34, 34, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  -webkit-backdrop-filter: blur(22px) saturate(170%);
  backdrop-filter: blur(22px) saturate(170%);
}

.nav__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  height: 64px;
  padding: 0 10px 0 18px;
  transition: height 0.4s var(--ease-out);
}

.nav.is-scrolled .nav__bar {
  height: 58px;
}

.nav__brand {
  display: inline-flex;
  border-radius: 12px;
}

/* 膠囊式導覽 */
.nav__pill ul {
  display: flex;
  gap: 2px;
  padding: 5px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(34, 34, 34, 0.07);
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
  transition:
    background-color 0.4s,
    border-color 0.4s;
}

.nav.is-scrolled .nav__pill ul {
  background: rgba(239, 239, 236, 0.7);
  border-color: transparent;
}

.nav__link {
  position: relative;
  display: block;
  padding: 8px 18px;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--c-text-2);
  transition:
    color 0.25s,
    background-color 0.25s;
}

.nav__link:hover {
  color: var(--c-text);
  background: rgba(255, 255, 255, 0.9);
}

.nav__link.is-active {
  color: var(--c-text);
  font-weight: 700;
  background: var(--c-yellow);
  box-shadow: 0 6px 16px -8px rgba(224, 165, 0, 0.8);
}

.nav__toggle {
  display: none;
  place-items: center;
  width: 46px;
  height: 46px;
  border: 1px solid var(--c-line);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: background-color 0.25s;
}

.nav__toggle:hover {
  background: var(--c-yellow-tint);
}

/* 行動版選單 */
.nav__mobile {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 6px 14px 18px;
}

.nav__mobile ul {
  border-top: 1px solid var(--c-line);
}

.nav__mlink {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 6px;
  border-bottom: 1px solid var(--c-line);
  font-size: 1.1rem;
  font-weight: 500;
}

.nav__mnum {
  font-size: 0.8rem;
  color: var(--c-text-3);
}

.nav__marrow {
  margin-left: auto;
  color: var(--c-text-3);
  transition: transform 0.3s var(--ease-out);
}

.nav__mlink:hover .nav__marrow {
  transform: translate(2px, -2px);
  color: var(--c-text);
}

.nav__mlink.is-active {
  font-weight: 700;
}

.nav__mlink.is-active .nav__mnum {
  color: var(--c-text);
  background: var(--c-yellow);
  padding: 0 6px;
  border-radius: 6px;
}

.menu-enter-active,
.menu-leave-active {
  transition:
    opacity 0.3s var(--ease-out),
    transform 0.3s var(--ease-out);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 1080px) {
  .nav__link {
    padding: 8px 14px;
  }
}

@media (max-width: 960px) {
  .nav__pill,
  .nav__cta {
    display: none;
  }

  .nav__toggle {
    display: grid;
  }

  .nav__bar {
    padding: 0 8px 0 14px;
  }
}

@media (min-width: 961px) {
  .nav__mobile {
    display: none !important;
  }
}
</style>
