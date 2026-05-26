import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { name, email, company, service, message } = await req.json()

  try {
    await resend.emails.send({
      from: 'Criador Contact Form <onboarding@resend.dev>',
      to: 'hello@criador.studio',
      replyTo: email,
      subject: `New Inquiry: ${service || 'General'} — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #F2EDE6; border-radius: 16px;">
          <div style="background: #B5552A; padding: 24px 32px; border-radius: 12px; margin-bottom: 24px;">
            <h1 style="color: white; margin: 0; font-size: 22px;">New Project Inquiry</h1>
            <p style="color: rgba(255,255,255,0.7); margin: 6px 0 0; font-size: 14px;">via Criador Studio website</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            ${[
              ['Name', name],
              ['Email', email],
              ['Company', company || '—'],
              ['Service', service || '—'],
            ].map(([label, value]) => `
              <tr>
                <td style="padding: 10px 0; color: #8C857C; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; width: 120px;">${label}</td>
                <td style="padding: 10px 0; color: #2E2A26; font-size: 14px;">${value}</td>
              </tr>
            `).join('')}
          </table>

          <div style="margin-top: 20px; padding: 20px; background: white; border-radius: 12px; border-left: 4px solid #B5552A;">
            <p style="color: #8C857C; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 8px;">Message</p>
            <p style="color: #2E2A26; font-size: 14px; line-height: 1.6; margin: 0;">${message}</p>
          </div>

          <p style="margin-top: 24px; color: #8C857C; font-size: 12px; text-align: center;">
            Reply directly to this email to respond to ${name}
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email send error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
