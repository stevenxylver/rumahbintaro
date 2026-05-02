import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
    try {
        const hero = await db.heroContent.findFirst({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json(hero)
    } catch (_error) {
        return NextResponse.json({ error: 'Failed to fetch hero content' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { videoUrl } = body

        if (!videoUrl) {
            return NextResponse.json({ error: 'Video URL is required' }, { status: 400 })
        }

        // Deactivate previous hero contents
        await db.heroContent.updateMany({
            where: { isActive: true },
            data: { isActive: false }
        })

        // Create new hero content
        const newHero = await db.heroContent.create({
            data: {
                videoUrl,
                isActive: true
            }
        })

        return NextResponse.json(newHero)
    } catch (_error) {
        return NextResponse.json({ error: 'Failed to update hero content' }, { status: 500 })
    }
}
