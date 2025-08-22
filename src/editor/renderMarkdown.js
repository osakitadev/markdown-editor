import hljs from 'highlight.js'
import { renderer } from './markdownRenderer.js'

const editorPreview = document.getElementById('editor-preview')

export default function renderMarkdown(content = '') {
  const html = renderer.render(content)

  editorPreview.innerHTML = html

  hljs.highlightAll()
}
