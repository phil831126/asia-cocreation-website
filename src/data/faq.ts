/* =========================================================
   右下角 FAQ 小幫手「共創諮詢台」
   ※ 主要服務對象為「企業」與「學校／產學合作單位」。
     答案依網站現有資料（服務項目、成果數據、講師聯盟）撰寫；
     pending: true 代表內容尚待企業確認，畫面會顯示「待補」標記。

   如何新增一題：
   - question：顯示在畫面上的問題
   - keywords：客戶可能會打的字（越多越容易被找到）
   - audience：只給哪一類單位看；留空代表兩類都適用
   - pages：在這些頁面會優先推薦（填 route 名稱，例如 'cases'）
   - actions：答案下方的按鈕（站內路徑）
   - related：「你可能還想知道」要帶出的其他題目 id
   ========================================================= */

export type Audience = 'enterprise' | 'academia'

export interface AudienceOption {
  key: Audience
  label: string
  /** 使用者點選後，對話中顯示的那句話 */
  says: string
  /** 洽詢表單預設帶入的需求（對應聯絡頁 ?topic=） */
  contactTopic: string
}

export const audiences: AudienceOption[] = [
  { key: 'enterprise', label: '企業', says: '我們是企業', contactTopic: 'training' },
  { key: 'academia', label: '學校／產學合作', says: '我們是學校／產學合作單位', contactTopic: 'academia' },
]

export interface FaqAction {
  label: string
  to: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
  keywords: string[]
  audience?: Audience[]
  pages?: string[]
  actions?: FaqAction[]
  related?: string[]
  pending?: boolean
}

