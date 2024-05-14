"use client";

import HashSection from "@/components/HashSection";
import PageTitle from "@/components/PageTitle";

function Sha1HashPage() {
  return (
    <div className="container mb-10 mx-auto max-w-screen-xl">
      <PageTitle pageTitle="SHA1 Hash" />
      <HashSection defaultAlgorithm="sha1" />
      <p className="mt-10 text-lg" role="page-text-content">
        <b>What is an SHA1 hash?</b>
        <br />
        SHA-1 stands for Secure Hash Algorithm 1. It&#39;s a cryptographic hash
        function that takes an input of any size and generates a unique,
        fixed-length (160-bit) alphanumeric string called a message digest. This
        digest acts like a fingerprint for the data.
        <br />
        <br />
        <b>How does it work?</b>
        <br />
        Imagine a complex mathematical machine. You feed it any kind of data
        (text, file, etc.). The SHA-1 algorithm crunches that data and spits out
        a unique hash based on its properties. The same data will always produce
        the same hash, but even slight changes to the data will result in a
        completely different hash.
        <br />
        <br />
        <b>What are SHA1 hashes used for?</b>
        <br />
        SHA-1 was widely used for various purposes, including:
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• <b>Verifying File Integrity:</b> Before
        downloading a file, you can obtain its SHA-1 hash from a trusted source.
        Once downloaded, you can calculate the SHA-1 hash of the downloaded file
        and compare it to the original hash. If they match, the file is intact.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• <b>Digital Signatures:</b> SHA-1 was used in
        digital signatures to ensure the authenticity and integrity of a
        message. A digital signature is like a tamper-evident seal created using
        a combination of the message and a private key.
        <br />
        <br />
        <b>Security Concerns</b>
        <br />
        While SHA-1 was once a secure hashing algorithm, it&#39;s no longer
        considered cryptographically strong. Theoretical weaknesses have been
        identified that could allow attackers to forge digital signatures. Due
        to this, major tech companies and organizations have phased out SHA-1 in
        favor of more secure hashing algorithms like SHA-256 and SHA-3.
        <br />
        <br />
        <b>Is SHA-1 Still Used?</b>
        <br />
        Some older software or systems might still rely on SHA-1. However,
        it&#39;s generally recommended to use stronger hashing algorithms
        whenever possible for new applications due to the security risks
        associated with SHA-1.
      </p>
    </div>
  );
}

export default Sha1HashPage;
