import { NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validation'

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const MIN_INTERACTION_DURATION_MS = 3000

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { interactionDuration, ...formValues } = body

    const parsed = contactSchema.safeParse(formValues)

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? 'Invalid form data'
      return NextResponse.json(
        { success: false, message: firstError },
        { status: 422 },
      )
    }

    if (parsed.data.honeypot && parsed.data.honeypot.trim().length > 0) {
      return NextResponse.json(
        { success: false, message: 'Suspicious activity detected' },
        { status: 400 },
      )
    }

    if (
      typeof interactionDuration !== 'number' ||
      interactionDuration < MIN_INTERACTION_DURATION_MS
    ) {
      const waitSeconds = Math.ceil(
        (MIN_INTERACTION_DURATION_MS - (interactionDuration ?? 0)) / 1000,
      )
      return NextResponse.json(
        {
          success: false,
          message: `Please take a little more time with the form before submitting (≈${waitSeconds}s).`,
        },
        { status: 429 },
      )
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY

    if (!accessKey) {
      console.error('WEB3FORMS_ACCESS_KEY is not configured')
      return NextResponse.json(
        {
          success: false,
          message: 'Contact form is temporarily unavailable',
        },
        { status: 500 },
      )
    }

    const nowIso = new Date().toISOString()
    const humanDuration = `${Math.round(interactionDuration / 1000)} seconds`

    const web3Payload = {
      access_key: accessKey,
      subject: `New contact message from ${parsed.data.name}`,
      from_name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
      time: nowIso,
      time_spent: humanDuration,
      botcheck: '',
    }

    const web3Response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(web3Payload),
    })

    const web3Result = await web3Response.json().catch(() => ({}))

    if (!web3Response.ok || web3Result.success !== true) {
      console.error('Web3Forms error', web3Result)
      return NextResponse.json(
        {
          success: false,
          message:
            web3Result?.message ??
            'We could not send your message right now. Please try again later.',
        },
        { status: 502 },
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
    })
  } catch (error) {
    console.error('[ContactForm] Unexpected error', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong while sending your message.',
      },
      { status: 500 },
    )
  }
}

