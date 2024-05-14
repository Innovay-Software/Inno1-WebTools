import { CSSProperties, ReactElement } from "react";
import { MdRefresh } from "react-icons/md";

const defaultButtonClassNames = "focus:ring-0 transition-all font-bold";

function sizeToClassName(name: string): string {
  switch (name) {
    case "text":
      return "p-0 text-sm";
    case "sm":
      return "px-3 py-1 text-sm";
    case "md":
      return "px-4 py-2 text-md";
    case "lg":
      return "px-5 py-3 text-lg";
  }
  return "px-4 py-2 text-md";
}

function bgGradientToClassName(name: string): string {
  switch (name) {
    case "purpleToBlue":
      return "bg-gradient-to-br from-purple-600 to-blue-500";
    case "greenToBlue":
      return "bg-gradient-to-br from-green-400 to-cyan-500";
    case "purpleToPink":
      return "bg-gradient-to-r from-purple-500 to-pink-500";
    case "pinkToOrange":
      return "bg-gradient-to-br from-pink-500 to-orange-400";
  }
  return "";
}

interface ButtonPropRoot {
  color: string;
  textColor: string;
  gradientDuoTone?: string;
  size: string;
  outline: boolean;
  rounded: boolean;
  loading: boolean;
  className: string;
  style: CSSProperties;
  onClick?: () => void;
  children: any;
}

interface ButtonProp {
  color?: string;
  textColor?: string;
  gradientDuoTone?: string;
  size?: string;
  outline?: boolean;
  rounded?: boolean;
  loading?: boolean;
  className?: string;
  selected?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
  children?: any;
}

const ButtonRoot = (props: ButtonPropRoot) => {
  let bgColor = `bg-${props.color}`;
  let textColor = `text-${props.textColor}`;
  let gradientDuoTone = bgGradientToClassName(props.gradientDuoTone ?? "");
  let size = sizeToClassName(props.size ?? "");
  let border = `border border-${props.color}`;
  let borderRadius = "rounded-md";
  let hover = "hover:opacity-75";
  let active = "active:opacity-90";

  if (props.size === "text") {
    border = "border-none";
  }
  if (gradientDuoTone !== "") {
    bgColor = "";
    border = "border-none";
  }
  if (props.outline) {
    gradientDuoTone = "";
    bgColor = "bg-white";
    border = `border border-${props.color}`;
    textColor = `text-${props.color}`;
    hover = "hover:bg-gray-100 hover:border-gray-100";
    active = "active:bg-gray-200 active:border-gray-200";
  }
  if (props.rounded) {
    borderRadius = "rounded-full";
  }

  const classNames = `${bgColor} ${textColor} ${gradientDuoTone} ${size} ${border} ${borderRadius} ${hover} ${active} `;

  const clickHandler = (evt: any) => {
    evt.stopPropagation();
    props.onClick?.();
  };

  return (
    <button
      style={props.style}
      className={`${defaultButtonClassNames} ${classNames} ${props.className} `}
      onClick={clickHandler}
    >
      <div className="flex flex-wrap break-all whitespace-break-spaces justify-center">
        {props.loading && (
          <MdRefresh
            size="24"
            style={{ animation: `spin 3s linear infinite` }}
            className="mr-1"
          />
        )}
        {props.children}
      </div>
    </button>
  );
};

export const PrimaryButton = (props: ButtonProp): ReactElement => (
  <ButtonRoot
    color="primary"
    textColor="white"
    gradientDuoTone="purpleToBlue"
    size={props.size ?? "md"}
    loading={props.loading ?? false}
    rounded={props.rounded ?? false}
    outline={props.outline ?? false}
    className={props.className ?? ""}
    style={props.style ?? {}}
    onClick={props.onClick}
  >
    {props.children}
  </ButtonRoot>
);

export const PrimaryOutlineButton = (props: ButtonProp): ReactElement => (
  <PrimaryButton {...props} outline>
    {props.children}
  </PrimaryButton>
);

export const PrimaryStateButton = (props: ButtonProp): ReactElement =>
  props.selected ? (
    <PrimaryButton {...props}>{props.children}</PrimaryButton>
  ) : (
    <PrimaryOutlineButton {...props}>{props.children}</PrimaryOutlineButton>
  );

export const SecondaryButton = (props: ButtonProp): ReactElement => (
  <ButtonRoot
    color="secondary"
    textColor="white"
    gradientDuoTone=""
    size={props.size ?? "md"}
    loading={props.loading ?? false}
    rounded={props.rounded ?? false}
    outline={props.outline ?? false}
    className={props.className ?? ""}
    style={props.style ?? {}}
    onClick={props.onClick}
  >
    {props.children}
  </ButtonRoot>
);

export const SecondaryOutlineButton = (props: ButtonProp): ReactElement => (
  <SecondaryButton {...props} outline>
    {props.children}
  </SecondaryButton>
);

export const SecondaryStateButton = (props: ButtonProp): ReactElement =>
  props.selected ? (
    <SecondaryButton {...props}>{props.children}</SecondaryButton>
  ) : (
    <SecondaryOutlineButton {...props}>{props.children}</SecondaryOutlineButton>
  );

