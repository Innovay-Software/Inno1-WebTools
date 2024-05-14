"use client";

import HashSection from "@/components/HashSection";
import PageTitle from "@/components/PageTitle";

function Sha256HashPage() {
  return (
    <div className="container mb-10 mx-auto max-w-screen-xl">
      <PageTitle pageTitle="SHA256 Hash" />
      <HashSection defaultAlgorithm="sha256" />
      <p className="mt-10 text-lg" role="page-text-content">
        <b>What is an SHA256 hash?</b>
        <br />
        SHA-256 (Secure Hash Algorithm 256) is a cryptographic hash function
        from the SHA-2 family. It takes any kind of data as input (text, file,
        etc.) and generates a unique, fixed-length (256-bit) alphanumeric string
        called a hash. This hash acts like a fingerprint for the data.
        <br />
        <br />
        <b>How does it work?</b>
        <br />
        SHA-256 puts the input data through a series of mathematical operations,
        essentially creating a complex summary of the data&#39;s
        characteristics. Even minor changes to the original data will result in
        a completely different hash. This one-way property makes SHA-256
        valuable for various security applications.
        <br />
        <br />
        <b>What are SHA256 hashes used for?</b>
        <br />
        SHA-256 has numerous applications due to its ability to verify data
        integrity and ensure authenticity:
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• <b>Verifying File Downloads:</b> When
        downloading a file, you can obtain its SHA-256 hash from a trusted
        source. After downloading, you can calculate the SHA-256 hash of the
        downloaded file and compare it to the original hash. If they match, the
        file is intact and hasn&#39;t been corrupted during transfer.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• <b>Digital Signatures:</b> SHA-256 is used in
        digital signatures to verify the authenticity and integrity of a
        message. A digital signature is like a tamper-evident seal created using
        a combination of the message and a private key. By including the SHA-256
        hash in the signature, the recipient can ensure the message hasn&#39;t
        been altered and originates from the claimed signer.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• <b>Password Hashing:</b> SHA-256 (or stronger
        SHA-3 variants) can be used to securely store passwords. The password
        itself is not stored, but rather its hash. When a user attempts to log
        in, the entered password is hashed and compared to the stored hash. This
        approach protects passwords from being directly exposed in case of a
        security breach.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• <b>Blockchain Technology:</b> Cryptocurrencies
        like Bitcoin heavily rely on SHA-256 for transaction verification and
        proof-of-work mechanisms.
        <br />
        <br />
        <b>Security and SHA-256</b>
        <br />
        SHA-256 is considered a secure hashing algorithm for most current
        applications. However, as computing power continues to advance, even
        stronger hashing algorithms like SHA-3 are being developed to stay ahead
        of potential security threats.
      </p>
    </div>
  );
}

export default Sha256HashPage;
