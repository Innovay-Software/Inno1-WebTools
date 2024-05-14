"use client";

import dynamic from "next/dynamic";

/**
 * Loading PrettifyMinify component dynamically to avoid CodeMirror "document not found" error due to SSR
 */
interface DynamicPrettifyMinifyTemplateProp {
  sampleCode?: string;
  extension: string;
  prettifyFunction: (content: string, indentLength: number) => string;
  minifyFunction: (content: string) => Promise<string>;
}

const DynamicComponnet = dynamic(() => import("./PrettifyMinifyTemplate"), {
  loading: () => <p className="w-full text-center">Loading...</p>,
  ssr: false,
});

export default function DynamicPrettifyMinifyTemplate(
  prop: DynamicPrettifyMinifyTemplateProp
) {
  return <DynamicComponnet {...prop} />;
}
