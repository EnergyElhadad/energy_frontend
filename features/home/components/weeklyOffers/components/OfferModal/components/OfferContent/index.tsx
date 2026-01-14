import { SubmitButton } from "@/features/auth/components/SubmitButton";
import { CartIcon } from "@/shared/components/icons/Cart";
import { DialogFooter, DialogTitle } from "@/shared/components/ui/dialog";
import Link from "next/link";

import { AvailableQuantities } from "./components/AvailableQuantities";
import { Descriptions } from "./components/Descriptions";
import { Quantity } from "./components/Quantity";
import { Reviews } from "./components/Reviews";

export const OfferContent = () => {
  return (
    <>
      <DialogTitle className="mb-4 text-start font-bold text-[#333333]">
        Female Plug – 16A – 250V – With Locking Feature
      </DialogTitle>
      {/* Avilabel quanties */}
      <AvailableQuantities />
      <Reviews />
      <Descriptions />
      <Quantity />

      <DialogFooter className="mt-6 h-14">
        {/* <DialogClose asChild></DialogClose> */}
        <SubmitButton
          variant="submit"
          text="أضف المنتج"
          icon={<CartIcon />}
          iconPosition="left"
        />
        <Link
          href="#"
          className="border-primary hover:bg-primary/80 text-primary flex h-full w-full items-center justify-center rounded-sm border bg-transparent px-6 py-2 text-sm text-[16px] font-semibold hover:text-white"
        >
          تفاصيل المنتج
        </Link>
      </DialogFooter>
    </>
  );
};
