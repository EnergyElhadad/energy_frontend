import Image from 'next/image';
import Rating from './Rating';

type ReviwT = {
  id: number;
  name: string;
  date: string;
  rating: number;
  avatar: string;
  text: string;
};
type Props = {
  review: ReviwT;
};

export const ReviewCard: React.FC<Props> = ({ review }) => {
  return (
    <div className="border-Stroke mx-auto flex max-w-[384px] gap-4 rounded-lg border bg-white p-6">
      {/* Header */}
      <Image src={review.avatar} alt={review.name} width={50} height={50} className="h-12.5 w-12.5 shrink-0 overflow-hidden rounded-full object-cover" />
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <p className="mb-1 text-sm font-medium text-black">{review.name}</p>
              <Rating rating={review.rating} />
            </div>
          </div>
          {/* date */}
          <p className="text-text-gray400 text-sm font-normal">{review.date}</p>
        </div>
        {/* Text */}
        <p className="text-WetGray text-sm leading-relaxed font-normal">{review.text}</p>
      </div>
    </div>
  );
};
