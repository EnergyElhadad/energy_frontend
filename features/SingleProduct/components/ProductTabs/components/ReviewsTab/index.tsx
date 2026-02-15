import { ReviewList } from "./ReviewList";
import { ReviewSummary } from "./ReviewSummary";

export const ReviewsTab = () => {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <ReviewList />
      </div>

      <div className="lg:col-span-4">
        <ReviewSummary />
      </div>
    </div>
  );
};
