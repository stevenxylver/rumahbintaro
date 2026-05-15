import db from '@/lib/db'
import { updatePromo } from '@/lib/actions/promo'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import PromoForm from '@/components/admin/PromoForm'

export default async function EditPromoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const promo = await db.promo.findUnique({
    where: { id }
  })

  if (!promo) notFound()

  const updatePromoAction = async (formData: FormData) => {
    'use server'
    const title = formData.get('title') as string
    const image = formData.get('image') as string

    if (!image) throw new Error('Image is required')

    await updatePromo(id, { title, image })
    redirect('/admin/promo')
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Promo</h1>
          <Link href="/admin/promo" className="text-gray-500 hover:text-gray-700 font-medium">
            ← Kembali
          </Link>
        </div>

        <PromoForm promo={promo} action={updatePromoAction} />
      </div>
    </div>
  )
}
