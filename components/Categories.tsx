"use client";
import React, { useState } from "react";
import Category from "./Category";
import getCategoryData from "@/libs/getCategoryData";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

const Categories = () => {
  const allCategories = getCategoryData();
  const [selectedCategory, setSelectedCategory] = useState<string | null>("");
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const handleCategorySelected = (title: string) => {
    if (selectedCategory === title) {
      setSelectedCategory(null);

      if (params) {
        const search = params?.get("search") || "";
        const guests = params?.get("guests") || "";
        const startDate = params?.get("startDate") || "";
        const endDate = params?.get("endDate") || "";
        router.push(
          `${pathname}?search=${search}&guests=${guests}&startDate=${startDate}&endDate=${endDate}`
        );
      } else {
        router.push(`${pathname}?category=${title}`);
      }
    } else {
      setSelectedCategory(title);

      if (params) {
        const search = params?.get("search") || "";
        const guests = params?.get("guests") || "";
        const startDate = params?.get("startDate") || "";
        const endDate = params?.get("endDate") || "";
        router.push(
          `${pathname}?search=${search}&guests=${guests}&category=${title}&startDate=${startDate}&endDate=${endDate}`
        );
      } else {
        router.push(`${pathname}?category=${title}`);
      }
    }
  };

  return (
    <section className="categories fixed top-[4.2rem] md:top-[4.9rem] z-30 bg-white shadow-sm flex items-center space-x-12 justify-between max-w-7xl mx-auto p-4 overflow-scroll">
      {allCategories.map((category) => (
        <Category
          key={category.title}
          title={category.title}
          icon={category.icon}
          selected={selectedCategory === category.title}
          onSelect={handleCategorySelected}
        />
      ))}
    </section>
  );
};

export default Categories;
