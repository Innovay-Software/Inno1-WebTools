"use client";

import React, { useEffect, useState } from "react";
import { Slider } from "@mui/material";
import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";
import { MdRefresh, MdContentCopy } from "react-icons/md";
import {
  ErrorButton,
  ErrorOutlineButton,
  InfoButton,
  InfoOutlineButton,
  InfoStateButton,
  PrimaryButton,
  SecondaryButton,
  SuccessButton,
  SuccessOutlineButton,
  TransparentButton,
} from "@/components/fundamental/Buttons";
import PageTitle from "@/components/PageTitle";
import CommonUtils from "@/utils/CommonUtils";

const options = {
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  translations: zxcvbnEnPackage.translations,
};
zxcvbnOptions.setOptions(options);

function PasswordPage() {
  const minPasswordLength = 6;
  const maxPasswordLength = 50;
  const [password, setPassword] = useState("123");
  const [passwordLength, setPasswordLength] = useState(12);
  const [passwordStrengthColor, setPasswordStrengthColor] =
    useState("text-green-700");
  const [passwordStrengthTip, setPasswordStrengthTip] = useState("");

  const [useLowerCase, setUseLowerCase] = useState(true);
  const [useUppserCase, setUseUpperCase] = useState(true);
  const [useNumber, setUseNumber] = useState(true);
  const [useSymbol, setUseSymbol] = useState(true);

  const [memorablePasswords, setMemorablePasswords] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
  ]);
  const [securePasswords, setSecurePasswords] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
  ]);
  const [developerPasswords, setDeveloperPasswords] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
  ]);

  useEffect(() => {
    generatePassword();
    generateMemorablePasswords();
    generateSecurePasswords();
    generateDeveloperPasswords();
  }, []);

  const onCopyClick = () => {
    CommonUtils.copyToClipboard(password);
  };

  const generatePassword = () => {
    let length = Math.min(
      Math.max(passwordLength, minPasswordLength),
      maxPasswordLength
    );
    let lowercaseCount = useLowerCase ? Math.max(1, Math.floor(length / 4)) : 0;
    let uppercaseCount = useUppserCase
      ? Math.max(1, Math.floor(length / 4))
      : 0;
    let numberCount = useNumber ? Math.max(1, Math.floor(length / 4)) : 0;
    let symbolCount = useSymbol ? Math.max(1, Math.floor(length / 4)) : 0;
    let total = lowercaseCount + uppercaseCount + numberCount + symbolCount;
    let either = 0;
    if (total > length) {
      symbolCount = length - lowercaseCount - uppercaseCount - numberCount;
    } else if (total < length) {
      either = length - total;
    }
    if (!useLowerCase && !useUppserCase && !useNumber && !useSymbol) {
      setUseLowerCase(true);
      either = 0;
      total = lowercaseCount = passwordLength;
    }

    let password = randPassword(
      lowercaseCount,
      uppercaseCount,
      numberCount,
      symbolCount,
      either
    );
    setPassword(password);
    updatePasswordStrength(password);
  };

  const updatePasswordStrength = (password: string) => {
    let passwordStrengthResult = calculatePasswordStrength(password);

    var timeToCrack =
      passwordStrengthResult.crackTimesDisplay.offlineSlowHashing1e4PerSecond;
    var strength = passwordStrengthResult.score;

    var targetTextColorClass = "text-green-700";
    if (strength <= 2) {
      targetTextColorClass = "text-red-500";
    } else if (strength <= 3) {
      targetTextColorClass = "text-orange-500";
    }
    setPasswordStrengthColor(targetTextColorClass);
    setPasswordStrengthTip(timeToCrack);
  };

  const randPassword = (
    lower: number,
    upper: number,
    numbers: number,
    symbols: number,
    either: number
  ): string => {
    let chars: Array<string> = [
      "abcdefghijkmnopqrstuvwxyz",
      "ABCDEFGHJKLMNOPQRSTUVWXYZ",
      "0123456789",
      "!@%&?-_",
      "",
    ];
    chars[4] = [
      lower ? chars[0] : "",
      upper ? chars[1] : "",
      numbers ? chars[2] : "",
      symbols ? chars[3] : "",
    ].join("");

    return [lower, upper, numbers, symbols, either]
      .map(function (len, i) {
        return Array<string>(len)
          .fill(chars[i])
          .map(function (x) {
            return x[Math.floor(Math.random() * x.length)];
          })
          .join("");
      })
      .concat()
      .join("")
      .split("")
      .sort(function () {
        return 0.5 - Math.random();
      })
      .join("");
  };

  const calculatePasswordStrength = (password: string) => {
    return zxcvbn(password);
  };

  const generateMemorablePasswords = () => {
    let passwords: Array<string> = [];
    for (var i = 0; i < 8; i++) {
      passwords.push(randPassword(0, 4, 4, 2, 0));
    }
    setMemorablePasswords(passwords);
  };

  const generateSecurePasswords = () => {
    let passwords: Array<string> = [];
    for (var i = 0; i < 8; i++) {
      passwords.push(randPassword(3, 3, 3, 3, 0));
    }
    setSecurePasswords(passwords);
  };

  const generateDeveloperPasswords = () => {
    let passwords: Array<string> = [];
    for (var i = 0; i < 8; i++) {
      passwords.push(randPassword(4, 4, 4, 5, 0));
    }
    setDeveloperPasswords(passwords);
  };

  return (
    <div className="container mx-auto mb-10 max-w-screen-xl">
      <PageTitle pageTitle="Password Generator" />
      <p>
        This password generator <b>runs in your browser only</b>. None of the
        password shown here will be sent to any remote locations. This site can
        be saved as a PWA and run in offline mode if that&#39;s a more desirable
        option. :)
        <br />
        <br />
        Click the button below to start generating random passwords. You may
        also enter your password to check how secure it is.
      </p>
      <div className="my-10 p-3 w-full bg-gray-100 flex">
        <input
          type="text"
          value={password}
          readOnly
          className="w-full text-center border-none text-4xl bg-transparent mr-3"
        />
        <TransparentButton
          className="bg-transparent hover:bg-white"
          color="white"
          onClick={generatePassword}
          rounded
          textColor="info"
        >
          <MdRefresh size={48} />
        </TransparentButton>
        <TransparentButton
          className="bg-transparent hover:bg-white"
          color="white"
          onClick={onCopyClick}
          rounded
          textColor="info"
        >
          <MdContentCopy size={48} />
        </TransparentButton>
      </div>
      <div className="text-lg text-center mb-10">
        Approximate time it takes a hardware to crack this password:
        <span className={`ml-1 font-bold text-5xl ${passwordStrengthColor}`}>
          {passwordStrengthTip}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 items-center justify-center">
        <div className="mb-1 mr-2"> {`Password Length: ${passwordLength}`}</div>
        <div className="w-full md:w-64 px-5">
          <Slider
            className="w-full"
            value={passwordLength}
            min={minPasswordLength}
            max={maxPasswordLength}
            marks={[
              { value: minPasswordLength, label: minPasswordLength },
              { value: maxPasswordLength, label: maxPasswordLength },
            ]}
            onChange={(event: any) => {
              setPasswordLength(Number(event.target.value));
              generatePassword();
            }}
          />
        </div>
        <InfoStateButton
          selected={useLowerCase}
          onClick={() => setUseLowerCase(!useLowerCase)}
        >
          a-z
        </InfoStateButton>
        <InfoStateButton
          selected={useUppserCase}
          onClick={() => setUseUpperCase(!useUppserCase)}
        >
          A-Z
        </InfoStateButton>
        <InfoStateButton
          selected={useNumber}
          onClick={() => setUseNumber(!useNumber)}
        >
          0-9
        </InfoStateButton>
        <InfoStateButton
          selected={useSymbol}
          onClick={() => setUseSymbol(!useSymbol)}
        >
          SYMBOLS
        </InfoStateButton>
      </div>
      <div className="flex gap-2 my-10 justify-center">
        <PrimaryButton size="lg" onClick={generatePassword}>
          GENERATE SECURE PASSWORD!
        </PrimaryButton>
        <SecondaryButton size="lg" onClick={onCopyClick}>
          COPY TO CLIPBOARD!
        </SecondaryButton>
      </div>
      <p className="text-left my-10">
        Passwords with different levels of security have been generated below.
        <br />
        <b>Click</b> on your desired password to copy it to clipboard.
      </p>
      <div className="w-full border p-5 rounded-md my-10 shadow-none">
        <div className="flex justify-between">
          <h5 className="text-2xl font-bold tracking-tight text-info">
            Memorable Passwords
          </h5>
          <InfoButton size="md" onClick={generateMemorablePasswords}>
            REFRESH
          </InfoButton>
        </div>
        <div className="flex flex-wrap justify-between">
          {memorablePasswords.map((password, i) => (
            <div key={`Memorable-${i}`} className="w-full sm:w-6/12 p-3">
              <InfoOutlineButton
                className="w-full"
                onClick={() => CommonUtils.copyToClipboard(password)}
              >
                {password}
              </InfoOutlineButton>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full border p-5 rounded-md my-10 shadow-none">
        <div className="flex justify-between">
          <h5 className="text-2xl font-bold tracking-tight text-success">
            Secure Passwords
          </h5>
          <SuccessButton size="md" onClick={generateSecurePasswords}>
            REFRESH
          </SuccessButton>
        </div>
        <div className="flex flex-wrap justify-between">
          {securePasswords.map((password, i) => (
            <div key={`Memorable-${i}`} className="w-full sm:w-6/12 p-3">
              <SuccessOutlineButton
                className="w-full"
                onClick={() => CommonUtils.copyToClipboard(password)}
              >
                {password}
              </SuccessOutlineButton>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full border p-5 rounded-md my-10 shadow-none">
        <div className="flex justify-between">
          <h5 className="text-2xl font-bold tracking-tight text-error">
            Developer Passwords
          </h5>
          <ErrorButton size="md" onClick={generateDeveloperPasswords}>
            REFRESH
          </ErrorButton>
        </div>
        <div className="flex flex-wrap justify-between">
          {developerPasswords.map((password, i) => (
            <div key={`Memorable-${i}`} className="w-full sm:w-6/12 p-3">
              <ErrorOutlineButton
                className="w-full"
                onClick={() => CommonUtils.copyToClipboard(password)}
              >
                {password}
              </ErrorOutlineButton>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-10 text-lg" role="page-text-content">
        <b>How to pick a secure password?</b>
        <br />
        Use a combination of <b>random</b> lower case letters, upper case
        letter, numbers, and symbols, and make sure it is at least 8 characters
        in length. Or just use a <b>random password generator</b>.
        <br />
        <b>Do not</b> use your personal information as passwords, for example,
        your first pet&#39;s name, your mother&#39;s maiden name, etc.
        <br />
        <br />
        <b>Will my password be stored on your servers?</b>
        <br />
        <b>Absolutely Not!</b> Our password generator are designed to run in
        your browers only and in offline mode, meaning that after the page is
        loaded, this web page will not connect to any servers. There will be no
        information sending out to the internet. You may disconnect your
        Internet connection after the page is loaded and will still be able to
        use our password generator.
        <br />
        <br />
        <b>What are some of the worst passwords??</b>
        <br />
        According to the
        <a
          className="ml-1 "
          href="https://nordpass.com/blog/top-worst-passwords-2019/"
          target="_blank"
          rel="noreferrer"
        >
          NordPass Report
        </a>
        , below are the top 10 worst passwords:
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• 12345
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• 123456
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• 123456789
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• test1
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• password
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• 12345678
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• zinch
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• g_czechout
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• asdf
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• qwerty
      </p>
    </div>
  );
}

export default PasswordPage;
