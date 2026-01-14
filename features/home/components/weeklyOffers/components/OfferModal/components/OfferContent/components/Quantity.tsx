import { useCart } from "@/shared/components/layout/Header/hooks";
import Counter from "@/shared/components/ui/Counter";

export const Quantity = () => {
  const { items, updateQuantity } = useCart();
  const mockId = 2;
  const item = items.find((item) => item.id === mockId);

  if (!item) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <p className="text-base font-bold text-black">حدد الكمية </p>
      <Counter
        value={item.quantity}
        onChange={(val) => updateQuantity(item.id, val)}
        variant="large"
      />
      <p className="ms-auto text-2xl font-bold text-black">250.00ج</p>
    </div>
  );
};
