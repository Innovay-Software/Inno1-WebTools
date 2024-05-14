import { Metadata } from "next";
import config from "@/config";
import CommonUtils from "@/utils/CommonUtils";

const pageName = `Javascript Formatter - ${config.appName}`;
const pageDescription =
  "Javascript formatter and validator that beautifies and minifies Javascript contents.";

export const metadata: Metadata = {
  title: pageName,
  description: pageDescription,
  keywords: [
    "Formatter",
    "Javascript",
    "Javascript Formatter",
    "Javascript Prettifier",
    "Javascript Minifier",
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
