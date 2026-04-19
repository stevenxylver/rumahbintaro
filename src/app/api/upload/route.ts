import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const filename = `${uuidv4()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'blog')
    const filePath = path.join(uploadDir, filename)

    await writeFile(filePath, buffer)

    return NextResponse.json({ 
      url: `/uploads/blog/${filename}`,
      success: true 
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
