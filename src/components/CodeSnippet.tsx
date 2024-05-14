import { useEffect, useRef } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { MdContentCopy, MdFileDownload } from "react-icons/md";
import { TransparentButton } from "@/components/fundamental/Buttons";
import CommonUtils from "@/utils/CommonUtils";

function CodeSnippet({ content, filename }: { [key: string]: string }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current != null) {
      let cmElements = (
        inputRef.current as HTMLDivElement
      ).getElementsByClassName("CodeMirror");
      if (!cmElements || cmElements.length === 0) {
        return;
      }
      cmElements[0].setAttribute(
        "style",
        cmElements[0].getAttribute("style") + "height: auto;"
      );
    }
  }, []);

  const onCopyTap = () => {
    CommonUtils.copyToClipboard(content);
  };

  const onDownloadTap = () => {
    CommonUtils.downloadTxtFile(content, filename);
  };

  return (
    <div ref={inputRef} className="w-full relative">
      <CodeMirror
        className="border rounded-sm h-auto"
        value={content}
        options={{
          mode: "xml",
          lineNumbers: true,
          lineWrapping: true,
          readonly: true,
        }}
        onBeforeChange={(editor, data, value) => {}}
        onChange={(editor, data, value) => {}}
      />
      <div className="absolute right-0.5 bottom-0.5 w-18 h-6 flex flex-between">
        <TransparentButton
          className="bg-transparent hover:bg-gray-300 p-2"
          color="white"
          size="sm"
          onClick={onCopyTap}
          textColor="success"
        >
          <MdContentCopy size={18} />
        </TransparentButton>
        <TransparentButton
          className="bg-transparent hover:bg-gray-300"
          color="white"
          size="sm"
          onClick={onDownloadTap}
          textColor="success"
        >
          <MdFileDownload size={18} />
        </TransparentButton>
      </div>
    </div>
  );
}

export default CodeSnippet;
