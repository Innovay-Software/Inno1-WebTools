"use client";

import { useState } from "react";
import { DefaultTextarea } from "@/components/fundamental/TextareaField";
import EncodeCodeSnippet from "@/components/EncodeCodeSnippet";
import {
  PrimaryButton,
  SecondaryButton,
  TransparentStateButton,
} from "@/components/fundamental/Buttons";

function EncodeSection({ defaultAlgorithm }: { [key: string]: string }) {
  const algorithms = ["url", "base64", "html"];
  const [currentAlgorithm, setCurrentAlgorithm] = useState(defaultAlgorithm);
  const [decoded, setDecoded] = useState("");
  const [encoded, setEncoded] = useState("");
  const [contentHistory, setContentHistory] = useState<string[][]>([]);

  const onEncodeTap = async () => {
    if (!decoded) return;
    let result = "error";

    if (currentAlgorithm === "url") {
      result = encodeURIComponent(decoded);
    } else if (currentAlgorithm === "base64") {
      result = btoa(decoded);
    } else if (currentAlgorithm === "html") {
      result = decoded
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    setEncoded(result);
    setContentHistory([[decoded, result, currentAlgorithm], ...contentHistory]);
  };

  const onDecodeTap = async () => {
    if (!encoded) return;
    let result = "error";

    if (currentAlgorithm === "url") {
      result = decodeURIComponent(encoded);
    } else if (currentAlgorithm === "base64") {
      result = atob(encoded);
    } else if (currentAlgorithm === "html") {
      result = encoded
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
    }

    setDecoded(result);
    setContentHistory([[result, encoded, currentAlgorithm], ...contentHistory]);
  };

  return (
    <div>
      <div className="flex justify-end gap-2 my-5">
        {algorithms.map((item, index) => (
          <TransparentStateButton
            key={`algorithm-${index}`}
            color="white"
            textColor="primary"
            selected={currentAlgorithm == item}
            onClick={() => setCurrentAlgorithm(item)}
          >
            {item}
          </TransparentStateButton>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="col-span-1">
          <DefaultTextarea
            size="lg"
            title="Content to be encoded"
            value={decoded}
            onChange={(val: string) => setDecoded(val)}
          />
          <PrimaryButton className="w-full" onClick={onEncodeTap}>
            ENCODE
          </PrimaryButton>
        </div>
        <div className="col-span-1">
          <DefaultTextarea
            size="lg"
            title="Content to be decoded"
            value={encoded}
            onChange={(val: string) => setEncoded(val)}
          />
          <SecondaryButton className="w-full" onClick={onDecodeTap}>
            DECODE
          </SecondaryButton>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5">
        {contentHistory.length > 0 && (
          <div>
            <div className="font-bold text-2xl my-5">History</div>
            {contentHistory.map((item, index) => (
              <div
                key={`History-${contentHistory.length - index}`}
                className="mb-5"
              >
                <EncodeCodeSnippet
                  dContent={item[0]}
                  eContent={item[1]}
                  algorithm={item[2]}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EncodeSection;
