import FacilityForm from '@/components/admin/FacilityForm'
import { updateFacility } from '@/lib/actions/facility'
import db from '@/lib/db'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditFacilityPage({ params }: Props) {
  const { id } = await params
  const facility = await db.facility.findUnique({ where: { id } })
  if (!facility) notFound()

  const updateAction = updateFacility.bind(null, id)

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/admin/facility" className="text-blue-600 font-bold hover:underline">← Back to List</Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Edit Fasilitas</h1>
        </div>
        <FacilityForm facility={facility} action={updateAction} />
      </div>
    </div>
  )
}
