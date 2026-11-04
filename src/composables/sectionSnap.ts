import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'
import { prefersReducedMotion } from './motion'

/**
 * 首頁區塊快捷捲動：滾輪或鍵盤輕推一下，就平滑跳到上／下一個區塊。
 * - 區塊需為 root 的直接子元素，並加上 data-snap="區塊名稱"
 * - 只攔截滑鼠滾輪與鍵盤；觸控滑動不會產生滾輪事件，手機仍為一般捲動
 * - 區塊若高於視窗，先以一般捲動看完該區塊，再跳到下一區
 * - 開啟「減少動態效果」時改為直接跳轉、不播放捲動動畫
 */

const DURATION = 750
/** 一次手勢結束的判斷：超過這段時間沒有滾輪輸入，才接受下一次跳轉（吸收觸控板慣性） */
const QUIET_MS = 180
const EDGE = 4
/** 區塊標題需避開的固定導覽列高度 */
const NAV_CLEARANCE = 92

export interface SnapSection {
  label: string
  el: HTMLElement
}

export function useSectionSnap(root: Ref<HTMLElement | null>) {
  const active = ref(0)
  const sections = ref<SnapSection[]>([])

  let animating = false
  let lastWheel = 0
  let frame = 0

  function collect() {
    if (!root.value) return
    sections.value = [...root.value.querySelectorAll<HTMLElement>(':scope > [data-snap]')].map((el) => ({
      el,
      label: el.dataset.snap ?? '',
    }))
  }

  const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight

  /** 區塊的停靠位置：區塊頂端；若區塊上方留白不足以避開導覽列，則再往上預留 */
  function snapTop(el: HTMLElement) {
    const top = el.getBoundingClientRect().top + window.scrollY
    const padding = parseFloat(getComputedStyle(el).paddingTop) || 0
    return Math.max(0, Math.round(top - Math.max(0, NAV_CLEARANCE - padding)))
  }

  /** 各區塊的停靠位置，最後再加上頁面底部（頁尾） */
  function targets() {
    const end = maxScroll()
    const list = sections.value.map((s, i) => (i === 0 ? 0 : Math.min(snapTop(s.el), end)))
    if (list.length && end - list[list.length - 1] > EDGE) list.push(end)
    return list
  }

  function animateTo(top: number) {
    cancelAnimationFrame(frame)
    const start = window.scrollY
    const distance = top - start
    if (Math.abs(distance) < 2) return
    if (prefersReducedMotion()) {
      window.scrollTo(0, top)
      onScroll()
      return
    }
    animating = true
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / DURATION, 1)
      const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
      window.scrollTo(0, start + distance * eased)
      if (p < 1) frame = requestAnimationFrame(tick)
      else {
        animating = false
        // 動畫結束時重新判斷所在區塊：最後一次捲動事件可能早於動畫結束，側邊圓點會停在上一區
        onScroll()
      }
    }
    frame = requestAnimationFrame(tick)
  }

  /** 該方向的目標位置；'native' 表示交給瀏覽器捲動（區塊比視窗高），null 表示已到盡頭 */
  function resolve(dir: 1 | -1): number | 'native' | null {
    const list = targets()
    const y = window.scrollY
    const vh = window.innerHeight
    let i = 0
    list.forEach((top, idx) => {
      if (top <= y + EDGE) i = idx
    })

    if (dir > 0) {
      const next = list[i + 1]
      if (next === undefined) return null
      return next - y > vh + EDGE ? 'native' : next
    }
    if (y > list[i] + EDGE) return y - list[i] > vh ? 'native' : list[i]
    return i > 0 ? list[i - 1] : null
  }

  /** 回傳 true 代表已處理（應阻止瀏覽器預設捲動） */
  function step(dir: 1 | -1) {
    const target = resolve(dir)
    if (target === 'native') return false
    if (target !== null) animateTo(target)
    return true
  }

  function goTo(index: number) {
    const top = targets()[index]
    if (top === undefined) return
    // 點圓點時立刻把亮起的圓點移到目標，不必等捲動結束
    if (index < sections.value.length) active.value = index
    animateTo(top)
  }

  /** 浮動視窗（例如 FAQ 小幫手）內的捲動與按鍵不觸發區塊跳轉 */
  const isIgnored = (e: Event) => e.target instanceof Element && !!e.target.closest('[data-snap-ignore]')

  function onWheel(e: WheelEvent) {
    if (isIgnored(e)) return
    if (e.ctrlKey || e.deltaY === 0 || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return
    const now = performance.now()
    const gestureStart = now - lastWheel > QUIET_MS
    lastWheel = now

    if (animating) {
      e.preventDefault()
      return
    }
    const dir = e.deltaY > 0 ? 1 : -1
    if (resolve(dir) === 'native') return
    e.preventDefault()
    if (gestureStart) step(dir)
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || isIgnored(e)) return
    const target = e.target as HTMLElement
    if (target.closest('input, textarea, select, [contenteditable="true"]')) return

    let dir: 1 | -1 | 0 = 0
    if (e.key === 'PageDown' || e.key === 'ArrowDown') dir = 1
    else if (e.key === 'PageUp' || e.key === 'ArrowUp') dir = -1
    else if (e.key === ' ' && !target.closest('button, a, [role="button"]')) dir = e.shiftKey ? -1 : 1
    if (!dir) return

    if (animating) {
      e.preventDefault()
      return
    }
    if (step(dir)) e.preventDefault()
  }

  function onScroll() {
    const line = window.scrollY + window.innerHeight * 0.4
    let idx = 0
    sections.value.forEach((s, i) => {
      if (s.el.getBoundingClientRect().top + window.scrollY <= line) idx = i
    })
    active.value = idx
  }

  onMounted(() => {
    collect()
    document.documentElement.classList.add('snap-mode')
    onScroll()
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeydown)
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    window.removeEventListener('wheel', onWheel)
    window.removeEventListener('keydown', onKeydown)
    window.removeEventListener('scroll', onScroll)
    document.documentElement.classList.remove('snap-mode')
  })

  return { active, sections, goTo }
}
