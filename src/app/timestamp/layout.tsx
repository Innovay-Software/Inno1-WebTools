import { Metadata } from "next";
import config from "@/config";
import CommonUtils from "@/utils/CommonUtils";

const pageName = `Unix Timestamp Converter - ${config.appName}`;
const pageDescription = "Unix epoch timestamp converter";

export const metadata: Metadata = {
  title: pageName,
  description: pageDescription,
  keywords: ["Timestamp", "Unix Epoch", "Timestamp Converter"],
  openGraph: CommonUtils.generateOpenGraph(pageName, pageDescription),
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
