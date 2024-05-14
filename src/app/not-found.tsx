"use client";

import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/components/fundamental/Buttons";
import PageTitle from "@/components/PageTitle";

function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto pt-20 mb-10 max-w-screen-xl">
      <PageTitle pageTitle={"Not Found"} />
      <p className="text-center mt-10 text-2xl text-gray-400">
        The page you requested was not found...
      </p>
      <div className="flex justify-center my-20">
        <PrimaryButton onClick={() => router.push("/")}>
          Go to Home Page
        </PrimaryButton>
      </div>
    </div>
  );
}

export default NotFoundPage;
