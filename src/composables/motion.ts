import { onBeforeUnmount, onMounted, ref, type Directive, type Ref } from 'vue'

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

/* ---------- useInView：元素是否進入畫面 ----------
   預設只觸發一次；repeat: true 時，元素完全離開畫面會變回 false，
   下次（不論往上或往下捲）再進入畫面又會變成 true，可讓動畫重播 */
export function useInView(target: Ref<HTMLElement | null>, threshold = 0.3, options: { repeat?: boolean } = {}) {
  const inView = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!target.value || !('IntersectionObserver' in window)) {
      inView.value = true
      return
    }
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
          inView.value = true
          if (!options.repeat) observer?.disconnect()
        } else if (options.repeat && !entry.isIntersecting) {
          // 完全看不到時才重設，避免使用者看到數字倒轉
          inView.value = false
        }
      },
      { threshold: options.repeat ? [0, threshold] : threshold },
    )
    observer.observe(target.value)
  })

  onBeforeUnmount(() => observer?.disconnect())
  return inView
}

/* ---------- 捲動至頁面區塊 ---------- */
export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
}
