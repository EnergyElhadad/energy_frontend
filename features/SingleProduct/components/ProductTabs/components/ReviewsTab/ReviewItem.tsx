import Image from "next/image";
import { StarIcon } from "@/shared/components/icons/Star";

type Props = {
  name: string;
  date: string;
  rating: number;
  comment: string;
};

export const ReviewItem: React.FC<Props> = ({
  name,
  date,
  rating,
  comment,
}) => {
  return (
    <div className="flex flex-col gap-2 border-b border-gray-100 py-6 last:border-0">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <Image src="/images/user.webp" width={50} height={50} alt={name} />
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-black">{name}</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
                <StarIcon
                  key={star}
                  className={`h-4 w-4 ${
                    star <= rating ? "text-yellow-400" : "text-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <span className="text-Si text-signalGray">{date}</span>
      </div>
      <p className="text-sm leading-relaxed text-gray-600">{comment}</p>
    </div>
  );
};
