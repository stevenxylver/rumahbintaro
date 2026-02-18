import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all properties
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const where: any = {}

        // Filters
        const minPrice = searchParams.get('minPrice')
        const maxPrice = searchParams.get('maxPrice')
        const location = searchParams.get('location')
        const status = searchParams.get('status')

        if (minPrice) where.price = { ...where.price, gte: parseFloat(minPrice) }
        if (maxPrice) where.price = { ...where.price, lte: parseFloat(maxPrice) }
        if (location) where.location = location
        if (status) where.status = status

        const properties = await prisma.property.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json(properties)
    } catch (error) {
        console.error('Error fetching properties:', error)
        return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 })
    }
}

// POST create new property
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const property = await prisma.property.create({
            data: {
                title: body.title,
                slug: body.slug,
                description: body.description,
                price: body.price,
                location: body.location,
                address: body.address || null,
                bedrooms: body.bedrooms || null,
                bathrooms: body.bathrooms || null,
                area: body.area || null,
                images: body.images || '[]',
                featured: body.featured || false,
                status: body.status || 'AVAILABLE',
            }
        })

        return NextResponse.json(property, { status: 201 })
    } catch (error) {
        console.error('Error creating property:', error)
        return NextResponse.json({ error: 'Failed to create property' }, { status: 500 })
    }
}
