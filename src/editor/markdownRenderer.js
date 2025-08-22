import markdownit from 'markdown-it'

export const renderer = markdownit({
  linkify: true,
  html: true,
  breaks: true,
})