export const InfoButton = (props: ButtonProp): ReactElement => (
  <ButtonRoot
    color="info"
    textColor="white"
    gradientDuoTone=""
    size={props.size ?? "md"}
    loading={props.loading ?? false}
    rounded={props.rounded ?? false}
    outline={props.outline ?? false}
    className={props.className ?? ""}
    style={props.style ?? {}}
    onClick={props.onClick}
  >
    {props.children}
  </ButtonRoot>
);

export const InfoOutlineButton = (props: ButtonProp): ReactElement => (
  <InfoButton {...props} outline>
    {props.children}
  </InfoButton>
);

export const InfoStateButton = (props: ButtonProp): ReactElement =>
  props.selected ? (
    <InfoButton {...props}>{props.children}</InfoButton>
  ) : (
    <InfoOutlineButton {...props}>{props.children}</InfoOutlineButton>
  );

export const SuccessButton = (props: ButtonProp): ReactElement => (
  <ButtonRoot
    color="success"
    textColor="white"
    gradientDuoTone=""
    size={props.size ?? "md"}
    loading={props.loading ?? false}
    rounded={props.rounded ?? false}
    outline={props.outline ?? false}
    className={props.className ?? ""}
    style={props.style ?? {}}
    onClick={props.onClick}
  >
    {props.children}
  </ButtonRoot>
);

export const SuccessOutlineButton = (props: ButtonProp): ReactElement => (
  <SuccessButton {...props} outline>
    {props.children}
  </SuccessButton>
);

export const SuccessStateButton = (props: ButtonProp): ReactElement =>
  props.selected ? (
    <SuccessButton {...props}>{props.children}</SuccessButton>
  ) : (
    <SuccessStateButton {...props}>{props.children}</SuccessStateButton>
  );

export const ErrorButton = (props: ButtonProp): ReactElement => (
  <ButtonRoot
    color="error"
    textColor="white"
    gradientDuoTone=""
    size={props.size ?? "md"}
    loading={props.loading ?? false}
    rounded={props.rounded ?? false}
    outline={props.outline ?? false}
    className={props.className ?? ""}
    style={props.style ?? {}}
    onClick={props.onClick}
  >
    {props.children}
  </ButtonRoot>
);

export const ErrorOutlineButton = (props: ButtonProp): ReactElement => (
  <ErrorButton {...props} outline>
    {props.children}
  </ErrorButton>
);

export const ErrorStateButton = (props: ButtonProp): ReactElement =>
  props.selected ? (
    <ErrorButton {...props}>{props.children}</ErrorButton>
  ) : (
    <ErrorOutlineButton {...props}>{props.children}</ErrorOutlineButton>
  );

export const WarningButton = (props: ButtonProp): ReactElement => (
  <ButtonRoot
    color="warning"
    textColor="white"
    gradientDuoTone=""
    size={props.size ?? "md"}
    loading={props.loading ?? false}
    rounded={props.rounded ?? false}
    outline={props.outline ?? false}
    className={props.className ?? ""}
    style={props.style ?? {}}
    onClick={props.onClick}
  >
    {props.children}
  </ButtonRoot>
);

export const WarningOutlineButton = (props: ButtonProp): ReactElement => (
  <WarningButton {...props} outline>
    {props.children}
  </WarningButton>
);

export const WarningStateButton = (props: ButtonProp): ReactElement =>
  props.selected ? (
    <WarningButton {...props}>{props.children}</WarningButton>
  ) : (
    <WarningOutlineButton {...props}>{props.children}</WarningOutlineButton>
  );

export const TransparentButton = (props: ButtonProp): ReactElement => (
  <ButtonRoot
    color="transparent"
    textColor={props.textColor ?? "primary"}
    size={props.size ?? "md"}
    loading={props.loading ?? false}
    rounded={props.rounded ?? false}
    outline={false}
    className={props.className ?? ""}
    style={props.style ?? {}}
    onClick={props.onClick}
  >
    {props.children}
  </ButtonRoot>
);

export const TransparentStateButton = (props: ButtonProp): ReactElement =>
  props.selected ? (
    <InfoButton {...props}>{props.children}</InfoButton>
  ) : (
    <TransparentButton {...props}>{props.children}</TransparentButton>
  );

export const ColorButton = (props: ButtonProp): ReactElement => (
  <ButtonRoot
    color={props.color ?? "white"}
    textColor={props.textColor ?? "primary"}
    size={props.size ?? "md"}
    loading={props.loading ?? false}
    rounded={props.rounded ?? false}
    outline={false}
    className={props.className ?? ""}
    style={props.style ?? {}}
    onClick={props.onClick}
  >
    {props.children}
  </ButtonRoot>
);

export const TextButton = (props: ButtonProp): ReactElement => (
  <ButtonRoot
    color="transparent"
    textColor={props.textColor ?? "primary"}
    size="text"
    loading={props.loading ?? false}
    rounded={props.rounded ?? false}
    outline={false}
    className={props.className ?? ""}
    style={props.style ?? {}}
    onClick={props.onClick}
  >
    {props.children}
  </ButtonRoot>
);
