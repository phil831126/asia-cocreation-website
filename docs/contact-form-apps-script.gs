/**
 * 亞洲共創學院網站｜聯絡表單 → Google 試算表
 *
 * 資料寫入「私人」試算表「亞創網站｜聯絡表單紀錄（含個資，請勿公開）」（mcu.comm04 雲端硬碟最上層），
 * 與公開的網站內容試算表分開存放。
 *
 * 重新安裝方式（只在需要重建時）：
 * 1. 打開試算表「亞創網站｜聯絡表單紀錄」→ 上方選單「擴充功能 → Apps Script」
 *    （或到 script.google.com 新增專案）
 * 2. 刪除編輯器裡原本的內容，把這整個檔案貼上，按「儲存」
 * 3. 右上角「部署 → 新增部署作業」→ 類型選「網頁應用程式」
 *    - 執行身分：我（mcu.comm04@me.mcu.edu.tw）
 *    - 誰可以存取：所有人
 * 4. 按「部署」，依畫面授權（會詢問存取試算表與寄信的權限）
 * 5. 複製「網頁應用程式」網址（https://script.google.com/macros/s/.../exec）給工程師
 *
 * 之後若修改這份程式，要到「部署 → 管理部署作業 → 編輯 → 版本：新版本」重新部署，
 * 網址不會改變。
 *
 * ⚠ 隱私：這份試算表含有訪客的個人資料，請勿「發布到網路」，也不要共用給「知道連結的任何人」。
 */

/**
 * 存放表單資料的私人試算表「亞創網站｜聯絡表單紀錄（含個資，請勿公開）」的 ID
 * （網址 /d/ 與 /edit 之間那一段）。此試算表只開放 mcu.comm04 帳號，請勿共用給「任何人」。
 */
const SPREADSHEET_ID = '17PbVGeNKCp-ypk_xaEDaeozZtbksJeNq162QVZi4Pgw'

/** 存放表單資料的分頁名稱（第一次收到表單時會自動建立） */
const SHEET_NAME = '聯絡表單'

/** 收到表單時是否寄 Email 通知（寄到部署這個程式的帳號） */
const NOTIFY_BY_EMAIL = true

const HEADERS = ['送出時間', '姓名', '單位名稱', '電子郵件', '合作需求', '留言', '來源頁面', '處理狀態']

/** 各欄位長度上限，避免被灌入過長內容 */
const LIMITS = { name: 60, org: 100, email: 120, need: 60, message: 3000, page: 200 }

/** 少於這個毫秒數就送出，幾乎只有機器人做得到，直接忽略 */
const MIN_FILL_MS = 2000

function doPost(e) {
  const lock = LockService.getScriptLock()
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}')

    // 防垃圾訊息：隱藏欄位被填寫、或填寫時間過短 → 假裝成功，不寫入
    if (data.website || Number(data.elapsed) < MIN_FILL_MS) return json({ ok: true })

    const row = {}
    Object.keys(LIMITS).forEach(function (key) {
      row[key] = safeCell(String(data[key] || '').trim().slice(0, LIMITS[key]))
    })

    if (!row.name || !row.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
      return json({ ok: false, error: 'invalid' })
    }

    lock.waitLock(10000)
    getSheet().appendRow([new Date(), row.name, row.org, row.email, row.need, row.message, row.page, '未處理'])

    if (NOTIFY_BY_EMAIL) notify(row)
    return json({ ok: true })
  } catch (err) {
    console.error(err)
    return json({ ok: false, error: 'server' })
  } finally {
    try {
      lock.releaseLock()
    } catch (_) {
      /* 沒有取得鎖時不需處理 */
    }
  }
}

/** 用瀏覽器打開網址時顯示，方便確認部署成功 */
function doGet() {
  return json({ ok: true, service: '亞洲共創學院網站聯絡表單' })
}

/** 開頭是 = + - @ 的內容在試算表中會被當成公式，前面加 ' 讓它保持純文字 */
function safeCell(value) {
  return /^[=+\-@\t\r]/.test(value) ? "'" + value : value
}

function getSheet() {
  // 用 ID 開啟：不論程式是附加在試算表上、或是獨立的 Apps Script 專案都能運作
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID)
  let sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME)
    sheet.appendRow(HEADERS)
    sheet.setFrozenRows(1)
    sheet
      .getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#222222')
      .setFontColor('#ffffff')
    sheet.setColumnWidth(6, 420)
    // 處理狀態下拉選單，方便追蹤
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['未處理', '處理中', '已回覆', '不需處理'], true)
      .build()
    sheet.getRange(2, HEADERS.length, 1000, 1).setDataValidation(rule)
  }
  return sheet
}

function notify(row) {
  const to = Session.getEffectiveUser().getEmail()
  if (!to) return
  const body = [
    '網站「聯絡我們」收到一則新的洽詢：',
    '',
    '姓名：' + row.name,
    '單位名稱：' + (row.org || '（未填）'),
    '電子郵件：' + row.email,
    '合作需求：' + row.need,
    '',
    '留言：',
    row.message,
    '',
    '──',
    '直接回覆這封信即可回信給對方。所有洽詢都記錄在試算表的「' + SHEET_NAME + '」分頁。',
  ].join('\n')
  MailApp.sendEmail({
    to: to,
    replyTo: row.email.replace(/^'/, ''),
    subject: '【網站洽詢】' + row.need + '｜' + row.name,
    body: body,
  })
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}
