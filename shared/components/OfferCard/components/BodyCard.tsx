import { Actions } from "./Actions";
import { Price } from "./Price";

export type ProductT = {
  id: number;
  title: string;
  price: number;
  oldPrice: number;
};

type Props = {
  product: ProductT;
};

export const BodyCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="p-2">
      <p className="line-clamp-2 text-center text-sm font-semibold text-black">
        {product.title}
      </p>

      <h3 className="text-signalGray my-3 text-center text-[14px]">
        Accessories
      </h3>

      <Price oldPrice={product.oldPrice} price={product.price} />

      <Actions id={product.id} />
    </div>
  );
};
