/* =========================================================
   全站基本設定：品牌、導覽、聯絡資訊、SEO
   ※ 空字串代表「尚未提供」，畫面會自動顯示「待補」標記
   ========================================================= */

export const brand = {
  name: '亞洲共創學院',
  company: '亞洲共創股份有限公司',
  /** 品牌標誌圖示（不含文字），顯示在「亞洲共創學院」字樣左側；留空時使用暫代的放大鏡圖示 */
  markSrc: '/brand/logo-mark.png',
  /**
   * 含文字的完整 Logo（圖文一體）：填入後會取代「圖示＋文字」整組，例如 '/brand/logo.svg'
   */
  logoSrc: '',
  logoAlt: '亞洲共創學院 Logo',
  /** 導覽列使用的 Logo（圖示＋「亞洲共創 Asia Alliance」字樣，透明背景） */
  navLogoSrc: '/brand/logo-asia-alliance.png',
  navLogoAlt: '亞洲共創 Asia Alliance',
  intro: '亞洲共創學院提供教育培訓、專業課程規劃及相關合作服務，連結政府、企業與人才發展需求。',
}

export interface NavItem {
  label: string
  to: string
}

/** 頂部導覽列（「聯絡我們」由右側按鈕前往，不重複列出） */
export const navItems: NavItem[] = [
  { label: '首頁', to: '/' },
  { label: '關於亞創', to: '/about' },
  { label: '講師聯盟', to: '/lecturers' },
  { label: '趨勢專欄', to: '/trends' },
  { label: '學習地圖', to: '/learning-map' },
  { label: '案例分享', to: '/cases' },
]

/** 頁尾網站地圖：保留「聯絡我們」 */
export const footerNavItems: NavItem[] = [...navItems, { label: '聯絡我們', to: '/contact' }]

/* ---------- 聯絡資訊（全站共用：頁尾、聯絡我們頁） ----------
   ※ 請勿自行增加未經提供的聯絡資料。空字串＝尚未確認。
   - 電話：來自第三方公開電話簿，尚未取得公司直接確認
   - 地址：只以文字顯示，不提供地圖導航連結
   - 電子郵件、服務時間：由企業提供（2026/11） */
export const contact = {
  phone: '02-2704-2040',
  email: 'asia.alliance2020@gmail.com',
  address: '臺北市大安區仁愛路4段396之1號1樓',
  hours: '每周一至五 09:00-18:00（12:00-13:00午休）',
}

/** 點擊撥號連結（國際格式） */
export const phoneHref = 'tel:+886227042040'

export type ContactKey = keyof typeof contact

export const contactFields: { key: ContactKey; label: string; href?: string; footer: boolean }[] = [
  { key: 'phone', label: '聯絡電話', href: phoneHref, footer: true },
  { key: 'email', label: '電子郵件', href: 'mailto:asia.alliance2020@gmail.com', footer: true },
  { key: 'address', label: '公司地址', footer: true },
  { key: 'hours', label: '服務時間', footer: false },
]

/** 頁尾聯絡資訊的顯示順序：聯絡電話 → 公司地址 → 電子郵件 */
const footerOrder: ContactKey[] = ['phone', 'address', 'email']

/** 頁尾顯示的聯絡項目：只列出已填寫、且允許顯示在頁尾的資料 */
export const footerContactFields = footerOrder
  .map((key) => contactFields.find((f) => f.key === key)!)
  .filter((f) => f.footer && contact[f.key])

export const PENDING_TEXT = '待補'

/** 各頁 SEO 標題與描述 */
export const pageMeta: Record<string, { title: string; description: string }> = {
  home: {
    title: '亞洲共創學院｜聚焦專業，連結學習與產業',
    description:
      '亞洲共創學院（亞洲共創股份有限公司）提供教育訓練、講師經紀與企業品牌顧問服務，透過專業課程規劃與教育培訓，連結政府、企業與人才發展需求。',
  },
  about: {
    title: '關於亞創｜亞洲共創學院',
    description:
      '亞洲共創學院提供數位行銷、職場專業技能與 AI 協作課程，串聯講師與產業資源，回應組織的人才培育需求。認識亞創的教學理念、合作服務與培訓案例。',
  },
  lecturers: {
    title: '講師聯盟｜亞洲共創學院',
    description: '搜尋亞洲共創學院合作講師，依專業領域、適合對象與授課形式找到合適的講師。',
  },
  trends: {
    title: '趨勢專欄｜亞洲共創學院',
    description: '亞洲共創學院趨勢專欄，內容建置中。',
  },
  learningMap: {
    title: '學習地圖｜亞洲共創學院',
    description: '從 2020 年的專業網紅培訓課程出發，看亞洲共創的課程如何從個人創作走向品牌社群、數據成效與 AI 應用，以及上課會學到的七個行銷主題。',
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
    description: '與亞洲共創學院洽詢教育訓練、講師經紀、企業品牌顧問與產學合作。',
  },
  notFound: {
    title: '找不到頁面｜亞洲共創學院',
    description: '您要找的頁面不存在。',
  },
}
