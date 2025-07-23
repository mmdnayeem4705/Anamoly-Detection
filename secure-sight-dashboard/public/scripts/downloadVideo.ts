import fs from 'fs'
import ytdl from 'ytdl-core'
import path from 'path'

const videoURL = 'https://youtu.be/W6A9FzDm80g'
const outputPath = path.join(__dirname, '../public/video.mp4')

ytdl(videoURL, { quality: 'highestvideo' })
  .pipe(fs.createWriteStream(outputPath))
  .on('finish', () => {
    console.log('✅ Downloaded to public/video.mp4')
  })
  .on('error', console.error)
