/* =========================================================
   Google 試算表資料來源（偽後端）
   - 講師、案例兩個分頁在 Google 試算表「檔案 → 共用 → 發布到網路」，
     格式選「逗號分隔值 (.csv)」，把產生的網址貼在下面。
   - 留空字串＝不讀試算表，直接使用 src/data/lecturers.ts、cases.ts 的內建資料。
   - 讀取失敗（網路問題、取消發布）時，網站也會自動改用內建資料。
   - Google 發布有約 5 分鐘快取：試算表改完後，網站最晚約 5 分鐘更新。
   ========================================================= */

/** 試算表：Google 雲端硬碟「亞創網站內容 / 亞創網站｜講師與案例」（mcu.comm04 帳號） */
const PUBLISHED =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vSMlqSxLP7nTHTfGR9Jn0nrFa6QZTq-SWHn9l7jzS00JkrtWG1dD-4anqGthT5Tin8hZ6H70bjW6CPx/pub'

export const sheetSources = {
  /** 「講師」分頁的 CSV 網址 */
  lecturers: `${PUBLISHED}?gid=851063935&single=true&output=csv`,
  /** 「案例」分頁的 CSV 網址 */
  cases: `${PUBLISHED}?gid=1046939079&single=true&output=csv`,
}
