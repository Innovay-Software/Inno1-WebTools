import { Metadata } from "next";
import config from "@/config";
import CommonUtils from "@/utils/CommonUtils";

const pageName = `SHA512 Hash - ${config.appName}`;
const pageDescription = "SHA512 hash generator";

export const metadata: Metadata = {
  title: pageName,
  description: pageDescription,
  keywords: ["Hashing", "SHA512", "SHA512 Hashing"],
  openGraph: CommonUtils.generateOpenGraph(pageName, pageDescription),
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
