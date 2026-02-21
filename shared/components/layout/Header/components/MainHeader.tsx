import logo from '@/public/images/header-logo.svg';
import { Logo } from './Logo';
import { Search } from './Search';
import { Toolbar } from './Toolbar';
import { MobileMenuDrawer } from './MobileMenuDrawer';
import { getCategories } from '@/shared/services/categories.server';

export const MainHeader = async () => {
  const categoriesData = await getCategories();

  return (
    <div className="container">
      {/* Desktop Layout -> hidden on mobile */}
      <div className="hidden items-center justify-between gap-[61px] py-[20px] lg:flex">
        <Logo src={logo} alt="Logo" width={149} height={48} />
        <Search />
        <Toolbar />
      </div>

      {/* Mobile Layout -> hidden on desktop */}
      {/* 
        In RTL, row-reverse flex means elements start from the left side.
        We want the Menu Drawer, Search Icon, and Cart Icon on the left edge.
        And Logo on the right edge. Standard `justify-between` and `flex-row` 
        puts the first element (Logo) on the Right, and the last (Icons) on the Left. 
      */}
      <div className="flex items-center justify-between py-[12px] lg:hidden">
        <div className="order-2 flex items-center gap-2">
          {/* Mobile Search Overlay Trigger is now handled inside Search.tsx */}
          <Search />
          <Toolbar />
          <MobileMenuDrawer categoriesData={categoriesData} />
        </div>
        <div className="order-1">
          <Logo src={logo} alt="Logo" width={120} height={38} />
        </div>
      </div>
    </div>
  );
};
