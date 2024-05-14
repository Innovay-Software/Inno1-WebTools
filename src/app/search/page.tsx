"use client";

import { useEffect, useState } from "react";
import MiniSearch from "minisearch";
import searchConfig from "@/utils/MinisearchIndex";
import { DefaultInput } from "@/components/fundamental/InputField";
import Link from "next/link";

const miniSearch = new MiniSearch({
  fields: ["title", "text"],
  storeFields: ["route", "title", "text"],
});

function SearchPage() {
  const documents = searchConfig.pageIndices;
  const [searchContent, setSearchContent] = useState("");
  const [searchResult, setSearchResult] = useState<any[]>([]);

  useEffect(() => {
    miniSearch.addAll(documents);
  }, []);

  const onSearchContentUpdate = (val: string) => {
    setSearchContent(val);
    setSearchResult(miniSearch.search(val));
  };

  return (
    <div className="container mx-auto mb-10 max-w-screen-xl">
      <div className="h-16" />
      <DefaultInput
        title="Search for tools"
        value={searchContent}
        onChange={onSearchContentUpdate}
      />
      <div className="font-bold">
        Found {searchResult.length} Tool{searchResult.length <= 1 ? "" : "s"}:
      </div>
      <div>
        {searchResult.map((item) => (
          <div key={item.id} className="pl-5 my-5">
            <Link href={item.route}>• {item.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
