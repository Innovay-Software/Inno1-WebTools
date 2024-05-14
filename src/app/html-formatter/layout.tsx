import { Metadata } from "next";
import config from "@/config";
import CommonUtils from "@/utils/CommonUtils";

const pageName = `HTML Formatter - ${config.appName}`;
const pageDescription =
  "HTML formatter and validator that beautifies and minifies HTML contents.";

export const metadata: Metadata = {
  title: pageName,
  description: pageDescription,
  keywords: [
    "Formatter",
    "HTML",
    "HTML Formatter",
    "HTML Prettifier",
    "HTML Minifier",
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
