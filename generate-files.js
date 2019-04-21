const fs = require('fs')
const cheerio = require('cheerio')
const Database = require('better-sqlite3')

const db = new Database('dumpfile.db', { fileMustExist: true })

// for (const row of db.prepare('SELECT * FROM dump').iterate()) {
//   console.log(row)
// }

function prepare(whereClause) {
  return db.prepare("SELECT * FROM dump WHERE " + whereClause)
}

function* getSongs() {
  const pages =
    db.prepare(
      "SELECT * FROM dump WHERE path LIKE '%/playlists/%' AND content_type LIKE 'text/html%'")
  for (const page of pages.iterate()) {
    const playlistRe = /playlists\/([0-9]+)\//
    let playlistId = page.path.match(playlistRe)[1]
    fs.writeFileSync(`./assets/${playlistId}.html`, page.data)

    const $ = cheerio.load(page.data)
    const songs = $('#songlist tr.item_box').map((i, el) => {
      let item = $(el)
      let anchor = item.find('td > a')
      let imageUrl = item.find('img').attr('src')
      let imageIdRe = /\/([a-zA-Z0-9]+)[.](?:jpg|png)/

      return {
        id: item.find('.btn-play').data('id'),
        title: item.find('h4').text(),
        artist: anchor.text(),
        url: 'https://streetvoice.com' + anchor.attr('href'),
        imageId: imageUrl.match(imageIdRe)[1],
      }
    }).get()
    for (let song of songs) {
      const stmt = prepare(`path LIKE '%/songs/${song.id}/%fields=lyrics%'`)
      let row = stmt.get()
      song.lyrics = JSON.parse(row.data.toString()).lyrics

      const stmt2 = prepare(`path LIKE '%/songs/${song.id}/hls/'`)
      let row2 = stmt2.get()
      let fileIdRe = /\/([a-zA-Z0-9]+)[.]mp3/
      song.fileId = JSON.parse(row2.data.toString()).file.match(fileIdRe)[1]

      // Write cover art to disk
      const stmt3 = prepare(
        `path LIKE '%/${song.imageId}%' AND NOT path LIKE '%h_44%'`)
      let row3 = stmt3.get()
      if (row3) {
        const extension = row3.content_type.match(/image\/([a-z]+)/)[1]
        song.imageFile = `./assets/${song.imageId}.${extension}`
        fs.writeFileSync(song.imageFile, row3.data)
      }

      // Write .ts file to disk
      const stmt4 = prepare(`path LIKE '%/${song.fileId}.mp3%' ORDER BY path`)
      const filename = `./assets/${song.id}.ts`
      if (fs.existsSync(filename)) {
        fs.unlinkSync(filename)
      }
      const stream = fs.createWriteStream(filename, { flags: 'a' })
      for (const row of stmt4.iterate()) {
        stream.write(row.data)
      }
      stream.end()
    }
    yield* songs
  }
}

const songs = [...getSongs()]
fs.writeFileSync('./assets/songs.json', JSON.stringify(songs, null, 2))

for (const song of songs) {
  console.log(song.fileId);
}

