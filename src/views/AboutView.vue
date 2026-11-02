<script setup lang="ts">
import { Landmark, Building2, UserRound, Search, Crosshair, Network, Sparkle } from '@lucide/vue'
import PageHeader from '@/components/PageHeader.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import ServiceIcon from '@/components/ServiceIcon.vue'
import BaseButton from '@/components/BaseButton.vue'
import CtaBanner from '@/components/CtaBanner.vue'
import { brand } from '@/data/site'
import { services } from '@/data/services'

const audiences = [
  { icon: Landmark, tag: 'B2G', title: '政府機關與委辦計畫', desc: '政府機關、政府委辦計畫承辦人。' },
  { icon: Building2, tag: 'B2B', title: '企業人才發展部門', desc: '企業人資、教育訓練及人才發展部門。' },
  { icon: UserRound, tag: 'B2C', title: '專業學習者', desc: '有專業學習需求的個人與學員。' },
]

const values = [
  { icon: Search, title: '探索知識', desc: '持續探索專業知識與學習方法。' },
  { icon: Crosshair, title: '聚焦需求', desc: '從合作單位的實際需求出發。' },
  { icon: Network, title: '連結資源', desc: '連結政府、企業與人才培育資源。' },
  { icon: Sparkle, title: '共創未來', desc: '與合作夥伴共同創造學習價值。' },
]
</script>

<template>
  <div class="page">
    <PageHeader
      eyebrow="About Us"
      title="關於我們"
      desc="以專業課程規劃與教育培訓服務，連結政府、企業與人才發展需求。"
      :crumbs="[{ label: '關於我們' }]"
    />

    <!-- 品牌介紹 -->
    <section class="section">
      <div class="container intro">
        <div v-reveal class="intro__lead">
          <span class="eyebrow">Brand</span>
          <h2 class="intro__name">{{ brand.name }}</h2>
          <p class="intro__company">{{ brand.company }}</p>
        </div>
        <div class="intro__body">
          <p v-reveal="100" class="intro__text">
            {{ brand.name }}（{{ brand.company }}）主要提供教育培訓、專業課程規劃及相關合作服務，核心服務包含政府計畫、企業內訓與品牌服務，並涵蓋產學合作與
            AI、行銷等專業課程領域。
          </p>
          <div v-reveal="200" class="intro__pending">
            <span class="pending-tag">待補</span>
            <p>品牌故事、成立沿革、團隊介紹等內容，待企業提供後補充。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 企業定位 / 服務對象 -->
    <section class="section section--alt">
      <div class="container">
        <SectionHeading eyebrow="Positioning" title="服務對象與企業定位" highlight="企業定位" desc="以政府、企業與專業學習者為主要服務對象。" />
        <ul class="aud">
          <li v-for="(a, i) in audiences" :key="a.title" v-reveal="i * 100" class="aud__item">
            <div class="aud__top">
              <span class="aud__icon"><component :is="a.icon" :size="22" :stroke-width="1.6" aria-hidden="true" /></span>
              <span class="num aud__tag">{{ a.tag }}</span>
            </div>
            <span class="aud__rank">優先順序 0{{ i + 1 }}</span>
            <h3 class="aud__title">{{ a.title }}</h3>
            <p class="aud__desc">{{ a.desc }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- 核心服務 -->
    <section id="services" class="section">
      <div class="container">
        <SectionHeading eyebrow="Services" title="核心服務" highlight="核心服務" />
        <div class="svc-rows">
          <article v-for="s in services" :id="`service-${s.id}`" :key="s.id" v-reveal class="svc-row">
            <span class="num svc-row__no">{{ s.no }}</span>
            <div class="svc-row__head">
              <span class="svc-row__icon"><ServiceIcon :name="s.icon" :size="26" /></span>
              <h3 class="svc-row__title">{{ s.title }}</h3>
            </div>
            <div class="svc-row__body">
              <p>{{ s.summary }}</p>
              <ul class="svc-row__points">
                <li v-for="p in s.points" :key="p">{{ p }}</li>
              </ul>
              <div class="svc-row__foot">
                <span class="pending-tag">詳細服務內容待補</span>
                <BaseButton :to="{ path: '/contact', query: { topic: s.id } }" size="sm" variant="ghost">洽詢{{ s.title }}</BaseButton>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 品牌理念 -->
    <section class="section section--alt">
      <div class="container">
        <SectionHeading
          eyebrow="Concept"
          title="以放大鏡為意象，聚焦每一份需求"
          highlight="聚焦每一份需求"
          desc="品牌視覺以放大鏡傳達探索、聚焦、連結與共創的精神。"
        />
        <ul class="values">
          <li v-for="(v, i) in values" :key="v.title" v-reveal="i * 90" class="values__item glass">
            <span class="num values__no">0{{ i + 1 }}</span>
            <component :is="v.icon" :size="26" :stroke-width="1.6" class="values__icon" aria-hidden="true" />
            <h3>{{ v.title }}</h3>
            <p>{{ v.desc }}</p>
          </li>
        </ul>
      </div>
    </section>

    <CtaBanner />
  </div>
</template>

<style scoped>
.intro {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
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

.intro__text {
  font-size: clamp(1.1rem, 1.6vw, 1.3rem);
  line-height: 2;
}

.intro__pending {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: 32px;
  padding: 20px 22px;
  border-radius: var(--radius-md);
  border: 1px dashed var(--c-gray-300);
  color: var(--c-text-2);
  font-size: 0.95rem;
}

.aud {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: var(--block-gap);
}

.aud__item {
  padding: 30px;
  border-radius: var(--radius-lg);
  background: #fff;
  transition:
    transform 0.5s var(--ease-out),
    box-shadow 0.5s var(--ease-out);
}

.aud__item:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-md);
}

