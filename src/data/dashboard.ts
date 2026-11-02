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
}

export const kpis: Kpi[] = [
  { key: 'courses', label: '累計開課', value: 1000, suffix: '+', unit: '堂', note: '開課逾 1,000 堂' },
  { key: 'learners', label: '培訓學員', value: 5000, suffix: '+', unit: '名', note: '《大專女學生領導力培訓計畫》累積' },
  { key: 'teachers', label: '合作業師', value: 100, suffix: '+', unit: '位', note: '合作業師逾百人' },
  { key: 'partners', label: '合作單位', value: 20, suffix: '+', unit: '個', note: '政府機關、大專院校與企業品牌' },
]
