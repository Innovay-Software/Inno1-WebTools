"use client";

import PageTitle from "@/components/PageTitle";
import { js } from "js-beautify";
import { minify } from "terser";
import DynamicPrettifyMinifyTemplate from "@/components/PrettifyMinifyTemplateDynamic";

function JsFormatterPage() {
  const sampleCode = 'function msg() {\n      alert("Hello World");\n}';

  const onPrettifyTap = (content: string, indentLength: number): string => {
    let result = js(content, getBeautifyOptions(indentLength));
    if (result === content) return "";
    return result;
  };

  const onMinifyTap = async (content: string): Promise<string> => {
    let result = await minify(content);
    if (result.code === content) return "";
    if (!result.code) return "";
    return result.code;
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
      <PageTitle pageTitle="Javascript Formatter " />
      <DynamicPrettifyMinifyTemplate
        sampleCode={sampleCode}
        extension="js"
        prettifyFunction={onPrettifyTap}
        minifyFunction={onMinifyTap}
      />

      <p className="mt-10 text-lg" role="page-text-content">
        <b>What is Javascript?</b>
        <br />
        JavaScript (often abbreviated as JS) is a programming language that
        plays a central role in making webpages interactive. It&#39;s considered
        one of the core technologies of the web, alongside HTML and CSS.
        Here&#39;s a breakdown of what JavaScript does:
        <br />
        <br />
        <b>Brings webpages to life</b>: Imagine a webpage that just displays
        text and images, without any animations or user interaction. That&#39;s
        where JavaScript comes in. It adds features like dynamic content
        updates, interactive maps, and cool animations.
        <br />
        <br />
        <b>Works behind the scenes</b>: JavaScript code is usually embedded
        within HTML documents or included from separate files. When you visit a
        webpage, the web browser has a built-in JavaScript engine that executes
        the code, making the webpage interactive.
        <br />
        <br />
        <b>Plays well with others</b>: JavaScript works alongside HTML and CSS.
        HTML structures the content of a webpage, CSS defines the styling, and
        JavaScript adds interactivity.
      </p>
    </div>
  );
}

export default JsFormatterPage;
