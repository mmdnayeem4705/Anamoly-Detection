import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

async function main() {
  const cameras = await prisma.camera.createMany({
    data: [
      { name: "Entrance", location: "Main Gate" },
      { name: "Vault", location: "Underground" },
      { name: "Shop Floor A", location: "Building A" }
    ]
  })

  const cameraList = await prisma.camera.findMany()

  const threats = ["Unauthorised Access", "Gun Threat", "Face Recognised"]
  const now = new Date()

  for (let i = 0; i < 12; i++) {
    const cam = cameraList[i % 3]
    const start = new Date(now.getTime() - i * 1000 * 60 * 30)
    const end = new Date(start.getTime() + 1000 * 60 * 5)
    await prisma.incident.create({
      data: {
        cameraId: cam.id,
        type: threats[i % 3],
        tsStart: start,
        tsEnd: end,
        thumbnail: `/images/thumb-${(i % 3) + 1}.jpg`, // You can later add dummy jpgs to /public/images
        resolved: false
      }
    })
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())
