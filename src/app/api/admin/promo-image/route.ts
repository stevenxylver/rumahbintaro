import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET() {
    try {
        const image = await db.promoImage.findFirst({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json(image)
    } catch (_error) {
        return NextResponse.json({ error: 'Failed to fetch promo image' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const { imageUrl } = await req.json()

        if (!imageUrl) {
            return NextResponse.json({ error: 'Image URL is required' }, { status: 400 })
        }

        // Deactivate all existing
        await db.promoImage.updateMany({
            data: { isActive: false }
        })

        // Create new active one
        const newImage = await db.promoImage.create({
            data: { imageUrl, isActive: true }
        })

        return NextResponse.json(newImage)
    } catch (_error) {
        return NextResponse.json({ error: 'Failed to update promo image' }, { status: 500 })
    }
}
