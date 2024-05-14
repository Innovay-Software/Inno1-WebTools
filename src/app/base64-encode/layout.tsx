import { Metadata } from "next";
import config from "@/config";
import CommonUtils from "@/utils/CommonUtils";

const pageName = `Base64 Encode - ${config.appName}`;
const pageDescription = "Base64 Encoder online";

export const metadata: Metadata = {
  title: pageName,
  description: pageDescription,
  keywords: ["Base64", "Encode", "Base64 Encode", "Encoding"],
  openGraph: CommonUtils.generateOpenGraph(pageName, pageDescription),
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
