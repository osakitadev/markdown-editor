import renderMarkdown from './editor/renderMarkdown.js'
import exportFile from './editor/exportFile.js'
import { markdownEditor } from './editor/monacoEditor.js'
import checkUnsavedChanges from './checkUnsavedChanges.js'
import { EDITOR_PLACEHOLDER } from './constants.js'

const modalContainer = document.getElementById('modal')
const modalExportFile = document.getElementById('export-modal')
const exportBtn = document.getElementById('export')
const formExport = document.getElementById('form-export')
const editorPreview = document.getElementById('editor-preview')

function toggleModalContainer(visible = null) {
  const isHidden = modalContainer.classList.contains('hidden')
  const shouldShow = visible !== null ? visible : isHidden

  modalContainer.classList.toggle('hidden', !shouldShow)
  modalContainer.classList.toggle('flex', shouldShow)
}

function openModal() {
  modalExportFile.classList.remove('hidden')
  toggleModalContainer(true)
}

function closeModals() {
  toggleModalContainer(false)
  modalExportFile.classList.add('hidden')
}

formExport.addEventListener('submit', e => {
  e.preventDefault()

  const data = new FormData(e.target)
  const name = data.get('file-name') || 'untitled-markdown'
  const extension = data.get('file-extension')

  exportFile(name, extension, markdownEditor)
  closeModals()
})

modalContainer.addEventListener('click', e => {
  if (e.target.classList.contains('close-button')) closeModals()
})

exportBtn.addEventListener('click', () => openModal(modalExportFile))

markdownEditor.onDidScrollChange(e => {
  const { scrollTop, scrollLeft } = e

  editorPreview.scrollLeft = scrollLeft
  editorPreview.scrollTop = scrollTop
})

renderMarkdown(markdownEditor.getValue())
markdownEditor.onDidChangeModelContent(() => {
  renderMarkdown(markdownEditor.getValue())

  document.title = checkUnsavedChanges()
    ? '* Markdown Editor'
    : 'Markdown Editor'
})

document.addEventListener('keydown', e => {
  const { altKey, ctrlKey, key } = e

  if (ctrlKey && key === 's') {
    e.preventDefault()

    localStorage.setItem('savedContent', markdownEditor.getValue())

    document.title = 'Markdown Editor'
  } else if (altKey && key === 's') {
    openModal(modalExportFile)
  }
})

window.addEventListener('beforeunload', e => {
  if (checkUnsavedChanges()) {
    e.preventDefault()
    e.returnValue = ''
  }
})

markdownEditor
  .getModel()
  .setValue(localStorage.getItem('savedContent') ?? EDITOR_PLACEHOLDER)
