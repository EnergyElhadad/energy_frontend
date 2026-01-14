import { OfferModal } from "@/features/home/components/WeeklyOffers/components/OfferModal";
import { EyeIcon } from "../../icons/Eye";
import Link from "next/link";
import { ShareIcon } from "../../icons/Share";

export const HiddenIcons = ({ productLink }: { productLink: string }) => {
  return (
    <div className="absolute end-3 top-3 z-3 flex -translate-y-100 items-center justify-center gap-3 transition-all duration-300 ease-in-out group-hover:translate-y-0">
      <OfferModal
        trigger={
          <div
            role="button"
            aria-label="View product details"
            className="bg-primary/80 flex h-10.5 w-10.5 items-center justify-center rounded-full text-white"
          >
            <EyeIcon />
          </div>
        }
      />
      <Link
        href={productLink}
        aria-label="Share product"
        className="bg-primary/80 flex h-10.5 w-10.5 items-center justify-center rounded-full text-white"
      >
        <ShareIcon />
      </Link>
    </div>
  );
};
