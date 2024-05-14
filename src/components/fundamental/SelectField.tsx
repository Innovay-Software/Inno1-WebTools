import { ReactElement, useState } from "react";

interface BaseSelectFieldProp {
  title: string;
  tip: string;
  value: string;
  options: string[];
  color: string;
  textColor: string;
  className: string;
  onChange?: (content: string) => void;
}

interface InputFieldProp {
  title?: string;
  tip?: string;
  value?: string;
  options: string[];
  color?: string;
  textColor?: string;
  className?: string;
  onChange?: (content: string) => void;
}

const SelectField = ({
  title,
  tip,
  value,
  options,
  color,
  textColor,
  className,
  onChange,
}: BaseSelectFieldProp) => {
  const defaultClassNames =
    "transition-all font-bold border border-gray-300 rounded-md p-0 outline-none";
  const focusClassNames = `border-1 border-${color ?? "primary"}`;
  const [hasFocus, setHasFocus] = useState(false);
  const [currentValue, setCurrentValue] = useState(value ?? "");

  const shouldRaiseTitle = () => title && currentValue;

  const onChangeCallback = (val: string) => {
    setCurrentValue(val);
    setHasFocus(false);
    onChange && onChange(val);
  };

  return (
    <div className={`${tip ? "pb-7" : "pb-3"} relative w-full`}>
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
        <select
          className={
            "bg-transparent outline-none border-none w-full rounded-md pl-3 pr-8 py-3 " +
            "text-" +
            (textColor ?? "black") +
            ""
          }
          value={value ?? ""}
          onFocus={() => setHasFocus(true)}
          onBlurCapture={() => setHasFocus(false)}
          onChange={(evt) => onChangeCallback(evt.currentTarget.value)}
        >
          {options.map((item: string, index: number) => (
            <option
              key={`options-${index}`}
              className={`px-5 py-2 ${
                currentValue === item ? "bg-blue-100" : "bg-white"
              } hover:bg-gray-100`}
            >
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const DefaultSelect = (props: InputFieldProp): ReactElement => (
  <SelectField
    title={props.title ?? ""}
    tip={props.tip ?? ""}
    value={props.value ?? ""}
    options={props.options}
    color={props.color ?? "primary"}
    textColor="gray-700"
    className={props.className ?? ""}
    onChange={props.onChange}
  />
);
