"use client";

import { useState } from "react";
import { JSEncrypt } from "jsencrypt";
import PageTitle from "@/components/PageTitle";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/fundamental/Buttons";
import { DefaultTextarea } from "@/components/fundamental/TextareaField";
import { DefaultSelect } from "@/components/fundamental/SelectField";

function RsaEncryptionPage() {
  const keySizes = [512, 1024, 2048];
  const [isGeneratingKeys, setIsGeneratingKeys] = useState(false);
  const [keySize, setKeySize] = useState(512);
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");

  const onEncryptClick = () => {
    if (isGeneratingKeys) return;

    let crypt = new JSEncrypt();
    crypt.setPublicKey(publicKey);
    let result = crypt.encrypt(decrypted);
    if (result) {
      setEncrypted(result);
    }
  };

  const onDecryptClick = () => {
    if (isGeneratingKeys) return;

    let crypt = new JSEncrypt();
    crypt.setPrivateKey(privateKey);
    let result = crypt.decrypt(encrypted);
    if (result) {
      setDecrypted(result);
    }
  };

  const onGenerateKeysClick = () => {
    if (isGeneratingKeys) return;

    setIsGeneratingKeys(true);
    var crypt = new JSEncrypt({
      default_key_size: keySize.toString(),
    });

    crypt.getKey(function () {
      setPrivateKey(crypt.getPrivateKey());
      setPublicKey(crypt.getPublicKey());
      setIsGeneratingKeys(false);
    });
  };

  return (
    <div className="container mx-auto mb-10 max-w-screen-xl">
      <PageTitle pageTitle="RSA Encryption" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="col-span-1">
          <DefaultTextarea
            size="lg"
            title="RSA Private Key"
            value={privateKey}
            onChange={(val: string) => setPrivateKey(val)}
          />
        </div>
        <div className="col-span-1">
          <DefaultTextarea
            size="lg"
            title="RSA Public Key"
            value={publicKey}
            onChange={(val: string) => setPublicKey(val)}
          />
        </div>
      </div>
      <div className="flex justify-end items-center mb-5">
        <div className="w-24 pt-3">
          <DefaultSelect
            className="w-24"
            options={keySizes.map((item) => item.toString())}
            value={keySize.toString()}
            onChange={(val: string) =>
              setKeySize(isNaN(Number(val)) ? 512 : Number(val))
            }
          />
        </div>
        <PrimaryButton
          className="ml-5 w-60"
          loading={isGeneratingKeys}
          onClick={onGenerateKeysClick}
        >
          GENERATE KEY PAIR
        </PrimaryButton>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="col-span-1">
          <DefaultTextarea
            size="lg"
            title="Content to be encrypted"
            value={decrypted}
            onChange={(val: string) => setDecrypted(val)}
          />
          <PrimaryButton className="w-full" onClick={onEncryptClick}>
            ENCRYPT
          </PrimaryButton>
        </div>
        <div className="col-span-1">
          <DefaultTextarea
            size="lg"
            title="Content to be decrypted"
            value={encrypted}
            onChange={(val: string) => setEncrypted(val)}
          />
          <SecondaryButton className="w-full" onClick={onDecryptClick}>
            DECRYPT
          </SecondaryButton>
        </div>
      </div>

      <p className="mt-10 text-lg" role="page-text-content">
        <b>What is RSA Encryption?</b>
        <br />
        RSA is one of the first public-private key encryption algorithms around
        the world, and is still widely used for secure data transmission today.
        In this cryptosystem, the public key, which is distributed publicly, is
        used to encrypt messages; and the private key, which is kept secret, is
        used to decrypt messages.
        <br />
        <br />
        RSA is typically used in two manners: data transmission and digital
        signatures. For example, SSL, a key component of https, uses the RSA
        algorithm to set up a secure connection between users&#39; browers and
        the backend server.
        <br />
        <br />
        For further reading:
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;•{" "}
        <a
          href="https://www.comparitech.com/blog/information-security/rsa-encryption/#:~:text=It%20was%20traditionally%20used%20in,VPN%20clients%20and%20VPN%20servers."
          target="_blank"
        >
          Comparitech
        </a>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;•{" "}
        <a
          href="https://en.wikipedia.org/wiki/RSA_(cryptosystem)"
          target="_blank"
        >
          Wikipedia
        </a>
        <br />
        <br />
      </p>
    </div>
  );
}

export default RsaEncryptionPage;
