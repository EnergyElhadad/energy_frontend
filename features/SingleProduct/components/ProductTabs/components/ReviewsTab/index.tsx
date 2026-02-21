import { ReviewList } from './ReviewList';
import { ReviewSummary } from './ReviewSummary';

type Props = {
  productId: number;
};

export const ReviewsTab = ({ productId }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <ReviewList productId={productId} />
      </div>

      <div className="lg:col-span-4">
        <ReviewSummary productId={productId} />
      </div>
    </div>
  );
};
