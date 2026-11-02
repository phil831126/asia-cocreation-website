/* =========================================================
   案例資料
   ※ 目前尚未提供實際案例，以下全部為「示意內容／待補案例」。
     取得真實案例後，請替換 title / excerpt / image，並將 placeholder 改為 false。
     image 請放在 public/cases/，填入路徑例如 '/cases/case-01.jpg'。
   ========================================================= */

export type CaseCategory = 'government' | 'academia' | 'enterprise'

export const caseCategories: { key: 'all' | CaseCategory; label: string }[] = [
  { key: 'all', label: '全部案例' },
  { key: 'government', label: '政府委訓' },
  { key: 'academia', label: '產學合作' },
  { key: 'enterprise', label: '企業內訓' },
]

export const categoryLabel: Record<CaseCategory, string> = {
  government: '政府委訓',
  academia: '產學合作',
  enterprise: '企業內訓',
}

export interface CaseItem {
  id: string
  category: CaseCategory
  title: string
  excerpt: string
  image: string
  imageAlt: string
  /** true＝示意資料，畫面會顯示「示意內容／待補案例」 */
  placeholder: boolean
}

const PLACEHOLDER_EXCERPT = '示意內容：此處將說明合作背景、執行內容與成果，待提供實際案例後替換。'

function placeholderCase(id: string, category: CaseCategory, index: number): CaseItem {
  return {
    id,
    category,
    title: `${categoryLabel[category]}案例標題（待補 ${index}）`,
    excerpt: PLACEHOLDER_EXCERPT,
    image: '',
    imageAlt: `${categoryLabel[category]}案例示意圖片`,
    placeholder: true,
  }
}

export const cases: CaseItem[] = [
  placeholderCase('gov-01', 'government', 1),
  placeholderCase('aca-01', 'academia', 1),
  placeholderCase('ent-01', 'enterprise', 1),
  placeholderCase('gov-02', 'government', 2),
  placeholderCase('aca-02', 'academia', 2),
  placeholderCase('ent-02', 'enterprise', 2),
  placeholderCase('gov-03', 'government', 3),
  placeholderCase('aca-03', 'academia', 3),
  placeholderCase('ent-03', 'enterprise', 3),
]
