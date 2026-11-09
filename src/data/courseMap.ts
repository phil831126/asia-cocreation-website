/* =========================================================
   學習地圖（課程地圖）頁面文案與素材
   ※ 修改七大主題的文案或圖示都在這個檔案。
   ※「從自媒體課堂開始的學習旅程」與「課程發展歷程」已移到關於亞創頁，
     文案在 src/data/about.ts（aboutOrigin、aboutEvolution）。
   ========================================================= */

import type { Component } from 'vue'
import {
  Camera,
  ChartNoAxesColumnIncreasing,
  Megaphone,
  MessagesSquare,
  PenLine,
  Target,
  WandSparkles,
} from '@lucide/vue'

/** 頁內錨點 id（按鈕與連結共用） */
export const anchors = {
  topics: 'topics',
} as const

/* ---------- 學習行銷的七大主題 ---------- */
export interface LearningTopic {
  key: string
  title: string
  /** 主題名稱下方的一句小標題 */
  subtitle: string
  icon: Component
  paragraphs: string[]
  /** 桌機版跨兩欄 */
  wide?: boolean
}

export const topics = {
  title: '從觀念到實作，學習行銷的七大主題',
  intro:
    '從規劃一場活動、寫好一篇貼文，到投放廣告、回頭看成效，亞洲共創的課程把行銷工作拆成具體的練習。以下主題整理自不同時期的課程內容。',
  items: [
    {
      key: 'brand',
      title: '品牌行銷',
      subtitle: '找到品牌定位，說出自己的特色',
      icon: Target,
      paragraphs: [
        '同樣是賣咖啡，有人看重風味，有人在意每天買起來方不方便。課堂會從產品特色和顧客需求出發，練習找出品牌想服務的人、對方在意什麼，再把這些想法整理成品牌介紹或行銷企劃用得上的訊息。',
      ],
    },
    {
      key: 'copy',
      title: '內容發想與文案',
      subtitle: '從一個想法，寫出吸引人的內容',
      icon: PenLine,
      paragraphs: [
        '遇到新品上市或活動招生，可以從產品特色、顧客常問的問題，或一個讓人有共鳴的使用情境找題材。課堂會練習把同一個想法寫成貼文標題、社群文案或短影音腳本，並依照不同平台調整開頭和重點。',
      ],
    },
    {
      key: 'social',
      title: '社群經營',
      subtitle: '讓每一篇貼文，都有溝通目的',
      icon: MessagesSquare,
      paragraphs: [
        '同一場活動，報名前可以介紹亮點，活動中可以分享現場片段，結束後還能做成回顧。課堂會練習安排不同階段的貼文，也會從留言和互動裡找線索，看看讀者還想知道什麼、下一篇可以寫什麼。',
      ],
    },
    {
      key: 'visual',
      title: '影音與視覺製作',
      subtitle: '用照片與影片，把故事說清楚',
      icon: Camera,
      paragraphs: [
        '拍一支商品短片，第一個畫面要放什麼？做一張活動貼文，時間、地點和報名方式怎麼排才容易看懂？課堂會從腳本、手機拍攝到剪輯一步步練習，也會接觸商品攝影和社群圖文排版，學習用畫面把重點說清楚。',
      ],
    },
    {
      key: 'ads',
      title: '數位廣告投放',
      subtitle: '找對受眾，讓行銷更有效',
      icon: Megaphone,
      paragraphs: [
        '想讓更多人認識品牌，和想讓有興趣的人完成報名，廣告的做法會不一樣。課堂會用 Meta 廣告（Facebook、Instagram）與 Google Ads 說明各自適合的情境，練習依照目標選擇平台、設定受眾、安排預算與準備廣告素材。',
      ],
    },
    {
      key: 'data',
      title: '行銷數據分析',
      subtitle: '看懂數據，找到優化方向',
      icon: ChartNoAxesColumnIncreasing,
      paragraphs: [
        '貼文很多人看到，為什麼點進去的人很少？廣告有人點擊，為什麼報名數沒有增加？課堂會從曝光、點擊與轉換等指標練習判讀成效，再思考下一步該調整的是廣告素材、投放對象，還是報名頁面的資訊。',
      ],
    },
    {
      key: 'ai',
      title: '用 AI 輔助行銷工作',
      subtitle: '讓 AI 成為行銷工作的好幫手',
      icon: WandSparkles,
      wide: true,
      paragraphs: [
        '以製作一支活動宣傳短影音為例，先想清楚影片要給誰看、希望對方看完做什麼，再把活動簡介、照片和手邊的素材整理給 AI。你可以請 AI 提供幾種開場、把活動亮點寫成腳本，也可以請它依照腳本生成畫面或短片初稿，再搭配實拍素材剪輯成一支影片。',
        '同樣的做法也能用在寫貼文或準備廣告素材。當你只有一個想法時，可以請 AI 多想幾個切入角度。有了初稿，再由你挑選版本、核對資訊，並把語氣和畫面調整到符合品牌。課堂會練習判斷哪些步驟可以請 AI 幫忙，哪些地方需要自己做決定。',
      ],
    },
  ] satisfies LearningTopic[],
}
