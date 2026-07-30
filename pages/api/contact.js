import { Resend } from "resend";
import { buildEmail } from "../../lib/emailTemplates";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body || {};

  // Server-side validation.
  if (!name?.trim()) return res.status(400).json({ error: "Name is required." });
  if (!/^\S+@\S+\.\S+$/.test(email || ""))
    return res.status(400).json({ error: "Valid email is required." });
  if (!message?.trim())
    return res.status(400).json({ error: "Message is required." });

  try {
    const safeName = String(name).replace(/[\r\n]/g, " ").trim().slice(0, 70);

    await resend.emails.send({
        from: `${safeName} <noreply@paintingdoctorz.com>`,
        to: process.env.CONTACT_TO_EMAIL,
      replyTo: email, // hitting "reply" goes straight to the customer
      subject: `New contact message from ${name}`,
      html: buildEmail({
        heading: "New contact message",
        intro: `You've received a new enquiry through the website contact form.`,
        rows: [
          ["Name", name],
          ["Email", email],
          ["Message", message],
        ],
      }),
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Resend contact error:", err);
    return res.status(500).json({ error: "Failed to send. Please try again." });
  }
}