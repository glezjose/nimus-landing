import { siteIcons } from "@/lib/site-icons";
import { Caveat } from "next/font/google";
import "./fonts.css";
import "./globals.css";
import "./landing.css";
import "./loader.css";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={caveat.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href={siteIcons.svg} type="image/svg+xml" />
        <link
          rel="icon"
          href={siteIcons.light}
          sizes="32x30"
          type="image/png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href={siteIcons.dark}
          sizes="32x30"
          type="image/png"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="apple-touch-icon" href={siteIcons.dark} />
        <link
          rel="preload"
          href="/assets/fonts/ClashDisplay-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/fonts/Archivo-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
