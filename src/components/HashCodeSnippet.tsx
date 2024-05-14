import { useMemo, useState } from "react";
import { ColorButton } from "@/components/fundamental/Buttons";
import MathUtils from "@/utils/MathUtils";
import CommonUtils from "@/utils/CommonUtils";

function HashCodeSnippet({
  originalContent,
  hexContent,
  algorithm,
}: {
  [key: string]: any;
}) {
  const lowerCase = useMemo(
    () => MathUtils.explodeString(`${hexContent}`.toLowerCase(), 2),
    [hexContent]
  );
  const upperCase = useMemo(
    () => MathUtils.explodeString(`${hexContent}`.toUpperCase(), 2),
    [hexContent]
  );
  const binary = useMemo(
    () => MathUtils.hexStringToBinaryArray(hexContent),
    [hexContent]
  );
  const [tabIndex, setTabIndex] = useState(0);

  const onCopyTap = () => {
    if (tabIndex === 0) CommonUtils.copyToClipboard(lowerCase.join(" "));
    if (tabIndex === 1) CommonUtils.copyToClipboard(upperCase.join(" "));
    if (tabIndex === 2) CommonUtils.copyToClipboard(binary.join(" "));
  };

  return (
    <div className="bg-white shadow-2xl p-4 max-w-screen-lg w-full">
      <div className="w-full text-right font-normal text-md">{algorithm}</div>
      <div className="font-bold text-lg border-white">{originalContent}</div>
      <div className="flex justify-end items-center mb-2">
        <ColorButton
          color="white"
          textColor="primary"
          onClick={() => setTabIndex(0)}
        >
          <div className={tabIndex === 0 ? "font-bold" : "font-normal"}>
            LOWERCASE HEX
          </div>
        </ColorButton>
        <ColorButton
          color="white"
          textColor="primary"
          onClick={() => setTabIndex(1)}
        >
          <div className={tabIndex === 1 ? "font-bold" : "font-normal"}>
            UPPERCASE HEX
          </div>
        </ColorButton>
        <ColorButton
          color="white"
          textColor="primary"
          onClick={() => setTabIndex(2)}
        >
          <div className={tabIndex === 2 ? "font-bold" : "font-normal"}>
            BINARY
          </div>
        </ColorButton>
        <ColorButton color="white" textColor="success" onClick={onCopyTap}>
          COPY
        </ColorButton>
      </div>
      <div className="font-bold text-lg bg-gray-200 p-2 w-full">
        <code className="w-full">
          {tabIndex === 0
            ? lowerCase.join(" ")
            : tabIndex === 1
            ? upperCase.join(" ")
            : binary.join(" ")}
        </code>
      </div>
    </div>
  );
}

export default HashCodeSnippet;
