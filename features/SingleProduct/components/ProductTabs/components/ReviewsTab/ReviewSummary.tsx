"use client";

import { StarIcon } from "@/shared/components/icons/Star";
import { Button } from "@/shared/components/ui/Button";
import { Textarea } from "@/shared/components/ui/textarea";
import { useTranslations } from "next-intl";
import { useState } from "react";

export const ReviewSummary = () => {
  const t = useTranslations("SingleProduct");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="border-Stroke flex flex-col gap-6 rounded-lg border bg-white p-6">
      <div className="flex flex-col items-center gap-2 rounded-lg bg-blue-50/50 p-6">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-gray-900">4.5</span>
          <span className="text-sm text-gray-500">{t("out_of")} 5</span>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
            <StarIcon
              key={star}
              className={`h-5 w-5 ${
                star <= 4.5 ? "text-yellow-400" : "text-gray-200"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500">60 {t("evaluators")}</span>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h4 className="mb-4 text-sm font-semibold text-gray-900">
          {t("add_your_review")}
        </h4>

        <div className="mb-4 flex gap-2">
          {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
            <button
              key={star}
              type="button"
              className="focus:outline-none"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            >
              <StarIcon
                className={`h-6 w-6 transition-colors ${
                  star <= (hoverRating || rating)
                    ? "text-yellow-400"
                    : "text-gray-200"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-gray-900">
            {t("add_your_comment")}
          </label>
          <Textarea
            placeholder={t("comment_placeholder")}
            className="min-h-[120px] resize-none"
          />
          <Button className="bg-primary hover:bg-primary/90 h-14.5 w-full rounded-sm">
            {t("post_comment")}
          </Button>
        </div>
      </div>
    </div>
  );
};
