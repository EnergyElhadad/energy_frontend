import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/input";

export const NewsletterForm = () => {
  return (
    <div className="mt-4">
      <h4 className="text-WetGray mb-2 text-[16px]">
        اشترك في النشرة الإخبارية
      </h4>

      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="بريدك الإلكتروني"
          className="bg-Stroke h-auto rounded-[8px] border-none px-3 py-1.5 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button type="submit" className="w-fit text-white">
          اشترك
        </Button>
      </div>
    </div>
  );
};
