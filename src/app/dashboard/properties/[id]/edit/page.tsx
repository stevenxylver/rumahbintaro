import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { PropertyForm } from '@/components/PropertyForm'

interface Props {
    params: Promise<{ id: string }>
}

async function getProperty(id: string) {
    const property = await prisma.property.findUnique({
        where: { id }
    })
    return property
}

export default async function EditPropertyPage({ params }: Props) {
    const { id } = await params
    const property = await getProperty(id)

    if (!property) {
        notFound()
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Edit Properti</h1>
                <p className="text-gray-600 mt-1">Perbarui informasi properti</p>
            </div>

            {/* Form */}
            <PropertyForm property={property} isEdit />
        </div>
    )
}
