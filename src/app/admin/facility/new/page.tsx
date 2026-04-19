import FacilityForm from '@/components/admin/FacilityForm'
import { createFacility } from '@/lib/actions/facility'
import Link from 'next/link'

export default function NewFacilityPage() {
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/admin/facility" className="text-blue-600 font-bold hover:underline">← Back to List</Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Tambah Fasilitas Baru</h1>
        </div>
        <FacilityForm action={createFacility} />
      </div>
    </div>
  )
}
