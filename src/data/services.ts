/* =========================================================
   三大服務項目
   ※ 依公司簡介之核心業務整理（企業內訓、政府委辦教育培訓、OMO 學習平臺、
     講師經紀、品牌行銷顧問及公關、企業社會責任 CSR），確認後可再修改文字。
     pending: true 代表內容尚待企業補充，畫面會顯示「待補」標記。
   ========================================================= */

export type ServiceIcon = 'graduation' | 'mic' | 'megaphone'

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
    id: 'training',
    no: '01',
    icon: 'graduation',
    title: '教育訓練',
    summary: '提供企業內訓與政府計畫教育培訓，依需求規劃課程，並結合 OMO 創新學習平臺與沉浸式課程體驗。',
    points: ['企業內訓', '政府計畫', 'OMO 學習平臺'],
  },
  {
    id: 'lecturer',
    no: '02',
    icon: 'mic',
    title: '講師經紀',
    summary: '媒合逾百位合作業師，依課程主題與對象推薦合適講師，協助培訓與活動順利進行。',
    points: ['講師媒合', '課程與講座', '業師資源'],
  },
  {
    id: 'brand',
    no: '03',
    icon: 'megaphone',
    title: '企業品牌顧問',
    summary: '提供品牌行銷顧問與公關專案服務，並協助企業規劃企業社會責任（CSR）相關活動。',
    points: ['品牌行銷顧問', '公關專案', '企業社會責任 CSR'],
  },
]
