/**
 * IndyLaw — Minimal Express backend for Resend email integration
 * Handles POST /api/request-demo and sends emails securely server-side.
 */

import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load from server/.env, then fallback to root .env
dotenv.config({ path: path.join(__dirname, '.env') })
dotenv.config()

import express, { Request, Response } from 'express'
import cors from 'cors'
import { Resend } from 'resend'

// ── Environment ────────────────────────────────────────────────────────────
const PORT = Number(process.env.PORT) || 3000
const RESEND_API_KEY = process.env.RESEND_API_KEY
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'heetnandu2@gmail.com'
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev'

if (!RESEND_API_KEY) {
  console.error('❌  RESEND_API_KEY is not set in server/.env — emails will not send.')
  process.exit(1)
}

const resend = new Resend(RESEND_API_KEY)

// ── Express app ─────────────────────────────────────────────────────────────
const app = express()

app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:4173'],
    methods: ['POST', 'OPTIONS'],
  })
)

// ── Types ───────────────────────────────────────────────────────────────────
interface DemoRequestBody {
  name: string
  email: string
  phone: string
  organization: string
}

// ── Validation helpers ───────────────────────────────────────────────────────
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidPhone(phone: string): boolean {
  return /^[0-9\s+\-()]{10,15}$/.test(phone)
}

