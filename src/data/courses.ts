/* =========================================================
   學習地圖：課程分類
   ※ 詳細課程內容待補。新增課程時於 courses 陣列加入：
     { title: '課程名稱', level: '入門', desc: '課程簡介' }
   ========================================================= */

export interface Course {
  title: string
  level: string
  desc: string
}

export interface CourseCategory {
  id: string
  code: string
  title: string
  desc: string
  courses: Course[]
}

export const courseCategories: CourseCategory[] = [
  {
    id: 'ai',
    code: 'AI',
    title: 'AI 課程',
    desc: 'AI 相關專業課程，詳細課程規劃待補。',
    courses: [],
  },
  {
    id: 'marketing',
    code: 'MKT',
    title: '行銷課程',
    desc: '行銷相關專業課程，詳細課程規劃待補。',
    courses: [],
  },
  {
    id: 'others',
    code: 'MORE',
    title: '其他課程',
    desc: '其他專業領域課程，詳細課程規劃待補。',
    courses: [],
  },
]
