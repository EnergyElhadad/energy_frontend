import Link from "next/link";
import { HeartIcon } from "../../icons/Heart";

export const Actions = ({ id }: { id: number }) => {
  return (
    <div className="flex h-10.5 items-center justify-between gap-2">
      <Link
        href={`/products/${id}`}
        className="hover:bg-primary/90 border-primary text-primary flex min-h-full w-full items-center justify-center rounded border bg-transparent p-2 px-3 py-1.5 text-sm font-semibold transition hover:text-white"
      >
        أضف للسلة
      </Link>

      <button
        aria-label="Add to wishlist"
        className="hover:Alert border-SmokyWhite hover:border-primary text-Stroke cursor-pointer rounded border bg-transparent p-2.75 transition"
      >
        {<HeartIcon />}
      </button>
    </div>
  );
};
