const fs = require('fs')
const childProcess = require('child_process')

const songs = require('./assets/songs.json')
// console.log(songs);
for (const song of songs) {
  console.log(song.title);

  const outputFile = `./output/${song.artist}  ${song.title}.m4a`

  // Convert .ts to .m4a
  childProcess.spawnSync(
    'ffmpeg',
    [
      '-i', `./assets/${song.id}.ts`,
      '-metadata', `title=${song.title}`,
      '-metadata', `artist=${song.artist}`,
      '-metadata', `comment=${song.url}`,
      '-metadata', `lyrics=${song.lyrics}`,
      '-metadata', 'genre=流行 Pop',
      '-vn',                // ignore video
      '-c:a', 'libfdk_aac', // use best encoder
      '-vbr', '4',          // use high quality
      outputFile,
    ],
    { stdio: 'inherit' },
  )

  break;
}

