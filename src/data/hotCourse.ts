/* =========================================================
   首頁 Hero 右側「熱門課程」圖卡（固定一張，不輪播）
   ※ 正式內容由 Google 試算表的「熱門課程」分頁提供（見 src/data/sheets.ts）。
     分頁有多列時，顯示「是否顯示＝是」且排序數字最小的那一列。
   ※ 下面是試算表還沒設定或讀取失敗時使用的內建資料：
     目前沿用案例分頁裡「[開課]AI行銷實戰課程」的封面與標題。
   ========================================================= */

export interface HotCourse {
  /** 圖卡上的分類標籤，例如「產學合作」（選填） */
  tag: string
  title: string
  /** 一兩句課程簡介（選填） */
  summary: string
  /** 封面圖網址（橫式 16:10 最佳）；空字串時顯示佔位底圖 */
  cover: string
  coverAlt: string
  /** 課程資訊，例如開課日期、時數、上課地點（選填，每項一個小標籤） */
  info: string[]
  /** 點擊圖卡前往的網址：站內路徑（/ 開頭）或 https 報名網址 */
  link: string
  /** 連結文字，例如「查看詳情」「立即報名」 */
  linkLabel: string
}

export const localHotCourses: HotCourse[] = [
  {
    tag: '產學合作',
    title: '[開課]AI行銷實戰課程',
    summary: '',
    cover: 'https://lh3.googleusercontent.com/d/1Jp7DraagVKaOSU3rBN0_uvLoORDdGjwi=w1600',
    coverAlt: 'AI 創意內容行銷實戰班課程海報',
    info: [],
    link: '/cases/aca-01',
    linkLabel: '查看詳情',
  },
]