.aud__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.aud__icon {
  display: grid;
  place-items: center;
  width: 50px;
  height: 50px;
  border-radius: var(--radius-md);
  background: var(--c-yellow-tint);
}

.aud__tag {
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--c-gray-300);
}

.aud__rank {
  display: block;
  margin-top: 28px;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  color: var(--c-text-3);
}

.aud__title {
  margin-top: 6px;
  font-size: 1.25rem;
}

.aud__desc {
  margin-top: 8px;
  color: var(--c-text-2);
}

.svc-rows {
  margin-top: var(--block-gap);
  border-top: 1px solid var(--c-line-strong);
}

.svc-row {
  display: grid;
  grid-template-columns: 90px 1fr 1.5fr;
  gap: 24px;
  padding: 40px 0;
  border-bottom: 1px solid var(--c-line-strong);
}

.svc-row__no {
  font-size: 2.4rem;
  font-weight: 300;
  line-height: 1;
  color: var(--c-gray);
}

.svc-row__head {
  display: flex;
  align-items: center;
  gap: 16px;
  align-self: start;
}

.svc-row__icon {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  background: var(--c-yellow);
}

.svc-row__title {
  font-size: 1.6rem;
  letter-spacing: 0.08em;
}

.svc-row__body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: var(--c-text-2);
}

.svc-row__points {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.svc-row__points li {
  padding: 4px 12px;
  border-radius: 999px;
  background: var(--c-bg-alt);
  font-size: 0.88rem;
}

.svc-row__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
}

.values {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin-top: var(--block-gap);
}

.values__item {
  position: relative;
  padding: 28px 24px;
  border-radius: var(--radius-lg);
}

.values__no {
  position: absolute;
  right: 20px;
  top: 18px;
  font-size: 0.85rem;
  color: var(--c-text-3);
}

.values__icon {
  padding: 10px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--c-yellow);
}

.values__item h3 {
  margin-top: 22px;
  font-size: 1.2rem;
  letter-spacing: 0.1em;
}

.values__item p {
  margin-top: 6px;
  font-size: 0.95rem;
  color: var(--c-text-2);
}

@media (max-width: 960px) {
  .intro {
    grid-template-columns: 1fr;
  }

  .aud {
    grid-template-columns: 1fr;
    margin-top: var(--block-gap);
  }

  .svc-row {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 32px 0;
  }

  .values {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .values {
    grid-template-columns: 1fr;
  }
}
</style>
