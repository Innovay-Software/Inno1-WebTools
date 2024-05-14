"use client";

import PageTitle from "@/components/PageTitle";
import DynamicPrettifyMinifyTemplate from "@/components/PrettifyMinifyTemplateDynamic";

function JsonFormatterPage() {
  const sampleCode =
    '{\n    "name":"John Doe",\n    "age":30,\n    "car":null\n}';

  const onPrettifyTap = (content: string, indentLength: number): string => {
    try {
      const inputJson = JSON.parse(content);
      if (!inputJson) {
        return "";
      }
      return JSON.stringify(inputJson, null, indentLength)
        .replaceAll("\\n", "\n")
        .replaceAll('\\"', '"');
    } catch (e) {}
    return "";
  };

  const onMinifyTap = async (content: string): Promise<string> => {
    return JSON.stringify(JSON.parse(content));
  };

  return (
    <div className="container mb-10 mx-auto max-w-screen-xl">
      <PageTitle pageTitle="JSON Formatter " />
      <DynamicPrettifyMinifyTemplate
        sampleCode={sampleCode}
        extension="json"
        prettifyFunction={onPrettifyTap}
        minifyFunction={onMinifyTap}
      />
      <p className="mt-10 text-lg" role="page-text-content">
        <b>What is JSON?</b>
        <br />
        JSON, which stands for JavaScript Object Notation, is a lightweight
        format for storing and transmitting data. It&#39;s often used for
        exchanging information between web servers and web applications, but its
        applications extend far beyond the web. Here&#39;s a breakdown of what
        JSON offers:
        <br />
        <br />
        <b>Human-readable</b>: JSON data is written in plain text, using a
        format similar to JavaScript object literals. This makes it easy for
        humans to understand and edit the data, even without any programming
        knowledge.
        <br />
        <br />
        <b>Lightweight and Efficient</b>: JSON files are compact, making them
        ideal for data transmission. This is important for web applications
        where fast loading times are crucial.
        <br />
        <br />
        <b>Language Independent</b>: Despite its name, JSON is not specific to
        JavaScript. Many programming languages have libraries or built-in
        functionality to work with JSON data. This makes it a universal format
        for data exchange.
      </p>
    </div>
  );
}

export default JsonFormatterPage;
