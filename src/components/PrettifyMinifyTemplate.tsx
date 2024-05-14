"use client";

import { useEffect, useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/fundamental/Buttons";
import { DefaultInput } from "@/components/fundamental/InputField";
import CodeSnippet from "@/components/CodeSnippet";
import config from "@/config";

interface PrettifyMinifyTemplateProp {
  sampleCode?: string;
  extension: string;
  prettifyFunction: (content: string, indentLength: number) => string;
  minifyFunction: (content: string) => Promise<string>;
}

function PrettifyMinifyTemplate(prop: PrettifyMinifyTemplateProp) {
  const [content, setContent] = useState(prop.sampleCode ?? "");
  const [indentLength, setIndentLength] = useState(4);
  const [contentHistory, setContentHistory] = useState<string[]>([]);

  useEffect(() => {
    let result = prop.prettifyFunction(content, indentLength);
    if (result === content || result === "") return;
    setContent(result);
  }, []);

  const onPrettifyTap = () => {
    let result = prop.prettifyFunction(content, indentLength);
    if (result === content || result === "") return;

    contentHistory.unshift(result);
    setContentHistory([...contentHistory]);
    setContent(result);
  };

  const onMinifyTap = async () => {
    let result = await prop.minifyFunction(content);
    result = result.replaceAll("\n", "").replaceAll(/(>([ ]+)<)/gi, "><");
    if (result === content || result === "") return;

    contentHistory.unshift(result);
    setContent(result);
  };

  return (
    <div>
      <CodeMirror
        className="border rounded-sm"
        value={content}
        options={{
          mode: prop.extension,
          lineNumbers: true,
          lineWrapping: true,
          indentUnit: indentLength,
        }}
        onBeforeChange={(editor, data, value) => {
          setContent(value);
        }}
        onChange={(editor, data, value) => {}}
      />
      <div className="flex justify-center items-center mt-5">
        <div className="grow md:grow-0 md:w-36">
          <DefaultInput
            title="indentation"
            value={indentLength.toString()}
            onChange={(val: string) =>
              setIndentLength(isNaN(Number(val)) ? 2 : Number(val))
            }
          />
        </div>
        <div className="w-36 mx-1 sm:mx-5">
          <PrimaryButton className="mb-2 w-full" onClick={onPrettifyTap}>
            PRETTIFY
          </PrimaryButton>
        </div>
        <div className="w-32">
          <SecondaryButton className="mb-2 w-full" onClick={onMinifyTap}>
            MINIFY
          </SecondaryButton>
        </div>
      </div>
      <div className="grid grid-cols-1">
        {contentHistory.length > 0 && (
          <div>
            <div className="font-bold text-2xl">History</div>
            {contentHistory.map((item, index) => (
              <div key={`history-${index}`} className="my-5">
                <div className="font-bold text-xl text-success">{`# ${
                  contentHistory.length - index
                }`}</div>
                <CodeSnippet
                  content={item}
                  filename={`formatted-[${config.siteDomain}].${prop.extension}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PrettifyMinifyTemplate;
