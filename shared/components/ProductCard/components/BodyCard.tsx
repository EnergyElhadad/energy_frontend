import { Actions } from './Actions';
import { Price } from './Price';
import { Display } from '../../layout/Display';

type Props = {
  category?: string;
  title: string;
  id: string | number;
  originalPrice: number;
  oldPrice?: number;
  is_in_wishlist?: boolean;
};

export const BodyCard: React.FC<Props> = ({ category, title, id, originalPrice, oldPrice, is_in_wishlist }) => {
  return (
    <div className="mt-auto p-2">
      <p className="line-clamp-2 text-center text-sm font-semibold text-black">{title}</p>

      <Display when={category !== undefined}>
        <h3 className="text-signalGray my-3 text-center text-[14px]">{category}</h3>
      </Display>

      <Price oldPrice={oldPrice} price={originalPrice} />

      <Actions id={id} title={title} is_in_wishlist={is_in_wishlist} />
    </div>
  );
};
