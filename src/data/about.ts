/* =========================================================
   關於亞創頁面：文案、圖示與圖片路徑
   ※ 六個區塊的文字都集中在這個檔案，直接修改字串即可。
   ※ 換上照片：把檔案放到 public/about/，再把 aboutImages 裡
     對應項目的 src 改成 '/about/檔名.webp'。
     src 為空字串時，頁面會顯示「照片待補」的中性佔位區塊。
   ========================================================= */

import type { Component } from 'vue'
import {
  Building2,
  ChartNoAxesColumnIncreasing,
  GraduationCap,
  HeartHandshake,
  MonitorPlay,
  PenLine,
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
    alt: '亞洲共創創辦人',
    pendingLabel: '創辦人照片待補',
    width: 900,
    height: 1100,
  },
  earlyWorkshop: {
    src: '',
    alt: '亞洲共創早期自媒體工作坊上課情形',
    pendingLabel: '早期工作坊照片待補',
    width: 1200,
    height: 900,
  },
  caseHsuanChuang: {
    src: '',
    alt: '2024 玄奘大學國際數位行銷暨社群經營人才培訓班上課情形',
    pendingLabel: '課程照片待補',
    width: 1200,
    height: 800,
  },
  caseMingChuan: {
    src: '',
    alt: '2025 銘傳大學 AI 生成 × MarTech 國際數位行銷人才實戰班上課情形',
    pendingLabel: '課程照片待補',
    width: 1200,
    height: 800,
  },
} satisfies Record<string, AboutImage>

