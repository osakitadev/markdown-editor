import { markdownEditor } from './editor/monacoEditor'

export default function checkUnsavedChanges() {
  const latestContent = localStorage.getItem('savedContent') ?? ''
  const content = markdownEditor.getValue()

  return latestContent.trim() !== content.trim()
}
