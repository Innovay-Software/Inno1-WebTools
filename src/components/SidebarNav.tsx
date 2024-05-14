"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { TransparentButton } from "@/components/fundamental/Buttons";
import config from "@/config";
import Link from "next/link";

export default function SidebarNav() {
  const pathname = usePathname();
  const [menuStats, setMenuStats] = useState(config.menus);

  useEffect(() => {
    for (let i = 0; i < config.menus.length; i++) {
      for (let j = 0; j < config.menus[i].subMenus.length; j++) {
        if (`${config.menus[i].subMenus[j].routePath}` === pathname) {
          config.menus[i].open = true;
        }
      }
    }
    setMenuStats([...config.menus]);
  }, []);

  const onMenuTap = (index: number) => {
    let currentState: boolean = menuStats[index].open ?? false;
    for (let i = 0; i < menuStats.length; i++) {
      if (i === index) {
        menuStats[i].open = !currentState;
      } else {
        menuStats[i].open = false;
      }
    }
    setMenuStats([...menuStats]);
  };

  return pathname == "/" ? (
    <div />
  ) : (
    <div
      className="transition-all relative z-40 w-0 sm:w-64"
      style={{ minHeight: "calc(100vh - 3.25rem)" }}
    >
      <div className="transition-all absolute left-0 top-0 w-60 -translate-x-full sm:translate-x-0">
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
                  <div className="font-bold text-gray-700">
                    {item.activator}
                  </div>
                  {item.open ? (
                    <MdExpandLess className="text-gray-700" size={24} />
                  ) : (
                    <MdExpandMore className="text-gray-700" size={24} />
                  )}
                </div>
              </TransparentButton>
              <div
                className={
                  "w-full transition-all overflow-hidden duration-500 " +
                  (item.open ? " opacity-100 " : " opacity-0 h-0 ")
                }
              >
                {item.subMenus.map((item2, index2) => (
                  <div key={"Menu2-" + index2} className="w-full pl-10 py-3">
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
  );
}
