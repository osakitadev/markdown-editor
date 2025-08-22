import { editor } from 'monaco-editor'
import { EDITOR_SETTINGS } from '../constants'

export const markdownEditor = editor.create(
  document.getElementById('editor-container'),
  EDITOR_SETTINGS
)
