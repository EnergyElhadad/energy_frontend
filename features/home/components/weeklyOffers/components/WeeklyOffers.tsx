// app/components/ProductsSection.tsx
import HeaderSection from "@/shared/components/HeaderSection";
import { EyeIcon } from "@/shared/components/icons/Eye";
import { HeartIcon } from "@/shared/components/icons/Heart";
import { ShareIcon } from "@/shared/components/icons/Share";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 1,
    title:
      "Mini Charger PRO | Dual Port (Type-C & Type-A) + 2 Outlets | Fast Charging",
    image: "/images/weekOffers/show-1.webp",
    price: 500,
    oldPrice: 650,
    badge: "خصم 25%",
  },
  {
    id: 2,
    title:
      "Joyroom JR-PBF19 22.5W Digital Display Fast Charging Power Bank with DualDisplay Fast Charging Power Bank with Duald",
    image: "/images/weekOffers/show-2.webp",
    price: 500,
    oldPrice: 650,
  },
  {
    id: 3,
    title:
      "Anker Zolo USB C to USB C Cable, Braided and Dirt-Free Type-C Fast Charging Cable",
    image: "/images/weekOffers/show-3.webp",
    price: 500,
    oldPrice: 650,
  },
  {
    id: 4,
    title:
      "Mini Charger PRO | Dual Port (Type-C & Type-A) + 2 Outlets | Fast Charging",
    image: "/images/weekOffers/show-1.webp",
    price: 500,
    oldPrice: 650,
    badge: "خصم 25%",
  },
];

export default function WeeklyOffers() {
  return (
    <section className="container mx-auto py-16">
      <HeaderSection title="عروض الاسبوع" textlink="عرض الكل" urlLink="#" />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 @max-sm:grid-cols-1">
        {products.map((product) => (
          <div
            key={product.id}
            className="group border-Stroke hover:border-primary relative overflow-hidden rounded-sm border bg-white p-2 pb-3 shadow-sm transition hover:shadow-md"
          >
            {/* shard Icon absolute */}
            <div className="absolute end-3 top-3 z-3 flex -translate-y-100 items-center justify-center gap-3 transition-all duration-300 ease-in-out group-hover:translate-y-0">
              <Link
                href={"#"}
                aria-label="View product details"
                className="bg-primary/80 flex h-10.5 w-10.5 items-center justify-center rounded-full text-white"
              >
                <EyeIcon />
              </Link>
              <Link
                href={"#"}
                aria-label="Share product"
                className="bg-primary/80 flex h-10.5 w-10.5 items-center justify-center rounded-full text-white"
              >
                <ShareIcon />
              </Link>
            </div>

            <div className="min-h-63.75 w-full">
              {/* Badge */}
              {product.badge && (
                <span className="bg-Alert absolute start-3 top-3 z-3 rounded px-2 py-1 text-xs font-medium text-white">
                  {product.badge}
                </span>
              )}

              {/* Image */}
              <div className="relative mb-4 min-h-63.75 w-full">
                <Image src={product.image} alt={product.title} width={268} height={255} />
              </div>
            </div>

            {/* Body Card */}

            <div className="p-2">
              {/* Title */}
              <p className="line-clamp-2 text-center text-sm font-semibold text-black">
                {product.title}
              </p>

              <h3 className="text-signalGray fon text-center font-normal">
                Accessories
              </h3>

              {/* Price */}
              <div className="mb-3 flex items-center justify-center gap-2">
                <span className="text-primary text-[16px] font-bold">
                  {product.price} EGP
                </span>
                <span className="text-Stroke block h-2.5 border text-sm font-semibold"></span>
                <span className="text-Stroke relative text-[16px]">
                  {product.oldPrice} EGP
                  <span className="bg-Stroke absolute inset-x-0 top-1/2 h-px"></span>
                </span>
              </div>

              {/* Actions */}
              <div className="flex h-10.5 items-center justify-between gap-2">
                <Link
                  href={`/products/${product.id}`}
                  className="hover:bg-primary/90 border-primary text-primary flex min-h-full w-full items-center justify-center rounded border bg-transparent p-2 px-3 py-1.5 text-sm font-semibold transition hover:text-white"
                >
                  أضف للسلة
                </Link>

                <button
                  aria-label="Add to wishlist"
                  className="text-Stroke hover:Alert border-SmokyWhite hover:border-primary cursor-pointer rounded border bg-transparent p-2.75 transition"
                >
                  {<HeartIcon />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
