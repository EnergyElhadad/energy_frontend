import { AboutDropdown } from './AboutDropdown'
import { CategoriesDropdown } from './CategoriesDropdown'
import { Link } from '@/core/i18n'

export const Nav = () => {
  return (
    <nav className='border-t border-Stroke py-[15px]'>
      <div className="container">
        <ul className='flex items-center gap-[24px] list-none'>
          <li className='border-e border-Stroke pe-[24px]'>
            <CategoriesDropdown />
          </li>
          <li>
            <Link href='/' className='text-[14px] text-WetGray font-semibold hover:text-primary transition-colors'>
              الرئيسية
            </Link>
          </li>
          <li>
            <AboutDropdown />
          </li>
          <li>
            <Link href='/contact' className='text-[14px] text-WetGray font-semibold hover:text-primary transition-colors'>
              تواصل معنا
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
