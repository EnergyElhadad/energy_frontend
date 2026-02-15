"use client";

import { useTranslations } from "next-intl";
import { Dropdown } from "@/shared/components/ui/Dropdown";

import { Link } from "@/core/i18n";
import { CategoriesIcon } from "@/shared/components/icons/Categories";
import Image from "next/image";
import { Category } from "@/shared/types/category";
import { useInfiniteCategories } from "@/shared/hooks/useInfiniteCategories";
import { Button } from "@/shared/components/ui/Button";
import { Spinner } from "@/shared/components/ui/spinner";

interface CategoriesResponse {
  result: Category[];
  status: boolean;
  message: string;
  next: string | null;
  prev: string | null;
  current_page: number;
  num_pages: number;
  count: number;
}

export const CategoriesDropdown = ({
  initialData,
}: {
  initialData: CategoriesResponse | null;
}) => {
  const t = useTranslations("Header");
  const { categories, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteCategories(initialData);

  const allCategories = [
    {
      href: "/products",
      icon: "/images/categories/01.webp",
      label: "كل المنتجات",
    },
    ...categories.map((category) => ({
      href: `/products?categoryId=${category.id}&categoryName=${category.name}`,
      icon: category.image || "/images/categories/01.webp",
      label: category.name,
    })),
  ];

  return (
    <Dropdown
      trigger={
        <button className="flex items-center gap-[10px] transition-colors duration-300 ease-in-out">
          <CategoriesIcon className="text-primary" />
          <span className="text-primary text-[14px]">جميع الأقسام</span>
        </button>
      }
      triggerMode="hover"
      menuAlign="start"
      menuClassName="!max-w-[220px] !p-0 overflow-hidden !top-full"
    >
      <div className="max-h-[300px] overflow-y-auto">
        {allCategories.map((category) => (
          <Link
            key={category.href}
            href={category.href}
            className="not-first: border-Stroke hover:text-primary flex items-center gap-[10px] border-t px-[16px] py-[12px] transition-colors hover:bg-gray-50"
          >
            <Image
              src={category.icon}
              alt={category.label}
              width={40}
              height={40}
            />
            <span className="text-[14px] font-semibold">{category.label}</span>
          </Link>
        ))}
        {hasNextPage && (
          <div className="p-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? <Spinner /> : "عرض المزيد"}
            </Button>
          </div>
        )}
      </div>
    </Dropdown>
  );
};
