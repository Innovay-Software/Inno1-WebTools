import { Metadata } from "next";
import config from "@/config";
import CommonUtils from "@/utils/CommonUtils";

const pageName = `SHA1 Hash - ${config.appName}`;
const pageDescription = "SHA1 hash generator";

export const metadata: Metadata = {
  title: pageName,
  description: pageDescription,
  keywords: ["Hashing", "SHA1", "SHA1 Hashing"],
  openGraph: CommonUtils.generateOpenGraph(pageName, pageDescription),
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
