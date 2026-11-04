/* =========================================================
   關於我們頁面文案（依企業提供內容）
   修改文字直接改這個檔案即可，版面會自動套用。
   ========================================================= */

export const aboutHero = {
  eyebrow: 'ABOUT US',
  title: '以教育連結未來，讓學習創造更多可能',
}

/** 品牌介紹（每一個字串是一段） */
export const aboutIntro = [
  '亞洲共創學院致力於整合教育培訓、專業講師與產業資源，提供政府機關、企業及個人多元化的學習與人才發展服務。',
  '我們相信，教育不只是知識的傳遞，更是連結人才、產業與未來機會的重要橋梁。',
  '透過政府產學合作、企業教育訓練及專業實務課程，亞洲共創協助不同對象建立符合實際需求的學習方向，讓知識能夠轉化為職場能力，讓人才培育真正貼近產業發展。',
]

/** 品牌核心理念：共創・共享・共好 */
export const aboutValues = {
  eyebrow: 'Core Values',
  title: '共創・共享・共好',
  items: [
    {
      key: 'create',
      word: '共創',
      title: '攜手打造學習價值',
      desc: '整合政府、企業、學校與專業講師資源，共同規劃符合需求的人才培育方案。',
    },
    {
      key: 'share',
      word: '共享',
      title: '促進知識與經驗交流',
      desc: '透過專業教學、實務案例與跨領域交流，讓產業知識與學習資源發揮更大的價值。',
    },
    {
      key: 'good',
      word: '共好',
      title: '讓學習帶動持續成長',
      desc: '協助個人提升職場競爭力，支持企業培育人才，促進教育與產業共同發展。',
    },
  ],
}

/**
 * 我們的專業服務
 * contactTopic：「洽詢此服務」帶入聯絡表單的合作需求（對應聯絡頁的選項）
 */
export const aboutServices = {
  eyebrow: 'Services',
  title: '我們的專業服務',
  highlight: '專業服務',
  desc: '亞洲共創從需求出發，結合課程規劃、專業師資與實務教學，提供多元且具彈性的教育培訓服務。',
  items: [
    {
      id: 'gov',
      no: '01',
      title: '政府委辦與產學合作',
      desc: '配合人才培育與產業發展需求，規劃青年職涯培訓、產學合作課程、職能提升及實務講座。',
      tags: ['青年職涯培訓', '產學合作課程', '職能提升', '實務講座'],
      contactTopic: 'academia',
    },
    {
      id: 'enterprise',
      no: '02',
      title: '企業內訓與客製化培訓',
      desc: '依據企業發展方向與人才需求，整合專業師資，提供符合產業情境的教育訓練與學習規劃。',
      tags: ['企業內訓', '客製化課程', '專業師資整合'],
      contactTopic: 'training',
    },
    {
      id: 'ai',
      no: '03',
      title: 'AI 應用與數位行銷課程',
      desc: '聚焦生成式 AI 工具、社群行銷、內容企劃及數位應用，透過實際操作，協助學員將新知運用於工作。',
      tags: ['生成式 AI 工具', '社群行銷', '內容企劃', '數位應用'],
      contactTopic: 'course',
    },
    {
      id: 'career',
      no: '04',
      title: '個人職涯與專業成長',
      desc: '提供求職、轉職與持續進修者實務導向的學習內容，協助建立專業技能與職場競爭力。',
      tags: ['求職', '轉職', '持續進修'],
      contactTopic: 'course',
    },
  ],
}

/** 我們的特色 */
export const aboutFeatures = {
  eyebrow: 'Why Us',
  title: '我們的特色',
  highlight: '特色',
  items: [
    { key: 'need', title: '需求導向', desc: '根據不同對象規劃合適的培訓內容。' },
    { key: 'integrate', title: '專業整合', desc: '串聯跨領域講師與產業實務資源。' },
    { key: 'practice', title: '實作學習', desc: '強調工具操作、案例應用與技能培養。' },
    { key: 'flexible', title: '彈性規劃', desc: '依合作目標調整課程主題與培訓形式。' },
  ],
}

/** 合作邀請（頁尾前的 CTA 區塊） */
export const aboutInvite = {
  eyebrow: "Let's Co-create",
  title: '與亞洲共創，一起創造學習的新可能',
  desc: '無論是政府人才培育計畫、產學合作、企業內部教育訓練，或是個人專業成長，亞洲共創期望成為連結教育資源與實務需求的合作夥伴。',
  slogan: '讓知識走進實務，讓學習成為改變的起點。',
  /** 「了解課程服務」連到學習地圖頁（課程分類）；「聯絡我們」連到聯絡頁 */
  primary: { label: '了解課程服務', to: '/learning-map' },
  secondary: { label: '聯絡我們', to: '/contact' },
}
