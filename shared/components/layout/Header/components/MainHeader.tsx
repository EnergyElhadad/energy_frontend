import logo from '@/public/images/header-logo.svg';
import { Logo } from './Logo';
import { Search } from './Search';
import { Toolbar } from './Toolbar';
import { MobileMenuDrawer } from './MobileMenuDrawer';
import { getCategories } from '@/shared/services/categories.server';
import { getSocialMedia } from '@/shared/services/content';

export const MainHeader = async () => {
  const [categoriesData, socialMediaResponse] = await Promise.all([getCategories(), getSocialMedia()]);
  const socialMedia = socialMediaResponse?.result?.[0] || null;

  return (
    <div className="container">
      <div className="hidden items-center justify-between gap-[61px] py-[20px] lg:flex">
        <Logo src={socialMedia?.logo} alt="Header Logo" width={149} height={48} />
        <Search />
        <Toolbar />
      </div>

      <div className="flex items-center justify-between py-[12px] lg:hidden">
        <div className="order-2 flex items-center gap-2">
          <Search />
          <Toolbar />
          <MobileMenuDrawer categoriesData={categoriesData} />
        </div>
        <div className="order-1">
          <Logo src={socialMedia?.logo || logo} alt={socialMedia?.slogan || 'Logo'} width={120} height={38} />
        </div>
      </div>
    </div>
  );
};
