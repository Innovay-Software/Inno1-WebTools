"use client";

import React, { useRef, useState } from "react";
import PageTitle from "@/components/PageTitle";
import FileDrop from "@/components/FileDrop";
import { DefaultTextarea } from "@/components/fundamental/TextareaField";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/fundamental/Buttons";
import CommonUtils from "@/utils/CommonUtils";
import config from "@/config";

function ImageBase64Page() {
  const srcImageRef = useRef(null);

  const [imageUrl, setImageUrl] = useState<string>("/sample1.jpg");
  const [base64Content, setBase64Content] = useState("");

  const onFileSelected = (files: File[]) => {
    if (files && files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        setImageUrl(e.target?.result as string);
        setBase64Content(e.target?.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <div className="container mx-auto mb-10 max-w-screen-xl">
      <PageTitle pageTitle="Image Base64 Encoder" />
      <FileDrop onFileSelected={onFileSelected} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
        <div>
          <img
            id="image-color-palette-input-image"
            ref={srcImageRef}
            className="w-full h-auto min-h-10 rounded-lg"
            src={imageUrl}
          />
        </div>
        <div className="h-full flex flex-col justify-start items-center">
          <DefaultTextarea
            size="full"
            className="h-80 font-normal"
            title="Enter base64 string to decode to image"
            value={base64Content}
            readOnly
          />
          <PrimaryButton
            onClick={() => CommonUtils.copyToClipboard(base64Content)}
          >
            Copy Base64 Content
          </PrimaryButton>
          <SecondaryButton
            className="mt-3"
            onClick={() =>
              CommonUtils.downloadTxtFile(
                base64Content,
                `image-base64.[${config.siteDomain}].txt`
              )
            }
          >
            Download as TXT
          </SecondaryButton>
        </div>
      </div>
      <p className="mt-10 text-lg" role="page-text-content">
        <b>The Base64 Conversion Process:</b>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Image Input: The process starts with an image
        file in its original format (JPEG, PNG, etc.).
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Reading the Image: The image data is read into
        memory, essentially a stream of bytes representing the image&#39;s
        information.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Splitting into Bytes: This data stream is
        broken down into smaller chunks, typically 8 bits each, which is one
        byte.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Base64 Conversion: Each 8-bit byte is
        converted into a corresponding character from the base64 alphabet. This
        alphabet consists of uppercase and lowercase letters (A-Z, a-z), digits
        (0-9), and special characters (+, /, or = depending on the specific
        base64 implementation).
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Encoding Overhead: Padding characters (usually
        &quot;=&quot;) might be added to ensure the final encoded data has a
        length that&#39;s a multiple of 4, introducing some overhead.
        <br />
        <br />
        <b>Benefits of Image Base64 Encoding:</b>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Convenience: Allows embedding images directly
        within text-based formats like HTML or CSS.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Flexibility: The encoded data can be easily
        stored, transmitted, and decoded when needed.
        <br />
        <br />
        <b>Things to Consider:</b>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Increased File Size: The base64 encoding
        process roughly increases the data size by 33% due to the conversion and
        potential padding.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Decoding Required: The base64 encoded data
        needs to be decoded back into its original binary format for the image
        to be displayed or used by applications.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Not Compression: Base64 encoding is not a form
        of image compression. It simply converts the format, and the resulting
        data might still be large for high-resolution images.
        <br />
      </p>
    </div>
  );
}

export default ImageBase64Page;
