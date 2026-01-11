import Image from "next/image";
import Link from "next/link";

export default function HeroContent() {
  return (
    <div className="relative h-full w-full">
      <Image
        src={"/images/hero.webp"}
        alt="Hero Banner"
        fill
        priority
        loading="eager"
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-l from-black/90 to-black/20" />

      <div className="relative z-10 container flex h-full items-center justify-start px-24 max-lg:px-10 max-sm:px-6">
        <div className="max-w-full text-right text-white">
          <h1 className="mb-4 text-[2.5rem] font-bold max-xl:text-2xl max-sm:text-[1rem]">
            وفر حتى 50% على جميع المنتجات
          </h1>

          <p className="mb-6 text-[1.25rem] font-semibold text-white max-xl:text-base max-sm:text-[0.75rem]">
            احصل على أفضل الأسعار على المنتجات الكهربائية عالية الجودة
          </p>

          <Link
            href="#"
            className="bg-primary hover:bg-primary/80 rounded-lg px-6 py-2 text-[16px] text-white transition-colors max-xl:px-4 max-xl:text-xs"
          >
            تسوق الآن
          </Link>
        </div>
      </div>
    </div>
  );
}
