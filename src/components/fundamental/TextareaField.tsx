import { CSSProperties, ReactElement, useState } from "react";

interface BaseTextareaFieldProp {
  title: string;
  tip: string;
  value: string;
  size: string;
  color: string;
  textColor: string;
  className: string;
  style?: CSSProperties;
  onChange?: (content: string) => void;
  autofocus: boolean;
  readOnly: boolean;
}

interface TextareaFieldProp {
  title?: string;
  tip?: string;
  value?: string;
  size?: string;
  color?: string;
  textColor?: string;
  className?: string;
  style?: CSSProperties;
  onChange?: (content: string) => void;
  autofocus?: boolean;
  readOnly?: boolean;
}

const Textarea = ({
  title,
  tip,
  value,
  size,
  color,
  textColor,
  className,
  onChange,
  autofocus,
  readOnly,
}: BaseTextareaFieldProp) => {
  const defaultClassNames =
    "transition-all font-bold border border-gray-300 rounded-md p-0 outline-none ";
  const focusClassNames = `border-1 border-${color ?? "primary"}`;
  const [hasFocus, setHasFocus] = useState(false);
  const shouldRaiseTitle = () => title && (hasFocus || value);
  const heightMap: { [key: string]: string } = {
    sm: "h-20",
    md: "h-40",
    lg: "h-60",
    full: "h-full",
  };

  const getHeight = () => {
    if (size && heightMap[size]) return heightMap[size];
    return "h-20";
  };

  const onChangeCallback = (evt: any) => {
    return onChange ? onChange(evt.currentTarget.value) : null;
  };

  return (
    <div className={`${tip ? "pb-7" : "pb-3"} relative w-full`}>
      {tip && (
        <div
          className={
            "transition-all select-none absolute ml-3 text-gray-400 left-0 -z-10 text-sm " +
            (hasFocus ? "bottom-1.5" : "bottom-7")
          }
        >
          {tip}
        </div>
      )}
      <div
        className={
          "absolute z-10 pointer-events-none transition-all select-none font-normal text-gray-400 px-1 " +
          (shouldRaiseTitle()
            ? " bg-white rounded-full left-2 -top-2.5 text-sm "
            : " bg-transparent left-0 top-3 ml-3 text-md ")
        }
      >
        {title ?? ""}
      </div>
      <div
        className={`flex relative items-center bg-white ${defaultClassNames} ${
          hasFocus ? focusClassNames : ""
        } ${className} `}
      >
        <textarea
          className={
            "resize-none bg-transparent outline-none border-none shadow-none w-full px-3 py-3 rounded-md active:outline-none focus:outline-none " +
            "text-" +
            (textColor ?? "black") +
            " " +
            getHeight()
          }
          value={value}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          onChange={onChangeCallback}
          autoFocus={autofocus}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};

export const DefaultTextarea = (props: TextareaFieldProp): ReactElement => (
  <Textarea
    title={props.title ?? ""}
    tip={props.tip ?? ""}
    value={props.value ?? ""}
    size={props.size ?? "sm"}
    color={props.color ?? "primary"}
    textColor={props.textColor ?? "gray-700"}
    className={props.className ?? ""}
    style={props.style}
    onChange={props.onChange}
    autofocus={props.autofocus ?? false}
    readOnly={props.readOnly ?? false}
  />
);
