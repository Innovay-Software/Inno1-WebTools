"use client";

import PageTitle from "@/components/PageTitle";
import DynamicPrettifyMinifyTemplate from "@/components/PrettifyMinifyTemplateDynamic";
import { html } from "js-beautify";

function XmlFormatterPage() {
  const sampleCode =
    "<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>";

  const onPrettifyTap = (content: string, indentLength: number): string => {
    let result = html(content, getBeautifyOptions(indentLength));
    if (result === content) return "";
    return result;
  };

  const onMinifyTap = async (content: string): Promise<string> => {
    let result = html(content, getBeautifyOptions(0));
    result = result.replaceAll("\n", "").replaceAll(/(>([ ]+)<)/gi, "><");
    if (result === content) return "";
    return result;
  };

  const getBeautifyOptions = (indentLength: number) => {
    return {
      indent_size: indentLength,
      indent_char: " ",
      indent_with_tabs: false,
      editorconfig: false,
      eol: "\n",
      end_with_newline: false,
      indent_level: 0,
      preserve_newlines: true,
      max_preserve_newlines: 10,
      space_in_paren: false,
      space_in_empty_paren: false,
      jslint_happy: false,
      space_after_anon_function: false,
      space_after_named_function: false,
      unindent_chained_methods: false,
      break_chained_methods: false,
      keep_array_indentation: false,
      unescape_strings: false,
      e4x: false,
      comma_first: false,
      indent_empty_lines: false,
      templating: ["auto"],
      viewportmargin: Infinity,
    };
  };

  return (
    <div className="container mb-10 mx-auto max-w-screen-xl">
      <PageTitle pageTitle="XML Formatter " />
      <DynamicPrettifyMinifyTemplate
        sampleCode={sampleCode}
        extension="xml"
        prettifyFunction={onPrettifyTap}
        minifyFunction={onMinifyTap}
      />

      <p className="mt-10 text-lg" role="page-text-content">
        <b>What is XML?</b>
        XML, which stands for Extensible Markup Language, is a way to store and
        transport data in a format that&#39;s both human-readable and
        machine-readable. Think of it like a filing system for information, but
        flexible enough to handle any kind of data you throw at it.
        <br />
        <br />
        Here&#39;s a breakdown of what XML offers:
        <br />
        <br />
        <b>Flexibility</b>: Unlike HTML, which has predefined tags, XML lets you
        create your own tags to describe your data. This makes it suitable for
        storing all sorts of information, from product catalogs to scientific
        data.
        <br />
        <br />
        <b>Structured Data</b>: XML data is organized in a hierarchical
        structure, using tags to define elements and sub-elements. This makes it
        easy to understand and navigate the information within an XML file.
        <br />
        <br />
        <b>Sharing Across Systems</b>: Since XML follows a standardized format,
        different software applications and platforms can easily understand and
        process XML data. This makes it a popular choice for exchanging
        information between different systems.
      </p>
    </div>
  );
}

export default XmlFormatterPage;
