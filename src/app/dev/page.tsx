"use client";

import axios from "axios";
import {
  ErrorButton,
  ErrorOutlineButton,
  InfoButton,
  InfoOutlineButton,
  PrimaryButton,
  PrimaryOutlineButton,
  SecondaryButton,
  SecondaryOutlineButton,
  SuccessButton,
  SuccessOutlineButton,
  WarningButton,
  WarningOutlineButton,
} from "@/components/fundamental/Buttons";
import { DefaultInput } from "@/components/fundamental/InputField";
import { DefaultTextarea } from "@/components/fundamental/TextareaField";
import { DefaultSelect } from "@/components/fundamental/SelectField";

const urls = [
  "/about-us/",
  "/base64-encode/",
  "/color/",
  "/css-formatter/",
  "/dev/",
  "/html-escape/",
  "/html-formatter/",
  "/image-base64/",
  "/image-color-extractor/",
  "/image-compression/",
  "/image-editor/",
  "/javascript-formatter/",
  "/json-formatter/",
  "/jwt/",
  "/md5-hash/",
  "/password/",
  "/privacy-policy/",
  "/qrcode/",
  "/rsa-encryption/",
  "/sha1-hash/",
  "/sha256-hash/",
  "/sha512-hash/",
  "/timestamp/",
  "/url-encode/",
  "/xml-formatter/",
];

const runInStaticBuild = true;

function DevelopmentPage() {
  if (
    runInStaticBuild ||
    !process.env.NODE_ENV ||
    process.env.NODE_ENV === "development"
  ) {
    const getRoutePath = (prefix: string, route: any): string[] => {
      if (prefix == "/" || route.path == "/") {
        prefix += route.path;
      } else {
        prefix = `${prefix}/${route.path}`;
      }
      let pathList: string[] = [prefix];

      if (route.children) {
        route.children.map((item: any, index: number) => {
          pathList.push(...getRoutePath(`${prefix}`, item));
        });
      }
      return pathList;
    };

    const processUrlGetContent = async (
      url: string
    ): Promise<{ [key: string]: string }> => {
      console.log(`processing ${url}`);
      const pageTitleRole = "page-title";
      const pageContentRole = "page-text-content";
      let pageTitleContent = "";
      let pageTextContent = "";

      try {
        const res = await axios.get(url, {
          headers: {
            accept: "text/html,application/xhtml+xml",
          },
        });
        if (res.status !== 200) {
          console.log(
            `Error processing: ${url}, got a response of ${res.status}`
          );
        } else {
          let el = document.createElement("temp");
          el.innerHTML = res.data;
          var pageTitle =
            el.querySelector(`[role="${pageTitleRole}"]`)?.textContent ?? "";
          pageTitleContent = pageTitle;

          var textContentList: string[] = [];
          el.querySelectorAll(`[role="${pageContentRole}"]`).forEach((item) => {
            if (item.textContent) {
              textContentList.push(item.textContent);
            }
          });
          pageTextContent = textContentList.join("; ");
        }
      } catch (e) {
        console.log(e);
      }
      return {
        title: pageTitleContent,
        text: pageTextContent,
      };
    };

    const onBuildSearchIndexTap = async () => {
      const protocol = window.location.protocol;
      const host = window.location.host;
      const routes = urls;
      const documents = [];
      for (let i = 0; i < routes.length; i++) {
        const url = `http://${host}${routes[i]}`;
        const { title, text } = await processUrlGetContent(url);
        console.log(title);
        console.log(text);
        if (title == "" || text == "") {
          continue;
        }
        documents.push({
          id: i,
          route: routes[i],
          title: title,
          text: text,
        });
      }
      console.log(documents);
    };

    return (
      <div className="container mx-auto">
        <div className="my-5 text-primary border-primary flex flex-wrap gap-3 justify-start items-start">
          <PrimaryButton size="md" onClick={onBuildSearchIndexTap}>
            Build Search Index
          </PrimaryButton>
        </div>
        <div className="container mx-auto mt-10">
          <div className="font-bold text-5xl">UI Samples:</div>
          <div className="my-5 text-primary border-primary flex flex-wrap gap-3 justify-start items-start">
            <PrimaryButton size="text">text</PrimaryButton>
            <PrimaryButton size="sm">small</PrimaryButton>
            <PrimaryButton size="md">medium</PrimaryButton>
            <PrimaryButton size="lg">large</PrimaryButton>
            <PrimaryOutlineButton size="lg">large outline</PrimaryOutlineButton>
          </div>
          <div className="my-5 flex flex-wrap gap-3 justify-start items-start w-80">
            <PrimaryButton size="lg">Primary</PrimaryButton>
            <PrimaryOutlineButton size="lg">
              Primary Outline
            </PrimaryOutlineButton>
          </div>
          <div className="my-5 flex flex-wrap gap-3 justify-start items-start w-80">
            <SecondaryButton size="lg">Secondary</SecondaryButton>
            <SecondaryOutlineButton size="lg">
              Secondary Outline
            </SecondaryOutlineButton>
          </div>
          <div className="my-5 flex flex-wrap gap-3 justify-start items-start w-80">
            <InfoButton size="lg">Info</InfoButton>
            <InfoOutlineButton size="lg">Info</InfoOutlineButton>
          </div>
          <div className="my-5 flex flex-wrap gap-3 justify-start items-start w-80">
            <WarningButton size="lg">Warning</WarningButton>
            <WarningOutlineButton size="lg">Warning</WarningOutlineButton>
          </div>
          <div className="my-5 flex flex-wrap gap-3 justify-start items-start w-80">
            <SuccessButton size="lg">Success</SuccessButton>
            <SuccessOutlineButton size="lg">Success</SuccessOutlineButton>
          </div>
          <div className="my-5 flex flex-wrap gap-3 justify-start items-start w-80">
            <ErrorButton size="lg">Error</ErrorButton>
            <ErrorOutlineButton size="lg">Error</ErrorOutlineButton>
          </div>
          <div className="mt-5 flex flex-wrap gap-3 justify-start items-start w-80">
            <DefaultInput tip="hello" title="this is a title" />
          </div>
          <div className="flex flex-wrap gap-3 justify-start items-start w-80">
            <DefaultInput title="this is a title" />
          </div>
          <div className=" flex flex-wrap gap-3 justify-start items-start w-80">
            <DefaultTextarea tip="hello" title="this is a title" />
          </div>
          <div className=" flex flex-wrap gap-3 justify-start items-start w-80">
            <DefaultSelect
              className="w-full"
              tip="hello"
              title="this is a title"
              options={["1", "2", "3", "4", "5"]}
            />
          </div>
        </div>
      </div>
    );
  }
  return <div />;
}

export default DevelopmentPage;
