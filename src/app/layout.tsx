import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "../components/NavBar";
import { ConfigProvider } from "../components/ConfigProvider";
import { LocalApi } from "../lib/api/LocalApi";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const config = await LocalApi.getConfig();
    if (config.success && config.data) {
      return {
        title: config.data.siteInfo.name,
        description: config.data.siteInfo.description,
        keywords: config.data.seo.keywords,
        openGraph: {
          title: config.data.seo.title,
          description: config.data.seo.description,
          images: [config.data.seo.ogImage],
        },
      };
    }
    return {
      title: "E-Commerce Store",
      description: "Your one-stop shop for amazing products",
    };
  } catch {
    return {
      title: "E-Commerce Store",
      description: "Your one-stop shop for amazing products",
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ConfigProvider>
          <NavBar />
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
