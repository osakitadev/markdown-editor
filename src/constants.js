export const EDITOR_PLACEHOLDER = `# Welcome Markdown Editor

This is a live preview editor. You can write in Markdown on the left and see the formatted result on the right.

---

## Features
- Export to \`.html\` or \`.md\` for **FREE**
- Code blocks syntax highlight
- Scroll sync
- Open-Source
- Shorcuts to make your workflow easier and faster
  - alt + s: Open export file modal
  - ctrl + s: Save content

## Markdown examples

\`\`\`js
const getCatFact = async () => {
  try {
    const fact = await fetch('https://catfact.ninja/fact')
  } catch (e) {
    console.error('No cat fact :(', e)
  }

  return fact
}

console.log(await getCatFact())
\`\`\`

* Links: [Example](https://example.com)
* Images:
  ![Markdown Logo](https://markdown-here.com/img/icon256.png)

---

## Try it out

1. Replace this text.
2. Add your own Markdown.
3. Watch the preview update instantly.

`

export const EDITOR_SETTINGS = {
  value: EDITOR_PLACEHOLDER,
  language: 'markdown',
  theme: 'vs-dark',
  wordWrap: 'on',
  fontSize: 16,
  minimap: {
    enabled: false,
  },
  automaticLayout: true,
  scrollBeyondLastLine: true,
  padding: {
    top: 16,
    bottom: 16,
  },
}
