import Image from "next/image";
import Link from "next/link";

const MainBanner = () => {
  return (
    <section className="bg-Background py-12.5">
      <div className="container">
        <div className="overflow-hidden rounded-lg" aria-label="main banner ">
          <div className="relative z-2 flex min-h-81.25 w-full items-center">
            <picture>
              <source media="(min-width: 768px)" srcSet="/images/hero.webp" />
              <Image
                src={"/images/banner-mobile.webp"}
                fill
                alt="main banner"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </picture>

            <div className="absolute inset-0 bg-black/50" />

            <div className="relative start-[50%] top-1/2 z-10 translate-x-[50%] space-y-2 px-4 py-2 text-center">
              <h4 className="text-primary mb-6 text-sm font-normal md:text-[1rem]">
                عرض لفتره محدوده
              </h4>
              <p className="mb-4 text-2xl font-bold text-white md:text-[32px]">
                وفر حتى 50% على جميع المنتجات
              </p>
              <p className="mb-10 text-sm font-normal text-white md:text-base">
                احصل على أفضل الأسعار على المنتجات الكهربائية عالية الجودة
              </p>
              <Link
                href="#"
                className="bg-primary hover:bg-primary/80 rounded-lg px-6 py-2 text-[16px] text-white transition-colors max-xl:px-4 max-xl:text-xs"
              >
                اكتشف العروض
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
