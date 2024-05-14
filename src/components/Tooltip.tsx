import { useState } from "react";

export default function Tooltip(props: any) {
  const [showToolTip, setShowToolTip] = useState(false);
  return (
    <div
      className={`${props.className} relative`}
      onMouseEnter={() => setShowToolTip(true)}
      onMouseLeave={() => setShowToolTip(false)}
    >
      {props.children}
      {showToolTip && (
        <div className="absolute -top-4 -translate-y-1/2 left-0 right-0 flex justify-center z-40">
          <div className=" bg-gray-800 rounded-md opacity-90 text-white px-2 py-1 font-bold text-sm">
            {props.content}
          </div>
        </div>
      )}
    </div>
  );
}
