import { PrismaClient } from '@prisma/client'
import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs'
import path from 'path'
import ytdl from 'ytdl-core'

const prisma = new PrismaClient()
const videoURL = 'https://youtu.be/W6A9FzDm80g'
const thumbnailDir = path.join(__dirname, '../public/thumbnails')

async function generateThumbnail(id: number): Promise<string> {
  const output = path.join(thumbnailDir, `thumb_${id}.jpg`)

  return new Promise((resolve, reject) => {
    const stream = ytdl(videoURL, { quality: 'highestvideo' })

    ffmpeg(stream)
      .on('start', () => console.log(`Generating thumbnail ${id}...`))
      .screenshots({
        timestamps: ['50%'],
        filename: `thumb_${id}.jpg`,
        folder: thumbnailDir,
        size: '320x240',
      })
      .on('end', () => resolve(`/thumbnails/thumb_${id}.jpg`))
      .on('error', reject)
  })
}

async function main() {
  if (!fs.existsSync(thumbnailDir)) {
    fs.mkdirSync(thumbnailDir)
  }

  await prisma.incident.deleteMany()
  await prisma.camera.deleteMany()

  const camera = await prisma.camera.create({
    data: { name: 'Entrance', location: 'Main Gate' },
  })

  for (let i = 1; i <= 5; i++) {
    const incident = await prisma.incident.create({
      data: {
        type: 'Unauthorised Access',
        tsStart: new Date(Date.now() - 600000),
        tsEnd: new Date(),
        resolved: false,
        thumbnail: '',
        cameraId: camera.id,
      },
    })

    const thumbUrl = await generateThumbnail(incident.id)
    await prisma.incident.update({
      where: { id: incident.id },
      data: { thumbnail: thumbUrl },
    })
  }
}
await prisma.incident.create({
  data: {
    type: 'Anomaly',
    tsStart: new Date(),
    tsEnd: new Date(),
    thumbnail: '/thumbnails/thumb_532.jpg',  // 👈 update path
    camera: {
      create: {
        name: 'Camera 1',
        location: 'Lobby',
      },
    },
  },
})

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
export default main