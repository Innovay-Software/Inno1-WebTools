"use client";

import { useState } from "react";
import { PrimaryButton } from "@/components/fundamental/Buttons";
import config from "@/config";
import Link from "next/link";

export default function Footer({ appName }: { [key: string]: string }) {
  const [showContact, setShowContact] = useState(false);
  const email = config.contact.email;

  return (
    <footer className={`container mx-auto max-w-screen-xl`}>
      <div className="left-0 right-0 h-0.5 bg-gray-200 mb-10" />
      <div className="grid grid-cols-2 bg-white my-10 left-0 right-0  justify-between">
        <div className="col-span-2 md:col-span-1 mt-5 w-48 flex flex-col justify-start items-center">
          <a className="text-center" href="/">
            <img
              className="w-8 h-8 mr-1 hidden md:block"
              src="/icon.png"
              alt={config.company + " Logo"}
            />
          </a>
          <a className="text-center mt-3" href="/">
            <div className="text-gray-800 font-bold">
              {appName} v{config.version}
            </div>
          </a>
          {!showContact && (
            <PrimaryButton
              className="mt-5"
              onClick={() => setShowContact(true)}
            >
              Show Contact Info
            </PrimaryButton>
          )}
          {showContact && (
            <a
              href={"mailto:" + email}
              className="font-bold text-primary hover:opacity-50 active:opacity-75"
            >
              Email: {email}
            </a>
          )}
        </div>
        <div className="col-span-2 md:col-span-1 mt-7 flex flex-col md:flex-row md:justify-end gap-5 md:gap-20">
          <div>
            <div className="font-bold">Company</div>
            <Link href="/about-us">
              <div className="font-bold">About Us</div>
            </Link>
          </div>
          <div>
            <div className="font-bold">Technical</div>
            <Link href="/privacy-policy">
              <div className="font-bold">Privacy Policy</div>
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center text-sm text-gray-400 my-10">
        @ {new Date().getFullYear()} {config.company}, All Rights Reserved
      </div>
    </footer>
  );
}
