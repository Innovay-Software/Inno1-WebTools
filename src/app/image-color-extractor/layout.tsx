import { Metadata } from "next";
import config from "@/config";
import CommonUtils from "@/utils/CommonUtils";

const pageName = `Image Pixel Color Extractor - ${config.appName}`;
const pageDescription = "Image pixel color extractor";

export const metadata: Metadata = {
  title: pageName,
  description: pageDescription,
  keywords: ["Image Pixel", "Color Extractor", "Image Pixel Color"],
  openGraph: CommonUtils.generateOpenGraph(pageName, pageDescription),
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
