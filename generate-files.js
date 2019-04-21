const fs = require('fs')
const cheerio = require('cheerio')
const Database = require('better-sqlite3')

const db = new Database('dumpfile.db', { fileMustExist: true })

// for (const row of db.prepare('SELECT * FROM dump').iterate()) {
//   console.log(row)
// }

function* getSongs() {
  const pages =
    db.prepare("SELECT * FROM dump WHERE content_type LIKE 'text/html%'")
  for (const page of pages.iterate()) {
    const $ = cheerio.load(page.data)
    const songs = $('#songlist tr.item_box').map((i, el) => {
      let item = $(el)
      return {
        id: item.find('.btn-play').data('id'),
        title: item.find('h4').text(),
        artist: item.find('td > a').text(),
      }
    })
    yield* songs.get()
  }
}

const songs = [...getSongs()]
console.log(songs);

