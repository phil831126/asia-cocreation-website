/* =========================================================
   關於亞創頁面：文案、圖示與圖片路徑
   ※ 六個區塊的文字都集中在這個檔案，直接修改字串即可。
   ※ 換上照片：把檔案放到 public/about/，再把 aboutImages 裡
     對應項目的 src 改成 '/about/檔名.webp'。
     src 為空字串時，頁面會顯示「照片待補」的中性佔位區塊。
   ※ 創辦人經歷依據：銘傳一週（2021 年 3 月 2 日）
     https://www.week.mcu.edu.tw/39297/
   ========================================================= */

import type { Component } from 'vue'
import {
  Building2,
  ChartNoAxesColumnIncreasing,
  Handshake,
  HeartHandshake,
  Landmark,
  MessagesSquare,
  MonitorPlay,
  PenLine,
  Share2,
  WandSparkles,
} from '@lucide/vue'

/* ---------- 圖片路徑（集中管理） ---------- */
export interface AboutImage {
  /** 圖片路徑；留空時顯示佔位區塊 */
  src: string
  alt: string
  /** 尚未提供照片時，佔位區塊上的說明 */
  pendingLabel: string
  width: number
  height: number
}

export const aboutImages = {
  founder: {
    src: '',
    alt: '亞洲共創學院創辦人張丞亞',
    pendingLabel: '創辦人照片待補',
    width: 900,
    height: 1100,
  },
  history: {
    src: '',
    alt: '亞洲共創學院早期活動紀錄',
    pendingLabel: '歷史活動照片待補',
    width: 1200,
    height: 900,
  },
  caseHsuanChuang: {
    src: '',
    alt: '2024 玄奘大學國際數位行銷暨社群經營人才培訓班上課情形',
    pendingLabel: '活動照片待補',
    width: 1200,
    height: 800,
  },
  caseMingChuan: {
    src: '',
    alt: '2025 銘傳大學 AI 生成 × MarTech 國際數位行銷人才實戰班上課情形',
    pendingLabel: '活動照片待補',
    width: 1200,
    height: 800,
  },
} satisfies Record<string, AboutImage>

/* ---------- SECTION 01｜品牌開場 ---------- */
export const aboutOpening = {
  eyebrow: 'About Asia Co-creation',
  title: '亞洲共創，讓不同的專長，成為一起前進的力量',
  /** 標題中以黃色螢光底線強調的字 */
  highlight: '不同的專長',
  paragraphs: [
    '亞洲共創的起點，來自一個簡單的信念：每個人都有不同的經驗與專長，而當彼此願意分享、交流與合作，就能創造更多可能。',
    '創辦人張丞亞從傳播媒體、設計與品牌管理一路走進教育領域，在不同的工作環境中，看見跨領域合作的力量，也逐漸思考，如何讓知識不只停留在個人身上，而能透過分享，成為更多人成長的養分。',
    '秉持著「共創、共享、共好」的精神，亞洲共創學院逐步發展教育培訓、品牌行銷與跨領域合作，期望讓每一次相遇，都成為彼此學習與成長的機會。',
  ],
  /** 右側概念圖：人與人透過分享、交流與合作連結成「共創」（文字取自上方內文） */
  visual: {
    center: '共創',
    nodes: [
      { label: '分享', icon: Share2 as Component },
      { label: '交流', icon: MessagesSquare as Component },
      { label: '合作', icon: Handshake as Component },
    ],
  },
}

/* ---------- SECTION 02｜創辦人的故事 ---------- */
export interface StoryChapter {
  /** 時間軸上的標籤 */
  label: string
  title: string
  paragraphs: string[]
  /** 對應 aboutImages 的照片（選填） */
  image?: AboutImage
  /** 沒有照片時，在另一側以大字裝飾（選填，例如年份） */
  decor?: string
}

