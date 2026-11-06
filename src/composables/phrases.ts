/**
 * 把標題依「，」「：」切成短句，每段以 inline-block 呈現，
 * 讓長標題換行時落在標點後，不會把詞語拆成兩行。
 * highlight 有值時，會標出各段中要以黃底線強調的文字。
 */
export interface Phrase {
  before: string
  mark: string
  after: string
}

export function splitPhrases(title: string, highlight?: string): Phrase[] {
  return title
    .split(/(?<=[，：])/)
    .filter(Boolean)
    .map((text) => {
      const i = highlight ? text.indexOf(highlight) : -1
      if (!highlight || i < 0) return { before: text, mark: '', after: '' }
      return { before: text.slice(0, i), mark: highlight, after: text.slice(i + highlight.length) }
    })
}
