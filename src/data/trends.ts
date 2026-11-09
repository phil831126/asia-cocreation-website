/* =========================================================
   趨勢專欄文章
   ※ 內容由 Google 試算表「亞創網站｜講師與案例」的「趨勢專欄」分頁提供（見 src/data/sheets.ts），
     只顯示「show＝是」的列。沒有任何文章時，趨勢專欄頁顯示「建置中」。
   ※ 內文（content）寫在試算表格子裡：每一行是一個段落，行首打「## 」會變成小標題。
   ========================================================= */

export const trendCategories = ['AI 應用', '品牌行銷', '職涯發展', '產業趨勢'] as const

export interface Article {
  /** 網址代號：/trends/{id} */
  id: string
  category: string
  title: string
  /** 列表卡片上的摘要 */
  excerpt: string
  cover: string
  coverAlt: string
  /** 顯示用日期，例如 2026.11.10 */
  date: string
  /** 日期的時間戳（排序用）；沒有日期或無法辨識時為 NaN */
  time: number
  author: string
  /** 內文，依行拆開；以「## 」開頭的行是小標題 */
  content: string[]
  /** 外部文章網址（https）：沒有內文時，點卡片直接前往這裡 */
  link: string
}

/** 試算表讀不到時使用的內建文章（目前沒有，頁面會顯示「建置中」） */
export const localArticles: Article[] = []
