import { q, db } from './lib/db'
import { minify } from 'html-minifier'
import { readFileSync } from 'fs'
import { join } from 'path'
import csso from 'csso'
import cover from './components/linkCover'

const style = readFileSync(join(__dirname, './styles', 'index.css'), 'utf8')
const css = csso.minify(style).css

const dict = {
  'en-US': {
    h1: 'In Music We Trust'
  },
  'ru-RU': {
    h1: 'Мы и есть стиль'
  }
}

const html = (lang, releases) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="description" content="InDaHole — underground music community">
    <title>In Music We Trust</title>
    <meta name="yandex-verification" content="930c8f1fbc9d0097" />
    <link rel="preconnect" href="//images.weserv.nl">
    <style>html,body{height:100%;width:100%;text-align:center;display:grid;align-items:center;margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizelegibility}*{box-sizing:border-box}</style>
    <style>${css}</style>
    <link rel="icon" href="//s3.eu-central-1.amazonaws.com/inda.link/assets/favicon.ico" type="image/x-icon">
  </head>
  <body>
    <main class="wrapper">
      <div class="hero">
        <h1>In Music We Trust</h1>
        <a class="email"
          href="mailto:yo@inda.link"
          title="email">
        yo@inda.link</a>
      </div>
      ${renderReleases(releases)}
    </main>
  </body>
  </html>
`
function renderReleases (releases) {
  return releases.data.map(release => {
    return `
    <a href="${release.data.slug}" title="${release.data.name}">
      ${cover('', release.data.name, release.data.cover)}
    </a>
    `
  }).join('')
}

export default async (req, res) => {
  const lang = req.headers["accept-language"].slice(0, 5)

  const releases = await db.query(q.Map(
    q.Paginate(q.Match(q.Index('all_releases'))),
    q.Lambda('release', q.Get(q.Var('release')))
  ))

  try {
    res.send(minify(html(lang, releases), {
      collapseWhitespace: true,
      removeTagWhitespace: true,
      minifyCss: true,
      removeTagWhitespace: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      useShortDoctype: true,
      removeAttributeQuotes: true,
      collapseInlineTagWhitespace: true,
    }))
  }

  catch (error) {
    res.status(404).send('<h1>404</h1>')
  }
}
