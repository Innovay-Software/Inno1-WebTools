import { Metadata } from "next";
import config from "@/config";
import CommonUtils from "@/utils/CommonUtils";

const pageName = `CSS Formatter - ${config.appName}`;
const pageDescription =
  "CSS formatter and validator that beautifies and minifies CSS contents.";

export const metadata: Metadata = {
  title: pageName,
  description: pageDescription,
  keywords: [
    "Formatter",
    "CSS",
    "CSS Formatter",
    "CSS Prettifier",
    "CSS Minifier",
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
