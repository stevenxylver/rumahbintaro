import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import sharp from 'sharp'

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

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'general')
    
    // Ensure directory exists
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
      console.log('Created directory:', uploadDir)
    }

    const isImage = file.type.startsWith('image/') && !file.type.includes('svg')
    const isVideo = file.type.startsWith('video/')

    if (isImage) {
      // Convert image to WebP
      const baseName = file.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9.-]/g, '_')
      const filename = `${uuidv4()}-${baseName}.webp`.toLowerCase()
      const filePath = path.join(uploadDir, filename)

      await sharp(buffer)
        .webp({ quality: 80 })
        .toFile(filePath)

      console.log('Image converted to WebP and saved to:', filePath)

      return NextResponse.json({ 
        url: `/uploads/general/${filename}`,
        success: true 
      })
    } else {
      // For videos and other files, save as-is
      const filename = `${uuidv4()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`.toLowerCase()
      const filePath = path.join(uploadDir, filename)
      await writeFile(filePath, buffer)
      console.log('File successfully uploaded to:', filePath)

      return NextResponse.json({ 
        url: `/uploads/general/${filename}`,
        success: true 
      })
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    console.error('Upload API Error:', msg)
    return NextResponse.json({ error: 'Internal Server Error', details: msg }, { status: 500 })
  }
}
