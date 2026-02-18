import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
    params: Promise<{ id: string }>
}

// GET single property by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params
        const property = await prisma.property.findUnique({
            where: { id }
        })

        if (!property) {
            return NextResponse.json({ error: 'Property not found' }, { status: 404 })
        }

        return NextResponse.json(property)
    } catch (error) {
        console.error('Error fetching property:', error)
        return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 })
    }
}

// PUT update property
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params
        const body = await request.json()

        const property = await prisma.property.update({
            where: { id },
            data: {
                title: body.title,
                slug: body.slug,
                description: body.description,
                price: body.price,
                location: body.location,
                address: body.address,
                bedrooms: body.bedrooms,
                bathrooms: body.bathrooms,
                area: body.area,
                images: body.images,
                featured: body.featured,
                status: body.status,
            }
        })

        return NextResponse.json(property)
    } catch (error) {
        console.error('Error updating property:', error)
        return NextResponse.json({ error: 'Failed to update property' }, { status: 500 })
    }
}

// DELETE property
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params
        await prisma.property.delete({
            where: { id }
        })

        return NextResponse.json({ message: 'Property deleted successfully' })
    } catch (error) {
        console.error('Error deleting property:', error)
        return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 })
    }
}
