"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { MdMenu } from "react-icons/md";
import { TransparentButton } from "@/components/fundamental/Buttons";
import config from "@/config";
import Link from "next/link";

export default function Header({ appName }: { [key: string]: string }) {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const [menuStats, setMenuStats] = useState(config.menus);

  const onBackgroundTap = (evt: any) => {
    evt.preventDefault();
    setShowMenu(false);
  };

  const onMenuTap = (index: number) => {
    let newState: boolean = !menuStats[index].open ?? false;
    for (let i = 0; i < menuStats.length; i++) {
      if (i === index) {
        menuStats[i].open = newState;
      } else {
        menuStats[i].open = false;
      }
    }
    setMenuStats([...menuStats]);
  };

  return (
    <header className="fixed flex bg-gray-600 p-2 top-0 left-0 w-screen z-50">
      <div className="flex container mx-auto justify-between max-w-screen-xl">
        <a
          className="h-9 justify-start items-center pr-5 hidden md:flex w-60"
          href="/"
        >
          <img
            className="w-8 h-8 mr-1"
            src="/icon.png"
            alt={config.company + " Logo"}
          />
          <div className="text-white font-bold">{appName}</div>
        </a>
        <a
          className="h-9 justify-evenly items-center pr-5 flex md:hidden w-16"
          href="/"
        >
          <img
            className="w-8 h-8"
            src="/icon.png"
            alt={config.company + " Logo"}
          />
        </a>
        {pathname !== "/search/" && (
          <Link
            className="block grow md:w-96 rounded-full bg-white border-0 py-1.5 px-3 ring-1 ring-inset ring-gray-300 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 select-none "
            href="/search/"
          >
            Search for tools
          </Link>
        )}
        <div className="hidden md:flex w-48" />
        <button
          className="transition-all ml-3 scale-100 sm:scale-0"
          onClick={() => setShowMenu(!showMenu)}
        >
          <MdMenu className="text-white" size="32" />
        </button>
        {showMenu && (
          <div
            className="absolute left-0 top-0 w-screen h-screen z-10 flex p-4 overflow-scroll"
            onClick={onBackgroundTap}
          >
            <div className="w-screen max-w-md max-h-96 flex-auto overflow-scroll scroll-smooth rounded-md bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
              {menuStats.map((item, index) => {
                if (item.hidden) {
                  return <div key={"Menu1-" + index} />;
                }
                return (
                  <div key={"Menu1-" + index}>
                    <TransparentButton
                      className="w-full px-6 py-5"
                      onClick={() => onMenuTap(index)}
                    >
                      <div className="w-full flex justify-between items-center">
                        <div className="font-bold text-gray-700 text-2xl">
                          {item.activator}
                        </div>
                      </div>
                    </TransparentButton>
                    <div
                      className={
                        "w-full transition-all overflow-hidden duration-500 "
                      }
                    >
                      {item.subMenus.map((item2, index2) => (
                        <div
                          key={"Menu2-" + index2}
                          className="w-full pl-10 py-3"
                        >
                          <Link
                            className={`${
                              item2.routePath === pathname
                                ? "text-info font-bold"
                                : "text-gray-500"
                            } hover:font-bold`}
                            href={item2.routePath}
                          >
                            {item2.title}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
