'use client'

import { deleteBlogPost } from '@/lib/actions/blog'
import { deleteKavling } from '@/lib/actions/kavling'
import { deleteFacility } from '@/lib/actions/facility'
import { deleteProperty } from '@/lib/actions/property'
import { deletePromo } from '@/lib/actions/promo'

interface DeleteButtonProps {
  postId: string
  type?: 'blog' | 'kavling' | 'facility' | 'property' | 'promo'
}

export default function DeleteButton({ postId, type = 'blog' }: DeleteButtonProps) {
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this item?')) {
      if (type === 'blog') await deleteBlogPost(postId)
      else if (type === 'kavling') await deleteKavling(postId)
      else if (type === 'facility') await deleteFacility(postId)
      else if (type === 'property') await deleteProperty(postId)
      else if (type === 'promo') await deletePromo(postId)
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 font-bold hover:underline"
    >
      Delete
    </button>
  )
}
