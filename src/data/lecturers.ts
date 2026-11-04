/* =========================================================
   講師顧問聯盟（首頁三張資訊卡：圓形照片＋姓名／頭銜／專業領域）
   ※ 尚未提供講師資料，以下為「示意內容／待補講師」，
     依公司三大發展主軸各放一張。取得授權資料後請替換：
     - photo：照片放在 public/lecturers/，例如 '/lecturers/l01.jpg'
     - name、title、field（專業領域）
   ========================================================= */

export interface Lecturer {
  id: string
  name: string
  title: string
  /** 專業領域 */
  field: string
  photo: string
}

export const lecturers: Lecturer[] = [
  { id: 'l01', name: '講師姓名（待補）', title: '職稱／頭銜待補', field: '職涯探索', photo: '' },
  { id: 'l02', name: '講師姓名（待補）', title: '職稱／頭銜待補', field: '品牌行銷', photo: '' },
  { id: 'l03', name: '講師姓名（待補）', title: '職稱／頭銜待補', field: '自媒體經營', photo: '' },
]
