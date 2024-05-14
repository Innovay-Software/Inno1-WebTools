"use client";

import HashSection from "@/components/HashSection";
import PageTitle from "@/components/PageTitle";

function Md5HashPage() {
  return (
    <div className="container mb-10 mx-auto max-w-screen-xl">
      <PageTitle pageTitle="MD5 Hash" />
      <HashSection defaultAlgorithm="md5" />
      <p className="mt-10 text-lg" role="page-text-content">
        <b>What is an MD5 hash?</b>
        <br />
        An MD5 (message-digest algorithm 5) hash is a unique fingerprint created
        from a piece of data. It&#39;s like a digital summary of the data,
        represented in a 128-bit alphanumeric string.
        <br />
        <br />
        <b>How does it work?</b>
        <br />
        The MD5 algorithm takes any kind of data as input, runs it through a
        complex mathematical formula, and outputs a fixed-length hash. The same
        data will always produce the same hash, but different data will produce
        entirely different hashes. That&#39;s why it&#39;s useful for
        verification.
        <br />
        <br />
        <b>What are MD5 hashes used for?</b>
        <br />
        There are a couple of main applications:
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• <b>Data Integrity Check:</b> An MD5 hash can
        be used to verify that a file hasn&#39;t been corrupted during transfer
        or download. You can generate a hash of the original file, then compare
        it to the hash of the downloaded file. If they match, the file is
        intact.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;• <b>Password Storage (with caution):</b> In the
        past, MD5 hashes were used to store passwords in databases. However,
        this is not considered secure anymore due to advancements in computing
        power that make it possible to crack passwords from their hashes.
        <br />
        <br />
        <b>Are MD5 hashes still secure?</b>
        <br />
        MD5 has been around for a while, and weaknesses have been discovered.
        It&#39;s not recommended for storing passwords or any other sensitive
        data. There are stronger hashing algorithms available, such as SHA-256,
        that are more collision-resistant (meaning it&#39;s much harder to
        create two different inputs that produce the same hash).
      </p>
    </div>
  );
}

export default Md5HashPage;
