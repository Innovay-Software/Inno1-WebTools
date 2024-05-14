"use client";

import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import rs from "jsrsasign";
import PageTitle from "@/components/PageTitle";
import { DefaultInput } from "@/components/fundamental/InputField";
import { DefaultTextarea } from "@/components/fundamental/TextareaField";
import { DefaultSelect } from "@/components/fundamental/SelectField";
import { PrimaryButton } from "@/components/fundamental/Buttons";

function JwtPage() {
  const algorithmOptions: Array<string> = [
    "HS256",
    "HS384",
    "HS512",
    "RS256",
    "RS384",
    "RS512",
    "ES256",
    "ES384",
    "PS256",
    "PS384",
  ];
  const [algorithm, setAlgorithm] = useState(algorithmOptions[0]);
  const [encoded, setEncoded] = useState("");
  const [calculatedEncoded, setCalculatedEncoded] = useState("");
  const [header, setHeader] = useState<{ [key: string]: any }>({
    alg: algorithmOptions[0],
    typ: "JWT",
  });
  const [payload, setPayload] = useState<{ [key: string]: any }>({
    uid: "123",
    name: "J.D.",
    iat: "1592312250",
  });
  const [hsEncryptionKey, setHsEncryptionKey] = useState("encryption-key");
  const [rsPriKey, setRsPriKey] = useState("");
  const [rsPubKey, setRsPubKey] = useState("");
  const [esPriKey, setEsPriKey] = useState("");
  const [esPubKey, setEsPubKey] = useState("");
  const [psPriKey, setPsPriKey] = useState("");
  const [psPubKey, setPsPubKey] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    let newHeader: { [key: string]: string } = JSON.parse(
      JSON.stringify(header)
    );
    newHeader.alg = algorithm;
    setHeader(newHeader);
    switch (algorithm.substring(0, 2)) {
      case "RS":
        generateRSAKeys();
        break;
      case "ES":
        generateECDSAKeys();
        break;
      case "PS":
        generatePSKeys();
        break;
    }
  }, [algorithm]);

  useEffect(() => {
    generateSignature2();
  }, [header, payload, hsEncryptionKey, rsPriKey, esPriKey]);

  const generateSignature2 = () => {
    try {
      let result = "";
      if (!algorithmOptions.includes(header.alg)) {
        throw new Error(`Invalid algorithm: ${header.alg}`);
      } else if (header.alg.indexOf("HS") === 0) {
        result = rs.KJUR.jws.JWS.sign(
          header.alg,
          JSON.stringify(header),
          payload,
          hsEncryptionKey
        );
      } else if (header.alg.indexOf("RS") === 0) {
        result = rs.KJUR.jws.JWS.sign(
          header.alg,
          JSON.stringify(header),
          payload,
          rsPriKey
        );
      } else if (header.alg.indexOf("ES") === 0) {
        result = rs.KJUR.jws.JWS.sign(
          header.alg,
          JSON.stringify(header),
          payload,
          esPriKey
        );
      } else if (header.alg.indexOf("PS") === 0) {
        result = rs.KJUR.jws.JWS.sign(
          header.alg,
          JSON.stringify(header),
          payload,
          psPriKey
        );
      } else {
        throw new Error(`Invalid algorithm: ${header.alg}`);
      }

      if (result === "") {
        console.error("Invalid header alg:", header.alg);
      } else {
        setEncoded(result);
        setCalculatedEncoded(result);
      }
    } catch (e) {
      toast.dismiss();
      toast.error(`${e}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      console.info(e);
    }
  };

  const onTokenGenerationStart = () => {
    setIsGenerating(true);
  };
  const onTokenGenerationEnd = () => {
    setIsGenerating(false);
  };

  const generateRSAKeys = () => {
    if (isGenerating) return;
    onTokenGenerationStart();
    var kp = rs.KEYUTIL.generateKeypair("RSA", 1024);
    setRsPriKey(rs.KEYUTIL.getPEM(kp.prvKeyObj, "PKCS8PRV"));
    setRsPubKey(rs.KEYUTIL.getPEM(kp.pubKeyObj));
    onTokenGenerationEnd();
  };

  const generateECDSAKeys = () => {
    if (isGenerating) return;
    onTokenGenerationStart();
    var kp = rs.KEYUTIL.generateKeypair("EC", "secp256r1");
    setEsPriKey(rs.KEYUTIL.getPEM(kp.prvKeyObj, "PKCS8PRV"));
    setEsPubKey(rs.KEYUTIL.getPEM(kp.pubKeyObj));
    onTokenGenerationEnd();
  };

  const generatePSKeys = () => {
    if (isGenerating) return;
    onTokenGenerationStart();
    var kp = rs.KEYUTIL.generateKeypair("RSA", 1024);
    setPsPriKey(rs.KEYUTIL.getPEM(kp.prvKeyObj, "PKCS8PRV"));
    setPsPubKey(rs.KEYUTIL.getPEM(kp.pubKeyObj));
    onTokenGenerationEnd();
  };

  const tryParseJson = (content: string, fallback: any): any => {
    try {
      let result = JSON.parse(content);
      return result;
    } catch (e) {
      toast.dismiss();
      toast.error("Invalid JSON content", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
    return fallback;
  };

  return (
    <div className="container mx-auto mb-10 max-w-screen-xl">
      <PageTitle pageTitle="JSON Web Token Validator" />
      <div className="grid grid-cols-2 gap-5 ">
        <div>
          <div className="font-bold text-2xl mb-1">Encoded</div>
          <DefaultTextarea
            className="font-normal"
            size="lg"
            value={encoded}
            onChange={(val: string) => setEncoded(val)}
          />
          <div className="flex justify-center mb-10">
            {encoded == calculatedEncoded ? (
              <div className="font-bold text-success text-center text-4xl">
                Token is Valid
              </div>
            ) : (
              <div className="font-bold text-error text-center text-4xl">
                Token is NOT Valid
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="font-bold text-2xl mb-1">Decoded</div>
          <DefaultSelect
            options={algorithmOptions}
            value={algorithm}
            title="Algorithm"
            onChange={(val: string) => setAlgorithm(val)}
          />
          <DefaultInput
            title="Header"
            value={JSON.stringify(header)}
            onChange={(val: string) => setHeader(tryParseJson(val, header))}
          />
          <DefaultTextarea
            size="sm"
            title="Payload"
            value={JSON.stringify(payload)}
            onChange={(val: string) => setPayload(tryParseJson(val, payload))}
          />
          {algorithm.indexOf("HS") === 0 && (
            <DefaultInput
              title="Encryption Key"
              value={hsEncryptionKey}
              onChange={(val: string) => setHsEncryptionKey(val)}
            />
          )}
          {algorithm.indexOf("RS") === 0 && (
            <div>
              <div className="grid grid-cols-2 gap-5 ">
                <DefaultTextarea
                  size="md"
                  title="Private Key"
                  value={rsPriKey}
                  onChange={(val: string) => setRsPriKey(val)}
                />
                <DefaultTextarea
                  size="md"
                  title="Public Key"
                  value={rsPubKey}
                  onChange={(val: string) => setRsPubKey(val)}
                />
              </div>
              <div className="grid grid-cols-1 mb-10">
                <PrimaryButton
                  className="w-full"
                  onClick={generateRSAKeys}
                  loading={isGenerating}
                >
                  REFRESH KEYS
                </PrimaryButton>
              </div>
            </div>
          )}
          {algorithm.indexOf("ES") === 0 && (
            <div>
              <div className="grid grid-cols-2 gap-5 ">
                <DefaultTextarea
                  size="md"
                  title="Private Key"
                  value={esPriKey}
                  onChange={(val: string) => setEsPriKey(val)}
                />
                <DefaultTextarea
                  size="md"
                  title="Public Key"
                  value={esPubKey}
                  onChange={(val: string) => setEsPubKey(val)}
                />
              </div>
              <div className="grid grid-cols-1 mb-10">
                <PrimaryButton
                  className="w-full"
                  onClick={generateECDSAKeys}
                  loading={isGenerating}
                >
                  REFRESH KEYS
                </PrimaryButton>
              </div>
            </div>
          )}
          {algorithm.indexOf("PS") === 0 && (
            <div>
              <div className="grid grid-cols-2 gap-5 ">
                <DefaultTextarea
                  size="md"
                  title="Private Key"
                  value={psPriKey}
                  onChange={(val: string) => setPsPriKey(val)}
                />
                <DefaultTextarea
                  size="md"
                  title="Public Key"
                  value={psPubKey}
                  onChange={(val: string) => setPsPubKey(val)}
                />
              </div>
              <div className="grid grid-cols-1 mb-10">
                <PrimaryButton
                  className="w-full"
                  onClick={generatePSKeys}
                  loading={isGenerating}
                >
                  REFRESH KEYS
                </PrimaryButton>
              </div>
            </div>
          )}
        </div>
      </div>

      <p role="page-text-content">
        <b>To validate a Json Web Token: </b>choose the target algorithm, paste
        in your encryption key or private/pubice key paris, then paste your jwt
        on the left.
        <br />
        <br />
        <b>To generate a Json Web Token: </b>choose the target algorithm, enter
        your header, playload in json format, then choose or generate an
        encryption.
        <br />
        <br />
      </p>
      <p className="mt-10 text-lg" role="page-text-content">
        <b>What is a JWT?</b>
        <br />
        A JWT or JSON Web Token is a token used to authenticate user actions.
        Some non-sensitive user info are stored in the payload section of a JWT
        so the backend server can validate the identify of the client without
        having to call the user authencation server.
        <br />
        <br />
        To validate a JWT, the backend server compares the signature section of
        the JWT with the hashed value of the payload to make sure the payload
        and hence the JWT has not been tampered with.
        <br />
        <br />
        Some <b>pros</b> of JWT include: no database table, simpler to use, and
        used across services.
        <br />
        Some <b>cons</b> of JWT include: somewhat weaker security with just one
        secret key used, cannot be revoked by the backend, payload data are
        transparent thus making it tricky to handle on the client side.
        <br />
        <br />
        JWT is one of the most widely used user authentication protocol.
      </p>
    </div>
  );
}

export default JwtPage;
