import { Metadata } from "next";
import config from "@/config";

const pageTitle = `About Us - ${config.appName}`;

export const metadata: Metadata = {
  title: pageTitle,
  description: `${config.appName} - a little about us.`,
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
