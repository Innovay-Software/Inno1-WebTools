"use client";

import { useRouter } from "next/navigation";
import Typewriter from "typewriter-effect";
import config from "@/config";
import { ColorButton } from "@/components/fundamental/Buttons";

export default function Page() {
  const keywords = ["designer", "artists", "developers"];
  const router = useRouter();
  const menus = config.menus;
  const heroImageStyle = {
    backgroundImage: `url(/home-hero-background.webp)`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "400px",
  };

  return (
    <div>
      <div
        style={heroImageStyle}
        className="outline-none absolute left-0 right-0 bg-black bg-opacity-70 bg-blend-color heroBackground -z-10"
      >
        <div className="pt-28 pb-16">
          <div className="container px-4 text-white mx-auto max-w-screen-xl">
            <div className={"mb-8 font-bold text-white text-4xl"}>
              {config.appName.toUpperCase()}
            </div>
            <div className="flex">
              <div className="text-white text-xl mr-1">
                Browser based tools for{" "}
              </div>
              <div className="font-bold">
                <Typewriter
                  options={{
                    strings: keywords,
                    autoStart: true,
                    loop: true,
                    skipAddStyles: true,
                    wrapperClassName: "text-white text-xl",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container pt-80 z-50 mx-auto max-w-screen-xl">
        {menus.map((item, index) => {
          if (!item.homeImage) {
            return <div key={`item-${index}`} />;
          }
          return (
            <div
              key={`item-${index}`}
              className="bg-white rounded-md p-6 shadow-md mb-4 flex justify-between items-center"
            >
              <div>
                <div className="font-bold mb-5">{item.activator}</div>
                <div className="flex flex-wrap gap-5">
                  {item.subMenus.map((item2, index2) => (
                    <ColorButton
                      style={{ backgroundColor: item.color }}
                      textColor="white"
                      key={`item2-${index2}`}
                      rounded
                      onClick={() => router.push(item2.routePath)}
                    >
                      <div>{item2.title}</div>
                    </ColorButton>
                  ))}
                </div>
              </div>
              {item.homeImage && (
                <img
                  className="hidden md:block w-24 h-24"
                  src={item.homeImage}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
