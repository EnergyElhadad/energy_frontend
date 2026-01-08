import { SearchIcon } from '@/shared/components/icons/Search'

export const Search = () => {
  return (
    <div className='flex items-center gap-[10px] border border-Stroke rounded-[8px] h-[40px] py-[11px] px-[18px] w-full max-w-[583px]'>
      <SearchIcon />
      <input type="text" placeholder="ابحث عن منتج" />
    </div>
  )
}