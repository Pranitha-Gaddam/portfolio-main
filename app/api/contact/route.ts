// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(s: string) {
  return s.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]!));
}

export async function POST(req: Request) {
    try {
        console.log("RESEND_FROM value:", process.env.RESEND_FROM);
      const body = await req.json();
      console.log("Incoming form data:", body);
  
      const { data, error } = await resend.emails.send({
        from: process.env.RESEND_FROM!,
        to: process.env.CONTACT_TO!,
        subject: `[Portfolio] ${body.subject}`,
        html: `<p>${body.message}</p>`,
        replyTo: body.email,
      });
  
      if (error) {
        console.error("Resend API error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
  
      return NextResponse.json({ ok: true, id: data?.id });
    } catch (err: any) {
      console.error("Route error:", err);
      return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
    }
  }
  