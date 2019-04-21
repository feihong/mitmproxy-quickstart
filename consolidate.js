const fs = require('fs')
const childProcess = require('child_process')

const songs = require('./assets/songs.json')
// console.log(songs);
for (const song of songs) {
  console.log(song.title);

  childProcess.spawnSync(
    'ffmpeg',
    [
      '-i', `./assets/${song.id}.ts`,
      '-metadata', `title="${song.title}"`,
      '-metadata', `author="${song.artist}"`,
      '-metadata', `comment="${song.url}"`,
      '-metadata', `lyrics="${song.lyrics}"`,
      '-vn',                // ignore video
      '-c:a', 'libfdk_aac', // use best encoder
      '-vbr', '4',          // use high quality
      `./output/${song.artist}  ${song.title}.m4a`
    ],
    { stdio: 'inherit' },
  )
}

