import { readFileSync } from 'fs'
import { join } from 'path'
import csso from 'csso'

const style = readFileSync(join(__dirname, '../styles', '404.css'), 'utf8')
const css = csso.minify(style).css

const kvika = 'https://s3.eu-central-1.amazonaws.com/inda.link/assets/404-1000x1000.PNG'

export default () => `
  <!DOCTYPE html>
  <html lang="en">
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="preconnect" href="//images.weserv.nl">
  <style>html,body{margin:0;padding:10px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizelegibility}*{box-sizing:border-box}</style>
  <style>${css}</style>
  <link rel="icon" href="//s3.eu-central-1.amazonaws.com/inda.link/assets/favicon.ico" type="image/x-icon">
  <body>
    <main>
      <h1>404</h1>
      <h2>
        We sorry, but seems no kvits for you right here...<br>
        <a rel="noreferrer" href="https://www.instagram.com/mc_kvika/">Kvika</a> suggests you to check our latest <a href="/" title="Latest releases">releases</a>!
      </h2>
      <div class="kvika">
        <picture>
          <source
            srcset="//images.weserv.nl/?url=${kvika}&w=500&h=500&output=webp&il"
            type="image/webp">
          <source
            srcset="//images.weserv.nl/?url=${kvika}&w=500&h=500&output=jpg&il"
            type="image/jpeg">
          <img
            class="orig"
            alt="Page not found"
            src="//images.weserv.nl/?url=${kvika}&w=500&h=500&output=jpg&il">
        </picture>
      </div>
    </main>
  </body>
`
