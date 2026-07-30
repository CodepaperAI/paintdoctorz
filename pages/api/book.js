import { Resend } from "resend";
import { buildEmail } from "../../lib/emailTemplates";
import { isValidCanadianPhone } from "../../lib/phone";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const f = req.body || {};

  if (!f.projectType) return res.status(400).json({ error: "Project type is required." });
  if (!f.propertyType) return res.status(400).json({ error: "Property type is required." });
  if (!f.area?.trim()) return res.status(400).json({ error: "Area is required." });
  if (!f.timeline) return res.status(400).json({ error: "Timeline is required." });
  if (!f.budget) return res.status(400).json({ error: "Budget is required." });
  if (!f.name?.trim()) return res.status(400).json({ error: "Name is required." });
  if (!/^\S+@\S+\.\S+$/.test(f.email || ""))
    return res.status(400).json({ error: "Valid email is required." });
  if (!isValidCanadianPhone(f.phone))
    return res.status(400).json({ error: "Valid Canadian phone is required." });
  if (!f.address?.trim())
    return res.status(400).json({ error: "Address is required." });

  try {
    const safeName = String(f.name).replace(/[\r\n]/g, " ").trim().slice(0, 70);

    await resend.emails.send({
  from: `${safeName} <noreply@paintingdoctorz.com>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: f.email,
      subject: `New booking request — ${f.projectType} from ${f.name}`,
      html: buildEmail({
        heading: "New booking request",
        intro: `A new project scoping request has come through the booking form.`,
        rows: [
          ["Project", f.projectType],
          ["Property", f.propertyType],
          ["Area", f.area],
          ["Timeline", f.timeline],
          ["Budget", f.budget],
          ["Name", f.name],
          ["Email", f.email],
          ["Phone", `+1 ${f.phone}`],
          ["Address", f.address],
          ["Notes", f.notes || "—"],
        ],
      }),
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Resend book error:", err);
    return res.status(500).json({ error: "Failed to send. Please try again." });
  }
}