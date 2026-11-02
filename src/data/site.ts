/* =========================================================
   全站基本設定：品牌、導覽、聯絡資訊、SEO
   ※ 空字串代表「尚未提供」，畫面會自動顯示「待補」標記
   ========================================================= */

export const brand = {
  name: '亞洲共創學院',
  company: '亞洲共創股份有限公司',
  /**
   * 正式 Logo：請將檔案放在 public/brand/ 後填入路徑，例如 '/brand/logo.svg'
   * 留空時使用暫代的放大鏡標誌（非正式 Logo）
   */
  logoSrc: '',
  logoAlt: '亞洲共創學院 Logo',
  intro: '亞洲共創學院提供教育培訓、專業課程規劃及相關合作服務，連結政府、企業與人才發展需求。',
}

export interface NavItem {
  label: string
  to: string
}

export const navItems: NavItem[] = [
  { label: '首頁', to: '/' },
  { label: '關於我們', to: '/about' },
  { label: '學習地圖', to: '/learning-map' },
  { label: '案例分享', to: '/cases' },
  { label: '聯絡我們', to: '/contact' },
]

/** 聯絡資訊：尚未提供，請勿填入未經確認的資料 */
export const contact = {
  phone: '',
  email: '',
  address: '',
  hours: '',
}

export const contactFields: { key: keyof typeof contact; label: string }[] = [
  { key: 'phone', label: '聯絡電話' },
  { key: 'email', label: '電子郵件' },
  { key: 'address', label: '公司地址' },
  { key: 'hours', label: '服務時間' },
]

export const PENDING_TEXT = '待補'

/** 各頁 SEO 標題與描述 */
export const pageMeta: Record<string, { title: string; description: string }> = {
  home: {
    title: '亞洲共創學院｜聚焦專業，連結學習與產業',
    description:
      '亞洲共創學院（亞洲共創股份有限公司）提供政府計畫、企業內訓與品牌服務，透過專業課程規劃與教育培訓，連結政府、企業與人才發展需求。',
  },
  about: {
    title: '關於我們｜亞洲共創學院',
    description: '認識亞洲共創學院的品牌定位、服務對象與核心服務。',
  },
  learningMap: {
    title: '學習地圖｜亞洲共創學院',
    description: '探索亞洲共創學院 AI、行銷等專業課程領域，課程內容陸續更新。',
  },
  cases: {
    title: '案例分享｜亞洲共創學院',
    description: '瀏覽亞洲共創學院在政府計畫、產學合作與企業內訓的合作案例。',
  },
  caseDetail: {
    title: '案例詳情｜亞洲共創學院',
    description: '亞洲共創學院合作案例詳情。',
  },
  contact: {
    title: '聯絡我們｜亞洲共創學院',
    description: '與亞洲共創學院洽詢政府計畫、企業內訓、品牌服務與產學合作。',
  },
  notFound: {
    title: '找不到頁面｜亞洲共創學院',
    description: '您要找的頁面不存在。',
  },
}
