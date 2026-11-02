/* =========================================================
   合作單位（首頁跑馬燈與 Logo 牆共用）
   ※ 尚未提供合作單位 Logo，目前以中性佔位卡片顯示。
     請勿自行製作政府機關、學校或企業 Logo。
     取得授權 Logo 後放入 public/partners/，並填寫 name 與 logo，例如：
     { id: 'p01', name: '合作單位名稱', logo: '/partners/p01.svg', url: '' }
   ========================================================= */

export interface Partner {
  id: string
  name: string
  logo: string
  url?: string
}

export const partners: Partner[] = Array.from({ length: 10 }, (_, i) => ({
  id: `p${String(i + 1).padStart(2, '0')}`,
  name: '',
  logo: '',
}))
