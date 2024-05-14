import { Metadata } from "next";
import config from "@/config";
import CommonUtils from "@/utils/CommonUtils";

const pageName = `HTML Escape - ${config.appName}`;
const pageDescription = "Html Escape online";

export const metadata: Metadata = {
  title: pageName,
  description: pageDescription,
  keywords: ["HTML", "Escape", "HTML Escape"],
  openGraph: CommonUtils.generateOpenGraph(pageName, pageDescription),
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
