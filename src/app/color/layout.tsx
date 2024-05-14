import { Metadata } from "next";
import config from "@/config";
import CommonUtils from "@/utils/CommonUtils";

const pageName = `Color Converter - ${config.appName}`;
const pageDescription =
  "HTML color code converter. Convert between HEX, RGB, HSL, and CMYK.";

export const metadata: Metadata = {
  title: pageName,
  description: pageDescription,
  keywords: ["HTML Color Code", "Color", "HEX", "RGB", "HSL", "CMYK"],
  openGraph: CommonUtils.generateOpenGraph(pageName, pageDescription),
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