export const aboutStory = {
  eyebrow: 'Our Story',
  title: '從新聞現場到教育現場，一路走來的跨界探索',
  chapters: [
    {
      label: '新聞媒體',
      title: '傳播實務的起點',
      paragraphs: [
        '創辦人張丞亞的職涯，從新聞媒體開始。',
        '曾在東森、中天及非凡新聞擔任編輯與記者的他，經歷過新聞工作的高壓與快速節奏，也在職涯轉折中重新思考自己想走的方向。',
      ],
      image: aboutImages.founder,
    },
    {
      label: '設計與創業',
      title: '跨領域探索',
      paragraphs: [
        '離開媒體後，他持續進修傳播管理與設計相關領域，並將傳播與設計的經驗帶進創業，成立喜丞創意股份有限公司。',
      ],
    },
    {
      label: '品牌管理',
      title: '累積產業經驗',
      paragraphs: [
        '之後，他受邀前往上海擔任品牌管理公司的總經理，在不同市場與產業之間，累積了更多品牌經營及團隊管理的經驗。',
        '在上海、蘇州工作期間，他接觸到寓教於樂的親子產業，也開始對全人教育產生興趣。',
      ],
    },
    {
      label: '2019 年返台',
      title: '重新思考教育的可能',
      paragraphs: [
        '2019 年返台後，他重新整理過去累積的經驗，也更加確定自己希望投入的方向：讓不同領域的知識與資源被串聯，讓學習不只是單向接收，更能在交流與實作中發生。',
      ],
      decor: '2019',
    },
    {
      label: '亞洲共創',
      title: '共創、共享、共好',
      paragraphs: [
        '亞洲共創學院因此誕生。',
        '對他而言，「共創」不只是品牌名稱，更是一種讓不同世代、不同專長的人彼此連結的方式。',
      ],
      image: aboutImages.history,
    },
  ] satisfies StoryChapter[],
}

/* ---------- SECTION 03｜教學理念 ---------- */
export interface TeachingStage {
  key: string
  no: string
  /** 演進路徑上的短名稱 */
  pathLabel: string
  title: string
  paragraphs: string[]
  icon: Component
  /** true＝未來想探索的方向，尚非正式開設的課程 */
  future?: boolean
}

export const aboutTeaching = {
  eyebrow: 'Teaching Approach',
  title: '學習，不只是學會一項工具，而是找到更多可能',
  intro: [
    '亞洲共創的教育理念，來自創辦人多年跨領域工作的體會。',
    '每個人都有不同的起點，也有不同的學習方式。比起單向傳授知識，亞創更重視如何讓學員在課程中實際參與、動手練習，並透過交流找到適合自己的方法。',
    '從早期的品牌行銷與自媒體培訓，到數位行銷、數據分析與生成式 AI 應用，課程隨著產業環境持續發展，但重視實作與人的成長，始終是亞創希望延續的方向。',
  ],
  /** 四階段流程上方的核心理念 */
  motto: '以人為起點，以實作為方法，讓學習成為持續成長的力量。',
  stagesTitle: '教學方向的四個階段',
  stages: [
    {
      key: 'marketing',
      no: '01',
      pathLabel: '行銷表達',
      title: '從行銷開始，學會表達想法',
      paragraphs: [
        '從一則貼文、一段文案或一支影片開始，讓學員試著把自己的想法說清楚，理解品牌如何與不同的人溝通。',
      ],
      icon: PenLine,
    },
    {
      key: 'data',
      no: '02',
      pathLabel: '數據判讀',
      title: '從數據觀察，學會理解與調整',
      paragraphs: [
        '當內容真正發布後，再透過觸及、互動與廣告數據尋找線索。讓學員不只學會執行，也能思考為什麼有效、還能如何改善。',
      ],
      icon: ChartNoAxesColumnIncreasing,
    },
    {
      key: 'ai',
      no: '03',
      pathLabel: 'AI 輔助',
      title: '讓 AI 成為學習與工作的幫手',
      paragraphs: [
        '隨著生成式 AI 的發展，亞創將工具應用帶入行銷教學。從企劃發想、內容製作到資料整理，協助學員練習運用 AI 提升工作效率，同時保有自己的思考與判斷。',
      ],
      icon: WandSparkles,
    },
    {
      key: 'sel',
      no: '04',
      pathLabel: 'AI 素養 × SEL',
      title: 'AI 素養 × 社會情緒學習（SEL）',
      paragraphs: [
        '當工具變得更加便利，如何理解自己、與他人合作，以及做出負責任的選擇，也變得重要。',
        '未來，亞創希望進一步探索 AI 素養與社會情緒學習的結合，讓學員不只懂得使用科技，也能保有同理、溝通與獨立思考的能力。',
      ],
      icon: HeartHandshake,
      future: true,
    },
  ] satisfies TeachingStage[],
  /** 第四階段的標示文字 */
  futureTag: '未來探索',
}

