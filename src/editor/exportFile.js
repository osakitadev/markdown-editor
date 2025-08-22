import { renderer } from './markdownRenderer.js'

function download(url, fileName, fileExtension) {
  const a = document.createElement('a')
  a.href = url
  a.download = `${fileName.trim()}.${fileExtension}`

  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export default function exportFile(fileName, fileExtension, editor) {
  const fileContent = editor.getValue()
  let blob = null

  if (fileExtension === 'html') {
    const htmlContent = renderer.render(fileContent)

    blob = new Blob(
      [
        `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fileName}</title>
  </head>
<body>
  ${htmlContent}
</body>
</html>
`,
      ],
      { type: 'text/plain' }
    )
  } else if (fileExtension === 'md') {
    blob = new Blob([fileContent], { type: 'text/plain' })
  }

  const url = URL.createObjectURL(blob)
  download(url, fileName, fileExtension)
}
