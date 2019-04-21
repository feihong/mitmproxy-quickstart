/*
Scrape playlist pages and convert the track metadata within to json
*/
const fs = require('fs')
const cheerio = require('cheerio')
const Database = require('better-sqlite3')

const db = new Database('dumpfile.db', { fileMustExist: true })

function prepare(whereClause) {
  return db.prepare("SELECT * FROM dump WHERE " + whereClause)
}

function* getSongs() {
  const pages =
    prepare("path LIKE '%/playlists/%' AND content_type LIKE 'text/html%'")
  for (const page of pages.iterate()) {
    const playlistRe = /playlists\/([0-9]+)\//
    const match = page.path.match(playlistRe)
    if (!match) {
      continue
    }
    const playlistId = match[1]
    fs.writeFileSync(`./assets/${playlistId}.html`, page.data)

    const $ = cheerio.load(page.data)
    yield* $('#songlist tr.item_box').map((i, el) => {
      const item = $(el)
      const anchor = item.find('td > a')
      const imageUrl = item.find('img').attr('src')
      const imageIdRe = /\/([a-zA-Z0-9]+)[.](?:jpg|jpeg|png)/

      return {
        id: item.find('.btn-play').data('id'),
        title: item.find('h4').text(),
        artist: anchor.text(),
        url: 'https://streetvoice.com' + anchor.attr('href'),
        imageId: imageUrl.match(imageIdRe)[1],
      }
    }).get()
  }
}

const songs = [...getSongs()]
fs.writeFileSync('./assets/songs.json', JSON.stringify(songs, null, 2))

for (const song of songs) {
  console.log(song.title);
}