// ── POST /api/request-demo ───────────────────────────────────────────────────
app.post('/api/request-demo', async (req: Request, res: Response) => {
  const { name, email, phone, organization } = req.body as DemoRequestBody

  // --- Field presence validation ---
  const errors: Record<string, string> = {}
  if (!name?.trim() || name.trim().length < 3)
    errors.name = 'Full name must be at least 3 characters.'
  if (!email?.trim() || !isValidEmail(email.trim()))
    errors.email = 'Please enter a valid email address.'
  if (!phone?.trim() || !isValidPhone(phone.trim()))
    errors.phone = 'Enter a valid phone number (10–15 digits).'
  if (!organization?.trim() || organization.trim().length < 2)
    errors.organization = 'Organization name is required.'

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ success: false, errors })
    return
  }

  // Capture submission metadata
  const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  const userIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    'Unknown'

  try {
    // ── Admin notification email ─────────────────────────────────────────
    await resend.emails.send({
      from: `IndyLaw <${FROM_EMAIL}>`,
      to: [ADMIN_EMAIL],
      subject: 'New Demo Request - IndyLaw AI',
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111827; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header -->
          <div style="background: #0B132B; padding: 28px 32px;">
            <div style="font-size: 11px; font-weight: 700; letter-spacing: 2px; color: #D4AF37; text-transform: uppercase; margin-bottom: 6px;">IndyLaw AI</div>
            <h2 style="margin: 0; font-size: 22px; color: #ffffff; font-weight: 700;">New Demo Request</h2>
            <p style="margin: 6px 0 0; font-size: 13px; color: rgba(255,255,255,0.6);">A new prospect has submitted a demo request.</p>
          </div>
          <!-- Body -->
          <div style="padding: 32px; background: #FAF9F6; border: 1px solid #e5e7eb; border-top: none;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; font-size: 13px;">
              <tr style="border-bottom: 1px solid #f0ede8;">
                <td style="padding: 12px 8px; color: #6B7280; font-weight: 700; width: 160px; vertical-align: top;">Full Name</td>
                <td style="padding: 12px 8px; color: #111827; font-weight: 500;">${name.trim()}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0ede8;">
                <td style="padding: 12px 8px; color: #6B7280; font-weight: 700; vertical-align: top;">Email</td>
                <td style="padding: 12px 8px;"><a href="mailto:${email.trim()}" style="color: #0B132B; font-weight: 500;">${email.trim()}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f0ede8;">
                <td style="padding: 12px 8px; color: #6B7280; font-weight: 700; vertical-align: top;">Phone</td>
                <td style="padding: 12px 8px; color: #111827; font-weight: 500;">${phone.trim()}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0ede8;">
                <td style="padding: 12px 8px; color: #6B7280; font-weight: 700; vertical-align: top;">Organization</td>
                <td style="padding: 12px 8px; color: #111827; font-weight: 500;">${organization.trim()}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0ede8;">
                <td style="padding: 12px 8px; color: #6B7280; font-weight: 700; vertical-align: top;">Submitted At</td>
                <td style="padding: 12px 8px; color: #111827;">${submittedAt} IST</td>
              </tr>
              <tr>
                <td style="padding: 12px 8px; color: #6B7280; font-weight: 700; vertical-align: top;">User IP</td>
                <td style="padding: 12px 8px; color: #111827;">${userIp}</td>
              </tr>
            </table>
          </div>
          <!-- Footer -->
          <div style="padding: 16px 32px; background: #0B132B; text-align: center;">
            <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.4);">IndyLaw AI · India's AI-Native Legal Operating System</p>
          </div>
        </div>
      `,
    })

    // ── User confirmation email ───────────────────────────────────────────
    try {
      await resend.emails.send({
        from: `IndyLaw <${FROM_EMAIL}>`,
        to: [email.trim()],
        subject: 'Thanks for requesting a demo of IndyLaw AI',
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111827; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
            <!-- Header -->
            <div style="background: #0B132B; padding: 28px 32px;">
              <div style="font-size: 11px; font-weight: 700; letter-spacing: 2px; color: #D4AF37; text-transform: uppercase; margin-bottom: 6px;">IndyLaw AI</div>
              <h2 style="margin: 0; font-size: 22px; color: #ffffff; font-weight: 700;">Demo Request Confirmed ✓</h2>
            </div>
            <!-- Body -->
            <div style="padding: 36px 32px; background: #FAF9F6; border: 1px solid #e5e7eb; border-top: none;">
              <p style="margin: 0 0 16px; font-size: 15px; color: #111827;">Hi <strong>${name.trim()}</strong>,</p>
              <p style="margin: 0 0 16px; font-size: 14px; color: #4B5563; line-height: 1.7;">
                Thank you for requesting a demo of <strong style="color: #0B132B;">IndyLaw AI</strong> — India's AI-Native Legal Operating System. We have received your details and a member of our team will personally reach out within <strong>1–2 business days</strong> to schedule your private walkthrough.
              </p>
              <!-- What's next -->
              <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px 24px; margin: 24px 0;">
                <p style="margin: 0 0 14px; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; color: #0B132B; text-transform: uppercase;">What Happens Next</p>
                <div style="display: flex; align-items: flex-start; margin-bottom: 10px;">
                  <span style="display: inline-block; width: 22px; height: 22px; background: rgba(212,175,55,0.15); color: #AA820A; border-radius: 50%; font-size: 10px; font-weight: 900; text-align: center; line-height: 22px; flex-shrink: 0; margin-right: 12px;">1</span>
                  <span style="font-size: 13px; color: #4B5563; line-height: 1.5;">Check your inbox for this confirmation email.</span>
                </div>
                <div style="display: flex; align-items: flex-start; margin-bottom: 10px;">
                  <span style="display: inline-block; width: 22px; height: 22px; background: rgba(212,175,55,0.15); color: #AA820A; border-radius: 50%; font-size: 10px; font-weight: 900; text-align: center; line-height: 22px; flex-shrink: 0; margin-right: 12px;">2</span>
                  <span style="font-size: 13px; color: #4B5563; line-height: 1.5;">Our team reviews your organization profile.</span>
                </div>
                <div style="display: flex; align-items: flex-start;">
                  <span style="display: inline-block; width: 22px; height: 22px; background: rgba(212,175,55,0.15); color: #AA820A; border-radius: 50%; font-size: 10px; font-weight: 900; text-align: center; line-height: 22px; flex-shrink: 0; margin-right: 12px;">3</span>
                  <span style="font-size: 13px; color: #4B5563; line-height: 1.5;">We schedule a personalized live demo session.</span>
                </div>
              </div>
              <p style="margin: 0; font-size: 13px; color: #4B5563; line-height: 1.7;">
                If you have any immediate questions, feel free to reply to this email or reach us at <a href="mailto:hello@indylaw.in" style="color: #AA820A; font-weight: 600;">hello@indylaw.in</a>.
              </p>
            </div>
            <!-- Footer -->
            <div style="padding: 20px 32px; background: #0B132B; text-align: center;">
              <p style="margin: 0 0 4px; font-size: 13px; font-weight: 700; color: #D4AF37;">IndyLaw AI</p>
              <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.4);">India's AI-Native Legal Operating System</p>
            </div>
          </div>
        `,
      })
      console.log(`✅  Demo request from ${name.trim()} <${email.trim()}> — confirmation email sent.`)
    } catch (confirmErr: unknown) {
      console.warn(`⚠️  Failed to send confirmation email to user (sandbox limit?):`, confirmErr)
    }

    console.log(`✅  Demo request from ${name.trim()} <${email.trim()}> processed successfully.`)
    res.status(200).json({ success: true, message: 'Demo request submitted successfully.' })
  } catch (err: unknown) {
    console.error('❌  Resend API error:', err)
    const message =
      err instanceof Error ? err.message : 'Failed to send email. Please try again later.'
    res.status(500).json({ success: false, message })
  }
})

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'IndyLaw API' })
})

// ── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀  IndyLaw API server running at http://localhost:${PORT}`)
  console.log(`    Admin email: ${ADMIN_EMAIL}`)
  console.log(`    From email:  ${FROM_EMAIL}`)
})
