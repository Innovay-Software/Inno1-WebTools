import { Metadata } from "next";
import config from "@/config";
import CommonUtils from "@/utils/CommonUtils";

const pageName = `Image Base64 Encoder - ${config.appName}`;
const pageDescription = "In-browser image base64 encoder.";

export const metadata: Metadata = {
  title: pageName,
  description: pageDescription,
  keywords: ["Image Encode", "Base64 Encoder", "Image Base64"],
  openGraph: CommonUtils.generateOpenGraph(pageName, pageDescription),
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
