import { Metadata } from "next";
import config from "@/config";
import CommonUtils from "@/utils/CommonUtils";

const pageName = `JSON Formatter - ${config.appName}`;
const pageDescription =
  "Json formatter and validator that beautifies and minifies json contents.";

export const metadata: Metadata = {
  title: pageName,
  description: pageDescription,
  keywords: [
    "Formatter",
    "JSON",
    "JSON Formatter",
    "JSON Prettifier",
    "JSON Minifier",
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
