"use client";

import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/components/fundamental/Buttons";
import PageTitle from "@/components/PageTitle";
import config from "@/config";

function AboutUsPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto mb-10 max-w-screen-xl">
      <PageTitle pageTitle={"About Us"} />
      <p role="page-text-content">
        {config.appName} is a web app developed and maintained by&nbsp;
        <a href={config.companyUrl} target="_blank">
          {config.company}
        </a>
        , a tech company whose mission is to use technologies to help
        professionals from different industries with their daily work. We help
        our clients design, develop, and maintain their software.
        <br />
        <br />
        {config.appName} contains many in-browser tools that help our users with
        different professions including developers, designers, and artists. All
        of the tools run in browsers only - we do not collect any personal info
        on our server. In fact, the web app can be installed on your PC as a PWA
        so it can be accessed without any internet connections. (please follow
        this link on Medium.com for instructions:&nbsp;
        <a
          href="https://medium.com/progressivewebapps/how-to-install-a-pwa-to-your-device-68a8d37fadc1"
          target="_blank"
        >
          How to install a PWA to your device?
        </a>
        )
        <br />
        <br />
        We are continuing on adding more tools to our site. If you have any
        suggestions or questions, please do not hesitate to contact us.
      </p>
      <div className="flex justify-center my-10">
        <PrimaryButton onClick={() => router.push("/")}>
          Go to HOME
        </PrimaryButton>
      </div>
    </div>
  );
}

export default AboutUsPage;
