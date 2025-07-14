import type { Metadata } from "next";
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "../components/NavBar";
import { ConfigProvider } from "../components/ConfigProvider";
import { LocalApi } from "../lib/api/LocalApi";
import { LanguageProvider } from "../lib/i18n/LanguageProvider";
import { Toaster } from "react-hot-toast";
import TanstackQueryProvider from "../components/TanstackQueryProvider";
import { getUser } from "../lib/actions/userActions";

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
        description: config.data.siteInfo.descriptionTranslationKey,
        keywords: config.data.seo.keywords,
        openGraph: {
          title: config.data.seo.titleTranslationKey,
          description: config.data.seo.descriptionTranslationKey,
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
  const authentication = await getUser()
  console.log(`authentication:`, authentication)
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased overflow-x-hidden`}>
        <Toaster />
        <LanguageProvider>
          <ConfigProvider>
            <NavBar user={authentication.data} />
            <div className="min-h-screen">
              <NuqsAdapter>
                <TanstackQueryProvider>
                  {children}
                </TanstackQueryProvider>
              </NuqsAdapter>
            </div>
          </ConfigProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
