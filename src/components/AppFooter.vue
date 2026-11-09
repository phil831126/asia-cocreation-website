<script setup lang="ts">
import { ArrowUp } from '@lucide/vue'
import BrandLogo from './BrandLogo.vue'
import { brand, footerNavItems, contact, footerContactFields } from '@/data/site'
import { prefersReducedMotion } from '@/composables/motion'

const year = new Date().getFullYear()

/** 服務時間的午休說明（全形括號起）換到下一行，其餘欄位維持一行 */
function footLines(key: string, value: string) {
  if (key !== 'hours') return [value]
  const i = value.indexOf('（')
  return i > 0 ? [value.slice(0, i).trim(), value.slice(i)] : [value]
}

function backToTop() {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}
</script>

<template>
  <footer class="foot">
    <svg class="foot__curves" viewBox="0 0 1200 400" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 300 C 300 180, 520 380, 820 220 S 1120 60, 1200 120" fill="none" stroke="#F8BE20" stroke-opacity="0.55" stroke-width="2" />
      <path d="M0 340 C 280 240, 560 400, 860 270 S 1140 130, 1200 170" fill="none" stroke="#F8BE20" stroke-opacity="0.3" stroke-width="1.5" />
      <path d="M0 380 C 320 300, 600 420, 900 320 S 1150 200, 1200 230" fill="none" stroke="#888888" stroke-opacity="0.2" stroke-width="1" />
    </svg>
    <span class="foot__orb" aria-hidden="true"></span>

    <div class="container">
      <div class="foot__grid">
        <div class="foot__brand">
          <RouterLink to="/" aria-label="亞洲共創學院 回到首頁" class="foot__logo">
            <BrandLogo show-company />
          </RouterLink>
          <p class="foot__intro">{{ brand.intro }}</p>
        </div>

        <nav class="foot__col" aria-labelledby="foot-sitemap">
          <h2 id="foot-sitemap" class="foot__heading">網站地圖</h2>
          <ul>
            <li v-for="item in footerNavItems" :key="item.to">
              <RouterLink :to="item.to" class="foot__link">{{ item.label }}</RouterLink>
            </li>
          </ul>
        </nav>

        <div class="foot__col">
          <h2 class="foot__heading">聯絡資訊</h2>
          <dl class="foot__contact">
            <!-- 依序顯示：聯絡電話、電子郵件、公司地址、服務時間（順序在 site.ts 的 footerOrder） -->
            <div v-for="f in footerContactFields" :key="f.key">
              <dt>{{ f.label }}</dt>
              <dd>
                <a v-if="f.href" :href="f.href" class="foot__tel">{{ contact[f.key] }}</a>
                <template v-else>
                  <span v-for="(line, i) in footLines(f.key, contact[f.key])" :key="i" class="foot__line">{{ line }}</span>
                </template>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div class="foot__bottom">
        <p>© {{ year }} {{ brand.company }}｜版權所有</p>
        <p class="foot__demo">本網站目前為展示版本（DEMO），部分資料待補。</p>
        <button type="button" class="foot__top" aria-label="回到頁面頂端" @click="backToTop">
          <ArrowUp :size="18" />
        </button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.foot {
  position: relative;
  isolation: isolate;
  padding-top: var(--section-y);
  background: var(--c-bg-alt);
  overflow: hidden;
}

.foot__curves {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  width: 100%;
  height: 240px;
  opacity: 0.8;
}

.foot__orb {
  position: absolute;
  right: 6%;
  top: -80px;
  z-index: -1;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(248, 190, 32, 0.28), transparent 70%);
  filter: blur(10px);
}

.foot__grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1.3fr;
  gap: 48px;
  padding-bottom: 56px;
}

.foot__logo {
  display: inline-flex;
  border-radius: 12px;
}

.foot__intro {
  max-width: 380px;
  margin-top: 22px;
  font-size: 0.95rem;
  color: var(--c-text-2);
}

.foot__heading {
  margin-bottom: 18px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--c-text-3);
}

.foot__col ul {
  display: grid;
  gap: 10px;
}

.foot__link {
  position: relative;
  font-weight: 500;
  transition: color 0.25s;
}

.foot__link::before {
  content: '';
  position: absolute;
  left: -14px;
  top: 50%;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--c-yellow);
  transform: translateY(-50%) scale(0);
  transition: transform 0.3s var(--ease-out);
}

.foot__link:hover::before {
  transform: translateY(-50%) scale(1);
}

.foot__contact {
  display: grid;
  gap: 12px;
  margin: 0;
}

.foot__contact div {
  display: grid;
  grid-template-columns: 96px 1fr;
  align-items: start;
  gap: 12px;
}

.foot__contact dt {
  font-size: 0.9rem;
  color: var(--c-text-2);
}

.foot__contact dd {
  margin: 0;
  overflow-wrap: anywhere;
}

/* 點擊撥號：與全站文字連結相同，滑過時黃色底線展開 */
.foot__tel {
  padding-bottom: 2px;
  font-weight: 600;
  background: linear-gradient(var(--c-yellow), var(--c-yellow)) left bottom / 0 2px no-repeat;
  transition: background-size 0.4s var(--ease-out);
}

.foot__tel:hover,
.foot__tel:focus-visible {
  background-size: 100% 2px;
}

.foot__bottom {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 24px;
  padding-block: 24px;
  border-top: 1px solid var(--c-line);
  font-size: 0.88rem;
  color: var(--c-text-2);
}

.foot__demo {
  color: var(--c-text-3);
}

.foot__top {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  margin-left: auto;
  border: 1px solid var(--c-line-strong);
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.3s var(--ease-out);
}

.foot__top:hover {
  background: var(--c-yellow);
  transform: translateY(-3px);
}

@media (max-width: 960px) {
  .foot__grid {
    grid-template-columns: 1fr 1fr;
  }

  .foot__brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 560px) {
  .foot__grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .foot__top {
    position: absolute;
    right: var(--gutter);
    top: 24px;
  }
}

/* 一個欄位分成多行（例如服務時間的午休說明） */
.foot__line {
  display: block;
}
</style>
