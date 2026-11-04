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
│  ├─ dashboard.ts  Hero 成果 Dashboard（開課數、學員、業師、合作單位等）
│  ├─ services.ts   三大服務項目
│  ├─ lecturers.ts  講師顧問聯盟（首頁三張講師卡）
│  ├─ cases.ts      案例資料與分類
│  ├─ partners.ts   合作單位 Logo（首頁 Logo 牆）
│  └─ courses.ts    學習地圖課程分類
├─ styles/
│  ├─ tokens.css    品牌主題色、字體、圓角、間距（修改此檔即可統一調整視覺）
│  └─ base.css      全站基礎樣式、按鈕、捲動淡入動畫
├─ components/      版面元件（Navbar、放大鏡主視覺、各首頁區塊、Footer…）
├─ views/           頁面：首頁、關於我們、學習地圖、案例分享、案例詳情、聯絡我們
└─ composables/     捲動淡入等動態工具
```

## 用 Google 試算表管理講師與案例

「講師聯盟」與「案例分享」的內容由 Google 試算表管理，改完格子約 5 分鐘內網站自動更新，不需要重新部署。

- 試算表：Google 雲端硬碟「亞創網站內容 / 亞創網站｜講師與案例」（範本另存於 `docs/content-sheet-template.xlsx`）
- 圖片：上傳到同資料夾內的「亞創網站圖片」，把分享連結貼到 `photo` / `cover` 欄
- 填寫規則：見試算表的「使用說明」分頁
- 連接設定：`src/data/sheets.ts`（填入「講師」「案例」兩個分頁「發布到網路」的 CSV 網址；留空則使用內建資料）
- 讀取程式：`src/composables/sheetData.ts`；讀不到試算表時自動改用 `src/data/lecturers.ts`、`cases.ts` 的內建備用資料

## 如何更新資料

| 項目 | 檔案 | 做法 |
| --- | --- | --- |
| 正式 Logo | `src/data/site.ts` | 檔案放到 `public/brand/`，填入 `logoSrc: '/brand/logo.svg'` |
| 聯絡資訊 | `src/data/site.ts` | 填寫 `contact` 的 phone / email / address / hours |
| 成果數據 | `src/data/dashboard.ts` | 修改 `kpis` 的 `value`（「逾」以 `suffix: '+'` 表示），滾輪式數字動畫自動套用 |
| 合作單位 | `src/data/partners.ts` | Logo 放到 `public/partners/`，在清單加入編號與名稱；桌面每排 7 個，依清單順序排列 |
| 案例 | `src/data/cases.ts` | 替換標題、簡介、圖片（`public/cases/`），並將 `placeholder` 改為 `false` |
| 課程 | `src/data/courses.ts` | 在各分類 `courses` 陣列加入課程 |
| 品牌色 | `src/styles/tokens.css` | 依原始 Logo 色碼調整 `--c-yellow`、`--c-gray` 等變數 |

## 待補資料清單

以下資料目前**皆未提供**，網站已以「待補／示意內容」明確標示，未虛構任何實績：

1. **品牌 Logo 原始檔**：目前使用暫代的放大鏡標誌（非正式 Logo），品牌色亦為參考色碼。
2. **參考圖片（範例 1～7）**：專案中未附，視覺依文字規格設計。
3. **首頁文案確認**：主標題「聚焦專業，連結學習與產業」、副標題及各區塊說明皆為示範文案。
4. **成果數據附註確認**：Hero Dashboard 已依公司簡介填入（開課逾 1,000 堂、學員逾 5,000 名〔以《大專女學生領導力培訓計畫》為例〕、業師逾百人、合作單位 20+），如有更新請改 `dashboard.ts`。
5. **三大服務文字確認**：教育訓練、講師經紀、企業品牌顧問的簡介依公司簡介撰寫，請確認。
6. **三大服務詳細介紹**：關於我們頁的服務細節。
7. **講師顧問聯盟**：三位講師的圓形照片、姓名、頭銜與專業領域（目前為示意卡片，需取得講師授權）。
8. **案例**：標題、分類、照片、簡介、合作背景／執行內容／成果（目前 9 則皆為示意）。
9. **合作單位 Logo**：已依「服務品牌」簡報頁放上 34 個 Logo（由簡報裁切，如有原始檔可替換以提高清晰度）；p17「青年事務局」與 p31「青年雙手・人類希望」的單位全名待確認。
10. **學習地圖課程**：AI、行銷、其他類別的課程名稱、程度、簡介。
11. **關於我們**：品牌故事、成立沿革、團隊介紹。
12. **聯絡資訊**：電話、電子郵件、地址、服務時間。
13. **表單寄送服務**：聯絡表單目前僅做前端欄位檢查，**不會送出任何資料**；上線前需串接後端或表單服務（如 Formspree、Google Apps Script、自建 API）。
14. **社群連結、隱私權政策**（如需要）。
