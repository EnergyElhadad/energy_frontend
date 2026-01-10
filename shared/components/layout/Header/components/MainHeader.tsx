import logo from '@/public/images/header-logo.svg';
import { Logo } from './Logo';
import { Search } from './Search';
import { Toolbar } from './Toolbar';

export const MainHeader = () => {
  return (
    <div className="container">
      <div className="flex items-center justify-between gap-[61px] py-[20px]">
        <Logo src={logo} alt="Logo" width={149} height={48} />
        <Search />
        <Toolbar />
      </div>
    </div>
  );
};
