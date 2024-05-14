"use client";

import { useEffect, useRef, useState } from "react";
import { Slider } from "@mui/material";
import ColorThief, { RGBColor } from "colorthief";
import PageTitle from "@/components/PageTitle";
import FileDrop from "@/components/FileDrop";
import ColorUtil from "@/utils/ColorUtils";

var tempCanvas: HTMLCanvasElement | null = null;
var tempCanvasWidth = 0;
var tempCanvasHeight = 0;
var magnifierCanvasWidth = 0;
var magnifierCanvasHeight = 0;
var currentMousePositionX = 0;
var currentMousePositionY = 0;

function ImageColorExtractorPage() {
  const srcImageRef = useRef(null);
  const canvasRef = useRef(null);

  const [imageUrl, setImageUrl] = useState<string>("/sample1.jpg");
  const [magnifierStrength, setMagnifierStrength] = useState(10);

  const [currentBackgroundColor, setCurrentBackgroundColor] = useState("#000");
  const [currentBackgroundColorInverse, setCurrentBackgroundColorInverse] =
    useState("#FFF");

  const [dominantColor, setDominantColor] = useState("");
  const [paletteColors, setPaletteColors] = useState<RGBColor[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  useEffect(() => {
    initCanvas(imageUrl);
    setTimeout(() => {
      const inputImage = srcImageRef.current as HTMLImageElement | null;
      if (inputImage) {
        inputImage.addEventListener("mousemove", onImageMouseMove);
        inputImage.addEventListener("mousedown", onImageMouseClick);
      }
    }, 500);
  }, []);

  useEffect(() => {
    generateColorPalette();
  }, [imageUrl]);

  const onFileSelected = (files: File[]) => {
    if (files && files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        setImageUrl(e.target?.result as string);
        initCanvas(e.target?.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const generateColorPalette = async () => {
    const img = srcImageRef.current as unknown as HTMLImageElement;

    while (!img.complete) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    var colorThief = new ColorThief();
    var result = colorThief.getColor(img);
    var results = colorThief.getPalette(img);
    setDominantColor(ColorUtil.rgbToHex(result[0], result[1], result[2]));
    setPaletteColors(results);
  };

  const initCanvas = (imageSrc: string) => {
    tempCanvas = document.createElement("canvas");
    var ctx = tempCanvas.getContext("2d") as CanvasRenderingContext2D;
    var img = new Image();
    img.src = imageSrc;
    img.onload = function (e: any) {
      var imageWidth = e.target.width;
      var imageHeight = e.target.height;
      ctx.canvas.width = imageWidth;
      ctx.canvas.height = imageHeight;
      tempCanvasWidth = imageWidth;
      tempCanvasHeight = imageHeight;

      ctx.drawImage(img, 0, 0, imageWidth, imageHeight);

      var magnifierCanvasCtx = (
        canvasRef.current as unknown as HTMLCanvasElement
      ).getContext("2d");
      if (!magnifierCanvasCtx) {
        console.error("Missing magnifierCanvasCtx");
        return;
      }

      magnifierCanvasWidth = (
        srcImageRef.current as unknown as HTMLImageElement
      ).clientWidth;
      magnifierCanvasHeight = Math.round(
        (imageHeight / imageWidth) * magnifierCanvasWidth
      );

      magnifierCanvasCtx.canvas.width = magnifierCanvasWidth;
      magnifierCanvasCtx.canvas.height = magnifierCanvasHeight;
      magnifierCanvasCtx.fillStyle = "#999999";
      magnifierCanvasCtx.fillRect(0, 0, imageWidth, imageHeight);

      currentMousePositionX = Math.round(imageWidth / 2);
      currentMousePositionY = Math.round(imageHeight / 2);
      renderMagnifierCanvas();
    };

    setSelectedColors([]);
  };

  const onImageMouseClick = (e: MouseEvent) => {
    var imageElementWidth = (e.target as HTMLImageElement).width;
    var imageElementHeight = (e.target as HTMLImageElement).height;
    var targetX = Math.round(
      (e!.offsetX / imageElementWidth) * tempCanvasWidth
    );
    var targetY = Math.round(
      (e!.offsetY / imageElementHeight) * tempCanvasHeight
    );
    var targetP = (
      (tempCanvas as HTMLCanvasElement).getContext(
        "2d"
      ) as CanvasRenderingContext2D
    ).getImageData(targetX, targetY, 1, 1).data;
    var hex = (
      "000000" +
      ColorUtil.rgbToHex(targetP[0], targetP[1], targetP[2]).toUpperCase()
    ).slice(-6);

    // var newList: string[] = []
    // selectedColors.forEach((item) => newList.push(item))
    // newList.push(hex)

    selectedColors.push(hex);
    var newList = [...selectedColors];
    setSelectedColors(newList);
  };

  const onImageMouseMove = (e: MouseEvent) => {
    var imageElementWidth = (e.target as HTMLImageElement).width;
    var imageElementHeight = (e.target as HTMLImageElement).height;
    currentMousePositionX = Math.round(
      (e.offsetX / imageElementWidth) * tempCanvasWidth
    );
    currentMousePositionY = Math.round(
      (e.offsetY / imageElementHeight) * tempCanvasHeight
    );
    renderMagnifierCanvas();
  };

  const onMagnifierSliderUpdate = (val: number) => {
    setMagnifierStrength(val);
    renderMagnifierCanvas();
  };

  const renderMagnifierCanvas = () => {
    var ctx = (canvasRef.current as unknown as HTMLCanvasElement).getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    var tempCanvasWidthHalf = Math.round(magnifierCanvasWidth / 2);
    var tempCanvasHeightHalf = Math.round(magnifierCanvasHeight / 2);

    var targetCanvasPixelWidth = magnifierStrength;
    var sourceImageRadius = Math.min(
      15,
      Math.round(
        Math.min(tempCanvasWidth, tempCanvasHeight) / targetCanvasPixelWidth / 2
      )
    );

    var centerColor = (
      (tempCanvas as HTMLCanvasElement).getContext(
        "2d"
      ) as CanvasRenderingContext2D
    ).getImageData(currentMousePositionX, currentMousePositionY, 1, 1).data;

    setCurrentBackgroundColor(
      "#" + ColorUtil.rgbToHex(centerColor[0], centerColor[1], centerColor[2])
    );

    var cmyk = ColorUtil.rgbToCmyk(
      centerColor[0],
      centerColor[1],
      centerColor[2]
    );
    if (cmyk.k > 30) {
      setCurrentBackgroundColorInverse("#f1f1f1");
    } else {
      setCurrentBackgroundColorInverse("#000000");
    }

    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.fillRect(0, 0, magnifierCanvasWidth, magnifierCanvasHeight);
    var distance = 0;
    var currentColor = null;
    for (
      var i = currentMousePositionX - sourceImageRadius;
      i < currentMousePositionX + sourceImageRadius;
      i++
    ) {
      if (i < 0 || i > tempCanvasWidth - 1) continue;
      for (
        var j = currentMousePositionY - sourceImageRadius;
        j < currentMousePositionY + sourceImageRadius;
        j++
      ) {
        if (j < 0 || j > tempCanvasHeight - 1) continue;
        distance = Math.sqrt(
          Math.pow(i - currentMousePositionX, 2) +
            Math.pow(j - currentMousePositionY, 2)
        );
        if (distance > sourceImageRadius) continue;

        var alpha = 1;
        if (distance > sourceImageRadius / 2) {
          alpha = (sourceImageRadius - distance) / (sourceImageRadius / 2);
        }

        if (
          Math.abs(i - currentMousePositionX) <= 1 &&
          Math.abs(j - currentMousePositionY) <= 1 &&
          !(i === currentMousePositionX && j === currentMousePositionY)
        ) {
          ctx.fillStyle = "#fff";
          ctx.fillRect(
            (i - currentMousePositionX) * targetCanvasPixelWidth +
              tempCanvasWidthHalf,
            (j - currentMousePositionY) * targetCanvasPixelWidth +
              tempCanvasHeightHalf,
            targetCanvasPixelWidth,
            targetCanvasPixelWidth
          );
        } else {
          currentColor = (tempCanvas as HTMLCanvasElement)
            .getContext("2d")
            ?.getImageData(i, j, 1, 1).data as Uint8ClampedArray;
          ctx.fillStyle = `rgba(${currentColor[0]},${currentColor[1]},${currentColor[2]},${alpha})`;
          ctx.fillRect(
            (i - currentMousePositionX) * targetCanvasPixelWidth +
              tempCanvasWidthHalf,
            (j - currentMousePositionY) * targetCanvasPixelWidth +
              tempCanvasHeightHalf,
            targetCanvasPixelWidth,
            targetCanvasPixelWidth
          );
        }
      }
    }
  };

  return (
    <div className="container mx-auto mb-10 max-w-screen-xl">
      <PageTitle pageTitle="Image Pixel Color Extractor" />
      <FileDrop onFileSelected={onFileSelected} />
      <div className="my-5 text-center">
        Hover over image on the left and click to extract pixel colors.
        Extracted colors will be shown below.
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <img
            id="image-color-palette-input-image"
            ref={srcImageRef}
            className="w-full h-auto min-h-10 mb-5 rounded-lg"
            src={imageUrl}
          />
          <div
            className="transition-all text-center p-3 font-bold text-4xl rounded-lg"
            style={{
              backgroundColor: currentBackgroundColorInverse,
              color: currentBackgroundColor,
            }}
          >
            {currentBackgroundColor}
          </div>
        </div>
        <div>
          <canvas
            id="image-color-palette-magnifier-canvas"
            ref={canvasRef}
            style={{ maxWidth: "100%", height: "auto" }}
          ></canvas>
          <div className="flex mt-10 justify-start items-center">
            <div className="font-bold">Magnifier: {magnifierStrength}</div>
            <Slider
              className="flex-1 ml-5"
              value={magnifierStrength}
              min={5}
              max={20}
              onChange={(evt: any) =>
                onMagnifierSliderUpdate(Number(evt.target.value))
              }
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-start items-center gap-2 mt-10">
        {paletteColors.map((item, index) => (
          <div
            key={`PaletteColor-${index}-${item}`}
            id={`PaletteColor-${index}-${item}`}
            className="p-2 w-20 flex flex-col items-center"
          >
            <div
              className="w-12 h-12 rounded-full"
              style={{
                backgroundColor: `#${ColorUtil.rgbToHex(
                  item[0],
                  item[1],
                  item[2]
                )}`,
              }}
            />
            <div className="font-bold">
              #{ColorUtil.rgbToHex(item[0], item[1], item[2])}
            </div>
          </div>
        ))}
      </div>
      <div className="font-bold mt-10 text-2xl">Extracted Image Pixels</div>
      <div className="flex flex-wrap justify-start items-center gap-2 mt-5">
        {selectedColors.map((item, index) => (
          <div
            key={`SelectedColor-${index}-${item}`}
            id={`PaletteColor-${index}-${item}`}
            className="p-2 w-20 flex flex-col items-center"
          >
            <div
              className="w-12 h-12 rounded-full"
              style={{ backgroundColor: `#${item}` }}
            />
            <div className="font-bold">#{item}</div>
          </div>
        ))}
      </div>

      <div className="left-0 right-0 h-0.5 bg-gray-200 my-10" />
      <p className="mt-10 text-lg" role="page-text-content">
        <b>What is an Image Color Extractor?</b>
        <br />
        An image color extractor is a software program or online tool that can
        analyze a digital image file and identify the prominent colors within
        it. It typically outputs this information in various formats, such as:
        <br />
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Color palette: A list of the most prominent
        colors in the image, often displayed as hex codes or RGB values (which
        you learned about previously with HTML color codes).
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Color percentages: The percentage of the image
        occupied by each identified color.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Averages: An average color representing the
        overall tone of the image.
        <br />
        <br />
        <b>How Do Image Color Extractors Work?</b>
        <br />
        The general process involves these steps:
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Image Upload: You provide the image file to
        the extractor tool.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Image Analysis: The tool breaks down the image
        into individual pixels.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Color Identification: Each pixel&#39;s color
        information is analyzed, typically using RGB values.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Color Grouping: Similar colors are grouped
        together to identify dominant themes.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Output Generation: The tool generates the
        chosen output format (palette, percentages, etc.).
        <br />
        <br />
        <b>Benefits of Using Image Color Extractors:</b>
        <br />
        There are several reasons why image color extractors can be helpful:
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Design Inspiration: Extracted color palettes
        can inspire design schemes for websites, marketing materials, or graphic
        design projects that complement the image&#39;s mood or theme.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Web Design: Extracted colors can be used to
        create color palettes for websites or apps that are visually consistent
        with the images they display.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Image Editing: Identifying dominant colors can
        inform photo editing decisions, like adjusting color balance or
        selective color correction.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Fashion & Product Design: Extracting colors
        from product photos can help with creating color-coordinated product
        lines or fashion accessories.
        <br />
      </p>
    </div>
  );
}

export default ImageColorExtractorPage;