/* ---------- SECTION 01｜品牌開場 ---------- */
export const aboutOpening = {
  eyebrow: 'About Asia Co-creation',
  title: '亞洲共創，從一個合作的想法開始',
  /** 標題中以黃色螢光底線強調的字 */
  highlight: '合作的想法',
  paragraphs: [
    '2020 年，亞洲共創在台灣成立。創辦人過去在電視媒體、公關與品牌行銷領域工作，常與不同專長的人一起完成一個專案。創立亞創時，這個想法也跟著走進教育領域：如果能把產業的實務經驗、講師的專長和學習者的需求聚在一起，就能一起做出更貼近工作現場的課程。',
    '亞創從自媒體工作坊起步，後來逐步與政府機關、大專院校及企業展開培訓合作。從一間教室開始，「共創」也成了亞創和不同夥伴一起規劃課程的方式。',
  ],
  /** 右側概念圖：三方匯聚成課程（文字取自上方內文） */
  visual: {
    center: '共創',
    nodes: ['產業實務經驗', '講師專長', '學習者需求'],
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
}

export const aboutStory = {
  eyebrow: 'Our Story',
  title: '展店計畫停了下來，共創從教室開始',
  chapters: [
    {
      label: '2019',
      title: '「亞洲共創」名字的由來',
      paragraphs: [
        '2019 年返台時，創辦人和夥伴原本想從台灣出發，串聯不同地區的教育與商業資源，讓有不同專長的人有機會一起做事。這是「亞洲共創」這個名字的由來。',
      ],
      image: aboutImages.founder,
    },
    {
      label: '2020',
      title: '疫情之後，先從台灣的自媒體培訓做起',
      paragraphs: [
        '隔年，疫情打亂了海外展店計畫。團隊評估後決定停下原定的布局，而在 2020 年成立的亞洲共創，先從台灣的自媒體培訓做起。',
      ],
    },
    {
      label: '早期工作坊',
      title: '把各自熟悉的工作，拆成學員能上手的練習',
      paragraphs: [
        '在那之前，創辦人做過電視媒體，也創辦過公關公司，參與大型頒獎典禮、競賽與品牌活動。早期籌備自媒體課程時，創辦人邀集有主播、影音創作與節目製作經驗的夥伴，一起把各自熟悉的工作拆成學員能上手的練習。想經營個人品牌的人，可以從自己的經驗找一個題目，試著寫一段文案、拍一支影片，把原本只在腦中的想法說給別人聽。',
      ],
      image: aboutImages.earlyWorkshop,
    },
    {
      label: '後續發展',
      title: '從工作坊走到培訓專班',
      paragraphs: [
        '疫情也讓實體工作坊的招生遇到困難。亞創後來把培訓延伸到政府人才培育與大專院校合作，接觸到更多正在找工作、準備轉職的學員。從早期的工作坊走到後來的培訓專班，「共創」有了一個更具體的樣子：把不同專長的人聚在一門課裡，讓學員有機會動手做，也有人可以一起討論。',
      ],
    },
  ] satisfies StoryChapter[],
}

/* ---------- SECTION 03｜教學理念 ---------- */
export interface TeachingStage {
  key: string
  /** 第幾階段 */
  step: string
  /** 演進路徑上的短名稱 */
  pathLabel: string
  title: string
  body: string
  icon: Component
  /** true＝未來想探索的方向，尚非正式開設的課程 */
  future?: boolean
}

export const aboutTeaching = {
  eyebrow: 'Teaching Approach',
  title: '從寫下第一句文案，到做出自己的選擇',
  stages: [
    {
      key: 'content',
      step: '第一階段',
      pathLabel: '行銷內容',
      title: '從行銷內容開始',
      body: '亞創最早教行銷，是從一則貼文、一支影片開始。面對一張空白的草稿，學員有時只知道自己有個想法，還不知道怎麼說。我們就從一個簡單的問題聊起：你想把這件事說給誰聽？有了那個人，第一句話就比較容易寫下來。',
      icon: PenLine,
    },
    {
      key: 'data',
      step: '第二階段',
      pathLabel: '行銷數據',
      title: '從行銷數據找線索',
      body: '等到內容真的發出去了，新的問題也跟著來了。有些貼文花了很多心力，看到的人卻不多。這時，行銷數據就能幫我們找線索。一起看看有多少人看到、多少人點進來，再想想是開頭可以說得更清楚，還是投放對象需要調整。一次一次回頭看，學員也慢慢知道，下一次可以從哪裡改起。',
      icon: ChartNoAxesColumnIncreasing,
    },
    {
      key: 'ai',
      step: '第三階段',
      pathLabel: 'AI 輔助',
      title: '讓 AI 成為工作上的幫手',
      body: '後來，AI 成了行銷工作裡可以搭把手的工具。企劃卡在開頭，就請它幫忙想幾個角度。手上有了腳本，也能先生成一段影片試試看。有了初稿，大家就有東西可以一起看、一起討論。哪一句像這個品牌會說的話、哪個畫面可能讓人誤會，最後還是由學員自己決定。',
      icon: WandSparkles,
    },
    {
      key: 'sel',
      step: '第四階段',
      pathLabel: 'AI 素養 × SEL',
      title: 'AI 素養 × 社會情緒學習（SEL）',
      body: '工具愈來愈快，創辦人反而想在教室裡多留一點時間。有人需要多試一次，有人需要先說出自己卡在哪裡，也有人是在聽了同伴的想法之後，才知道自己原來可以換個方式做。這是創辦人未來想探索的 AI 素養 × 社會情緒學習（SEL）：讓學員在學會使用工具的同時，也能理解自己的感受、聽進不同的意見，並為自己的選擇負責。',
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
  title: '依學員和團隊的需要規劃課程',
  items: [
    {
      key: 'gov-school',
      no: '01',
      title: '政府與學校人才培訓',
      desc: '依計畫目標與學員背景，規劃青年職涯培訓、產學課程及實務講座，並安排適合課程主題的師資。',
      icon: GraduationCap,
    },
    {
      key: 'enterprise',
      no: '02',
      title: '企業內訓與顧問',
      desc: '從團隊正在做的工作出發，例如規劃社群內容或整理行銷資料，設計能在課堂上動手練習的內訓。企業也可依需求洽詢品牌與行銷顧問服務。',
      icon: Building2,
    },
    {
      key: 'ai-marketing',
      no: '03',
      title: 'AI 與行銷實作課程',
      desc: '從品牌企劃、文案與影音製作，到數位廣告與數據判讀，讓學員在具體任務中練習使用數位工具與生成式 AI。',
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
  image: AboutImage
}

export const aboutCases = {
  eyebrow: 'Training Cases',
  title: '課堂上，學員實際學了什麼？',
  items: [
    {
      key: 'hcu-2024',
      year: '2024',
      school: '玄奘大學',
      course: '國際數位行銷暨社群經營人才培訓班',
      desc: '課程由學界與業界講師授課，內容包含品牌行銷企劃、創意文案、新媒體內容創作與個人形象建立。',
      image: aboutImages.caseHsuanChuang,
    },
    {
      key: 'mcu-2025',
      year: '2025',
      school: '銘傳大學',
      course: 'AI 生成 × MarTech：國際數位行銷人才實戰班',
      desc: '課程把生成式 AI、Google Ads 與數據分析放進數位行銷培訓，也安排數位行銷證照相關學習。',
      image: aboutImages.caseMingChuan,
    },
  ] satisfies AboutCase[],
}

/* ---------- SECTION 06｜合作洽詢（頁尾前的 CTA 區塊） ---------- */
export const aboutContact = {
  eyebrow: "Let's Co-create",
  title: '一起規劃下一場培訓',
  desc: '如果你正在為政府計畫、學校課程或企業團隊規劃培訓，可以先告訴我們學員是誰、希望他們學會什麼，以及預計什麼時候開課。亞創會從這些需求出發，和你一起討論課程主題、師資與實作安排。',
  primary: { label: '聯絡我們', to: '/contact' },
}
