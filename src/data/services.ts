/* =========================================================
   三大服務項目
   ※ 介紹文字為依企業背景撰寫的示範內容，請於確認後修改。
     pending: true 代表內容尚待企業補充，畫面會顯示「待補」標記。
   ========================================================= */

export type ServiceIcon = 'landmark' | 'building' | 'sparkles'

export interface Service {
  id: string
  no: string
  icon: ServiceIcon
  title: string
  summary: string
  points: string[]
  pending?: boolean
}

export const services: Service[] = [
  {
    id: 'government',
    no: '01',
    icon: 'landmark',
    title: '政府委訓',
    summary: '提供政府委辦培訓、人才培育計畫及相關教育訓練服務，協助規劃課程內容與執行。',
    points: ['政府委辦培訓', '人才培育計畫', '教育訓練規劃'],
  },
  {
    id: 'enterprise',
    no: '02',
    icon: 'building',
    title: '企業內訓',
    summary: '依企業人才發展需求，規劃客製化的專業培訓課程，支持團隊持續成長。',
    points: ['客製化課程規劃', '專業培訓', '人才發展'],
  },
  {
    id: 'brand',
    no: '03',
    icon: 'sparkles',
    title: '品牌服務',
    summary: '與品牌、行銷相關的專業服務。詳細服務內容待企業確認後補充。',
    points: ['品牌相關服務', '行銷相關服務'],
    pending: true,
  },
]