export const faqs: FaqItem[] = [
  {
    id: 'services',
    question: '亞洲共創提供哪些服務？',
    answer:
      '我們有三大服務：教育訓練（企業內訓、政府計畫、OMO 學習平臺）、講師經紀（媒合逾百位合作業師），以及企業品牌顧問（品牌行銷、公關專案與 CSR 活動規劃）。',
    keywords: ['服務', '業務', '做什麼', '項目', '提供', '介紹'],
    pages: ['home', 'about'],
    actions: [{ label: '認識我們', to: '/about' }],
    related: ['custom-training', 'academia-how', 'lecturers'],
  },
  {
    id: 'custom-training',
    question: '可以依我們公司的需求客製內訓課程嗎？',
    answer:
      '可以。我們會先了解貴公司的培訓目標、學員對象與期程，再依人才發展需求規劃課程架構、內容與講師安排。',
    keywords: ['客製', '內訓', '企業內訓', '員工', '需求', '規劃'],
    audience: ['enterprise'],
    pages: ['home', 'about'],
    actions: [{ label: '提出內訓需求', to: '/contact?topic=training' }],
    related: ['pricing', 'format', 'lecturers'],
  },
  {
    id: 'pricing',
    question: '費用怎麼計算？',
    answer:
      '費用會依課程時數、參與人數、講師與客製程度而有所不同。歡迎留下貴單位的需求，由專人提供報價。',
    keywords: ['費用', '報價', '價格', '預算', '收費'],
    pages: ['contact'],
    actions: [{ label: '索取報價', to: '/contact' }],
    related: ['headcount', 'timeline'],
    pending: true,
  },
  {
    id: 'format',
    question: '可以到公司上課嗎？有線上課程嗎？',
    answer:
      '我們結合 OMO 創新學習平臺，可依需求規劃實體、線上或虛實整合的課程形式。到府授課的地區與條件待確認。',
    keywords: ['到府', '到公司', '線上', '實體', '遠距', '上課地點', 'omo'],
    audience: ['enterprise'],
    pages: ['learning-map'],
    related: ['headcount', 'custom-training'],
    pending: true,
  },
  {
    id: 'headcount',
    question: '最少要多少人才能開班？',
    answer: '開班人數與相關條件待補。歡迎先留下預計人數與需求，由專人為您說明。',
    keywords: ['人數', '開班', '最少', '幾人', '幾個人', '多少人', '門檻'],
    audience: ['enterprise'],
    related: ['pricing', 'format'],
    pending: true,
  },
  {
    id: 'lecturers',
    question: '講師有哪些背景？可以指定講師嗎？',
    answer:
      '我們集結逾百位合作業師，涵蓋職涯探索、品牌行銷與自媒體經營等領域，會依課程主題與對象推薦合適的講師。指定講師的方式待確認。',
    keywords: ['講師', '業師', '師資', '指定', '背景', '經歷'],
    pages: ['home', 'lecturers'],
    actions: [{ label: '搜尋講師聯盟', to: '/lecturers' }],
    related: ['custom-training', 'academia-how'],
    pending: true,
  },
  {
    id: 'report',
    question: '課程結束後有成效回饋嗎？',
    answer: '我們會彙整執行成果與學員回饋，作為後續優化與合作的基礎。回饋報告的形式待確認。',
    keywords: ['成效', '回饋', '報告', '滿意度', '評估', '結案'],
    audience: ['enterprise'],
    related: ['process', 'cases'],
    pending: true,
  },
  {
    id: 'academia-how',
    question: '產學合作可以怎麼進行？',
    answer:
      '我們可依校方的課程與計畫需求，媒合業界講師、規劃專業課程與培訓活動，把產業實務帶進校園。實際合作形式待補。',
    keywords: ['產學', '產學合作', '學校', '校方', '合作方式', '形式'],
    audience: ['academia'],
    pages: ['home', 'about', 'cases'],
    actions: [{ label: '洽詢產學合作', to: '/contact?topic=academia' }],
    related: ['academia-funding', 'cases', 'lecturers'],
    pending: true,
  },
  {
    id: 'academia-funding',
    question: '可以搭配學校申請的計畫或經費一起執行嗎？',
    answer: '歡迎提供計畫內容與期程，我們會評估如何配合規劃與執行。經費與核銷相關細節待補。',
    keywords: ['計畫', '經費', '核銷', '補助', '申請', '教育部'],
    audience: ['academia'],
    actions: [{ label: '提供計畫內容', to: '/contact?topic=academia' }],
    related: ['timeline', 'academia-how'],
    pending: true,
  },
  {
    id: 'cases',
    question: '有合作過哪些單位？',
    answer:
      '合作單位逾 20 個，涵蓋政府機關、大專院校與企業品牌；累計開課逾 1,000 堂，其中《大專女學生領導力培訓計畫》累積培訓逾 5,000 名學員。',
    keywords: ['案例', '合作過', '做過', '案子', '實績', '經驗', '成果', '哪些單位', '客戶'],
    pages: ['cases'],
    actions: [{ label: '看合作案例', to: '/cases' }],
    related: ['academia-how', 'government'],
  },
  {
    id: 'timeline',
    question: '從洽談到開課大概要多久？',
    answer: '所需時間會依課程規模與客製程度而定，詳細時程待補。建議提早告知預計的開課期間，方便我們安排講師與規劃。',
    keywords: ['多久', '時程', '期程', '檔期', '什麼時候', '開課'],
    related: ['process', 'pricing'],
    pending: true,
  },
  {
    id: 'process',
    question: '合作流程是什麼？',
    answer: '一般會經過四個階段：需求了解 → 課程規劃 → 專案執行 → 成果回饋。',
    keywords: ['流程', '步驟', '怎麼合作', '如何合作', '階段'],
    related: ['timeline', 'contact'],
    pending: true,
  },
  {
    id: 'government',
    question: '有承接政府計畫嗎？',
    answer: '有。我們提供政府委辦教育培訓與人才培育計畫，協助規劃課程內容與執行。',
    keywords: ['政府', '公部門', '標案', '委辦', '機關'],
    pages: ['cases'],
    actions: [{ label: '看合作案例', to: '/cases' }],
    related: ['cases', 'process'],
  },
  {
    id: 'brand',
    question: '除了課程，還有品牌行銷相關服務嗎？',
    answer: '有。我們提供品牌行銷顧問與公關專案服務，也能協助企業規劃企業社會責任（CSR）相關活動。',
    keywords: ['品牌', '行銷', '公關', 'csr', '社會責任', '顧問'],
    audience: ['enterprise'],
    actions: [{ label: '洽詢品牌顧問', to: '/contact?topic=brand' }],
    related: ['services', 'contact'],
  },
  {
    id: 'courses',
    question: '有哪些課程主題？',
    answer: '課程把行銷工作拆成具體的練習，主題包含品牌行銷、內容發想與文案、社群經營、影音與視覺製作、數位廣告投放、行銷數據分析，以及用 AI 輔助行銷工作。',
    keywords: ['課程', '主題', '學習地圖', 'ai', '有什麼課'],
    pages: ['learning-map'],
    actions: [{ label: '看學習地圖', to: '/learning-map' }],
    related: ['custom-training', 'format'],
  },
  {
    id: 'contact',
    question: '要怎麼開始洽談？',
    answer: '到「聯絡我們」留下單位名稱、聯絡方式與合作需求，專人會與您聯繫。聯絡電話與電子郵件待補。',
    keywords: ['聯絡', '洽談', '洽詢', '聯繫', '電話', '信箱', 'email', '窗口'],
    pages: ['contact'],
    actions: [{ label: '前往聯絡我們', to: '/contact' }],
    related: ['process', 'pricing'],
    pending: true,
  },
]

