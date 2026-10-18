import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Cryptomine Space X — The Next Chapter Starts With Us",
  description: "An independent blockchain gaming project rebuilding its Play-to-Earn universe with community support.",
  metadataBase: new URL("https://cryptominespacexv2.netlify.app/"),
  openGraph: { title: "Cryptomine Space X", description: "Help rebuild the next chapter of an independent blockchain gaming universe.", type: "website", images: [{ url: "/cryptomine-hero.png", alt: "Cryptomine Space X" }] },
  twitter: { card: "summary_large_image", title: "Cryptomine Space X", description: "Help rebuild the next chapter of an independent blockchain gaming universe.", images: ["/cryptomine-hero.png"] },
  alternates: { canonical: "https://cryptominespacexv2.netlify.app/" },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
