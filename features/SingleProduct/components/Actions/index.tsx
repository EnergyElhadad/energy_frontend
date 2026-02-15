import { CartIcon } from "@/shared/components/icons/Cart";
import { Button } from "@/shared/components/ui/Button";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

interface ActionsProps {
  onAddToCart?: () => void;
  onQuickBuy?: () => void;
  isAddToCartLoading?: boolean;
  isQuickBuyLoading?: boolean;
}

export const Actions = ({
  onAddToCart,
  onQuickBuy,
  isAddToCartLoading,
  isQuickBuyLoading,
}: ActionsProps) => {
  const t = useTranslations("SingleProduct");

  return (
    <div className="mt-4 grid grid-cols-2 gap-6">
      <Button
        className="h-14.5"
        onClick={onAddToCart}
        disabled={isAddToCartLoading}
      >
        {isAddToCartLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <CartIcon />
        )}
        {t("add_to_cart")}
      </Button>
      <Button
        className="h-14.5"
        variant="outline"
        onClick={onQuickBuy}
        disabled={isQuickBuyLoading}
      >
        {isQuickBuyLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <CartIcon />
        )}
        {t("quick_buy")}
      </Button>
    </div>
  );
};
