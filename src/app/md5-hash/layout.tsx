import { Metadata } from "next";
import config from "@/config";
import CommonUtils from "@/utils/CommonUtils";

const pageName = `MD5 Hash - ${config.appName}`;
const pageDescription = "MD5 hash generator";

export const metadata: Metadata = {
  title: pageName,
  description: pageDescription,
  keywords: ["Hashing", "MD5", "MD5 Hashing"],
  openGraph: CommonUtils.generateOpenGraph(pageName, pageDescription),
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
