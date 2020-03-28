import { q, db } from './lib/db'
import { minify } from 'html-minifier'
import url from 'url'
import head from './components/linkHead'
import footer from './components/linkFooter'
import cover from './components/linkCover'

// Platforms links
function getPlatform (string, platforms) {
  const { host } = url.parse(string)
  return platforms[host]
}

function links (links, platforms) {
  return links.map(link => {
    const platform = getPlatform(link, platforms)
    return `
      <a href="${link}"
        aria-label="${platform.name}"
        title="${platform.name}">
        ${platform.icon}
      </a>
    `
  }).join('')
}

export default async ({ headers, url }, res) => {
  const slug = url.split('/')[1]

  try {
    const release = await db.query(q.Get(q.Match(q.Index('releases_by_slug'), slug)))
    const artist = await db.query(q.Get(release.data.artist))
    const platforms = await db.query(q.Get(q.Ref(q.Collection('platforms'), '259356818254332416')))

    const html = `
      ${head(release, artist, slug)}
      <body>
        <header class="header">${release.data.genre} • ${release.data.year}</header>
        <main class="wrapper">
          ${cover(artist.data.name, release.data.name, release.data.cover)}
          <h1>${release.data.name}</h1>
          <h2>${artist.data.name}</h2>
          <div class="links">${links(release.data.links, platforms.data)}</div>
        </main>
        ${footer()}
      </body>
    `

    res.send(minify(html, {
      collapseWhitespace: true,
      removeTagWhitespace: true,
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
