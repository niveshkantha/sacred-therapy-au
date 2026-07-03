import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { getGift } from "@/lib/gifts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3456";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, context, message, giftSlug } = body as {
    name?: string;
    email?: string;
    context?: string;
    message?: string;
    giftSlug?: string;
  };

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  const gift = getGift(giftSlug ?? null);
  let supabaseAdmin: ReturnType<typeof getSupabaseAdmin>;

  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (error) {
    console.error("Supabase configuration error:", error);
    return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
  }

  const { error: dbError } = await supabaseAdmin.from("subscribers").upsert(
    {
      name,
      email,
      feeling: context ?? null,
      message: message ?? null,
      gift_track_slug: gift.trackSlug,
    },
    { onConflict: "email" }
  );

  if (dbError) {
    return NextResponse.json({ error: "Could not save your details." }, { status: 500 });
  }

  const listenUrl = `${SITE_URL}/sound-sanctuary`;

  const emailResult = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Sacred Therapy AU <onboarding@resend.dev>",
      to: email,
      subject: "A little something to begin with",
      html: `
        <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; color: #3a2e26; line-height: 1.6;">
          <p style="letter-spacing: 0.15em; text-transform: uppercase; font-size: 11px; color: #a68a6d;">Sacred Therapy AU</p>
          <h1 style="font-size: 22px; font-weight: normal;">Thank you, ${name}.</h1>
          <p>This is our first gift to you — no pressure, no scripts, just a place to begin.</p>
          <p>Based on what you shared, we thought <strong>${gift.trackTitle}</strong> might meet you where you are.</p>
          <p><a href="${listenUrl}" style="color: #a68a6d;">Listen in the Sound Sanctuary &rarr;</a></p>
          <p style="margin-top: 32px; font-size: 13px; color: #8a7a6d;">Neshi will also be in touch personally, gently and without rush.</p>
          <p style="font-size: 12px; color: #a99b8d;">No newsletters unless you ask. Just this.</p>
        </div>
      `,
    }),
  });

  if (!emailResult.ok) {
    const detail = await emailResult.text();
    console.error("Resend error:", detail);
    return NextResponse.json({ error: "Saved, but the gift email failed to send." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, gift: gift.trackTitle });
}
