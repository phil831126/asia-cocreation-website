/* =========================================================
   講師顧問聯盟（首頁三張資訊卡）
   ※ 尚未提供講師資料，以下為「示意內容／待補講師」，
     依公司三大發展主軸各放一張。取得授權資料後請替換：
     - photo：照片放在 public/lecturers/，例如 '/lecturers/l01.jpg'
     - name、title、experience（經歷）、expertise（專業領域）
     - placeholder 改為 false
   ========================================================= */

export interface Lecturer {
  id: string
  /** 所屬發展主軸 */
  field: string
  name: string
  title: string
  photo: string
  experience: string[]
  expertise: string[]
  placeholder: boolean
}

function placeholderLecturer(id: string, field: string): Lecturer {
  return {
    id,
    field,
    name: '講師姓名（待補）',
    title: '職稱／頭銜待補',
    photo: '',
    experience: ['經歷一（待補）', '經歷二（待補）', '經歷三（待補）'],
    expertise: [field, '其他專長待補'],
    placeholder: true,
  }
}

export const lecturers: Lecturer[] = [
  placeholderLecturer('l01', '職涯探索'),
  placeholderLecturer('l02', '品牌行銷'),
  placeholderLecturer('l03', '自媒體經營'),
]
