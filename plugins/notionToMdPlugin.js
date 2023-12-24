import { promises as fs } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { NotionToMarkdown } from 'notion-to-md'

export default function notionToMdPlugin() {
  return {
    name: 'notion-to-md',
    async transform(code, id) {
      if (id.endsWith('.md')) {
        const n2m = new NotionToMarkdown()
        const notionFile = fileURLToPath(new URL(id, import.meta.url))
        const markdownContent = await notionToMd(notionFile)
        return `module.exports = ${JSON.stringify(markdownContent)}`
      }
    }
  }
}
