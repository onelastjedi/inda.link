import { readFileSync } from 'fs'
import { join } from 'path'
import csso from 'csso'

const style = readFileSync(join(__dirname, '../styles', 'link.css'), 'utf8')
const css = csso.minify(style).css

export default (release, artist, slug) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="description" content="Listen to ${release.data.name + ' by ' + artist.data.name} on any music platform | Free universal music links by InDaLink">

    <meta property="og:title" content="${release.data.name + ' by ' + artist.data.name}">
    <meta property="og:description" content="Listen to ${release.data.name + ' by ' + artist.data.name} on any music platform | Free universal music links by InDaLink">
    <meta property="og:image:width" content="500">
    <meta property="og:image:height" content="500">
    <meta property="og:image" content="//images.weserv.nl/?url=${release.data.cover}&w=500&h=500&il&output=jpg">
    <meta property="og:url" content="https://inda.link/${slug}">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${release.data.name + ' by ' + artist.data.name}">
    <meta name="twitter:description" content="Listen to ${release.data.name + ' by ' + artist.data.name} on any music platform | Free universal music links by inda.link">
    <meta name="twitter:image" content="//images.weserv.nl/?url=${release.data.cover}&w=500&h=500&il&output=jpg">

    <title>${release.data.name + ' by ' + artist.data.name}</title>
    <link rel="canonical" href="https://inda.link/${slug}">

    <link rel="preconnect" href="//images.weserv.nl">
    <style>html,body{margin:0;padding:10px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizelegibility}*{box-sizing:border-box}</style>
    <style>${css}</style>
    <link rel="icon" href="//s3.eu-central-1.amazonaws.com/inda.link/assets/favicon.ico" type="image/x-icon">
  `
}
