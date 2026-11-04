/* =========================================================
   講師聯盟
   ※ 講師內容平常改 Google 試算表「亞創網站｜講師與案例」的「講師」分頁即可，
     網址設定在 src/data/sheets.ts。本檔是讀不到試算表時的「內建備用資料」，
     篩選選項（lecturerFields 等）則一律以本檔為準。
   - 首頁「講師顧問聯盟」顯示 featured: true 的講師（建議 3 位）
   - 「講師聯盟」頁（/lecturers）列出全部講師，可搜尋與篩選

   ※ 尚未提供講師資料，以下全部為「示意內容／待補講師」，
     用來呈現版面並讓搜尋、篩選可以實際操作。取得授權資料後請替換：
     - photo：照片放在 public/lecturers/，例如 '/lecturers/l01.jpg'
     - name、title、bio（簡介）、experience（經歷）、topics（可授課主題）
     - fields / audiences / formats：只能填下方清單裡的選項（篩選按鈕由清單產生）
     - placeholder 改為 false（畫面上的「示意」標記就會消失）
   ========================================================= */

/** 專業領域（篩選選項，順序即按鈕順序） */
export const lecturerFields = ['職涯探索', '品牌行銷', '自媒體經營', 'AI 應用', '領導管理', '溝通簡報'] as const

/** 適合對象 */
export const lecturerAudiences = ['企業內訓', '學校／產學合作', '政府計畫'] as const

/** 授課形式 */
export const lecturerFormats = ['演講', '工作坊', '系列課程', '顧問輔導'] as const

export type LecturerField = (typeof lecturerFields)[number]
export type LecturerAudience = (typeof lecturerAudiences)[number]
export type LecturerFormat = (typeof lecturerFormats)[number]

/** 欄位用 string：試算表若填了清單以外的字，仍會顯示，只是不會被篩選按鈕選到 */
export interface Lecturer {
  id: string
  name: string
  title: string
  /** 主要專業領域（首頁卡片顯示這一個） */
  field: string
  /** 全部專業領域（含主要領域） */
  fields: string[]
  audiences: string[]
  formats: string[]
  photo: string
  bio: string
  experience: string[]
  topics: string[]
  /** 顯示在首頁「講師顧問聯盟」 */
  featured?: boolean
  /** true＝示意資料，畫面會標示「示意」 */
  placeholder: boolean
}

/* ---------- 以下為示意資料 ---------- */

const sampleTopics: Record<LecturerField, string[]> = {
  職涯探索: ['職涯規劃', '履歷與面試', '個人品牌定位'],
  品牌行銷: ['品牌策略', '行銷企劃', '社群行銷'],
  自媒體經營: ['短影音企劃', '內容經營', '直播與互動'],
  'AI 應用': ['生成式 AI 工具', 'AI 辦公效率', '提示詞設計'],
  領導管理: ['團隊領導', '目標管理', '跨部門協作'],
  溝通簡報: ['簡報技巧', '公眾表達', '提案溝通'],
}

function sample(
  no: number,
  fields: LecturerField[],
  audiences: LecturerAudience[],
  formats: LecturerFormat[],
  featured = false,
): Lecturer {
  const id = `l${String(no).padStart(2, '0')}`
  return {
    id,
    name: `示意講師 ${String(no).padStart(2, '0')}`,
    title: `${fields[0]}講師（職稱待補）`,
    field: fields[0],
    fields,
    audiences,
    formats,
    photo: '',
    bio: '示意內容：此處將介紹講師的專業背景、授課風格與代表經歷，待取得講師授權資料後替換。',
    experience: ['經歷一（待補）', '經歷二（待補）', '經歷三（待補）'],
    topics: [...new Set(fields.flatMap((f) => sampleTopics[f]))].slice(0, 4),
    featured,
    placeholder: true,
  }
}

export const lecturers: Lecturer[] = [
  sample(1, ['職涯探索', '溝通簡報'], ['學校／產學合作', '政府計畫'], ['演講', '工作坊'], true),
  sample(2, ['品牌行銷'], ['企業內訓', '學校／產學合作'], ['系列課程', '顧問輔導'], true),
  sample(3, ['自媒體經營', '品牌行銷'], ['學校／產學合作', '企業內訓'], ['工作坊', '系列課程'], true),
  sample(4, ['AI 應用'], ['企業內訓', '政府計畫'], ['工作坊', '系列課程']),
  sample(5, ['領導管理'], ['企業內訓'], ['系列課程', '顧問輔導']),
  sample(6, ['溝通簡報', '領導管理'], ['企業內訓', '政府計畫'], ['演講', '工作坊']),
  sample(7, ['職涯探索'], ['學校／產學合作'], ['演講', '系列課程']),
  sample(8, ['AI 應用', '自媒體經營'], ['學校／產學合作', '企業內訓'], ['工作坊']),
  sample(9, ['品牌行銷', '溝通簡報'], ['企業內訓', '政府計畫'], ['演講', '顧問輔導']),
  sample(10, ['自媒體經營'], ['政府計畫', '學校／產學合作'], ['工作坊', '系列課程']),
  sample(11, ['領導管理', 'AI 應用'], ['企業內訓'], ['演講', '顧問輔導']),
  sample(12, ['職涯探索', '品牌行銷'], ['學校／產學合作', '政府計畫'], ['系列課程', '工作坊']),
]
