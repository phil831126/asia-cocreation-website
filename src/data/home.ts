/* =========================================================
   首頁文案
   ※ 以下為網站設計「示範文案」，並非企業確認之官方標語，
     請於取得正式文案後直接修改本檔。
   ========================================================= */

import type { Component } from 'vue'
import {
  ClipboardPen,
  Handshake,
  Megaphone,
  PencilRuler,
} from '@lucide/vue'

export const lecturersSection = {
  eyebrow: 'Lecturers & Consultants',
  title: '講師顧問聯盟',
  highlight: '顧問聯盟',
  desc: '集結逾百位合作業師，涵蓋職涯探索、品牌行銷與自媒體經營等領域。',
}

export const casesSection = {
  eyebrow: 'Case Studies',
  title: '讓每一次合作，成為共創的成果',
  highlight: '成為共創的成果',
  desc: '政府、產學與企業相關合作案例整理中，以下為版型示意。',
}

/* ---------- 講師經紀申請區（首頁「講師顧問聯盟」下方） ----------
   ※ 初版草稿文案，請確認後直接修改。按鈕前往聯絡我們，需求預選「講師經紀」並帶入申請留言。 */
export const lecturerApplySection = {
  eyebrow: 'Join Our Lecturers',
  title: '加入講師聯盟，讓專業走進更多課堂',
  highlight: '走進更多課堂',
  desc: '無論你專精品牌行銷、自媒體經營、職涯發展或 AI 應用，只要願意分享實務經驗，都歡迎加入亞洲共創的講師聯盟。',
  benefits: [
    {
      key: 'match',
      title: '課程媒合',
      desc: '依你的專長與授課形式，媒合企業內訓、政府計畫與大專院校的課程需求。',
      icon: Handshake as Component,
    },
    {
      key: 'plan',
      title: '課程規劃協作',
      desc: '與學院團隊一起調整課程主題、教材與實作安排，讓內容貼近學員的實際需要。',
      icon: PencilRuler as Component,
    },
    {
      key: 'exposure',
      title: '曝光與交流',
      desc: '在講師聯盟頁面呈現你的專長與經歷，也有機會與不同領域的業師交流合作。',
      icon: Megaphone as Component,
    },
  ],
  stepsTitle: '申請流程',
  steps: [
    { title: '填寫申請', desc: '留下聯絡方式與專長領域' },
    { title: '資料審閱', desc: '團隊了解你的經歷與授課主題' },
    { title: '面談交流', desc: '討論合作方向與授課形式' },
    { title: '加入聯盟', desc: '建立講師資料，開始媒合課程' },
  ],
  primary: { label: '申請加入講師聯盟', to: { path: '/contact', query: { topic: 'lecturer', apply: '1' } } },
  secondary: { label: '查看講師聯盟', to: '/lecturers' },
  /** 表單左上角的圖示 */
  icon: ClipboardPen as Component,
}

export const partnerWallSection = {
  eyebrow: 'Partners',
  title: '攜手合作，共創更多可能',
  highlight: '共創更多可能',
  desc: '與政府機關、大專院校及企業品牌攜手，推動教育培訓與人才發展。',
}

export const ctaSection = {
  eyebrow: "Let's Co-create",
  title: '下一段合作，從共創開始',
  desc: '從需求交流到專業培訓規劃，讓我們一起探索合作的可能。',
  /** 合作流程（建議的展示方式，實際作業依各合作案調整） */
  steps: ['需求了解', '課程規劃', '專案執行', '成果回饋'],
  button: { label: '聯絡我們', to: '/contact' },
}
