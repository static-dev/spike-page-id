const pageId = require('..')
const path = require('path')
const {readFileSync} = require('fs')
const Spike = require('spike-core')
const htmlStandards = require('spike-html-standards')
const test = require('ava')

test.cb('basic', (t) => {
  const root = path.join(__dirname, 'example')
  const proj = new Spike({
    root,
    matchers: { html: '**/*.sgr' },
    entries: { main: [path.join(root, 'main.js')] },
    reshape: (ctx) => htmlStandards({ webpack: ctx, locals: { pageId: pageId(ctx) } })
  })

  proj.on('error', t.end)
  proj.on('compile', () => {
    const f1 = readFileSync(path.join(root, 'public/index.html'), 'utf8')
    const f2 = readFileSync(path.join(root, 'public/nested/index.html'), 'utf8')
    t.is(f1.trim(), '<p>index</p>')
    t.is(f2.trim(), '<p>nested-index</p>')
    t.end()
  })

  proj.compile()
})
