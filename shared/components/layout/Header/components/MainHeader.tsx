import Image from 'next/image'
import logo from '@/public/images/header-logo.svg'
import { Search } from './Search'
import { Toolsbar } from './Toolsbar'

export const MainHeader = () => {
  return (
    <div className="container">
      <div className="flex items-center justify-between gap-[61px] py-[20px]">
        <Image src={logo} alt="Logo" width={149} height={48} />
        <Search />
        <Toolsbar />
      </div>
    </div>
  )
}

