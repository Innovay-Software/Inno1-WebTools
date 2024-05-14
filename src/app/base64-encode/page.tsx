"use client";

import EncodeSection from "@/components/EncodeSection";
import PageTitle from "@/components/PageTitle";

function Base64EncodePage() {
  return (
    <div className="container mb-10 mx-auto max-w-screen-xl">
      <PageTitle pageTitle="Base64 Encode" />
      <EncodeSection defaultAlgorithm="base64" />
      <p className="mt-10 text-lg" role="page-text-content">
        <b>What is Base64 Encoding?</b>
        <br />
        Base64 encoding is a technique for converting binary data (like images,
        videos, or binary files) into a human-readable format consisting of
        printable characters. It essentially translates binary data, which
        computers understand, into a text-based format that can be transmitted
        or stored in systems that only handle text.
        <br />
        <br />
        <b>How Does Base64 Encoding Work?</b>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• <b>Splitting Binary Data:</b> The binary data
        is broken down into chunks of 8 bits (1 byte) each.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• <b>Converting to Base 64 Digits:</b> Each
        8-bit chunk is converted into a decimal number (0-255). This decimal
        value is then used to select a corresponding character from a base64
        alphabet. The base64 alphabet typically consists of uppercase and
        lowercase letters (A-Z, a-z), digits (0-9), and special characters (+,
        /, or = depending on the specific base64 implementation).
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• <b>Padding (if necessary):</b> If the original
        binary data doesn&#39;t have a length that&#39;s perfectly divisible by
        3, padding characters (usually {'"="'}) are added to the end to create a
        complete multiple of 4 characters in the encoded output.
        <br />
        <br />
        <b>Why Use Base64 Encoding?</b>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• <b>Transmission Compatibility:</b> Base64
        encoding allows sending binary data through channels designed for text
        data, such as email or web forms.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• <b>Data Storage Compatibility:</b> Binary data
        encoded in base64 can be stored in text files or databases that might
        not natively support binary data.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• <b>Embedding Data:</b> Base64 encoded data can
        be embedded within text-based resources like HTML or CSS. For instance,
        an image can be base64 encoded and included within an HTML page to
        display the image directly.
        <br />
        <br />
        <b>Things to Consider with Base64 Encoding</b>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Increased Data Size: The base64 encoded data
        is roughly 33% larger than the original binary data due to the
        conversion process and potential padding.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Decoding Required: The base64 encoded data
        needs to be decoded back into its original binary format to be usable by
        applications that require the binary data.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Not Encryption: Base64 encoding is not a form
        of encryption. The encoded data is still readable, although it appears
        as a jumbled mess of letters, numbers, and symbols.
      </p>
    </div>
  );
}

export default Base64EncodePage;
