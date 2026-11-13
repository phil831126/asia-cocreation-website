<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, X, ArrowUpRight } from '@lucide/vue'
import BaseButton from './BaseButton.vue'
import { brand, navItems } from '@/data/site'

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
  <header
    ref="headerEl"
    class="nav"
    :class="{ 'is-scrolled': scrolled || open, 'is-open': open }"
  >
    <div class="nav__wrap">
      <div class="nav__bar">
        <RouterLink to="/" class="nav__brand" aria-label="亞洲共創學院 回到首頁">
          <img :src="brand.navLogoSrc" :alt="brand.navLogoAlt" class="nav__logo" width="282" height="240" />
          <span class="nav__name">{{ brand.name }}</span>
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

        <BaseButton to="/contact" size="sm" variant="dark" class="nav__cta">聯絡我們</BaseButton>

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
          <BaseButton to="/contact" variant="primary" block>聯絡我們</BaseButton>
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
  /* 固定在畫面頂端的整條白底導覽列（所有頁面一致，不隨捲動移動或縮放） */
  background: #fff;
  border-bottom: 1px solid var(--c-line);
  transition: box-shadow 0.3s;
}

/* 往下捲動後加一道淡淡的陰影，與下方內容區隔 */
.nav.is-scrolled {
  box-shadow: 0 8px 24px -16px rgba(34, 34, 34, 0.3);
}

/* 滿版：Logo 靠左、聯絡我們靠右，選單置中 */
.nav__wrap {
  width: 100%;
  padding-inline: clamp(14px, 2.4vw, 36px);
}

.nav__bar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
  height: 76px;
}

.nav__cta {
  justify-self: end;
}

.nav__brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  justify-self: start;
  border-radius: 12px;
}

/* Logo 旁的粗體校名 */
.nav__name {
  font-size: 1.3rem;
  font-weight: 900;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

/* 圖文一體的 Logo（字樣在圖示下方），高度接近導覽列本體 */
.nav__logo {
  display: block;
  width: auto;
  height: 60px;
  transition: transform 0.5s var(--ease-out);
}

.nav__brand:hover .nav__logo {
  transform: scale(1.04);
}

/* 膠囊式導覽 */
.nav__pill ul {
  display: flex;
  gap: 2px;
  padding: 5px;
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
  background: var(--c-gray-100);
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
    display: flex;
    justify-content: space-between;
  }
}

@media (max-width: 400px) {
  .nav__name {
    font-size: 1.1rem;
    letter-spacing: 0.03em;
  }
}

@media (min-width: 961px) {
  .nav__mobile {
    display: none !important;
  }
}
</style>
