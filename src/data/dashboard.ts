/* =========================================================
   首頁 Hero 成果 Dashboard（一大三小的毛玻璃圓形）
   ※ 資料依亞洲共創股份有限公司／亞洲共創學院簡介與相關文件整理。
     第一筆顯示在大圓，其餘依序由上而下排在右側小圓。
     數字更新時修改 value；「逾」以 suffix '+' 表示。
   ========================================================= */

export interface Kpi {
  key: string
  label: string
  value: number
  suffix: string
  unit: string
}

export const kpis: Kpi[] = [
  { key: 'courses', label: '累計開課', value: 1000, suffix: '+', unit: '堂' },
  { key: 'partners', label: '合作單位', value: 20, suffix: '+', unit: '個' },
  { key: 'teachers', label: '業師', value: 100, suffix: '+', unit: '位' },
  // 學員人數以代表性專案《大專女學生領導力培訓計畫》為例
  { key: 'learners', label: '學員', value: 5000, suffix: '+', unit: '名' },
]
