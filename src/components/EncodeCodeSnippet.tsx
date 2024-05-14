import { ColorButton } from "@/components/fundamental/Buttons";
import CommonUtils from "@/utils/CommonUtils";

function EncodeCodeSnippet({
  dContent,
  eContent,
  algorithm,
}: {
  [key: string]: any;
}) {
  const onCopyDecodedContentTap = () => {
    CommonUtils.copyToClipboard(dContent);
  };
  const onCopyEncodedContentTap = () => {
    CommonUtils.copyToClipboard(eContent);
  };

  return (
    <div className="bg-white shadow-2xl p-4 max-w-screen-lg w-full">
      <div className="font-normal text-lg">
        {algorithm.toUpperCase() + " Encoding"}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="col-span-1 flex flex-col gap-5">
          <div className="font-bold text-lg bg-gray-200 p-2 w-full">
            <code className="w-full break-words">{dContent}</code>
          </div>
          <ColorButton
            color="white"
            textColor="success"
            onClick={onCopyDecodedContentTap}
          >
            COPY
          </ColorButton>
        </div>
        <div className="col-span-1 flex flex-col gap-5">
          <div className="font-bold text-lg bg-gray-200 p-2 w-full">
            <code className="w-full break-words">{eContent}</code>
          </div>
          <ColorButton
            color="white"
            textColor="success"
            onClick={onCopyEncodedContentTap}
          >
            COPY
          </ColorButton>
        </div>
      </div>
    </div>
  );
}

export default EncodeCodeSnippet;