/**
 * 同義詞：同一組裡的字視為同一個意思。
 * 客戶打「多少錢」，會同時找含「費用」「報價」的題目。
 */
export const synonyms: string[][] = [
  ['費用', '價格', '價錢', '報價', '多少錢', '預算', '收費', '費率', '怎麼算'],
  ['內訓', '教育訓練', '員工培訓', '企業培訓', '員工訓練', '企業內訓'],
  ['產學', '產學合作', '學校', '大學', '大專', '校方', '學研', '系所', '校園'],
  ['講師', '業師', '老師', '師資', '講者'],
  ['多久', '多長', '時程', '期程', '檔期', '什麼時候', '幾週', '幾個月'],
  ['線上', '遠距', '視訊', '網路課程', '實體', '到府', '到公司', '混成', 'omo'],
  ['人數', '多少人', '幾人', '幾個人', '開班', '最少', '門檻'],
  ['聯絡', '洽談', '洽詢', '聯繫', '詢問', '電話', '信箱', 'email', 'mail', '窗口', '找誰'],
  ['案例', '實績', '經驗', '合作過', '做過', '案子', '成果', '客戶', '哪些單位'],
  ['政府', '公部門', '標案', '委辦', '機關'],
  ['計畫', '經費', '補助', '核銷'],
  ['品牌', '行銷', '公關', 'csr', '社會責任'],
  ['流程', '步驟', '怎麼合作', '如何合作', '怎麼開始', '如何開始'],
  ['客製', '量身', '訂製', '依需求', '專屬'],
  ['課程', '主題', '學習地圖', '有什麼課'],
  ['成效', '回饋', '報告', '滿意度', '評估', '結案'],
]

/** 依所在頁面變換的開場白（key 為 route 名稱） */
export const pageGreetings: Record<string, string> = {
  home: '想了解亞洲共創能為貴單位做些什麼嗎？',
  about: '想更認識我們的服務嗎？',
  lecturers: '在找合適的講師嗎？也可以直接請我們推薦。',
  'learning-map': '正在找適合的課程主題嗎？',
  cases: '想看看和貴單位類似的合作經驗嗎？',
  'case-detail': '對這類合作有興趣嗎？',
  contact: '洽談前，可以先看看大家常問的問題。',
}

export const faqCopy = {
  /** 小幫手名稱：視窗標題、水滴按鈕的提示文字 */
  title: '共創諮詢台',
  subtitle: '亞洲共創學院',
  /** 水滴旁的提示泡泡（客人按 ✕ 關掉後就不再出現） */
  hintTitle: '有合作上的疑問嗎？',
  hintText: '服務、費用、產學合作都可以在這裡詢問。',
  hintClose: '關閉提示',
  askAudience: '請問您代表哪一類單位？我會優先列出相關的問題。',
  skipAudience: '先隨意看看',
  afterAudience: (label: string) => `了解！以下是${label}最常詢問的問題：`,
  afterSkip: '沒問題，以下是大家最常詢問的問題：',
  welcomeBack: (label: string) => `歡迎回來！我會優先列出${label}相關的問題。`,
  placeholder: '輸入關鍵字，例如：費用、講師、產學',
  related: '你可能還想知道',
  fallback: '這題我還不確定怎麼回答，你想問的是不是：',
  fallbackEmpty: '這題我還不確定怎麼回答。',
  fallbackContact: '留言給專人',
  switchAudience: '切換單位類型',
  pendingNote: '內容待確認',
}
