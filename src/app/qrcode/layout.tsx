import { Metadata } from "next";
import config from "@/config";
import CommonUtils from "@/utils/CommonUtils";

const pageName = `QR Code Generator - ${config.appName}`;
const pageDescription =
  "QR Code generator for urls, text mobile contacts, emails, sms, and wifis.";

export const metadata: Metadata = {
  title: pageName,
  description: pageDescription,
  keywords: [
    "QR Code",
    "URL QR Code",
    "Text QR Code",
    "Context QR Code",
    "Email QR Code",
    "Phone QR Code",
    "SMS QR Code",
    "Wifi QR Code",
  ],
  openGraph: CommonUtils.generateOpenGraph(pageName, pageDescription),
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
