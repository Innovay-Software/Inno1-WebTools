import { Baloo_Chettan_2 } from "next/font/google";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SidebarNav from "@/components/SidebarNav";
import ToastProvider from "@/components/ToastProvider";
import config from "@/config";
import "./globals.css";
import CommonUtils from "@/utils/CommonUtils";
import Script from "next/script";

const baloo = Baloo_Chettan_2({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: config.appName,
  description: "Browser based tools for designers, artists, developers.",
  robots: "index,follow",
  keywords: [
    "Text encoding",
    "encryption",
    "color picker",
    "password generator",
    "code formatting",
    "QR code generator",
  ],
  authors: {
    name: config.company,
    url: config.companyUrl,
  },
  openGraph: CommonUtils.generateOpenGraph(
    config.appName,
    "Browser based tools for designers, artists, developers."
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={baloo.className}>
        <ToastProvider>
          <div className="App px-4 overflow-x-clip">
            <Header appName={config.appName} />
            <div className="flex pt-12">
              <SidebarNav />
              <div className="flex-1">
                {children}
                <Footer appName={config.appName} />
              </div>
            </div>
          </div>
        </ToastProvider>

        <Script
          id="GoogleAnalyticScriptsPartA"
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-HTQTH0M6YV"
        />
        <Script
          id="GoogleAnalyticScriptsPartB"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-HTQTH0M6YV');
              `,
          }}
        />
      </body>
    </html>
  );
}
