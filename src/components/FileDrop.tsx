import { useRef, useState } from "react";
import { MdImage } from "react-icons/md";

export default function FileDrop({ onFileSelected }: { [key: string]: any }) {
  const inputRef = useRef(null);
  const [dragover, setDragover] = useState(false);

  const onFileInputChange = (evt: any) => {
    setDragover(false);
    onFileSelected(evt.target.files);
  };

  const onDrop = (evt: any) => {
    evt.preventDefault();
    onFileSelected(evt.dataTransfer.files);
    setDragOverFalse(evt);
  };

  const onClick = (evt: any) => {
    if (inputRef.current != null) {
      (inputRef.current as HTMLInputElement).click();
    }
  };

  const setDragOverTrue = (evt: any) => {
    evt.preventDefault();
    setDragover(true);
  };

  const setDragOverFalse = (evt: any) => {
    evt.preventDefault();
    setDragover(false);
  };

  return (
    <button
      className={`w-full border-2 p-5 border-primary border-dashed rounded-2xl flex flex-col justify-center items-center text-primary ${
        dragover ? "bg-blue-800" : "bg-blue-50"
      } `}
      onDragEnter={setDragOverTrue}
      onDragLeave={setDragOverFalse}
      onDragOver={setDragOverTrue}
      onDrop={onDrop}
      onClick={onClick}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileInputChange}
      />
      <MdImage size={48} />
      {dragover ? (
        <div className="text-white">
          <b>Release to drop image</b>
        </div>
      ) : (
        <div>
          <b>Drag and drop</b> or <b>click</b> to choose your image
        </div>
      )}
    </button>
  );
}
