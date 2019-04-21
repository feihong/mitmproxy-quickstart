const fs = require('fs')
const childProcess = require('child_process')

// Convert .ts to .m4a
function convertToM4a(song, outputFile) {
  const tsFile = `./assets/${song.id}.ts`
  if (!fs.existsSync(tsFile)) {
    return
  }

  // Convert and add metadata in one step
  childProcess.spawnSync(
    'ffmpeg',
    [
      '-y',   // overwrite if file already exists
      '-i', tsFile,
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

  // Balance loudness levels
  childProcess.spawnSync(
    'aacgain',
    [
      '-r',  // apply Track gain automatically (all files set to equal loudness)
      '-k',  // automatically lower Track/Album gain to not clip audio
      outputFile,
    ],
    { stdio: 'inherit' },
  )
}

function addCoverArt(song, outputFile) {
  if (!fs.existsSync(song.imageFile)) {
    return
  }

  // If the image is webp, first convert it to png
  if (song.imageFile.endsWith('.webp')) {
    const pngFile = `./assets/${song.imageId}.png`
    childProcess.spawnSync(
      'ffmpeg',
      [
        '-y',   // overwrite if file already exists
        '-i', song.imageFile,
        pngFile,
      ],
      { stdio: 'inherit' }
    )
    song.imageFile = pngFile
  }

  childProcess.spawnSync(
    'AtomicParsley',
    [
      outputFile,
      '--artwork', song.imageFile,
      '--overWrite',
    ],
    { stdio: 'inherit' }
  )
}

const songs = require('./assets/songs.json')

for (const song of songs) {
  console.log(song.title);

  const outputFile = `./output/${song.artist}  ${song.title}.m4a`

  convertToM4a(song, outputFile)
  addCoverArt(song, outputFile)
}

