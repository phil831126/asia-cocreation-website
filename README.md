# 亞洲共創學院 官方網站 DEMO

Vue 3 + Vite + TypeScript 製作的響應式官方網站展示版本。

## 啟動方式

需先安裝 Node.js（建議 LTS 版本）。

```bash
npm install      # 安裝套件（首次）
npm run dev      # 開發模式，瀏覽 http://localhost:5173
npm run build    # 產出正式檔案至 dist/
npm run preview  # 預覽 dist/ 正式版本
npm run typecheck
```

> 網站使用 History 模式路由。部署到靜態主機時，請將所有路徑導回 `index.html`
> （例如 Netlify 的 `_redirects`、Nginx 的 `try_files $uri /index.html`）。

## 專案結構

```
src/
├─ data/            ← 所有可修改的內容都在這裡
│  ├─ site.ts       品牌名稱、Logo 路徑、導覽、聯絡資訊、各頁 SEO
│  ├─ home.ts       首頁各區塊文案
│  ├─ stats.ts      合作成果數據（Dashboard）
│  ├─ services.ts   三大服務項目
│  ├─ process.ts    合作流程四階段
│  ├─ cases.ts      案例資料與分類
│  ├─ partners.ts   合作單位 Logo（跑馬燈與 Logo 牆共用）
│  └─ courses.ts    學習地圖課程分類
├─ styles/
│  ├─ tokens.css    品牌主題色、字體、圓角、間距（修改此檔即可統一調整視覺）
│  └─ base.css      全站基礎樣式、按鈕、捲動淡入動畫
├─ components/      版面元件（Navbar、放大鏡主視覺、各首頁區塊、Footer…）
├─ views/           頁面：首頁、關於我們、學習地圖、案例分享、案例詳情、聯絡我們
└─ composables/     捲動淡入、數字遞增等動態工具
```

## 如何更新資料

| 項目 | 檔案 | 做法 |
| --- | --- | --- |
| 正式 Logo | `src/data/site.ts` | 檔案放到 `public/brand/`，填入 `logoSrc: '/brand/logo.svg'` |
| 聯絡資訊 | `src/data/site.ts` | 填寫 `contact` 的 phone / email / address / hours |
| 成果數據 | `src/data/stats.ts` | `value` 由 `null` 改為數字、填 `unit` 與 `caption`，即自動啟用數字遞增動畫 |
| 合作單位 | `src/data/partners.ts` | Logo 放到 `public/partners/`，填寫 `name`、`logo`（可選 `url`） |
| 案例 | `src/data/cases.ts` | 替換標題、簡介、圖片（`public/cases/`），並將 `placeholder` 改為 `false` |
| 課程 | `src/data/courses.ts` | 在各分類 `courses` 陣列加入課程 |
| 品牌色 | `src/styles/tokens.css` | 依原始 Logo 色碼調整 `--c-yellow`、`--c-gray` 等變數 |

## 待補資料清單

以下資料目前**皆未提供**，網站已以「待補／示意內容」明確標示，未虛構任何實績：

1. **品牌 Logo 原始檔**：目前使用暫代的放大鏡標誌（非正式 Logo），品牌色亦為參考色碼。
2. **參考圖片（範例 1～7）**：專案中未附，視覺依文字規格設計。
3. **首頁文案確認**：主標題「聚焦專業，連結學習與產業」、副標題及各區塊說明皆為示範文案。
4. **合作成果數據**：產學合作、政府標案、企業內訓的數值、單位與統計口徑。
5. **品牌服務詳細內容**：服務範圍說明。
6. **三大服務詳細介紹**：關於我們頁的服務細節。
7. **合作流程**：目前四階段為網站建議的展示方式，需確認是否符合實際作業。
8. **案例**：標題、分類、照片、簡介、合作背景／執行內容／成果（目前 9 則皆為示意）。
9. **合作單位 Logo**：需取得授權的正式 Logo 與單位名稱（目前 10 個佔位卡片）。
10. **學習地圖課程**：AI、行銷、其他類別的課程名稱、程度、簡介。
11. **關於我們**：品牌故事、成立沿革、團隊介紹。
12. **聯絡資訊**：電話、電子郵件、地址、服務時間。
13. **表單寄送服務**：聯絡表單目前僅做前端欄位檢查，**不會送出任何資料**；上線前需串接後端或表單服務（如 Formspree、Google Apps Script、自建 API）。
14. **社群連結、隱私權政策**（如需要）。