/* ---------- SECTION 04｜合作服務 ---------- */
export interface AboutService {
  key: string
  no: string
  title: string
  desc: string
  icon: Component
}

export const aboutServices = {
  eyebrow: 'Services',
  title: '從不同的需求出發，一起設計適合的學習',
  items: [
    {
      key: 'gov-school',
      no: '01',
      title: '政府與學校人才培訓',
      desc: '與政府機關及大專院校合作，依據培訓計畫與學員背景，規劃青年職涯、產學合作、專業技能與實務應用課程，協助學員累積進入職場需要的知識與能力。',
      icon: Landmark,
    },
    {
      key: 'enterprise',
      no: '02',
      title: '企業內訓與顧問',
      desc: '從企業的實際工作需求出發，結合品牌行銷、數位工具及專業講師資源，規劃具實作性的內部培訓，並依需求提供品牌與行銷顧問服務。',
      icon: Building2,
    },
    {
      key: 'ai-marketing',
      no: '03',
      title: 'AI 與行銷實作課程',
      desc: '從品牌企劃、社群經營、影音內容、數位廣告與數據分析，到生成式 AI 的應用，透過課堂練習與實際案例，協助學員把學到的方法帶回工作與生活。',
      icon: MonitorPlay,
    },
  ] satisfies AboutService[],
}

/* ---------- SECTION 05｜培訓案例 ---------- */
export interface AboutCase {
  key: string
  year: string
  school: string
  course: string
  desc: string
  /** 延伸介紹（選填）；每個字串是一段，留空陣列時顯示「延伸介紹待補」 */
  more: string[]
  image: AboutImage
}

export const aboutCases = {
  eyebrow: 'Training Cases',
  title: '讓學習走進真實的工作情境',
  morePending: '延伸介紹待補',
  items: [
    {
      key: 'hcu-2024',
      year: '2024',
      school: '玄奘大學',
      course: '國際數位行銷暨社群經營人才培訓班',
      desc: '結合學界與業界講師，課程涵蓋品牌行銷企劃、創意文案、新媒體內容創作及個人形象建立，讓學員從實際練習中累積數位行銷能力。',
      more: [],
      image: aboutImages.caseHsuanChuang,
    },
    {
      key: 'mcu-2025',
      year: '2025',
      school: '銘傳大學',
      course: 'AI 生成 × MarTech：國際數位行銷人才實戰班',
      desc: '將生成式 AI、Google Ads 與數據分析帶入行銷培訓，結合數位行銷實作與證照相關學習，協助學員理解工具如何應用於工作任務。',
      more: [],
      image: aboutImages.caseMingChuan,
    },
  ] satisfies AboutCase[],
}

/* ---------- SECTION 06｜合作洽詢（頁尾前的 CTA 區塊） ---------- */
export const aboutContact = {
  eyebrow: "Let's Co-create",
  title: '讓下一段學習，從我們的交流開始',
  /** 每個字串是一段 */
  desc: [
    '每一個培訓計畫，都有不同的目標與期待。',
    '無論是政府人才培育、學校產學課程，或是企業團隊的專業成長，亞洲共創都期待先從理解需求開始，與合作夥伴共同討論課程主題、師資安排及實作方式。',
  ],
  slogan: '共創，不只是一起完成一件事，更是在過程中，讓彼此都能有所收穫。',
  primary: { label: '與我們合作', to: '/contact' },
}
