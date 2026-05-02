import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      console.log('Upload failed: No file found in request')
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    console.log(`Uploading file: ${file.name}, size: ${file.size} bytes, type: ${file.type}`)

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const filename = `${uuidv4()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`.toLowerCase()
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'general')
    
    // Ensure directory exists
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
      console.log('Created directory:', uploadDir)
    }

    const filePath = path.join(uploadDir, filename)
    await writeFile(filePath, buffer)
    console.log('File successfully uploaded to:', filePath)

    return NextResponse.json({ 
      url: `/uploads/general/${filename}`,
      success: true 
    })
  } catch (error: any) {
    console.error('Upload API Error:', error.message, error.stack)
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 })
  }
}
