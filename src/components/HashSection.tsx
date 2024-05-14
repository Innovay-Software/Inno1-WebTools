"use client";

import { useState } from "react";
import md5 from "crypto-js/md5";
import sha1 from "crypto-js/sha1";
import sha256 from "crypto-js/sha256";
import sha512 from "crypto-js/sha512";
import {
  PrimaryButton,
  TransparentStateButton,
} from "@/components/fundamental/Buttons";
import { DefaultTextarea } from "@/components/fundamental/TextareaField";
import HashCodeSnippet from "@/components/HashCodeSnippet";

function HashSection({ defaultAlgorithm }: { [key: string]: string }) {
  const algorithms = ["md5", "sha1", "sha256", "sha512"];
  const [currentAlgorithm, setCurrentAlgorithm] = useState(defaultAlgorithm);
  const [content, setContent] = useState("");
  const [contentHistory, setContentHistory] = useState<string[][]>([]);

  const onHashTap = async () => {
    if (content == "") {
      return;
    }
    if (contentHistory.length > 0 && content == contentHistory[0][0]) {
      return;
    }
    let result = "error";

    if (currentAlgorithm === "md5") {
      result = md5(content).toString();
    } else if (currentAlgorithm === "sha1") {
      result = sha1(content).toString();
    } else if (currentAlgorithm === "sha256") {
      result = sha256(content).toString();
    } else if (currentAlgorithm === "sha512") {
      result = sha512(content).toString();
    }
    setContentHistory([[content, result, currentAlgorithm], ...contentHistory]);
  };

  return (
    <div>
      <div className="flex justify-end gap-2 my-5">
        {algorithms.map((item, index) => (
          <TransparentStateButton
            key={`algorithm-${index}`}
            color="white"
            textColor="primary"
            onClick={() => setCurrentAlgorithm(item)}
            selected={currentAlgorithm == item}
          >
            {item}
          </TransparentStateButton>
        ))}
      </div>
      <div>
        <DefaultTextarea
          value={content}
          title="Enter content to encode"
          size="lg"
          onChange={(val: string) => setContent(val)}
        />
        <div className="flex justify-center items-center mt-5">
          <div className="flex justify-center">
            <PrimaryButton className="mb-2 w-full" onClick={onHashTap}>
              GENERATE HASH
            </PrimaryButton>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5">
          {contentHistory.length > 0 && (
            <div>
              <div className="font-bold text-2xl">History</div>
              {contentHistory.map((item, index) => (
                <div
                  key={`History-${contentHistory.length - index}`}
                  className="mb-5"
                >
                  <HashCodeSnippet
                    originalContent={item[0]}
                    hexContent={item[1]}
                    algorithm={item[2]}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HashSection;
