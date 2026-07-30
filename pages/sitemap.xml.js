import { serviceAreas } from "../data/locations";

const SITE = "https://paintdoctorz.vercel.app"; // ← change to https://paintingdoctorz.ca once the domain is live

function generateSiteMap() {
  const staticPaths = [
    "",
    "/about",
    "/why-choose-us",
    "/interior-services",
    "/exterior-services",
    "/portfolio",
    "/contact",
    "/book",
    "/painters",
  ];

  const cityPaths = serviceAreas.map((a) => `/painters/${a.slug}`);
  const all = [...staticPaths, ...cityPaths];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
  .map(
    (p) =>
      `  <url><loc>${SITE}${p}</loc><changefreq>weekly</changefreq><priority>${
        p === "" ? "1.0" : "0.8"
      }</priority></url>`
  )
  .join("\n")}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/xml");
  res.write(generateSiteMap());
  res.end();
  return { props: {} };
}

export default function SiteMap() {
  return null;
}