/* =========================================================
   合作成果數據 Dashboard
   ※ 目前尚未提供實際統計數據。
     取得經確認的數值後，將 value 由 null 改為數字（例如 128），
     並填寫 unit（例如「件」「場」），畫面即會啟用數字遞增動畫。
   ========================================================= */

export interface StatItem {
  key: string
  label: string
  /** 經確認的數值；null 表示待提供 */
  value: number | null
  unit: string
  /** 數值前綴，例如「+」，可留空 */
  prefix?: string
  /** 數據說明（統計口徑），未確認前保持空字串 */
  caption: string
}

export const stats: StatItem[] = [
  { key: 'academia', label: '產學合作', value: null, unit: '', caption: '' },
  { key: 'government', label: '政府標案', value: null, unit: '', caption: '' },
  { key: 'enterprise', label: '企業內訓', value: null, unit: '', caption: '' },
]
