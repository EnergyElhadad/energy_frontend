import { StarIcon } from "@/shared/components/icons/Star";

const Rating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-sm ${
            i < rating ? "text-[#FFC62A]" : "text-[#D6D6D6]"
          }`}
        >
          <StarIcon />
        </span>
      ))}
    </div>
  );
};

export default Rating;
