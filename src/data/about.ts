/* =========================================================
   關於亞創頁面：文案、圖示與圖片路徑
   ※ 各區塊的文字都集中在這個檔案，直接修改字串即可
     （合作服務的四張卡片除外，見 src/data/services.ts）。
   ※ 換上照片：把檔案放到 public/about/，再把 aboutImages 裡
     對應項目的 src 改成 '/about/檔名.webp'。
     src 為空字串時，頁面會顯示「照片待補」的中性佔位區塊。
   ========================================================= */

import type { Component } from 'vue'
import {
  ChartNoAxesColumnIncreasing,
  Handshake,
  HeartHandshake,
  MessagesSquare,
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
    '亞洲共創學院提供數位行銷、職場專業技能與 AI 協作課程，串聯講師與產業資源，協助個人學習成長，並回應組織的人才培育需求。',
    '透過政府機關的培訓合作與企業內訓服務，整合不同領域的講師資源，依合作單位需求規劃客製化課程，兼顧知識理解與實務應用。截至 2026 年，學院累計開課逾 1,000 場、合作業師超過 100 位，並培育超過 5,000 位學員。',
    '教育，是連結人才與產業的起點。亞洲共創致力於讓知識在分享中延伸價值，讓專長在合作中化為行動，共同推動產業與社會向前。',
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

/* ---------- SECTION 02｜教學理念 ---------- */
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

/* ---------- SECTION 03｜課程的起點：從自媒體課堂開始的學習旅程 ----------
   ※ 起點照片：把檔案放到 public/about/，再把 photo.src 改成 '/about/檔名.webp'。
     src 為空字串時顯示圖示佔位，圖說會等照片換上後才出現。 */
export const aboutOrigin = {
  tag: '課程的起點',
  title: '從自媒體課堂開始的學習旅程',
  paragraphs: [
    '2020 年，在亞洲共創的「專業網紅培訓課程」裡，學員把手機架上腳架，分組練習面對鏡頭。有人拿著麥克風練習主持，有人在旁用手機拍攝。課堂從怎麼寫一段文案、怎麼用影片說故事開始，讓學員有機會把自己的想法和特色拍出來、說給別人聽。',
    '這也是亞洲共創早期課程的起點。當學員開始能寫、能拍，接下來就會遇到新的問題：內容要分享給誰？社群要怎麼經營？當這些能力用在品牌工作上，又要怎麼知道做出的內容有沒有效？',
  ],
  cta: '看課程如何演進',
  photo: {
    /** 照片路徑；留空時顯示佔位示意 */
    src: '',
    alt: '2020 年專業網紅培訓課程中，學員分組用手機腳架與麥克風進行拍攝練習',
    caption: '2020 年專業網紅培訓課程的小組實戰演練',
    width: 1200,
    height: 900,
  },
}

/* ---------- SECTION 04｜亞洲共創的課程發展歷程 ---------- */
export interface EvolutionStage {
  years: string
  title: string
  body: string
}

export const aboutEvolution = {
  /** 區塊錨點 id（起點區的按鈕會捲到這裡） */
  id: 'evolution',
  title: '亞洲共創的課程發展歷程',
  stages: [
    {
      years: '2020～2021',
      title: '從自我表達，學會內容創作',
      body: '早期的自媒體與網紅培訓，從個人品牌、文案、社群與影音表達出發。課堂上，學員練習找出自己的特色，再透過文字、影片或鏡頭前的表達，把想分享的內容說清楚。',
    },
    {
      years: '2022',
      title: '從內容製作，走進品牌經營',
      body: '當內容創作成為品牌工作的一部分，課程也跟著往前走。以「社群小編全能實戰培訓班」為例，文案和圖文製作開始和品牌的行銷目標一起規劃。學員除了練習做內容，也要思考要和誰溝通、在哪個平台發布，以及每一則貼文要達成什麼目的。',
    },
    {
      years: '2022～2024',
      title: '從行銷執行，學會用數據說話',
      body: '隨著行銷工作涵蓋更多平台與工具，課程逐步加入行銷科技（MarTech），把範圍延伸到數位廣告、數據分析與行銷流程。課堂上的問題也跟著改變：內容發布後，有沒有讓想接觸的人看到？看過的人有沒有進一步點擊或採取行動？',
    },
    {
      years: '2025～至今',
      title: '從行銷實務，走向 AI 協作',
      body: '在品牌行銷、內容製作、廣告投放與數據分析的基礎上，課程開始加入生成式 AI。學員可以用 AI 幫忙找題材、整理文案初稿，或依腳本生成短影音片段，再依品牌風格與實際需求修改。從一個點子到一份可以發布的內容，課堂會帶學員練習在不同步驟使用 AI。',
    },
  ] satisfies EvolutionStage[],
  /** 時間軸下方的連結：前往學習地圖的七大主題 */
  next: '看看上課會學什麼',
  nextTo: { path: '/learning-map', hash: '#topics' },
}

/* ---------- SECTION 05｜合作服務 ----------
   ※ 四張服務卡片與首頁 Hero 的服務圖卡共用 src/data/services.ts，
     修改服務名稱、簡介或標籤請改那個檔案。 */
export const aboutServices = {
  eyebrow: 'Services',
  title: '從不同的需求出發，一起設計適合的學習',
}

/* ---------- SECTION 06｜培訓案例 ---------- */
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

/** 依年份由新到舊排列 */
export const aboutCases = {
  eyebrow: 'Training Cases',
  title: '讓學習走進真實的工作情境',
  morePending: '延伸介紹待補',
  items: [
    {
      key: 'mcu-2025',
      year: '2025',
      school: '銘傳大學',
      course: 'AI 生成 × MarTech：國際數位行銷人才實戰班',
      desc: '將生成式 AI、Google Ads 與數據分析帶入行銷培訓，結合數位行銷實作與證照相關學習，協助學員理解工具如何應用於工作任務。',
      more: [],
      image: aboutImages.caseMingChuan,
    },
    {
      key: 'hcu-2024',
      year: '2024',
      school: '玄奘大學',
      course: '國際數位行銷暨社群經營人才培訓班',
      desc: '結合學界與業界講師，課程涵蓋品牌行銷企劃、創意文案、新媒體內容創作及個人形象建立，讓學員從實際練習中累積數位行銷能力。',
      more: [],
      image: aboutImages.caseHsuanChuang,
    },
  ] satisfies AboutCase[],
}

/* ---------- SECTION 07｜合作洽詢（頁尾前的 CTA 區塊） ---------- */
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
