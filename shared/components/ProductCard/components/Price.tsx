import { Display } from '../../layout/Display';

export const Price = ({ oldPrice, price }: { oldPrice?: number; price: number }) => {
  return (
    <div className="mb-3 flex items-center justify-center gap-2">
      <Display when={oldPrice !== undefined}>
        <span className="text-signalGray relative text-[16px]">
          {oldPrice} EGP
          <span className="bg-signalGray absolute inset-x-0 top-1/2 h-px"></span>
        </span>
        <span className="text-Stroke block h-2.5 border text-sm font-semibold"></span>
      </Display>

      <span className="text-primary text-[16px] font-bold">{price} EGP</span>
    </div>
  );
};
