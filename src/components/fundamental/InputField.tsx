import { CSSProperties, ReactElement, useState } from "react";

interface BaseInputFieldProp {
  title: string;
  tip: string;
  value: string;
  color: string;
  textColor: string;
  className: string;
  style?: CSSProperties;
  onChange?: (content: string) => void;
  autofocus: boolean;
  readOnly: boolean;
}

interface InputFieldProp {
  title?: string;
  tip?: string;
  value?: string;
  color?: string;
  textColor?: string;
  className?: string;
  style?: CSSProperties;
  onChange?: (content: string) => void;
  autofocus?: boolean;
  readOnly?: boolean;
}

const InputField = ({
  title,
  tip,
  value,
  color,
  textColor,
  className,
  style,
  onChange,
  autofocus,
  readOnly,
}: BaseInputFieldProp) => {
  const defaultClassNames =
    "transition-all font-bold border border-gray-300 rounded-md p-0 outline-none";
  const focusClassNames = `border-1 border-${color ?? "primary"}`;
  const [hasFocus, setHasFocus] = useState(false);
  const shouldRaiseTitle = () => title && (hasFocus || value);

  const onChangeCallback = (evt: any) => {
    if (onChange) {
      onChange(evt.target.value);
    }
  };

  return (
    <div className={`${tip ? "pb-7" : "pb-3"} relative w-full`} style={style}>
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
        className={`flex relative items-center bg-white ${defaultClassNames} ${
          hasFocus ? focusClassNames : ""
        } ${className} `}
      >
        <div
          className={
            "transition-all flex w-0 h-1 items-center " +
            (shouldRaiseTitle() ? " pb-12 " : "")
          }
        >
          <div
            className={
              "absolute pointer-events-none transition-all select-none font-normal bg-white text-gray-400 px-1" +
              (shouldRaiseTitle() ? " ml-2 text-sm " : " ml-3 text-md ")
            }
          >
            {title ?? ""}
          </div>
        </div>
        <input
          className={`bg-transparent outline-none border-none w-full px-3 py-3 text-${
            textColor ?? "black"
          }`}
          value={value ?? ""}
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

export const DefaultInput = (props: InputFieldProp): ReactElement => (
  <InputField
    className={props.className ?? ""}
    textColor={props.textColor ?? "gray-700"}
    title={props.title ?? ""}
    tip={props.tip ?? ""}
    onChange={props.onChange}
    value={props.value ?? ""}
    color={props.color ?? "primary"}
    autofocus={props.autofocus ?? false}
    readOnly={props.readOnly ?? false}
  />
);
