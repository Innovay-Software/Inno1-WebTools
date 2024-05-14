"use client";

import { css } from "js-beautify";
import { minify } from "csso";
import PageTitle from "@/components/PageTitle";
import DynamicPrettifyMinifyTemplate from "@/components/PrettifyMinifyTemplateDynamic";

function CssFormatterPage() {
  const sampleCode = "p {\n  font-size: 120%;\n  color: dimgray;\n}";

  const onPrettifyTap = (content: string, indentLength: number): string => {
    let result = css(content, getBeautifyOptions(indentLength));
    if (result === content) return "";
    return result;
  };

  const onMinifyTap = async (content: string): Promise<string> => {
    let result = minify(content).css;
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
      brace_style: "collapse",
      unindent_chained_methods: false,
      break_chained_methods: false,
      keep_array_indentation: false,
      unescape_strings: false,
      e4x: false,
      comma_first: false,
      operator_position: "before-newline",
      indent_empty_lines: false,
      templating: ["auto"],
      viewportmargin: Infinity,
    };
  };

  return (
    <div className="container mb-10 mx-auto max-w-screen-xl">
      <PageTitle pageTitle="CSS Formatter " />
      <DynamicPrettifyMinifyTemplate
        sampleCode={sampleCode}
        extension="css"
        prettifyFunction={onPrettifyTap}
        minifyFunction={onMinifyTap}
      />

      <p className="mt-10 text-lg" role="page-text-content">
        <b>What is CSS?</b>
        <br />
        CSS stands for Cascading Style Sheets. It&#39;s a programming language
        specifically for styling web pages. Imagine HTML is the skeleton of a
        website, providing structure and content. CSS is like the muscles and
        skin, giving the website its visual appearance and layout.
        <br />
        <br />
        Here&#39;s why CSS is important:
        <br />
        <br />
        <b>Visual Appeal</b>: Without CSS, websites would be plain text on a
        white background. CSS allows for things like font styles, colors,
        backgrounds, and image placement, making websites visually engaging.
        <br />
        <br />
        <b>Improved User Experience</b>: CSS makes websites easier to navigate
        by controlling the layout of elements like menus and buttons.
        <br />
        <br />
        <b>Efficiency</b>: CSS allows you to style multiple web pages at once,
        saving time and effort compared to manually coding the style for each
        page.
        <br />
        <br />
        <b>Responsiveness:</b> With CSS, you can design websites that adapt to
        different screen sizes, ensuring a good experience on phones, tablets,
        and desktops.
        <br />
        <br />
        Overall, CSS is essential for creating attractive, user-friendly, and
        efficient websites.
      </p>
    </div>
  );
}

export default CssFormatterPage;
