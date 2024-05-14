import { Metadata } from "next";
import config from "@/config";
import CommonUtils from "@/utils/CommonUtils";

const pageName = `Image Compression - ${config.appName}`;
const pageDescription =
  "In-browser image compressor - reduces file size without loosing much quality.";

export const metadata: Metadata = {
  title: pageName,
  description: pageDescription,
  keywords: ["Image Compression", "Reduce Image Size", "Compress Image"],
  openGraph: CommonUtils.generateOpenGraph(pageName, pageDescription),
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
