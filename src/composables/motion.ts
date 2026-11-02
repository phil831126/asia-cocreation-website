import { onBeforeUnmount, onMounted, ref, watch, type Directive, type Ref } from 'vue'

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/* ---------- v-reveal：捲動進入畫面時淡入 ---------- */
let revealObserver: IntersectionObserver | null = null

function getRevealObserver() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            revealObserver?.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
  }
  return revealObserver
}

/** 用法：v-reveal 或 v-reveal="120"（延遲毫秒） */
export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }
    getRevealObserver().observe(el)
  },
  unmounted(el) {
    revealObserver?.unobserve(el)
  },
}

/* ---------- useInView：元素是否已進入畫面（只觸發一次） ---------- */
export function useInView(target: Ref<HTMLElement | null>, threshold = 0.3) {
  const inView = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!target.value || !('IntersectionObserver' in window)) {
      inView.value = true
      return
    }
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          inView.value = true
          observer?.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(target.value)
  })

  onBeforeUnmount(() => observer?.disconnect())
  return inView
}

/* ---------- useCountUp：數字遞增動畫 ---------- */
export function useCountUp(target: number | null, active: Ref<boolean>, duration = 1800) {
  const display = ref(0)
  let frame = 0

  watch(
    active,
    (isActive) => {
      if (!isActive || target === null) return
      if (prefersReducedMotion()) {
        display.value = target
        return
      }
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - t, 3)
        display.value = Math.round(target * eased)
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    },
    { immediate: true },
  )

  onBeforeUnmount(() => cancelAnimationFrame(frame))
  return display
}

/* ---------- 捲動至頁面區塊 ---------- */
export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
}
