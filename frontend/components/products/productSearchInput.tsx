"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import {
  selectProductSearch,
  setProductSearch,
} from "@/redux/slice/productTableFilterslice";
import debounce from "debounce";

export default function ProductSearchInput() {
  const dispatch = useAppDispatch();
  const savedSearch = useAppSelector(selectProductSearch);

  const [value, setValue] = useState(savedSearch);

  const debouncedDispatch = debounce((val: string) => {
    dispatch(setProductSearch(val));
  }, 700);

  useEffect(() => {
    debouncedDispatch(value);

    return () => {
      debouncedDispatch.clear();
    };
  }, [value, debouncedDispatch]);

  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Filter Product IDs, Names, SKUs..."
      className="max-w-sm"
    />
  );
}
