"use client";

import { useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import PageTitle from "@/components/PageTitle";
import FileDrop from "@/components/FileDrop";
import { saveAs } from "file-saver";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/fundamental/Buttons";

function ImageCompressionPage() {
  const srcImageRef = useRef(null);

  const [processing, setProcessing] = useState(false);
  const [imageUrl, setImageUrl] = useState("/sample1.jpg");
  const [imageName, setIamgeName] = useState("");
  const [compressedImageBase64, setCompressedImageBase64] = useState("");
  const [imageSize, setImageSize] = useState("0.167MB");
  const [compressedImageSize, setCompressedImageSize] = useState("0MB");

  const onFileSelected = (files: File[]) => {
    if (files && files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(files[0]);
      compressImage(files[0]);
    }
  };

  const compressImage = async (imageFile: File) => {
    setImageSize(
      `${Math.round((imageFile.size / 1024 / 1024) * 10000) / 10000} MB`
    );
    setIamgeName(imageFile.name);
    setProcessing(true);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 4028,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log(
        `compressedFile size ${compressedFile.size / 1000 / 1000} MB`
      );
      setCompressedImageSize(
        `${Math.round((compressedFile.size / 1000 / 1000) * 10000) / 10000} MB`
      );

      var reader = new FileReader();
      reader.onload = function (e) {
        setCompressedImageBase64(e.target?.result as string);
        // initCanvas(e.target?.result as string);
      };
      reader.readAsDataURL(compressedFile);

      // await uploadToServer(compressedFile); // write your own logic
    } catch (error) {
      console.log(error);
    }

    setProcessing(false);
  };

  const onDownloadClick = () => {
    if (processing) return;

    const dotIndex = imageName.lastIndexOf(".");
    const part1 = imageName.substring(0, dotIndex);
    const part2 = imageName.substring(dotIndex);
    saveAs(compressedImageBase64, `${part1}_compressed${part2}`);
  };

  return (
    <div className="container mx-auto mb-10 max-w-screen-lg">
      <PageTitle pageTitle="Image Compression" />
      <FileDrop onFileSelected={onFileSelected} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
        <div>
          <div className="relative">
            <img
              ref={srcImageRef}
              className="w-full h-auto min-h-10 rounded-lg"
              src={imageUrl}
              alt="Compress Image"
            />
            {processing && (
              <div className="absolute left-0 top-0 w-full h-full bg-black opacity-60 flex justify-center items-center">
                <div className="text-white font-bold text-lg">
                  Processing...
                </div>
              </div>
            )}
          </div>
          <div className="font-bold text-center mt-5">
            File size: {imageSize}
          </div>
        </div>
        {compressedImageBase64 !== "" && (
          <div className="h-full flex flex-col justify-start items-center">
            <img
              className="w-full h-auto min-h-10 rounded-lg"
              src={compressedImageBase64}
              alt="Compressed Image"
            />
            <div className="font-bold text-center mt-5">
              Compressed file size: {compressedImageSize}
            </div>
            {processing ? (
              <SecondaryButton className="mt-5">Processing...</SecondaryButton>
            ) : (
              <PrimaryButton className="mt-5" onClick={onDownloadClick}>
                Download Compressed Image
              </PrimaryButton>
            )}
          </div>
        )}
      </div>
      <p className="mt-10 text-lg" role="page-text-content">
        <b>What is image compression</b>
        <br />
        Image compression is the process of reducing the file size of an image
        while maintaining an acceptable level of quality. This is crucial for
        various reasons, especially on the web:
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Faster Loading Times: Smaller image files
        transfer quicker over the internet, resulting in faster webpage loading
        times. This improves user experience and website performance.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Reduced Storage Requirements: Compressed
        images require less storage space on servers or devices, leading to more
        efficient storage usage.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Bandwidth Conservation: Smaller image sizes
        use less bandwidth for transmission, which can be important for users
        with limited data plans or congested networks.
        <br />
        <br />
        <b>Types of Image Compression:</b>
        <br />
        There are two main categories of image compression:
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Lossless Compression: This type of compression
        removes redundant data from the image without any loss of quality. The
        original image can be perfectly reconstructed from the compressed data.
        Techniques like Huffman coding and LZW compression are commonly used for
        lossless compression.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Lossy Compression: This type prioritizes
        achieving a significant reduction in file size by allowing some amount
        of quality loss. The original image cannot be exactly recovered from the
        compressed data. However, the goal is to minimize the quality loss to an
        acceptable level, where the human eye might not perceive a significant
        difference. Popular image formats like JPEG and WebP use lossy
        compression algorithms.
        <br />
        <br />
        <b>Choosing the Right Compression Technique:</b>
        <br />
        The ideal compression technique depends on several factors:
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Required Quality Level: If the image requires
        perfect retention of details (e.g., medical scans, diagrams), lossless
        compression is preferred. For most photos or web graphics, some loss in
        quality might be acceptable in exchange for a smaller file size.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Image Type: Different image formats are better
        suited for specific compression techniques. Lossless compression works
        well for images with sharp edges and flat colors (e.g., text-based
        graphics). Lossy compression is more effective for photographs with
        gradual color variations.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• Target Audience: Consider how sensitive your
        audience is to image quality. If minor quality reduction is acceptable,
        lossy compression can be a good choice.
        <br />
      </p>
    </div>
  );
}

export default ImageCompressionPage;
