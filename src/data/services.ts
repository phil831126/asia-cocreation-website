/* =========================================================
   四大服務項目（首頁 Hero 的服務圖卡與「關於亞創」的服務區共用）
   ※ 分類標籤沿用公司簡介之核心業務（企業內訓、政府委辦教育培訓、OMO 學習平臺、
     講師經紀、品牌行銷顧問及公關、企業社會責任 CSR）。
   ※ 簡介文字為依標題撰寫的暫定文案，確認後可直接修改 summary。
     pending: true 代表內容尚待企業補充，畫面會顯示「待補」標記。
   ========================================================= */

export type ServiceIcon = 'graduation' | 'mic' | 'megaphone' | 'compass'

export interface Service {
  id: string
  no: string
  icon: ServiceIcon
  title: string
  summary: string
  points: string[]
  pending?: boolean
}

export const services: Service[] = [
  {
    id: 'brand',
    no: '01',
    icon: 'megaphone',
    title: '品牌行銷',
    summary: '協助企業梳理品牌定位與溝通策略，規劃公關專案與企業社會責任（CSR）相關活動。',
    points: ['公關專案', '企業社會責任 CSR'],
  },
  {
    id: 'training',
    no: '02',
    icon: 'graduation',
    title: '教育培訓',
    summary: '依需求規劃企業內訓與政府計畫教育培訓，結合 OMO 學習平臺，兼顧知識理解與實作。',
    points: ['企業內訓', '政府計畫', '產學合作'],
  },
  {
    id: 'lecturer',
    no: '03',
    icon: 'mic',
    title: '講師經紀',
    summary: '媒合逾百位合作業師，依課程主題與對象推薦合適講師，讓培訓與活動順利進行。',
    points: ['講師媒合', '課程與講座', '業師資源'],
  },
  {
    id: 'consulting',
    no: '04',
    icon: 'compass',
    title: '顧問輔導',
    summary: '針對品牌與行銷需求提供顧問諮詢，陪伴團隊釐清問題，規劃可執行的改善方向。',
    points: ['品牌行銷顧問'],
  },
]
