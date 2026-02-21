'use client';

import { useState } from 'react';
import { ProductFilters } from './ProductFilters';
import { ProductsView } from './ProductsView';
import { FiltersProvider } from '../context/FiltersContext';
import { ProductsResponse } from '../types/productsResponse';
import { CategoriesResponse } from '@/shared/services/categories';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from '@/shared/components/ui/drawer';
import { X } from 'lucide-react';

interface ProductsContentProps {
  initialData: ProductsResponse | null;
  initialCategories: CategoriesResponse;
  categeoryDescription: string | null;
}

export const ProductsContent = ({ initialData, initialCategories, categeoryDescription }: ProductsContentProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <FiltersProvider>
      <div className="grid grid-cols-1 gap-6 min-[769px]:grid-cols-4">
        {/* Desktop Sidebar — hidden on mobile/tablet */}
        <div className="hidden min-[769px]:col-span-1 min-[769px]:block">
          <ProductFilters initialCategories={initialCategories} />
        </div>

        {/* Products Logic & View */}
        <ProductsView initialData={initialData} categeoryDescription={categeoryDescription} onOpenFilters={() => setDrawerOpen(true)} />
      </div>

      {/* Mobile/Tablet Side Drawer */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="right">
        <DrawerContent className="h-full w-4/5 max-w-sm">
          <DrawerHeader className="flex flex-row items-center justify-between border-b pb-3">
            <DrawerTitle className="text-lg">الفلاتر</DrawerTitle>
            <DrawerClose asChild>
              <button className="rounded-full p-1 hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </DrawerClose>
          </DrawerHeader>
          <div className="overflow-y-auto p-4">
            <ProductFilters initialCategories={initialCategories} />
          </div>
        </DrawerContent>
      </Drawer>
    </FiltersProvider>
  );
};
