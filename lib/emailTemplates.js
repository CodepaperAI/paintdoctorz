// Brand-themed HTML email builder (inline styles for email-client support).
const BRAND = {
  navy: "#0B2A66",
  gold: "#B68D40",
  cream: "#FAF8F5",
  border: "#E7E2D9",
  text: "#1F1F1F",
  sub: "#666666",
};

function rowsHtml(rows) {
  return rows
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid ${BRAND.border};font-size:13px;color:${BRAND.sub};font-weight:600;width:38%;vertical-align:top;">${label}</td>
          <td style="padding:12px 16px;border-bottom:1px solid ${BRAND.border};font-size:14px;color:${BRAND.text};vertical-align:top;">${String(value).replace(/\n/g, "<br/>")}</td>
        </tr>`
    )
    .join("");
}

export function buildEmail({ heading, intro, rows }) {
  return `
  <!DOCTYPE html>
  <html>
  <body style="margin:0;padding:0;background:${BRAND.cream};font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.cream};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid ${BRAND.border};border-radius:16px;overflow:hidden;">
            <!-- Header -->
            <tr>
              <td style="background:${BRAND.navy};padding:28px 32px;">
                <div style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-0.3px;">Painting&nbsp;Doctorz</div>
                <div style="color:${BRAND.gold};font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;margin-top:4px;">Premium Painting</div>
              </td>
            </tr>
            <!-- Gold rule -->
            <tr><td style="height:4px;background:${BRAND.gold};"></td></tr>
            <!-- Body -->
            <tr>
              <td style="padding:32px;">
                <h1 style="margin:0 0 8px;font-size:22px;color:${BRAND.navy};">${heading}</h1>
                <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:${BRAND.sub};">${intro}</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BRAND.border};border-radius:12px;overflow:hidden;">
                  ${rowsHtml(rows)}
                </table>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="padding:20px 32px;background:${BRAND.cream};border-top:1px solid ${BRAND.border};">
                <p style="margin:0;font-size:12px;color:${BRAND.sub};">This message was sent from the Painting Doctorz website.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;
}