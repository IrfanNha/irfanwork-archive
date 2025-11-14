import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const MIN_INTERACTION_DURATION_MS = 3000;

export async function POST(request: Request) {
  try {
    // Parse body safely
    const rawBody = await request.text();

    let body: any;
    try {
      body = JSON.parse(rawBody);
    } catch {
      console.error("Invalid JSON:", rawBody);
      return NextResponse.json(
        { success: false, message: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    const { interactionDuration, ...formValues } = body;

    // Zod validation
    const parsed = contactSchema.safeParse(formValues);
    if (!parsed.success) {
      const firstError =
        parsed.error.issues[0]?.message ?? "Invalid form data";
      return NextResponse.json(
        { success: false, message: firstError },
        { status: 422 }
      );
    }

    // Honeypot check (anti-spam)
    if (parsed.data.honeypot?.trim().length > 0) {
      return NextResponse.json(
        { success: false, message: "Suspicious activity detected" },
        { status: 400 }
      );
    }

    // Human-time check (anti bot)
    if (
      typeof interactionDuration !== "number" ||
      interactionDuration < MIN_INTERACTION_DURATION_MS
    ) {
      const waitSeconds = Math.ceil(
        (MIN_INTERACTION_DURATION_MS - (interactionDuration ?? 0)) / 1000
      );
      return NextResponse.json(
        {
          success: false,
          message: `Please take a bit more time before submitting (≈${waitSeconds}s).`,
        },
        { status: 429 }
      );
    }

    // Access key
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      console.error("WEB3FORMS_ACCESS_KEY missing");
      return NextResponse.json(
        { success: false, message: "Contact form unavailable" },
        { status: 500 }
      );
    }

    // Prepare metadata
    const nowIso = new Date().toISOString();
    const humanDuration = `${Math.round(interactionDuration / 1000)} seconds`;

    const ip =
      request.headers.get("x-forwarded-for") ??
      request.headers.get("x-real-ip") ??
      "unknown";

    const userAgent = request.headers.get("user-agent") ?? "unknown";

    // Final payload for Web3Forms — must match allowed fields only
    const web3Payload = {
      access_key: accessKey,
      subject: `New Contact Message from ${parsed.data.name}`,
      from_name: parsed.data.name,
      email: parsed.data.email,
      message: `
Message:
${parsed.data.message}

------------------------
Extra Metadata:
Submitted at : ${nowIso}
Time spent   : ${humanDuration}
IP Address   : ${ip}
User Agent   : ${userAgent}
`,
      botcheck: "", // important for Web3Forms anti-spam
    };

    // Send request to Web3Forms
    const web3Res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(web3Payload),
    });

    const web3Json = await web3Res.json().catch(() => null);

    if (!web3Res.ok || !web3Json?.success) {
      console.error("Web3Forms error:", web3Json);
      return NextResponse.json(
        {
          success: false,
          message:
            web3Json?.message ??
            "Could not send your message. Please try again later.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (err) {
    console.error("[ContactForm] Unexpected error:", err);
    return NextResponse.json(
      { success: false, message: "Unexpected error occurred." },
      { status: 500 }
    );
  }
}
