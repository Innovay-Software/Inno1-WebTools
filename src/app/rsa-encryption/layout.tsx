import { Metadata } from "next";
import config from "@/config";
import CommonUtils from "@/utils/CommonUtils";

const pageName = `RSA Encryption - ${config.appName}`;
const pageDescription = "RSA encryption encoder and decoder.";

export const metadata: Metadata = {
  title: pageName,
  description: pageDescription,
  keywords: ["RSA Encryption", "Encryption", "Encoding", "Decoding"],
  openGraph: CommonUtils.generateOpenGraph(pageName, pageDescription),
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
