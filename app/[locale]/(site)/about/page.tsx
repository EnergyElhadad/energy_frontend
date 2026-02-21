import { AboutSection } from '@/features/about/AboutSection';
import { WhySection } from '@/features/about/WhySection';
import aboutImage from '@/public/images/about.webp';
import { HeaderPage } from '@/shared/components/ui/HeaderPage';

export const dynamic = 'force-dynamic';

const imagePath: string = aboutImage.src;

export default function AboutPage() {
  return (
    <main className="bg-Background pb-10">
      <div className="container">
        <HeaderPage pageTitle="تعريف الشركه" />

        <AboutSection
          aboutImage={imagePath}
          title="عن الشركة"
          text="شركة رائدة في تصنيع وتوريد الأدوات والمستلزمات Energy Elhadad الكهربائية عالية الجودة، نقدم منتجات آمنة وموثوقة تلبي احتياجات المنازل والمشروعات الصناعية والتجارية. تأسست شركة Energy Elhadad بهدف تقديم منتجات كهربائية تجمع بين الجودة العالية، الأمان، والسعر المناسب. نمتلك خبرة واسعة في مجال تصنيع الأدوات الكهربائية، ونسعى دائمًا لتطوير حلول عملية تساعد عملاءنا على إنجاز أعمالهم بكفاءة وثقة. نخدم آلاف العملاء من الأفراد والشركات والمقاولين من خلال منتجات مصممة وفق أعلى المعايير الفنية والهندسية."
        />
        <WhySection />
      </div>
    </main>
  );
}
