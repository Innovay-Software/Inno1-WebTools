import { Metadata } from "next";
import config from "@/config";
import CommonUtils from "@/utils/CommonUtils";

const pageName = `XML Formatter - ${config.appName}`;
const pageDescription =
  "XML formatter and validator that beautifies and minifies xml contents.";

export const metadata: Metadata = {
  title: pageName,
  description: pageDescription,
  keywords: [
    "Formatter",
    "XML",
    "XML Formatter",
    "XML Prettifier",
    "XML Minifier",
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
