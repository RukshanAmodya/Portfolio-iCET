import type { Metadata, Viewport } from "next";
import "./globals.css";
import { assetUrl } from "@/lib/assets";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rukshan-amodya.vercel.app/";
const siteTitle = "Rukshan Amodya — Full-Stack Developer & AI Systems Engineer";
const siteDescription =
  "රුක්ෂාන් අමෝද්‍ය – Full-Stack Software Engineer, Flutter & Mobile App Specialist, AI Systems Developer. Founder of Questra & Coding Divers, Co-Founder of Gravix. Building modern scalable web platforms, high-performance mobile apps, and autonomous AI workflows.";

const siteKeywords =
  "Rukshan Amodya,රුක්ෂාන් අමෝද්‍ය,Rukshan,amodya.dev,Full Stack Developer Sri Lanka,Flutter Developer Sri Lanka,Mobile App Developer,AI Systems Engineer,Next.js Developer,React Developer,Software Engineer Sri Lanka,Questra,Coding Divers,Gravix,Aethera AI,ArtimaX,Solarjade,Moni,Tale Look,Python Developer,FastAPI,Cloudflare Developer,Sinhala Software Engineer,Sri Lanka Dev";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: "amodya.dev",
  keywords: siteKeywords.split(","),
  authors: [{ name: "Rukshan Amodya", url: siteUrl }],
  creator: "Rukshan Amodya",
  publisher: "Questra",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      si: siteUrl,
      en: siteUrl,
      "x-default": siteUrl,
    },
  },
  icons: {
    icon: [
      { url: assetUrl("/logo.webp"), type: "image/webp" },
      { url: assetUrl("/favicon.ico") },
    ],
    shortcut: assetUrl("/logo.webp"),
    apple: assetUrl("/logo.webp"),
  },
  manifest: assetUrl("/manifest.json"),
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["si_LK"],
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: "amodya.dev",
    images: [
      {
        url: `${siteUrl}og-image.png`,
        width: 1200,
        height: 630,
        alt: siteTitle,
        type: "image/png",
      },
      {
        url: `${siteUrl}og-image.jpg`,
        width: 1200,
        height: 630,
        alt: siteTitle,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@RukshanAmodya",
    images: [`${siteUrl}og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

// Structured JSON-LD Schema for Google Rich Search Results
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rukshan Amodya",
  alternateName: ["Amodya", "Rukshan", "amodya.dev", "රුක්ෂාන් අමෝද්‍ය"],
  url: siteUrl,
  image: `${siteUrl}logo.webp`,
  jobTitle: "Full-Stack Software Engineer & AI Systems Developer",
  worksFor: [
    {
      "@type": "Organization",
      name: "Questra",
      jobTitle: "Founder",
    },
    {
      "@type": "Organization",
      name: "Coding Divers",
      jobTitle: "Founder",
    },
    {
      "@type": "Organization",
      name: "Gravix",
      jobTitle: "Co-Founder",
    },
  ],
  sameAs: [
    "https://github.com/RukshanAmodya",
    "https://t.me/RukshanAmodya",
    "https://linkedin.com",
    "https://x.com",
  ],
  knowsAbout: [
    "Next.js",
    "React",
    "Flutter",
    "Dart",
    "Python",
    "FastAPI",
    "Node.js",
    "AI Agents",
    "Full-Stack Web Engineering",
    "Cloudflare Workers",
    "Cybersecurity",
  ],
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "SITC Campus",
    },
    {
      "@type": "EducationalOrganization",
      name: "University of Moratuwa",
    },
    {
      "@type": "EducationalOrganization",
      name: "iCET Institute",
    },
    {
      "@type": "EducationalOrganization",
      name: "Royal College Horana",
    },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "amodya.dev",
  url: siteUrl,
  description: siteDescription,
  author: {
    "@type": "Person",
    name: "Rukshan Amodya",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        {/* Canonical & Language Alternates matching reference */}
        <link rel="canonical" href={siteUrl} />
        <link rel="alternate" hrefLang="si" href={siteUrl} />
        <link rel="alternate" hrefLang="en" href={siteUrl} />
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />

        {/* Theme Color */}
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: light)" />

        {/* Basic SEO Tags */}
        <meta name="description" content={siteDescription} />
        <meta name="application-name" content="amodya.dev" />
        <link rel="manifest" href={assetUrl("/manifest.json")} />
        <meta name="keywords" content={siteKeywords} />
        <meta name="robots" content="index, follow" />
        <meta
          name="googlebot"
          content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
        />

        {/* OpenGraph Protocol Tags */}
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:site_name" content="amodya.dev" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="si_LK" />
        <meta property="og:image" content={`${siteUrl}og-image.svg`} />
        <meta property="og:image:type" content="image/svg+xml" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={siteTitle} />
        <meta property="og:type" content="website" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={`${siteUrl}og-image.svg`} />
        <meta name="twitter:creator" content="@RukshanAmodya" />

        {/* Favicons */}
        <link rel="icon" type="image/webp" href={assetUrl("/logo.webp")} />
        <link rel="shortcut icon" href={assetUrl("/logo.webp")} />
        <link rel="apple-touch-icon" href={assetUrl("/logo.webp")} />

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="bg-black text-white antialiased selection:bg-blue-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
