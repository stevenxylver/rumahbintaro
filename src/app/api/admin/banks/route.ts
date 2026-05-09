import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET() {
    try {
        const banks = await db.partnerBankItem.findMany({
            orderBy: { order: 'asc' }
        })
        return NextResponse.json(banks)
    } catch (_error) {
        return NextResponse.json({ error: 'Failed to fetch bank partners' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const { name, logo, order } = await req.json()

        if (!name || !logo) {
            return NextResponse.json({ error: 'Name and logo are required' }, { status: 400 })
        }

        const bank = await db.partnerBankItem.create({
            data: { name, logo, order: order || 0 }
        })

        return NextResponse.json(bank)
    } catch (_error) {
        return NextResponse.json({ error: 'Failed to create bank partner' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json()

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 })
        }

        await db.partnerBankItem.delete({ where: { id } })
        return NextResponse.json({ success: true })
    } catch (_error) {
        return NextResponse.json({ error: 'Failed to delete bank partner' }, { status: 500 })
    }
}
