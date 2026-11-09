import { createRouter, createWebHistory, START_LOCATION } from 'vue-router'
import { pageMeta } from './data/site'
import { prefersReducedMotion } from './composables/motion'
import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'
import LecturersView from './views/LecturersView.vue'
import LearningMapView from './views/LearningMapView.vue'
import TrendsView from './views/TrendsView.vue'
import CasesView from './views/CasesView.vue'
import CaseDetailView from './views/CaseDetailView.vue'
import ContactView from './views/ContactView.vue'
import NotFoundView from './views/NotFoundView.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { key: 'home' } },
    { path: '/about', name: 'about', component: AboutView, meta: { key: 'about' } },
    { path: '/lecturers', name: 'lecturers', component: LecturersView, meta: { key: 'lecturers' } },
    { path: '/trends', name: 'trends', component: TrendsView, meta: { key: 'trends' } },
    { path: '/learning-map', name: 'learning-map', component: LearningMapView, meta: { key: 'learningMap' } },
    { path: '/cases', name: 'cases', component: CasesView, meta: { key: 'cases' } },
    { path: '/cases/:id', name: 'case-detail', component: CaseDetailView, meta: { key: 'caseDetail' } },
    { path: '/contact', name: 'contact', component: ContactView, meta: { key: 'contact' } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView, meta: { key: 'notFound' } },
  ],
  scrollBehavior(to, from, saved) {
    // 重新整理（或第一次開啟）時一律回到頁面頂端，不還原先前的捲動位置
    if (from === START_LOCATION) return { top: 0 }
    if (saved) return saved
    // 同一頁只改網址參數（例如講師聯盟的搜尋、篩選）時，維持目前捲動位置
    if (to.path === from.path && to.hash === from.hash) return false
    if (to.hash) {
      const behavior = prefersReducedMotion() ? 'auto' : 'smooth'
      const target = { el: to.hash, top: 96, behavior } as const
      // 跨頁時等待新頁面渲染後再捲動
      if (to.path !== from.path) return new Promise((resolve) => setTimeout(() => resolve(target), 80))
      return target
    }
    return { top: 0 }
  },
})

function setMeta(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.name = name
    document.head.appendChild(el)
  }
  el.content = content
}

router.afterEach((to) => {
  const meta = pageMeta[(to.meta.key as string) ?? 'home'] ?? pageMeta.home
  document.title = meta.title
  setMeta('description', meta.description)
})
