<script setup lang="ts">
import {
  ArrowRight,
  BrainCircuit,
  Building2,
  Crosshair,
  Handshake,
  Landmark,
  Network,
  Share2,
  SlidersHorizontal,
  Sprout,
  TrendingUp,
  Wrench,
} from '@lucide/vue'
import PageHeader from '@/components/PageHeader.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import CtaBanner from '@/components/CtaBanner.vue'
import { brand } from '@/data/site'
import { aboutFeatures, aboutHero, aboutIntro, aboutInvite, aboutServices, aboutValues } from '@/data/about'

const valueIcons: Record<string, unknown> = { create: Handshake, share: Share2, good: Sprout }
const serviceIcons: Record<string, unknown> = { gov: Landmark, enterprise: Building2, ai: BrainCircuit, career: TrendingUp }
const featureIcons: Record<string, unknown> = {
  need: Crosshair,
  integrate: Network,
  practice: Wrench,
  flexible: SlidersHorizontal,
}
</script>

<template>
  <div class="page">
    <PageHeader :eyebrow="aboutHero.eyebrow" :title="aboutHero.title" :crumbs="[{ label: '關於我們' }]" />

    <!-- 1. 品牌介紹 -->
    <section class="section">
      <div class="container intro">
        <div v-reveal class="intro__lead">
          <span class="eyebrow">Brand</span>
          <h2 class="intro__name">{{ brand.name }}</h2>
          <p class="intro__company">{{ brand.company }}</p>
        </div>
        <div class="intro__body">
          <p
            v-for="(p, i) in aboutIntro"
            :key="i"
            v-reveal="i * 100"
            class="intro__text"
            :class="{ 'intro__text--lead': i === 0 }"
          >
            {{ p }}
          </p>
        </div>
      </div>
    </section>

    <!-- 2. 品牌核心理念 -->
    <section class="section section--alt">
      <div class="container">
        <SectionHeading :eyebrow="aboutValues.eyebrow" :title="aboutValues.title" align="center" />
        <ul class="values">
          <li v-for="(v, i) in aboutValues.items" :key="v.key" v-reveal="i * 120" class="value">
            <span class="value__icon">
              <component :is="valueIcons[v.key]" :size="26" :stroke-width="1.6" aria-hidden="true" />
            </span>
            <p class="value__word"><span class="highlight">{{ v.word }}</span></p>
            <h3 class="value__title">{{ v.title }}</h3>
            <p class="value__desc">{{ v.desc }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- 3. 我們的專業服務（圖文交錯） -->
    <section id="services" class="section">
      <div class="container">
        <SectionHeading
          :eyebrow="aboutServices.eyebrow"
          :title="aboutServices.title"
          :highlight="aboutServices.highlight"
          :desc="aboutServices.desc"
        />
        <div class="svc">
          <article
            v-for="(s, i) in aboutServices.items"
            :id="`service-${s.id}`"
            :key="s.id"
            class="svc__row"
            :class="{ 'svc__row--flip': i % 2 === 1 }"
          >
            <!-- 示意圖：以品牌色與服務圖示組成，不使用與內容無關的照片 -->
            <div v-reveal class="svc__visual" aria-hidden="true">
              <span class="svc__ring svc__ring--a"></span>
              <span class="svc__ring svc__ring--b"></span>
              <span class="num svc__big">{{ s.no }}</span>
              <span class="svc__icon glass">
                <component :is="serviceIcons[s.id]" :size="34" :stroke-width="1.5" />
              </span>
            </div>
            <div v-reveal="120" class="svc__body">
              <span class="num svc__no">{{ s.no }}</span>
              <h3 class="svc__title">{{ s.title }}</h3>
              <p class="svc__desc">{{ s.desc }}</p>
              <ul class="svc__tags">
                <li v-for="t in s.tags" :key="t">{{ t }}</li>
              </ul>
              <RouterLink :to="{ path: '/contact', query: { topic: s.contactTopic } }" class="link-arrow svc__link">
                洽詢此服務 <ArrowRight :size="16" aria-hidden="true" />
              </RouterLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 4. 我們的特色 -->
    <section class="section section--alt">
      <div class="container">
        <SectionHeading :eyebrow="aboutFeatures.eyebrow" :title="aboutFeatures.title" :highlight="aboutFeatures.highlight" />
        <ul class="features">
          <li v-for="(f, i) in aboutFeatures.items" :key="f.key" v-reveal="i * 90" class="feature glass">
            <span class="num feature__no">0{{ i + 1 }}</span>
            <span class="feature__icon">
              <component :is="featureIcons[f.key]" :size="24" :stroke-width="1.6" aria-hidden="true" />
            </span>
            <h3 class="feature__title">{{ f.title }}</h3>
            <p class="feature__desc">{{ f.desc }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- 5. 合作邀請 -->
    <CtaBanner :content="aboutInvite" />
  </div>
</template>

<style scoped>
/* ---------- 1. 品牌介紹 ---------- */
.intro {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: clamp(32px, 6vw, 96px);
}

.intro__lead {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.intro__name {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  letter-spacing: 0.06em;
}

.intro__company {
  color: var(--c-text-2);
  letter-spacing: 0.1em;
}

.intro__body {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.intro__text {
  color: var(--c-text-2);
  font-size: clamp(1rem, 1.3vw, 1.08rem);
  line-height: 2;
}

.intro__text--lead {
  color: var(--c-text);
  font-size: clamp(1.15rem, 1.8vw, 1.4rem);
  font-weight: 600;
  line-height: 1.85;
}

/* ---------- 2. 品牌核心理念 ---------- */
.values {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: var(--block-gap);
}

.value {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: clamp(26px, 3vw, 36px);
  border: 1px solid var(--c-line);
  border-radius: var(--radius-lg);
  background: #fff;
  transition:
    transform 0.5s var(--ease-out),
    box-shadow 0.5s var(--ease-out),
    border-color 0.3s;
}

.value:hover {
  border-color: transparent;
  box-shadow: var(--shadow-md);
  transform: translateY(-6px);
}

.value__icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: var(--radius-md);
  background: var(--c-yellow-tint);
  transition: background-color 0.3s;
}

.value:hover .value__icon {
  background: var(--c-yellow);
}

.value__word {
  margin-top: 22px;
  font-size: clamp(2rem, 3.4vw, 2.6rem);
  font-weight: 900;
  letter-spacing: 0.12em;
  line-height: 1.2;
}

.value__title {
  margin-top: 10px;
  font-size: 1.15rem;
}

.value__desc {
  margin-top: 8px;
  color: var(--c-text-2);
}

/* ---------- 3. 專業服務（圖文交錯） ---------- */
.svc {
  display: flex;
  flex-direction: column;
  gap: clamp(40px, 6vw, 72px);
  margin-top: var(--block-gap);
}

.svc__row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  align-items: center;
  gap: clamp(28px, 5vw, 72px);
  scroll-margin-top: calc(var(--nav-h) + 24px);
}

.svc__row--flip .svc__visual {
  order: 2;
}

.svc__visual {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: var(--radius-xl);
  background:
    radial-gradient(circle at 78% 22%, rgba(255, 255, 255, 0.55), transparent 45%),
    linear-gradient(140deg, var(--c-yellow-soft), var(--c-yellow) 55%, var(--c-yellow-deep));
}

.svc__row:nth-child(even) .svc__visual {
  background:
    radial-gradient(circle at 22% 25%, rgba(248, 190, 32, 0.35), transparent 50%),
    linear-gradient(140deg, #5c5c5c, #3e3e3e);
}

.svc__ring {
  position: absolute;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.55);
}

.svc__ring--a {
  width: 62%;
  aspect-ratio: 1;
}

.svc__ring--b {
  width: 40%;
  aspect-ratio: 1;
  border-style: dashed;
  border-color: rgba(255, 255, 255, 0.4);
}

.svc__big {
  position: absolute;
  right: 6%;
  bottom: -4%;
  font-size: clamp(5rem, 11vw, 9rem);
  font-weight: 700;
  line-height: 1;
  color: rgba(255, 255, 255, 0.35);
}

.svc__icon {
  position: relative;
  display: grid;
  place-items: center;
  width: 84px;
  height: 84px;
  border-radius: 24px;
  color: var(--c-text);
  transition: transform 0.5s var(--ease-out);
}

.svc__row:hover .svc__icon {
  transform: translateY(-6px) rotate(-4deg);
}

.svc__body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
}

.svc__no {
  color: var(--c-yellow-deep);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.18em;
}

.svc__title {
  font-size: clamp(1.4rem, 2.4vw, 1.9rem);
  letter-spacing: 0.04em;
}

.svc__desc {
  color: var(--c-text-2);
  line-height: 1.95;
}

.svc__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.svc__tags li {
  padding: 4px 14px;
  border-radius: 999px;
  background: var(--c-bg-alt);
  font-size: 0.86rem;
}

.svc__link {
  margin-top: 6px;
}

/* ---------- 4. 我們的特色 ---------- */
.features {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin-top: var(--block-gap);
}

.feature {
  position: relative;
  padding: 28px 24px;
  border-radius: var(--radius-lg);
  transition:
    transform 0.5s var(--ease-out),
    box-shadow 0.5s var(--ease-out);
}

.feature:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-6px);
}

.feature__no {
  position: absolute;
  top: 18px;
  right: 20px;
  color: var(--c-text-3);
  font-size: 0.85rem;
}

.feature__icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--c-yellow);
}

.feature__title {
  margin-top: 22px;
  font-size: 1.2rem;
  letter-spacing: 0.1em;
}

.feature__desc {
  margin-top: 6px;
  color: var(--c-text-2);
  font-size: 0.95rem;
}

/* ---------- 平板 ---------- */
@media (max-width: 960px) {
  .intro {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .values {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .svc__row {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  /* 手機與平板一律圖在上、文在下 */
  .svc__row--flip .svc__visual {
    order: 0;
  }

  .svc__visual {
    aspect-ratio: 16 / 7;
  }

  .features {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 640px) and (max-width: 960px) {
  .values {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* ---------- 手機 ---------- */
@media (max-width: 560px) {
  .features {
    grid-template-columns: 1fr;
  }

  .svc__icon {
    width: 68px;
    height: 68px;
    border-radius: 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .value,
  .feature,
  .svc__icon {
    transition: none;
  }
}
</style>
