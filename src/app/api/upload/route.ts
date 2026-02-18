import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const files = formData.getAll('files') as File[]

        if (files.length === 0) {
            return NextResponse.json({ error: 'No files uploaded' }, { status: 400 })
        }

        const uploadDir = path.join(process.cwd(), 'public', 'uploads')

        // Ensure upload directory exists
        try {
            await mkdir(uploadDir, { recursive: true })
        } catch (e) {
            // Directory might already exist
        }

        const uploadedFiles: string[] = []

        for (const file of files) {
            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)

            // Generate unique filename
            const timestamp = Date.now()
            const randomStr = Math.random().toString(36).substring(2, 8)
            const ext = path.extname(file.name)
            const filename = `${timestamp}-${randomStr}${ext}`

            const filepath = path.join(uploadDir, filename)
            await writeFile(filepath, buffer)

            uploadedFiles.push(`/uploads/${filename}`)
        }

        return NextResponse.json({ files: uploadedFiles }, { status: 201 })
    } catch (error) {
        console.error('Error uploading files:', error)
        return NextResponse.json({ error: 'Failed to upload files' }, { status: 500 })
    }
}
