import { Metadata } from "next";
import config from "@/config";

const pageTitle = `Search Content - ${config.appName}`;

export const metadata: Metadata = {
  title: pageTitle,
  description: `${config.appName} - a little about us.`,
  robots: "noindex",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
