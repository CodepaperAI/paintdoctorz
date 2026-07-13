import { Html, Head, Main, NextScript } from "next/document";

// Runs before React hydrates to prevent a flash of the wrong theme.
const themeInitScript = `
(function () {
  try {
    var key = "painting-doctorz-theme";
    var stored = localStorage.getItem(key);
    var system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    var resolved = (stored === "light" || stored === "dark") ? stored : system;
    if (resolved === "dark") {
      document.documentElement.classList.add("dark");
    }
    document.documentElement.style.colorScheme = resolved;
  } catch (e) {}
})();
`;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
        <meta name="format-detection" content="telephone=no" />
      </Head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
