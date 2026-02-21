import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
    const { name, email, phone } = await req.json()

    if (!name && !email && !phone) {
        return NextResponse.json({ error: 'Isi minimal satu field' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    })

    try {
        await transporter.sendMail({
            from: `"Rumah Bintaro" <${process.env.SMTP_USER}>`,
            to: process.env.LEAD_EMAIL,
            subject: `🏠 Lead Baru: ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #2563eb, #4f46e5); padding: 24px; border-radius: 12px 12px 0 0;">
                        <h1 style="color: white; margin: 0; font-size: 22px;">🏠 Lead Baru Masuk!</h1>
                        <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0;">Rumah Bintaro</p>
                    </div>
                    <div style="background: #f9fafb; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px 0; color: #6b7280; font-size: 14px; width: 120px;">Nama</td>
                                <td style="padding: 10px 0; font-weight: 600; color: #111827;">${name}</td>
                            </tr>
                            <tr style="border-top: 1px solid #e5e7eb;">
                                <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Email</td>
                                <td style="padding: 10px 0; font-weight: 600; color: #111827;">${email}</td>
                            </tr>
                            <tr style="border-top: 1px solid #e5e7eb;">
                                <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Telepon</td>
                                <td style="padding: 10px 0; font-weight: 600; color: #111827;">${phone}</td>
                            </tr>
                        </table>
                        <a href="https://wa.me/${phone.replace(/\D/g, '')}" 
                           style="display: inline-block; margin-top: 20px; padding: 12px 24px; background: #25d366; color: white; border-radius: 8px; text-decoration: none; font-weight: 600;">
                            💬 WhatsApp Sekarang
                        </a>
                    </div>
                </div>
            `,
        })

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error('Email error:', err)
        return NextResponse.json({ error: 'Gagal mengirim email' }, { status: 500 })
    }
}
