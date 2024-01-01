"use client";
import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import useSearchModal from "@/hooks/useSearchModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchModal = () => {
  const { isOpen, onClose } = useSearchModal();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [search, setSearch] = useState("");
  const [guests, setGuests] = useState("1");
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();

  const handleSearch = () => {
    if (params.get("category")) {
      const category = params.get("category");
      router.push(
        `${pathname}?search=${search}&guests=${guests}&category=${category}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      );
    } else {
      router.push(
        `${pathname}?search=${search}&guests=${guests}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      );
    }
    onClose();
    setSearch("");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const selectionRange = {
    startDate,
    endDate,
    key: "selection",
  };

  const handleSelect = (ranges: RangeKeyDict) => {
    setStartDate(ranges.selection.startDate!);
    setEndDate(ranges.selection.endDate!);
    console.log(ranges);
  };

  if (!mounted) {
    return null;
  }

  if (isOpen) {
    return (
      <div className="fixed inset-0 h-full w-full flex items-center justify-center z-50  bg-white/70">
        <div className=" max-w-full bg-white shadow-lg rounded-xl m-2 overflow-scroll sm:p-4">
          <div className="flex items-center justify-between px-4 py-2">
            <p className="text-xl text-rose-500 font-medium capitalize">
              find place
            </p>
            <div onClick={onClose}>
              <RxCross1 className="hover:opacity-40" />
            </div>
          </div>
          <div className="flex items-center gap-2 p-2">
            <input
              className="w-full p-2  outline-none focus:ring-2 border-2 rounded-full"
              type="text"
              name="search"
              id="search"
              placeholder="Search Where To Go"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="px-6 py-2 bg-rose-500 hover:opacity-40 transition text-white rounded-full"
              type="submit"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          <div className="overflow-scroll m-2">
            <DateRangePicker
              className="w-full text-center text-xs"
              ranges={[selectionRange]}
              onChange={handleSelect}
            />
          </div>
          <div className="flex items-center justify-between p-2">
            <p className="md:text-lg font-medium">Number Of Guests</p>
            <input
              className="bg-gray-200 p-2 w-20 outline-none rounded-md"
              type="number"
              name="number"
              id="number"
              min={1}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default SearchModal;
