/* =========================================================
   Google 試算表資料來源（偽後端）
   - 各分頁在 Google 試算表「檔案 → 共用 → 發布到網路」，
     格式選「逗號分隔值 (.csv)」，把產生的網址貼在下面。
     新增分頁後，也要到「發布到網路 → 已發布的內容與設定」勾選該分頁。
   - 留空字串＝不讀試算表，直接使用 src/data/lecturers.ts、cases.ts、news.ts、trends.ts 的內建資料。
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
  /**
   * 「熱門課程」分頁：首頁主視覺與課程總覽頁的輪播（最多 5 則）
   * 欄位：show, order, date, tag, title, summary, cover, coverAlt, link, linkLabel
   */
  news: `${PUBLISHED}?gid=1709610413&single=true&output=csv`,
  /**
   * 「趨勢專欄」分頁：文章列表與內頁
   * 欄位：id, show, order, date, category, title, excerpt, cover, coverAlt, content, author, link
   */
  trends: `${PUBLISHED}?gid=1557806033&single=true&output=csv`,
  /**
   * 「培訓案例」分頁：學習地圖頁「讓學習走進真實的工作情境」的案例卡片
   * 欄位：show, order, year, school, course, desc, more, image, imageAlt（說明見 src/data/about.ts 的 aboutCases）
   */
  training: `${PUBLISHED}?gid=1272355579&single=true&output=csv`,
  /** 「設定」分頁：欄位 key, value（目前有 newsSort：熱門課程超過 5 則時依「排序數字」或「日期最新」取捨） */
  settings: `${PUBLISHED}?gid=310568720&single=true&output=csv`,
}

/**
 * 「聯絡我們」表單送出網址：試算表的 Apps Script 網頁應用程式（…/exec）
 * - 程式碼與安裝步驟：docs/contact-form-apps-script.gs
 * - 資料寫入另一份私人試算表「亞創網站｜聯絡表單紀錄（含個資，請勿公開）」，與網站內容分開
 * - 留空字串＝表單維持「展示版本」，只檢查欄位、不送出
 */
export const contactFormEndpoint =
  'https://script.google.com/macros/s/AKfycby3x8JPsA3UHRvIs1xAVnc8cvEKwf5OU4yKnUxiBxq4ltJYKSng0uciTmGvMifRbj0OcQ/exec'
