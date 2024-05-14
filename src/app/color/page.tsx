"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { TinyColor } from "@ctrl/tinycolor";
import PageTitle from "@/components/PageTitle";
import Tooltip from "@/components/Tooltip";
import Pickr from "@simonwep/pickr";
import "@simonwep/pickr/dist/themes/classic.min.css";
import "./page.css";

const initialColor = "FF8E00";

/**
 * Loading ColorPicker dynamically to avoid "self not found" error due to SSR
 */
const DynamicColorPicker = dynamic(() => import("@/components/ColorPicker"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

function ColorConverterPage() {
  const colorColumns = [
    [
      "ffffbe",
      "ffe7be",
      "f6dbc6",
      "ffbebe",
      "FFBDC8",
      "ffc2ff",
      "e1c9f8",
      "c2c2ff",
      "c2ffc2",
    ],
    [
      "ffff99",
      "ffdb99",
      "f3c6a5",
      "ff9999",
      "FFA5B4",
      "ff99ff",
      "cda5f3",
      "9999ff",
      "99ff99",
    ],
    [
      "ffff4d",
      "ffc14d",
      "ea9a62",
      "ff4d4d",
      "ff6680",
      "ff4dff",
      "a862ea",
      "4d4dff",
      "4dff4d",
    ],
    [
      "ffff00",
      "ffa500",
      "e06f1f",
      "ff0000",
      "ff1a40",
      "ff00ff",
      "8a2be2",
      "0000ff",
      "00ff00",
    ],
    [
      "b3b300",
      "b37400",
      "9d4e15",
      "b30000",
      "cc0022",
      "b300b3",
      "6918b4",
      "0000b3",
      "00b300",
    ],
    [
      "666600",
      "664200",
      "70380f",
      "660000",
      "800015",
      "660066",
      "410f70",
      "000066",
      "006600",
    ],
  ];
  const colorNames = [
    ["maroon", "800000", "rgb(128,0,0)"],
    ["dark red", "8B0000", "rgb(139,0,0)"],
    ["brown", "A52A2A", "rgb(165,42,42)"],
    ["firebrick", "B22222", "rgb(178,34,34)"],
    ["crimson", "DC143C", "rgb(220,20,60)"],
    ["red", "FF0000", "rgb(255,0,0)"],
    ["tomato", "FF6347", "rgb(255,99,71)"],
    ["coral", "FF7F50", "rgb(255,127,80)"],
    ["indian red", "CD5C5C", "rgb(205,92,92)"],
    ["light coral", "F08080", "rgb(240,128,128)"],
    ["dark salmon", "E9967A", "rgb(233,150,122)"],
    ["salmon", "FA8072", "rgb(250,128,114)"],
    ["light salmon", "FFA07A", "rgb(255,160,122)"],
    ["orange red", "FF4500", "rgb(255,69,0)"],
    ["dark orange", "FF8C00", "rgb(255,140,0)"],
    ["orange", "FFA500", "rgb(255,165,0)"],
    ["gold", "FFD700", "rgb(255,215,0)"],
    ["dark golden rod", "B8860B", "rgb(184,134,11)"],
    ["golden rod", "DAA520", "rgb(218,165,32)"],
    ["pale golden rod", "EEE8AA", "rgb(238,232,170)"],
    ["dark khaki", "BDB76B", "rgb(189,183,107)"],
    ["khaki", "F0E68C", "rgb(240,230,140)"],
    ["olive", "808000", "rgb(128,128,0)"],
    ["yellow", "FFFF00", "rgb(255,255,0)"],
    ["yellow green", "9ACD32", "rgb(154,205,50)"],
    ["dark olive green", "556B2F", "rgb(85,107,47)"],
    ["olive drab", "6B8E23", "rgb(107,142,35)"],
    ["lawn green", "7CFC00", "rgb(124,252,0)"],
    ["chart reuse", "7FFF00", "rgb(127,255,0)"],
    ["green yellow", "ADFF2F", "rgb(173,255,47)"],
    ["dark green", "006400", "rgb(0,100,0)"],
    ["green", "008000", "rgb(0,128,0)"],
    ["forest green", "228B22", "rgb(34,139,34)"],
    ["lime", "00FF00", "rgb(0,255,0)"],
    ["lime green", "32CD32", "rgb(50,205,50)"],
    ["light green", "90EE90", "rgb(144,238,144)"],
    ["pale green", "98FB98", "rgb(152,251,152)"],
    ["dark sea green", "8FBC8F", "rgb(143,188,143)"],
    ["medium spring green", "00FA9A", "rgb(0,250,154)"],
    ["spring green", "00FF7F", "rgb(0,255,127)"],
    ["sea green", "2E8B57", "rgb(46,139,87)"],
    ["medium aqua marine", "66CDAA", "rgb(102,205,170)"],
    ["medium sea green", "3CB371", "rgb(60,179,113)"],
    ["light sea green", "20B2AA", "rgb(32,178,170)"],
    ["dark slate gray", "2F4F4F", "rgb(47,79,79)"],
    ["teal", "008080", "rgb(0,128,128)"],
    ["dark cyan", "008B8B", "rgb(0,139,139)"],
    ["aqua", "00FFFF", "rgb(0,255,255)"],
    ["cyan", "00FFFF", "rgb(0,255,255)"],
    ["light cyan", "E0FFFF", "rgb(224,255,255)"],
    ["dark turquoise", "00CED1", "rgb(0,206,209)"],
    ["turquoise", "40E0D0", "rgb(64,224,208)"],
    ["medium turquoise", "48D1CC", "rgb(72,209,204)"],
    ["pale turquoise", "AFEEEE", "rgb(175,238,238)"],
    ["aqua marine", "7FFFD4", "rgb(127,255,212)"],
    ["powder blue", "B0E0E6", "rgb(176,224,230)"],
    ["cadet blue", "5F9EA0", "rgb(95,158,160)"],
    ["steel blue", "4682B4", "rgb(70,130,180)"],
    ["corn flower blue", "6495ED", "rgb(100,149,237)"],
    ["deep sky blue", "00BFFF", "rgb(0,191,255)"],
    ["dodger blue", "1E90FF", "rgb(30,144,255)"],
    ["light blue", "ADD8E6", "rgb(173,216,230)"],
    ["sky blue", "87CEEB", "rgb(135,206,235)"],
    ["light sky blue", "87CEFA", "rgb(135,206,250)"],
    ["midnight blue", "191970", "rgb(25,25,112)"],
    ["navy", "000080", "rgb(0,0,128)"],
    ["dark blue", "00008B", "rgb(0,0,139)"],
    ["medium blue", "0000CD", "rgb(0,0,205)"],
    ["blue", "0000FF", "rgb(0,0,255)"],
    ["royal blue", "4169E1", "rgb(65,105,225)"],
    ["blue violet", "8A2BE2", "rgb(138,43,226)"],
    ["indigo", "4B0082", "rgb(75,0,130)"],
    ["dark slate blue", "483D8B", "rgb(72,61,139)"],
    ["slate blue", "6A5ACD", "rgb(106,90,205)"],
    ["medium slate blue", "7B68EE", "rgb(123,104,238)"],
    ["medium purple", "9370DB", "rgb(147,112,219)"],
    ["dark magenta", "8B008B", "rgb(139,0,139)"],
    ["dark violet", "9400D3", "rgb(148,0,211)"],
    ["dark orchid", "9932CC", "rgb(153,50,204)"],
    ["medium orchid", "BA55D3", "rgb(186,85,211)"],
    ["purple", "800080", "rgb(128,0,128)"],
    ["thistle", "D8BFD8", "rgb(216,191,216)"],
    ["plum", "DDA0DD", "rgb(221,160,221)"],
    ["violet", "EE82EE", "rgb(238,130,238)"],
    ["magenta / fuchsia", "FF00FF", "rgb(255,0,255)"],
    ["orchid", "DA70D6", "rgb(218,112,214)"],
    ["medium violet red", "C71585", "rgb(199,21,133)"],
    ["pale violet red", "DB7093", "rgb(219,112,147)"],
    ["deep pink", "FF1493", "rgb(255,20,147)"],
    ["hot pink", "FF69B4", "rgb(255,105,180)"],
    ["light pink", "FFB6C1", "rgb(255,182,193)"],
    ["pink", "FFC0CB", "rgb(255,192,203)"],
    ["antique white", "FAEBD7", "rgb(250,235,215)"],
    ["beige", "F5F5DC", "rgb(245,245,220)"],
    ["bisque", "FFE4C4", "rgb(255,228,196)"],
    ["blanched almond", "FFEBCD", "rgb(255,235,205)"],
    ["wheat", "F5DEB3", "rgb(245,222,179)"],
    ["corn silk", "FFF8DC", "rgb(255,248,220)"],
    ["lemon chiffon", "FFFACD", "rgb(255,250,205)"],
    ["light golden rod yellow", "FAFAD2", "rgb(250,250,210)"],
    ["light yellow", "FFFFE0", "rgb(255,255,224)"],
    ["saddle brown", "8B4513", "rgb(139,69,19)"],
    ["sienna", "A0522D", "rgb(160,82,45)"],
    ["chocolate", "D2691E", "rgb(210,105,30)"],
    ["peru", "CD853F", "rgb(205,133,63)"],
    ["sandy brown", "F4A460", "rgb(244,164,96)"],
    ["burly wood", "DEB887", "rgb(222,184,135)"],
    ["tan", "D2B48C", "rgb(210,180,140)"],
    ["rosy brown", "BC8F8F", "rgb(188,143,143)"],
    ["moccasin", "FFE4B5", "rgb(255,228,181)"],
    ["navajo white", "FFDEAD", "rgb(255,222,173)"],
    ["peach puff", "FFDAB9", "rgb(255,218,185)"],
    ["misty rose", "FFE4E1", "rgb(255,228,225)"],
    ["lavender blush", "FFF0F5", "rgb(255,240,245)"],
    ["linen", "FAF0E6", "rgb(250,240,230)"],
    ["old lace", "FDF5E6", "rgb(253,245,230)"],
    ["papaya whip", "FFEFD5", "rgb(255,239,213)"],
    ["sea shell", "FFF5EE", "rgb(255,245,238)"],
    ["mint cream", "F5FFFA", "rgb(245,255,250)"],
    ["slate gray", "708090", "rgb(112,128,144)"],
    ["light slate gray", "778899", "rgb(119,136,153)"],
    ["light steel blue", "B0C4DE", "rgb(176,196,222)"],
    ["lavender", "E6E6FA", "rgb(230,230,250)"],
    ["floral white", "FFFAF0", "rgb(255,250,240)"],
    ["alice blue", "F0F8FF", "rgb(240,248,255)"],
    ["ghost white", "F8F8FF", "rgb(248,248,255)"],
    ["honeydew", "F0FFF0", "rgb(240,255,240)"],
    ["ivory", "FFFFF0", "rgb(255,255,240)"],
    ["azure", "F0FFFF", "rgb(240,255,255)"],
    ["snow", "FFFAFA", "rgb(255,250,250)"],
    ["black", "000000", "rgb(0,0,0)"],
    ["dim gray / dim grey", "696969", "rgb(105,105,105)"],
    ["gray / grey", "808080", "rgb(128,128,128)"],
    ["dark gray / dark grey", "A9A9A9", "rgb(169,169,169)"],
    ["silver", "C0C0C0", "rgb(192,192,192)"],
    ["light gray / light grey", "D3D3D3", "rgb(211,211,211)"],
    ["gainsboro", "DCDCDC", "rgb(220,220,220)"],
    ["white smoke", "F5F5F5", "rgb(245,245,245)"],
    ["white", "FFFFFF", "rgb(255,255,255)"],
  ];
  const colorGradients = [
    ["Everlasting Sky", "fdfcfb", "e2d1c3", 135],
    ["Fresh Milk", "feada6", "f5efef", 0],
    ["Juicy Peach", "ffecd2", "fcb69f", 90],
    ["Nega", "ee9ca7", "ffdde1", 45],
    ["Gentle Care", "ffc3a0", "ffafbd", 90],
    ["Angel Care", "ffe2a1", "ff739c", 135],
    ["Lady Lips", "ff9a9e", "fecfef", 0],
    ["Warm Flame", "ff9a9e", "fad0c4", 45],
    ["Strong Bliss4", "fe9b8d", "f78da1", -90],
    ["Passionate Bed", "ff758c", "ff7eb3", 90],
    ["Heavy Rain", "cfd9df", "e2ebf0", 0],
    ["Cloudy Knoxville", "fdfbfb", "ebedee", 110],
    ["Saint Petersberg", "f5f7fa", "c3cfe2", 120],
    ["Clean Mirror", "93a5cf", "e4efe9", 45],
    ["Cochiti Lake", "93a5cf", "e4efe9", 45],

    ["Winter Neva", "a1c4fd", "c2e9fb", 110],

    ["Plum Plate", "667eea", "764ba2", 120],
    ["Happy Fisher", "89f7fe", "66a6ff", 110],
    ["Fly High", "48c6ef", "6f86d6", 0],

    ["Great Whale", "a3bded", "6991c7", 0],
    ["Aqua Splash", "13547a", "80d0c7", 30],

    ["Desert Hump", "c79081", "dfa579", 0],
    ["Healthy Water", "96deda", "50c9c3", 45],

    ["Night Sky", "1e3c72", "2a5298", 0],
    ["Morning Salad", "b7f8db", "50a7c2", 135],
    ["Deep Relief", "defef7", "7088b9", 135],

    ["Mountain Rock", "868f96", "596164", 90],
    ["Eternal Constance", "09203f", "537895", 0],
    ["Vicious Stance", "29323c", "485563", 30],
    ["Premium Dark", "434343", "000000", 90],
  ];

  const [colorMap, setColorMap] = useState({
    hex: initialColor,
    rgb: [255, 0, 0],
    hsl: [0, 100, 50],
    cmyk: [0, 100, 100, 0],
  });

  const [pickr, setPickr] = useState<Pickr | null>(null);
  const [analogousColors, setAnalogousColors] = useState<string[]>([]);
  const [monochromaticColors, setMonochromaticColors] = useState<string[]>([]);
  const [complementaryColors, setComplementaryColors] = useState<string[]>([]);
  const [splitComplementaryColors, setSplitComplementaryColors] = useState<
    string[]
  >([]);
  const [triadColors, setTriadColors] = useState<string[]>([]);
  const [tetradColors, setTetradColors] = useState<string[]>([]);

  useEffect(() => {}, []);

  const onPickrInstantiated = (instance: Pickr) => {
    setPickr(instance);
  };

  const calculateNearColors = (hex: string) => {
    var color = new TinyColor(`#${hex}`);
    setAnalogousColors(color.analogous().map((item) => item.toHex()));
    setMonochromaticColors(color.monochromatic().map((item) => item.toHex()));
    setComplementaryColors([color.complement().toHex(), hex]);
    setSplitComplementaryColors(
      color.splitcomplement().map((item) => item.toHex())
    );
    setTriadColors(color.triad().map((item) => item.toHex()));
    setTetradColors(color.tetrad().map((item) => item.toHex()));
  };

  const onHexUpdate = (hex: string) => {
    var color = new TinyColor(`#${hex}`);
    var rgb = color.toRgb();
    var hsl = color.toHsl();
    var cmyk = color.toCmyk();
    var newColorMap = {
      hex: hex,
      rgb: [rgb.r, rgb.g, rgb.b],
      hsl: [hsl.h, hsl.s * 100, hsl.l * 100],
      cmyk: [cmyk.c, cmyk.m, cmyk.y, cmyk.k],
    };
    setColorMap(newColorMap);

    pickr?.setColor(hex);
    calculateNearColors(hex);
  };

  const onRGBUpdate = (rgb: number[]) => {
    var color = new TinyColor({ r: rgb[0], g: rgb[1], b: rgb[2] });
    onHexUpdate(color.toHex());
  };

  const onHSLUpdate = (hsl: number[]) => {
    var color = new TinyColor({ h: hsl[0], s: hsl[1] / 100, l: hsl[2] / 100 });
    onHexUpdate(color.toHex());
  };

  const onCMYKUpdate = (cmyk: number[]) => {
    var color = new TinyColor({
      c: cmyk[0],
      m: cmyk[1],
      y: cmyk[2],
      k: cmyk[3],
    });
    onHexUpdate(color.toHex());
  };

  return (
    <div className="container mx-auto mb-10 max-w-screen-xl relative">
      <PageTitle pageTitle="HTML Color Code Converter" />
      <div>
        Pick a color below and convert it to HEX, RGB, HSL, and CMYK formats.
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 my-5 w-full">
        <div className="col-span-1 lg:col-span-3 flex gap-4 lg:gap-10">
          <div className="grow bg-white shadow-lg">
            <div className="w-full aspect-square">
              <DynamicColorPicker
                initialColor={initialColor}
                onUpdate={onHexUpdate}
                onInstantiated={onPickrInstantiated}
              />
            </div>
          </div>
          <div className="w-32 flex flex-col justify-evenly">
            <div
              className="w-32 h-16 rounded-md"
              style={{ backgroundColor: `#${colorMap.hex}` }}
            />
            <div className="flex justify-center items-center">
              <div className="w-6 font-bold text-gray-400">#</div>
              <input
                className="w-20 px-1 my-1 uppercase font-bold"
                value={colorMap.hex}
                onChange={(evt: any) => {
                  onHexUpdate((evt.currentTarget as HTMLInputElement).value);
                }}
              />
              <div className="w-6" />
            </div>
            {["R", "G", "B"].map((item, index) => (
              <div
                key={`RGB-${index}`}
                className="flex justify-center items-center"
              >
                <div className="w-4 font-bold text-gray-400">{item}</div>
                <input
                  type="range"
                  min="1"
                  max="255"
                  step="1"
                  className="w-20 my-1 font-bold"
                  value={colorMap.rgb[index]}
                  onChange={(evt: any) => {
                    onRGBUpdate([
                      index === 0
                        ? parseFloat(
                            (evt.currentTarget as HTMLInputElement).value
                          )
                        : colorMap.rgb[0],
                      index === 1
                        ? parseFloat(
                            (evt.currentTarget as HTMLInputElement).value
                          )
                        : colorMap.rgb[1],
                      index === 2
                        ? parseFloat(
                            (evt.currentTarget as HTMLInputElement).value
                          )
                        : colorMap.rgb[2],
                    ]);
                  }}
                />
                <div className="w-8 text-gray-400 font-bold text-right">
                  {Math.round(colorMap.rgb[index])}
                </div>
              </div>
            ))}
            {["H", "S", "L"].map((item, index) => (
              <div
                key={`HSL-${index}`}
                className="flex justify-center items-center"
              >
                <div className="w-4 font-bold text-gray-400">{item}</div>
                <input
                  type="range"
                  min="1"
                  max={index === 0 ? "359" : "100"}
                  step="1"
                  className="w-20 my-1 font-bold"
                  value={colorMap.hsl[index]}
                  onChange={(evt: any) => {
                    onHSLUpdate([
                      index === 0
                        ? parseFloat(
                            (evt.currentTarget as HTMLInputElement).value
                          )
                        : colorMap.hsl[0],
                      index === 1
                        ? parseFloat(
                            (evt.currentTarget as HTMLInputElement).value
                          )
                        : colorMap.hsl[1],
                      index === 2
                        ? parseFloat(
                            (evt.currentTarget as HTMLInputElement).value
                          )
                        : colorMap.hsl[2],
                    ]);
                  }}
                />
                <div className="w-8 text-gray-400 font-bold text-right">
                  {Math.round(colorMap.hsl[index])}
                </div>
              </div>
            ))}
            {["C", "M", "Y", "K"].map((item, index) => (
              <div
                key={`CMYK-${index}`}
                className="flex justify-center items-center"
              >
                <div className="w-4 font-bold text-gray-400">{item}</div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  step="1"
                  className="w-20 my-1 font-bold"
                  value={colorMap.cmyk[index]}
                  onChange={(evt: any) => {
                    onCMYKUpdate([
                      index === 0
                        ? parseFloat(
                            (evt.currentTarget as HTMLInputElement).value
                          )
                        : colorMap.cmyk[0],
                      index === 1
                        ? parseFloat(
                            (evt.currentTarget as HTMLInputElement).value
                          )
                        : colorMap.cmyk[1],
                      index === 2
                        ? parseFloat(
                            (evt.currentTarget as HTMLInputElement).value
                          )
                        : colorMap.cmyk[2],
                      index === 3
                        ? parseFloat(
                            (evt.currentTarget as HTMLInputElement).value
                          )
                        : colorMap.cmyk[3],
                    ]);
                  }}
                />
                <div className="w-8 text-gray-400 font-bold text-right">
                  {Math.round(colorMap.cmyk[index])}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1 lg:col-span-2 h-full flex flex-col justify-evenly items-start">
          {[
            ["Analogous", analogousColors],
            ["Monochromatic", monochromaticColors],
            ["Complementary", complementaryColors],
            ["Split Complementary", splitComplementaryColors],
            ["Triad", triadColors],
            ["Tetrad", tetradColors],
          ].map((item, index) => (
            <div key={`${item[0]}-wrap`} className="w-full">
              <div className="font-bold text-left">{item[0]}</div>
              <div className="flex w-full h-8">
                {(item[1] as string[]).map((item2, index2) => (
                  <div
                    key={`${item[0]}-${index2}}`}
                    className="grow h-full flex justify-center"
                    onClick={() => onHexUpdate(item2)}
                  >
                    <Tooltip
                      content={`#${item2.toUpperCase()}`}
                      className="w-full"
                    >
                      <div
                        className="w-full h-full"
                        style={{ backgroundColor: `#${item2}` }}
                      />
                    </Tooltip>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="sticky top-12 shadow-2xl grid grid-cols-12 flex-wrap justify-between items-center p-5 bg-white rounded-md md:rounded-full text-sm sm:text-lg">
        <div className="col-span-12 md:col-span-12 lg:col-span-1 flex justify-center overflow-visible">
          <div
            className="w-12 h-12 rounded-full"
            style={{ backgroundColor: `#${colorMap.hex}` }}
          ></div>
        </div>
        <div className="col-span-6 sm:col-span-6 lg:col-span-2 flex flex-col justify-start items-center overflow-visible">
          <div className="font-bold text-md">HEX</div>
          <div className="font-bold text-2xl ">
            #{colorMap.hex.toUpperCase()}
          </div>
        </div>
        <div className="col-span-6 sm:col-span-6 lg:col-span-2 flex flex-col justify-start items-center overflow-visible">
          <div className="font-bold text-md">RGB</div>
          <div className="font-bold text-2xl ">{colorMap.rgb.join(", ")}</div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3 flex flex-col justify-start items-center overflow-visible">
          <div className="font-bold text-md">HSL</div>
          <div className="font-bold text-2xl ">
            {Math.round(colorMap.hsl[0])},&nbsp;{Math.round(colorMap.hsl[1])}
            %,&nbsp;{Math.round(colorMap.hsl[2])}%
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex flex-col justify-start items-center overflow-visible">
          <div className="font-bold text-md">CMYK</div>
          <div className="font-bold text-2xl ">
            {colorMap.cmyk[0]},&nbsp;{Math.round(colorMap.cmyk[1])}%,&nbsp;
            {Math.round(colorMap.cmyk[2])}%,&nbsp;
            {Math.round(colorMap.cmyk[3])}%
          </div>
        </div>
      </div>
      <div className="font-bold text-lg md:text-4xl mt-10">
        Color Gradient Suggestions
      </div>
      <div className="grid grid-cols-12 gap-4">
        {colorGradients.map((item, index) => (
          <div key={`ColorGradient-${index}`} className="col-span-4">
            <div className="font-bold">{item[0]}</div>
            <div className="flex flex-wrap justify-start items-center">
              {item[3]} Deg
              <span
                className="inline-block px-2 py-1 my-1 rounded-full mx-1 font-bold"
                style={{ color: `#${item[1]}` }}
                onClick={() => onHexUpdate(item[1].toString())}
              >{`#${item[1].toString().toUpperCase()}`}</span>
              <span
                className="inline-block px-2 py-1 my-1 rounded-full mx-1 font-bold"
                style={{ color: `#${item[2]}` }}
                onClick={() => onHexUpdate(item[2].toString())}
              >
                {`#${item[2].toString().toUpperCase()}`}
              </span>
            </div>
            <div
              className="aspect-video w-full mt-1"
              style={{
                background: `linear-gradient(${item[3]}deg, #${item[1]}, #${item[2]})`,
              }}
            />
          </div>
        ))}
      </div>

      <div className="font-bold text-lg md:text-4xl mt-10">
        Common Color Names and Color Code
      </div>
      <div className="max-w-screen-lg">
        <div className="grid grid-cols-12 mt-5 font-bold text-gray-400 text-lg border-b border-gray-200">
          <div className="col-span-4 md:col-span-3">COLOR</div>
          <div className="col-span-4 md:col-span-3">NAME</div>
          <div className="col-span-4 md:col-span-6">HEX and RGB Codes</div>
        </div>
        {colorNames.map((item, index) => (
          <div
            key={`ColorName-${item}`}
            className="grid grid-cols-12 py-3 items-center font-normal text-gray-800 text-lg border-b border-gray-200"
          >
            <div className="col-span-4 md:col-span-3 flex justify-start">
              <div
                className=" w-3/5 h-8 rounded-md"
                style={{ backgroundColor: `#${item[1]}` }}
                onClick={() => onHexUpdate(item[1])}
              />
            </div>
            <div className="col-span-4 md:col-span-3">{item[0]}</div>
            <div className="col-span-4 md:col-span-6">
              <b>#{item[1]}</b> {item[2]}
            </div>
          </div>
        ))}
      </div>
      <div className="font-bold text-lg md:text-4xl mt-10">
        Popular Color Palatte
      </div>
      {colorColumns.map((item, index) => (
        <div key={`ColorGrid-${index}`} className="grid grid-cols-9 gap-0 mt-0">
          {item.map((item2, index2) => (
            <Tooltip
              key={`ColorGid-${index}-${index2}-${item2}`}
              className="aspect-video col-span-1"
              content={`#${item2.toUpperCase()}`}
            >
              <div
                className="aspect-video"
                style={{ backgroundColor: `#${item2}` }}
                onClick={() => onHexUpdate(item2)}
              />
            </Tooltip>
          ))}
        </div>
      ))}
      <p className="mt-10 text-lg" role="page-text-content">
        <b>What are HTML color codes?</b>
        <br />
        HTML color codes define the visual appearance of elements on webpages,
        like text, backgrounds, and borders. There are a few different ways to
        specify these colors:
        <br />
        <br />
        <b>1. Using Color Names (Simple but Limited):</b>
        <br />
        HTML offers a set of predefined color names that you can use directly in
        your code. These are easy to remember and represent common colors. Here
        are some examples:
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• red
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• green
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• blue
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• yellow
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• purple
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• black
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• white
        <br />
        <br />
        While convenient, color names have limitations. They might not provide
        the exact shade you want, and browser support for less common names can
        vary.
        <br />
        <br />
        <b>2. Hexadecimal Codes (Most Popular and Precise):</b>
        <br />
        This is the most widely used method for specifying HTML colors. Hex
        codes represent colors using a 6-digit alphanumeric value preceded by a
        hash symbol (#). Each pair of digits corresponds to the intensity of
        red, green, and blue (RGB) components in the color, ranging from 00 (no
        intensity) to FF (maximum intensity).
        <br />
        <br />
        Here&#39;s how it works:
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• #FF0000 - Pure red (FF for maximum red, 00 for
        no green and blue)
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• #00FF00 - Pure green
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• #FFFFFF - White (all color components at
        maximum intensity)
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• #C0C0C0 - A shade of gray (equal parts red,
        green, and blue at medium intensity)
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Hex codes offer a vast range of colors and
        allow for precise control over their shades.
        <br />
        <br />
        <b>3. RGB Values (Alternative to Hex):</b>
        <br />
        Colors can also be defined using the RGB (Red, Green, Blue) color model.
        Each color component has a value between 0 (black, minimum intensity)
        and 255 (white, maximum intensity).
        <br />
        <br />
        <b>4. HSLA Colors (Less Common but Advanced):</b>
        <br />
        HSLA (Hue, Saturation, Lightness, Alpha) is another color model defining
        color based on hue (color angle), saturation (amount of color),
        lightness (brightness), and alpha (opacity). It&#39;s useful for
        creating variations of a base color.
        <br />
        <br />
        HSLA is less commonly used due to its slightly more complex syntax but
        can be valuable for specific design needs.
        <br />
        <br />
        Choosing the Right Method:
        <br />
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• For basic color needs, color names are a good
        starting point.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• For maximum control and a wider color range,
        hex codes are the preferred choice.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• If you&#39;re comfortable with RGB values,
        that method works as well.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• HSLA offers advanced color manipulation but
        might have a steeper learning curve.
        <br />
      </p>
    </div>
  );
}

export default ColorConverterPage;
