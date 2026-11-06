import { shallowRef } from 'vue'

/**
 * 導覽列停靠位置：首頁 Hero 底部的色帶會登記在這裡。
 * 桌機版（寬度 1081px 以上）導覽列一開始顯示在色帶中，
 * 往下捲動時跟著頁面上移，抵達畫面頂端後固定；其他頁面或較窄畫面維持固定在頂端。
 */
export const navDockEl = shallowRef<HTMLElement | null>(null)

/** 啟用停靠效果的最小寬度（與 Hero 桌機版版面相同） */
export const NAV_DOCK_QUERY = '(min-width: 1081px)'
