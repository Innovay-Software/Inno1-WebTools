import { Metadata } from "next";
import config from "@/config";
import CommonUtils from "@/utils/CommonUtils";

const pageName = `Image Editor - ${config.appName}`;
const pageDescription =
  "Image editor online. Rotate, crop, resize, flip, draw, mask, tint and more!";

export const metadata: Metadata = {
  title: pageName,
  description: pageDescription,
  keywords: [
    "Image Editor",
    "Rotate Image",
    "Crop Image",
    "Resize Image",
    "Flip Image",
    "Tint Image",
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
