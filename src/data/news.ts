/* =========================================================
   熱門課程：首頁主視覺右側與課程總覽頁頁首的輪播（兩處相同內容）
   ※ 正式內容由 Google 試算表「亞創網站｜講師 案例 熱門課程 趨勢專欄」的「熱門課程」分頁提供（見 src/data/sheets.ts），
     只顯示「show＝是」的列，最多 NEWS_LIMIT 則。
   ※ 超過上限時取哪幾則，由同一份試算表「設定」分頁的 newsSort 決定：
     「排序數字」＝order 最小的幾則；「日期最新」＝date 最新的幾則。
   ※ 下面是試算表讀取失敗時使用的內建資料。
   ========================================================= */

/** 輪播最多顯示幾則 */
export const NEWS_LIMIT = 5

/** 超過上限時的取捨方式 */
export type NewsSort = 'order' | 'date'

export interface NewsItem {
  /** 類別標籤，例如「課程招生」「活動花絮」「公告」（選填） */
  tag: string
  title: string
  /** 一兩句摘要（選填） */
  summary: string
  /** 圖片網址（橫式 16:10 最佳）；空字串時顯示佔位底圖 */
  cover: string
  coverAlt: string
  /** 顯示用日期，例如 2026.11.10（選填） */
  date: string
  /** 日期的時間戳（排序用）；沒有日期或無法辨識時為 NaN */
  time: number
  /** 點擊卡片前往的網址：站內路徑（/ 開頭）或 https 網址；空字串＝不能點 */
  link: string
  /** 連結文字，例如「查看詳情」「立即報名」 */
  linkLabel: string
}

export const localNews: NewsItem[] = [
  {
    tag: '課程招生',
    title: '[開課]AI行銷實戰課程',
    summary: '',
    cover: 'https://lh3.googleusercontent.com/d/1Jp7DraagVKaOSU3rBN0_uvLoORDdGjwi=w1600',
    coverAlt: 'AI 創意內容行銷實戰班課程海報',
    date: '',
    time: NaN,
    link: '/cases/aca-01',
    linkLabel: '查看詳情',
  },
]
