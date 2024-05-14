import { Metadata } from "next";
import config from "@/config";

const pageTitle = `Privacy Policy - ${config.appName}`;

export const metadata: Metadata = {
  title: pageTitle,
  description: `Privacy policy for ${config.appName} - ${config.company}`,
  robots: "noindex",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
