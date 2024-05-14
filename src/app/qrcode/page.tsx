"use client";

import React, { useEffect, useRef, useState } from "react";
import { saveAs } from "file-saver";
import { HexColorPicker } from "react-colorful";
import qrcode, { QRCodeRenderersOptions } from "qrcode";
import PageTitle from "@/components/PageTitle";
import {
  PrimaryButton,
  SecondaryButton,
  TransparentButton,
  TransparentStateButton,
} from "@/components/fundamental/Buttons";

import { MdExpandMore, MdExpandLess } from "react-icons/md";
import CommonUtils from "@/utils/CommonUtils";
import { DefaultInput } from "@/components/fundamental/InputField";
import { DefaultTextarea } from "@/components/fundamental/TextareaField";
import { DefaultSelect } from "@/components/fundamental/SelectField";
import config from "@/config";

function QrCodePage() {
  const canvasRef = useRef(null);
  const firstRenderRef = useRef(true);

  const [tabIndex, setTabIndex] = useState(0);
  const [urlInput1, setUrlInput1] = useState("");
  const [textInput1, setTextInput1] = useState("");

  const [contactInput1, setContactInput1] = useState("");
  const [contactInput2, setContactInput2] = useState("");
  const [contactInput3, setContactInput3] = useState("");
  const [contactInput4, setContactInput4] = useState("");

  const [emailInput1, setEmailInput1] = useState("");
  const [emailInput2, setEmailInput2] = useState("");
  const [emailInput3, setEmailInput3] = useState("");
  const [emailInput4, setEmailInput4] = useState("");

  const [phoneInput1, setPhoneInput1] = useState("");

  const [smsInput1, setSmsInput1] = useState("");
  const [smsInput2, setSmsInput2] = useState("");

  const [wifiInput1, setWifiInput1] = useState("");
  const [wifiInput2, setWifiInput2] = useState("");
  const wifiInput3Options = ["No Encryption", "WEP", "WPA/WPA2"];
  const [wifiInput3, setWifiInput3] = useState(wifiInput3Options[0]);

  const [encodedContent, setEncodedContent] = useState(config.siteDomain);
  const [foregroundColor, setForegroundColor] = useState("#0d6efd");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [showForegroundColorPicker, setShowForegroundColorPicker] =
    useState(false);
  const [showBackgroundColorPicker, setShowBackgroundColorPicker] =
    useState(false);

  useEffect(() => {
    if (firstRenderRef.current) {
      return;
    }
    generateQrcode();
  }, [encodedContent, foregroundColor, backgroundColor]);

  useEffect(() => {
    if (firstRenderRef.current) {
      return;
    }
    const tabFunctions = [
      setUrlEncodedContent,
      setTextEncodedContent,
      setContactEncodedContent,
      setEmailEncodedContent,
      setPhoneEncodedContent,
      setSmsEncodedContent,
      setWifiEncodedContent,
    ];
    if (tabIndex >= tabFunctions.length) {
      console.error(`Invalid TabIndex: ${tabIndex}`);
      return;
    }
    tabFunctions[tabIndex]();
  }, [
    tabIndex,
    urlInput1,
    textInput1,
    contactInput1,
    contactInput2,
    contactInput3,
    contactInput4,
    emailInput1,
    emailInput2,
    emailInput3,
    emailInput4,
    phoneInput1,
    smsInput1,
    smsInput2,
    wifiInput1,
    wifiInput2,
    wifiInput3,
  ]);

  useEffect(() => {
    firstRenderRef.current = false;
    generateQrcode();
  }, []);

  const setUrlEncodedContent = () => {
    if (urlInput1.trim() === "") {
      return;
    }
    let linkString = urlInput1.trim();
    if (
      !linkString.toLowerCase().startsWith("http://") &&
      !linkString.toLowerCase().startsWith("https://")
    ) {
      linkString = `http://${linkString}`;
    }
    setEncodedContent(linkString);
  };

  const setTextEncodedContent = () => {
    if (textInput1 === "") {
      return;
    }
    setEncodedContent(textInput1);
  };

  const setContactEncodedContent = () => {
    setEncodedContent(
      `MECARD:N:${contactInput1};ADR:${contactInput2};TEL:${contactInput3};EMAIL:${contactInput4};;`
    );
  };

  const setEmailEncodedContent = () => {
    var linkString = `MAILTO:${emailInput1}?`;
    if (emailInput2) linkString += `cc=${emailInput2}&`;
    if (emailInput3) linkString += `subject=${emailInput3}&`;
    if (emailInput4) linkString += `body=${emailInput4}`;
    setEncodedContent(linkString);
  };

  const setPhoneEncodedContent = () => {
    if (phoneInput1 === "") {
      return;
    }
    setEncodedContent(`TEL:${phoneInput1}`);
  };

  const setSmsEncodedContent = () => {
    if (smsInput1 === "") {
      return;
    }

    var linkString = `SMSTO:${smsInput1}`;
    if (smsInput2) {
      linkString = `${linkString}:${smsInput2}`;
    }
    setEncodedContent(linkString);
  };

  const setWifiEncodedContent = () => {
    setEncodedContent(`WIFI:T:${wifiInput3};S:${wifiInput1};P:${wifiInput2};;`);
  };

  const generateQrcode = () => {
    var options: QRCodeRenderersOptions = {
      errorCorrectionLevel: "M",
      maskPattern: 5,
      width: 250,
      color: {
        dark: foregroundColor,
        light: backgroundColor,
      },
    };
    qrcode.toCanvas(
      canvasRef.current,
      encodedContent,
      options,
      function (error: any) {
        if (error) console.error(error);
        // onDownloadQrcodeButtonClick();
      }
    );
  };

  const onCopyTextClick = () => {
    CommonUtils.copyToClipboard(encodedContent);
  };

  const onDownloadQrcodeClick = () => {
    if (canvasRef.current != null) {
      (canvasRef.current as HTMLCanvasElement).toBlob(function (blob: Blob) {
        saveAs(blob, `qrcode_[${config.siteDomain}].png`);
      } as BlobCallback);
    }
  };

  return (
    <div className="container mx-auto mb-10 max-w-screen-xl">
      <PageTitle pageTitle="QR Code Generator" />
      <div className="flex flex-wrap">
        <div className="flex flex-wrap flex-row w-full md:flex-col md:w-32 gap-2 mb-5">
          {"URL,TEXT,CONTACT,EMAIL,PHONE,SMS,WIFI"
            .split(",")
            .map((item, index) => (
              <TransparentStateButton
                key={`QrcodeOption-${index}`}
                selected={tabIndex === index}
                onClick={() => setTabIndex(index)}
              >
                {item}
              </TransparentStateButton>
            ))}
        </div>
        <div className="grow mx-5 mb-5">
          {tabIndex === 0 && (
            <div>
              <DefaultInput
                title="URL to encode"
                value={urlInput1}
                onChange={(val: string) => setUrlInput1(val)}
              />
            </div>
          )}
          {tabIndex === 1 && (
            <div>
              <DefaultTextarea
                title="Text to encode"
                value={textInput1}
                size="md"
                onChange={(val: string) => setTextInput1(val)}
              />
            </div>
          )}
          {tabIndex === 2 && (
            <div>
              <DefaultInput
                title="Contact Name"
                value={contactInput1}
                onChange={(val: string) => setContactInput1(val)}
              />
              <DefaultInput
                title="Contact Address"
                value={contactInput2}
                onChange={(val: string) => setContactInput2(val)}
              />
              <DefaultInput
                title="Contact Phone"
                value={contactInput3}
                onChange={(val: string) => setContactInput3(val)}
              />
              <DefaultInput
                title="Contact Email"
                value={contactInput4}
                onChange={(val: string) => setContactInput4(val)}
              />
            </div>
          )}
          {tabIndex === 3 && (
            <div>
              <DefaultInput
                title="Email to"
                value={emailInput1}
                onChange={(val: string) => setEmailInput1(val)}
              />
              <DefaultInput
                title="Email cc"
                value={emailInput2}
                onChange={(val: string) => setEmailInput2(val)}
              />
              <DefaultInput
                title="Email Subject"
                value={emailInput3}
                onChange={(val: string) => setEmailInput3(val)}
              />
              <DefaultTextarea
                title="Email Body"
                value={emailInput4}
                size="md"
                onChange={(val: string) => setEmailInput4(val)}
              />
            </div>
          )}
          {tabIndex === 4 && (
            <div>
              <DefaultInput
                title="Phone Number"
                value={phoneInput1}
                onChange={(val: string) => setPhoneInput1(val)}
              />
            </div>
          )}
          {tabIndex === 5 && (
            <div>
              <DefaultInput
                title="SMS to"
                value={smsInput1}
                onChange={(val: string) => setSmsInput1(val)}
              />
              <DefaultInput
                title="SMS Body"
                value={smsInput2}
                onChange={(val: string) => setSmsInput2(val)}
              />
            </div>
          )}
          {tabIndex === 6 && (
            <div>
              <DefaultInput
                title="SSID (wifi name)"
                value={wifiInput1}
                onChange={(val: string) => setWifiInput1(val)}
              />
              <DefaultInput
                title="Password"
                value={wifiInput2}
                onChange={(val: string) => setWifiInput2(val)}
              />
              <DefaultSelect
                title="Encryption"
                options={wifiInput3Options}
                value={wifiInput3}
                onChange={(val: string) => setWifiInput3(val)}
              />
            </div>
          )}

          <div className="w-full flex justify-center items-center">
            <div className="w-64 flex flex-col gap-2">
              <canvas
                ref={canvasRef}
                className="border border-gray-300 rounded-xl"
                id="canvas"
                width="250"
                height="250"
              />
              <TransparentButton
                className="w-full px-6"
                onClick={() =>
                  setShowForegroundColorPicker(!showForegroundColorPicker)
                }
              >
                <div className="w-full flex justify-between items-center">
                  <div className="font-bold text-gray-700">QR Code Color: </div>
                  <div className="flex justify-between w-12">
                    <div
                      className="w-5 h-5 rounded-sm border border-gray-200"
                      style={{ backgroundColor: foregroundColor }}
                    ></div>
                    {showForegroundColorPicker ? (
                      <MdExpandLess className="text-gray-700" size={24} />
                    ) : (
                      <MdExpandMore className="text-gray-700" size={24} />
                    )}
                  </div>
                </div>
              </TransparentButton>
              <div
                className={
                  "w-full transition-all flex justify-center overflow-hidden duration-500 " +
                  (showForegroundColorPicker
                    ? " opacity-100 "
                    : " opacity-0 h-0 ")
                }
              >
                <HexColorPicker
                  color={foregroundColor}
                  onChange={setForegroundColor}
                />
              </div>
              <TransparentButton
                className="w-full px-6 "
                onClick={() =>
                  setShowBackgroundColorPicker(!showBackgroundColorPicker)
                }
              >
                <div className="w-full flex justify-between items-center">
                  <div className="font-bold text-gray-700">
                    Background Color:{" "}
                  </div>
                  <div className="flex justify-between w-12">
                    <div
                      className="w-5 h-5 rounded-sm border border-gray-200"
                      style={{ backgroundColor: backgroundColor }}
                    ></div>
                    {showBackgroundColorPicker ? (
                      <MdExpandLess className="text-gray-700" size={24} />
                    ) : (
                      <MdExpandMore className="text-gray-700" size={24} />
                    )}
                  </div>
                </div>
              </TransparentButton>
              <div
                className={
                  "w-full transition-all flex justify-center overflow-hidden duration-500 " +
                  (showBackgroundColorPicker
                    ? " opacity-100 "
                    : " opacity-0 h-0 ")
                }
              >
                <HexColorPicker
                  color={backgroundColor}
                  onChange={setBackgroundColor}
                />
              </div>
              <PrimaryButton className="w-full" onClick={onDownloadQrcodeClick}>
                Download QR Code
              </PrimaryButton>
              <SecondaryButton className="w-full" onClick={onCopyTextClick}>
                Copy Content
              </SecondaryButton>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-10 text-lg" role="page-text-content">
        <b>How to use</b>
        <br />
        Choose your desired QR code format, enter the content in the fields, and
        the QR code will be updated on the right in real time.
        <br />
        <br />
        <b>What is a QR code</b>
        <br />
        QR code or <b>Quick Response code</b> is a two dimensional image that
        embeds a hidden string of text inside. The QR code scanner extract that
        hidden text from the image and takes appropriate actions according to
        the format of the text.
        <br />
        <br />
        For example, if the text format is URL, the scanner then opens up your
        browser and navigate to that url; if the text format is a wifi
        connection, your scanner will open up your wifi connection settings and
        paste in the wifi username and password to connect; if the text format
        is email, your scanner will open up your default email app and paste the
        content in the composed email.
        <br />
        <br />
        Common QR code formats include: URL, email, contact, phone number,
        paypal, account login, etc.
        <br />
        For more information, please refer to the following pages:
        <br />
        <br />
        <a
          href="https://en.wikipedia.org/wiki/QR_code"
          target="_blank"
          rel="noreferrer"
        >
          QR Code by Wikipedia
        </a>
        <br />
        <a
          href="https://www.businessinsider.com/what-is-a-qr-code"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          What is a QR code by Insider
        </a>
      </p>
    </div>
  );
}

export default QrCodePage;
