/* =========================================================
   首頁 Hero 成果 Dashboard
   ※ 資料依亞洲共創股份有限公司／亞洲共創學院簡介與相關文件整理。
     數字更新時修改 value；「逾」以 suffix '+' 表示。
   ========================================================= */

export interface Kpi {
  key: string
  label: string
  value: number
  suffix: string
  unit: string
  note: string
  /** 是否需要附註說明（顯示 * 並對應下方附註） */
  footnote?: boolean
}

export const kpis: Kpi[] = [
  { key: 'courses', label: '累計開課', value: 1000, suffix: '+', unit: '堂', note: '開課逾 1,000 堂' },
  { key: 'learners', label: '培訓學員', value: 5000, suffix: '+', unit: '名', note: '單一代表性專案累積', footnote: true },
  { key: 'teachers', label: '合作業師', value: 100, suffix: '+', unit: '位', note: '合作業師逾百人' },
  { key: 'partners', label: '合作單位', value: 20, suffix: '+', unit: '個', note: '政府機關、大專院校與企業品牌' },
]

export const learnersFootnote = '培訓學員以代表性專案《大專女學生領導力培訓計畫》為例，全公司持續透過線上與實體活動擴大學員覆蓋。'

/** 發展主軸 */
export const focusAreas = ['職涯探索', '品牌行銷', '自媒體經營']

/** 核心業務 */
export const coreBusiness = [
  '企業內訓',
  '政府計畫',
  '企業社會責任 CSR',
  '講師經紀',
  '品牌行銷顧問及公關',
  'OMO 創新學習平臺',
  '沉浸式課程體驗',
]

/** 合作／服務單位（部分列舉） */
export const partnerNames = {
  public: [
    '教育部',
    '經濟部',
    '交通部',
    '勞動力發展署',
    '資策會',
    '雲林縣政府',
    '桃園青年事務局',
    '臺北市民政局',
    '國立臺北科技大學',
    '銘傳大學',
    '中國文化大學',
    '玄奘大學',
  ],
  business: [
    '德國百齡 Braun',
    'LG',
    'BenQ',
    '資生堂 Shiseido',
    "L'Oreal",
    '台糖',
    '葡萄王',
    '漢唐科技',
    '精英電腦',
    '台灣昕諾飛',
    '快電商',
  ],
}
