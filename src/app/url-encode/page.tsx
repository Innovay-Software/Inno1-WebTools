"use client";

import EncodeSection from "@/components/EncodeSection";
import PageTitle from "@/components/PageTitle";

function UrlEncodePage() {
  return (
    <div className="container mb-10 mx-auto max-w-screen-xl">
      <PageTitle pageTitle="Url Encode" />
      <EncodeSection defaultAlgorithm="url" />
      <p className="mt-10 text-lg" role="page-text-content">
        <b>What is URL Encoding?</b>
        <br />
        URL encoding, also known as percent-encoding, is a method for
        transforming characters in a Uniform Resource Locator (URL) into a
        format that can be universally understood and transmitted over the
        internet. URLs can only contain a specific set of characters from the
        US-ASCII character set. URL encoding comes into play when a URL needs to
        include characters that fall outside this allowed set.
        <br />
        <br />
        <b>How does it work?</b>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• <b>Unsafe Characters:</b> Certain characters
        are considered unsafe in URLs because they have special meanings within
        the URL structure (like &quot;/&quot; for separating directories or
        &quot;?&quot; for initiating a query string). Spaces are another example
        of an unsafe character.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• <b>Encoding Process:</b> When a URL encounters
        an unsafe character, it applies URL encoding. The character is converted
        into its corresponding byte value in UTF-8 (a character encoding that
        can represent a wider range of characters).
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• <b>Hexadecimal Conversion:</b> Each byte value
        from the UTF-8 conversion is then translated into a two-digit
        hexadecimal number (using base-16).
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• <b>Percent Sign Prefix:</b> The hexadecimal
        digits representing the byte value are prefixed with a percent sign (%)
        to indicate that it&#39;s an encoded character.
        <br />
        <br />
        <b>Why is URL Encoding Important?</b>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• <b>Universal Understanding:</b> By encoding
        unsafe characters, URLs become readable and interpretable by all web
        browsers and servers regardless of their locale.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• <b>Data Integrity:</b> Encoding ensures that
        the data within the URL remains intact during transmission across the
        internet.
        <br />
        <br />
        <b>Things to Remember About URL Encoding</b>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Not all characters need encoding. Letters,
        numbers, hyphens, underscores, and periods are generally safe characters
        in URLs.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Decoding a URL-encoded string is
        straightforward. The percent sign and following hexadecimal digits are
        converted back into their corresponding character using the UTF-8
        encoding scheme.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• There are online tools and libraries available
        in various programming languages to perform URL encoding and decoding.
      </p>
    </div>
  );
}

export default UrlEncodePage;
