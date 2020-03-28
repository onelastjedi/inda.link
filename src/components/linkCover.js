export default (artist, release, cover) => `
<picture>
  <source
    srcset="//images.weserv.nl/?url=${cover}&w=720&h=720&output=webp&il"
    type="image/webp">
  <source
    srcset="//images.weserv.nl/?url=${cover}&w=720&h=720&output=jpg&il"
    type="image/jpeg">
  <img
    class="orig"
    alt="${release + ' by ' + artist}"
    src="//images.weserv.nl/?url=${cover}&w=720&h=720&output=jpg&il">
</picture>
<picture>
  <source
    srcset="//images.weserv.nl/?url=${cover}&w=720&h=720&output=webp&il"
    type="image/webp">
  <source
    srcset="//images.weserv.nl/?url=${cover}&w=720&h=720&output=jpg&il"
    type="image/jpeg">
  <img
    class="shadow"
    alt="${release + ' by ' + artist}"
    src="//images.weserv.nl/?url=${cover}&w=720&h=720&output=jpg&il">
</picture>
`
