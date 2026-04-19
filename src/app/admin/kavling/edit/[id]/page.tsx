import KavlingForm from '@/components/admin/KavlingForm'
import { updateKavling } from '@/lib/actions/kavling'
import db from '@/lib/db'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditKavlingPage({ params }: Props) {
  const { id } = await params
  const kavling = await db.kavling.findUnique({ where: { id } })
  if (!kavling) notFound()

  const updateAction = updateKavling.bind(null, id)

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/admin/kavling" className="text-blue-600 font-bold hover:underline">← Back to List</Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Edit Kavling</h1>
        </div>
        <KavlingForm kavling={kavling} action={updateAction} />
      </div>
    </div>
  )
}
