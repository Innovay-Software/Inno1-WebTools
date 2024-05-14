"use client";

import EncodeSection from "@/components/EncodeSection";
import PageTitle from "@/components/PageTitle";

function HtmlEscapePage() {
  return (
    <div className="container mb-10 mx-auto max-w-screen-xl">
      <PageTitle pageTitle="HTML Escape" />
      <EncodeSection defaultAlgorithm="html" />
      <p className="mt-10 text-lg" role="page-text-content">
        <b>Why Escape Characters in HTML?</b>
        <br />
        Some characters in HTML have special meanings. For example, the {'"<"'}
        symbol is used to define the start of an HTML tag, and the {'"&"'}{" "}
        symbol is used to introduce character entities (special codes
        representing characters). If you want to display these characters
        literally on your webpage, you need to escape them to prevent the
        browser from interpreting them as code.
        <br />
        <br />
        <b>How Does HTML Escaping Work?</b>
        <br />
        HTML escaping involves replacing these special characters with
        alternative representations that the browser understands as literal
        text. This is achieved using character entities.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• <b>Character Entities:</b> Character entities
        consist of an ampersand (&), a name or a numeric reference, and a
        semicolon (;). For example, {'"&lt;"'} is the character entity for{" "}
        {'"&lt;"'} and {'"&amp;"'} is the entity for {'"&"'}.
        <br />
        <br />
        Here are some common characters that need escaping in HTML:
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• &lt; (less than) - Escaped as {"&lt;"}
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• &gt; (greater than) - Escaped as {"&gt;"}
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• &amp; (ampersand) - Escaped as {"&amp;"}
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• &quot; (double quote) - Escaped as {"&quot;"}
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• &#39; (single quote) - Escaped as {
          "&#39;"
        }{" "}
        (numeric entity)
        <br />
        <br />
        <b>Benefits of HTML Escaping</b>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• <b>Correct Display:</b> Ensures that special
        characters are shown as intended on the webpage and not misinterpreted
        as HTML code.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• <b>Prevents Scripting Attacks:</b> Escaping
        certain characters can help prevent malicious scripts from being
        injected into your HTML. For instance, escaping {'"<"'} can prevent
        attackers from embedding script tags within your content.
        <br />
        <br />
        <b>How to Escape Characters in HTML?</b>
        <br />
        There are two main ways to escape characters in HTML:
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Using Named Character Entities: This method
        uses pre-defined entity names, as mentioned earlier. This is generally
        the preferred approach for readability.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Using Numeric Character References: This
        method uses a decimal or hexadecimal number to represent the character
        code. For example, {"&#60;"} represents {'"<"'} (decimal reference) and{" "}
        {"&#x3C;"} represents {'"<"'} (hexadecimal reference).
      </p>
    </div>
  );
}

export default HtmlEscapePage;
