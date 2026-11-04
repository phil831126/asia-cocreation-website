import { faqs, synonyms, type Audience, type FaqItem } from '@/data/faq'

/**
 * FAQ 關鍵字比對（不需 AI）
 * 1. 整理輸入：全形轉半形、轉小寫、去掉空白與標點
 * 2. 同義詞展開：打「多少錢」也會找含「費用」「報價」的題目
 * 3. 計分：命中關鍵字 > 命中同義詞 > 問題文字相符 > 兩字切詞相符
 * 4. 依單位類型與所在頁面微幅加分，只回傳分數達門檻的題目
 */

const THRESHOLD = 3

export function normalize(text: string) {
  return text.normalize('NFKC').toLowerCase().replace(/[\s\p{P}\p{S}]/gu, '')
}

/** 口語贅字：不參與兩字切詞比對，避免「可以停車嗎」因為「可以」而誤中 */
const FILLERS = /請問|想問|想知道|可以|能不能|有沒有|是否|你們|我們|貴公司|什麼|怎麼|如何|一下|嗎|呢|吧|的/g

function bigrams(text: string) {
  const set = new Set<string>()
  for (let i = 0; i < text.length - 1; i++) set.add(text.slice(i, i + 2))
  return set
}

const groups = synonyms.map((g) => g.map(normalize))

const indexed = faqs.map((item) => {
  const question = normalize(item.question)
  const keywords = item.keywords.map(normalize)
  const haystack = [question, ...keywords].join('|')
  return { item, question, keywords, haystack, grams: bigrams(haystack) }
})

export const faqById = new Map(faqs.map((f) => [f.id, f]))

export interface SearchContext {
  audience?: Audience | null
  page?: string
}

function fitsAudience(item: FaqItem, audience?: Audience | null) {
  return !audience || !item.audience?.length || item.audience.includes(audience)
}

function contentScore(entry: (typeof indexed)[number], q: string, hitGroups: string[][]) {
  if (q.length === 1) return entry.keywords.some((k) => k.includes(q)) ? THRESHOLD : 0

  let score = 0
  for (const k of entry.keywords) if (q.includes(k)) score += 6
  for (const g of hitGroups) if (g.some((t) => entry.haystack.includes(t))) score += 4
  if (entry.question.includes(q)) score += 5

  let overlap = 0
  for (const gram of bigrams(q.replace(FILLERS, '|'))) if (!gram.includes('|') && entry.grams.has(gram)) overlap++
  return score + Math.min(overlap, 4)
}

function rank(query: string, ctx: SearchContext) {
  const q = normalize(query)
  if (!q) return []
  const hitGroups = groups.filter((g) => g.some((t) => q.includes(t)))

  return indexed
    .map((entry) => {
      const content = contentScore(entry, q, hitGroups)
      let bonus = 0
      if (ctx.audience && entry.item.audience?.length) bonus += entry.item.audience.includes(ctx.audience) ? 1.5 : -1
      if (ctx.page && entry.item.pages?.includes(ctx.page)) bonus += 1
      return { item: entry.item, content, score: content + bonus }
    })
    .filter((r) => r.content > 0)
    .sort((a, b) => b.score - a.score)
}

/** 達門檻的結果（最多 limit 則） */
export function searchFaq(query: string, ctx: SearchContext, limit = 3) {
  return rank(query, ctx)
    .filter((r) => r.content >= THRESHOLD)
    .slice(0, limit)
    .map((r) => r.item)
}

/** 找不到時「最接近」的題目：分數未達門檻也列出 */
export function nearestFaq(query: string, ctx: SearchContext, limit = 3) {
  const near = rank(query, ctx).slice(0, limit).map((r) => r.item)
  return near.length ? near : popularFaq(ctx, limit)
}

/** 開場推薦：符合單位類型的題目，所在頁面相關的排在前面 */
export function popularFaq(ctx: SearchContext, limit = 4) {
  const list = faqs.filter((f) => fitsAudience(f, ctx.audience))
  const onPage = list.filter((f) => ctx.page && f.pages?.includes(ctx.page))
  return [...new Set([...onPage, ...list])].slice(0, limit)
}

/** 「你可能還想知道」：依 related 帶出，過濾不符合單位類型的題目 */
export function relatedFaq(item: FaqItem, ctx: SearchContext, limit = 3) {
  return (item.related ?? [])
    .map((id) => faqById.get(id))
    .filter((f): f is FaqItem => !!f && fitsAudience(f, ctx.audience))
    .slice(0, limit)
}
