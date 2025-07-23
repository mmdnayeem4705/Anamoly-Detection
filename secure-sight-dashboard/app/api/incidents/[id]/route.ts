import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(
  req: Request,
  context: { params: { id: string } }
) {
  const id = context.params.id
  const body = await req.json()

  try {
    const updated = await prisma.incident.update({
      where: { id: Number(id) },
      data: { resolved: body.resolved === true },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Failed to update incident:', error)
    return NextResponse.json(
      { error: 'Incident not found or update failed' },
      { status: 400 }
    )
  }
}
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id

  try {
    await prisma.incident.delete({ where: { id: Number(id) } })
    return NextResponse.json({ message: 'Incident deleted successfully' })
  } catch (error) {
    console.error('Failed to delete incident:', error)
    return NextResponse.json(
      { error: 'Incident not found or deletion failed' },
      { status: 400 }
    )
  }
}
