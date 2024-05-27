"use client";

import { useEffect, useState } from "react";
import MiniSearch from "minisearch";
import miniSearchUtil from "@/utils/MinisearchUtil";
import { DefaultInput } from "@/components/fundamental/InputField";
import Link from "next/link";

function SearchPage() {
  const miniSearch = miniSearchUtil.getMiniSearch();
  const [searchContent, setSearchContent] = useState("");
  const [searchResult, setSearchResult] = useState<any[]>([]);

  useEffect(() => {}, []);

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
        autofocus
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
