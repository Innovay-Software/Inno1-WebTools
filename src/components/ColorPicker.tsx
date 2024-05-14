"use client";

import Pickr from "@simonwep/pickr";
import { useEffect, useState } from "react";
import "./ColorPicker.css";

const instantiateColorPicker = (initialColor: string) => {
  return new Pickr({
    el: ".color-picker",
    container: "body",
    theme: "classic",
    closeOnScroll: false,
    appClass: "color-picker-custom-class",
    useAsButton: false,
    padding: 18,
    inline: true,
    autoReposition: true,
    sliders: "v",
    disabled: false,
    lockOpacity: false,
    outputPrecision: 0,
    comparison: true,
    default: `#${initialColor}`,
    swatches: null,
    defaultRepresentation: "HEXA",
    showAlways: true,
    closeWithKey: "Escape",
    position: "bottom-middle",
    adjustableNumbers: true,
    components: {
      palette: true,
      preview: false,
      opacity: false,
      hue: true,
      interaction: {
        hex: false,
        rgba: false,
        hsla: false,
        hsva: false,
        cmyk: false,
        input: false,
        cancel: false,
        clear: false,
        save: false,
      },
    },
    i18n: {
      "ui:dialog": "color picker dialog",
      "btn:toggle": "toggle color picker dialog",
      "btn:swatch": "color swatch",
      "btn:last-color": "use previous color",
      "btn:save": "Save",
      "btn:cancel": "Cancel",
      "btn:clear": "Clear",
      "aria:btn:save": "save and close",
      "aria:btn:cancel": "cancel and close",
      "aria:btn:clear": "clear and close",
      "aria:input": "color input field",
      "aria:palette": "color selection area",
      "aria:hue": "hue selection slider",
      "aria:opacity": "selection slider",
    },
  });
};

export default function ColorPicker({
  initialColor,
  onUpdate,
  onInstantiated,
}: {
  [key: string]: any;
}) {
  const [pickr, setPickr] = useState<Pickr | null>(null);

  useEffect(() => {
    const newPicker = instantiateColorPicker(initialColor);
    newPicker.on("changestop", (evt: EventSource, pickr: Pickr) => {
      const color = pickr.getColor();
      onUpdate(color.toHEXA().join(""));
    });
    onInstantiated(newPicker);
    setPickr(newPicker);
  }, []);

  return <div className="color-picker" />;
}
