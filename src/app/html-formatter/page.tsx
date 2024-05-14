"use client";

import PageTitle from "@/components/PageTitle";
import DynamicPrettifyMinifyTemplate from "@/components/PrettifyMinifyTemplateDynamic";
import { html } from "js-beautify";

function HtmlFormatterPage() {
  const sampleCode =
    '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">' +
    "<title>Home</title></head><body>This is the body.</body></html>";

  const onPrettifyTap = (content: string, indentLength: number): string => {
    let result = html(content, getBeautifyOptions(indentLength));
    if (result === content) return "";
    return result;
  };

  const onMinifyTap = async (content: string): Promise<string> => {
    let result = html(content, getBeautifyOptions(1));
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
      // wrap_line_length: this.lineWidth,
      e4x: false,
      comma_first: false,
      indent_empty_lines: false,
      templating: ["auto"],
      viewportmargin: Infinity,
    };
  };

  return (
    <div className="container mb-10 mx-auto max-w-screen-xl">
      <PageTitle pageTitle="HTML Formatter " />
      <DynamicPrettifyMinifyTemplate
        sampleCode={sampleCode}
        extension="html"
        prettifyFunction={onPrettifyTap}
        minifyFunction={onMinifyTap}
      />

      <p className="mt-10 text-lg" role="page-text-content">
        <b>What is HTML?</b>
        <br />
        HTML stands for HyperText Markup Language. It&#39;s the foundation of
        creating webpages, providing the structure and content that browsers can
        understand and display. Think of it as the skeleton of a webpage.
        <br />
        Here&#39;s a breakdown of what HTML does:
        <br />
        <br />
        <b>Defines the structure</b>: HTML breaks down the webpage into sections
        like headings, paragraphs, lists, images, and more. It uses tags,
        written with angle brackets (&lt and &gt), to define these elements. For
        example, the tag &lth1&gt indicates a heading and &ltstrong&gt creates
        bold text.
        <br />
        <br />
        <b>Content without the bells and whistles</b>: HTML focuses on the
        content itself, not how it looks. While you can specify some basic
        formatting like bold or italics, for visual design, HTML relies on
        Cascading Style Sheets (CSS).
        <br />
        <br />
        <b>The building block for websites</b>: Every webpage you see starts
        with HTML code. It provides the basic blueprint that browsers use to
        render the content and structure of the page.
      </p>
    </div>
  );
}

export default HtmlFormatterPage;
