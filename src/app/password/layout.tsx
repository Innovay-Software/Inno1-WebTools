import { Metadata } from "next";
import config from "@/config";
import CommonUtils from "@/utils/CommonUtils";

const pageName = `Password Generator - ${config.appName}`;
const pageDescription =
  "Password checker, password recommendations, password generator with different security levels.";

export const metadata: Metadata = {
  title: pageName,
  description: pageDescription,
  keywords: [
    "Password Generator",
    "Safe Password",
    "Generate Password",
    "Password",
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
