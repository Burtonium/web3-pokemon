"use client";

import React, { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useInput from "~~/hooks/useInput";

const SearchBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { value, onChange } = useInput({ initialValue: searchParams.get("q") || "" });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const appendSearch = useCallback(() => {
    router.push(`${pathname}?${createQueryString("q", value)}`);
  }, [createQueryString, pathname, router, value]);

  return (
    <div className="flex items-center gap-5 max-w-3xl">
      <h3 className="text-light text-2xl font-semibold mb-0">Search</h3>
      <input
        value={value}
        onChange={onChange}
        onKeyDown={event => {
          if (event.key === "Enter") {
            appendSearch();
          }
        }}
        type="text"
        placeholder="Input"
        className="input grow"
      />
      <button onClick={appendSearch} type="button" className="btn btn-primary">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
