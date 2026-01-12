// app/components/ProductsSection.tsx
import { HeaderSection } from "@/shared/components/ui/HeaderSection";
import OfferCard from "@/shared/components/OfferCard";
import { OffersSwipper } from "./components/OffersSwipper";

const products = [
  {
    id: 1,
    title:
      "Mini Charger PRO | Dual Port (Type-C & Type-A) + 2 Outlets | Fast Charging",
    image: "/images/weekOffers/show-1.webp",
    price: 500,
    oldPrice: 650,
    badge: "خصم 25%",
    productLink: "#",
  },
  {
    id: 2,
    title:
      "Joyroom JR-PBF19 22.5W Digital Display Fast Charging Power Bank with DualDisplay Fast Charging Power Bank with Duald",
    image: "/images/weekOffers/show-2.webp",
    price: 500,
    oldPrice: 650,
    productLink: "#",
  },
  {
    id: 3,
    title:
      "Anker Zolo USB C to USB C Cable, Braided and Dirt-Free Type-C Fast Charging Cable",
    image: "/images/weekOffers/show-3.webp",
    price: 500,
    oldPrice: 650,
    productLink: "#",
  },
  {
    id: 4,
    title:
      "Mini Charger PRO | Dual Port (Type-C & Type-A) + 2 Outlets | Fast Charging",
    image: "/images/weekOffers/show-1.webp",
    price: 500,
    oldPrice: 650,
    badge: "خصم 25%",
    productLink: "#",
  },
];

export const WeeklyOffers = () => {
  return (
    <section className="bg-Background py-16">
      <div className="container">
        <HeaderSection title="عروض الاسبوع" textlink="عرض الكل" urlLink="#" />
        <div className="hidden gap-x-2 gap-y-4 lg:grid lg:grid-cols-4">
          {products.map((product) => (
            <OfferCard key={product.id} {...product} productLink="#" />
          ))}
        </div>
        <OffersSwipper products={products} />
      </div>
    </section>
  );
};
