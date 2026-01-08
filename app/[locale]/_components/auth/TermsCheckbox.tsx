"use client";

import { useState } from "react";
import { CheckMark } from "../icons/CheckMark";

export default function TermsCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <label className="flex items-center justify-center my-6 gap-2 cursor-pointer select-none w-fit mx-auto @max-sm:my-4 ">
   
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="sr-only"
      />

      <span
        className={`
          h-4 w-4
          flex items-center justify-center
          rounded-sm border border-Stroke
          transition-colors
          ${checked ? "bg-primary" : "bg-gray-200"}
        `}
      >
        {checked && (
       <CheckMark/>
        )}
      </span>

      <span className="text-sm text-signalGray @max-xs:text-xs">
        الموافقة على{" "}
        <a href="/terms" className="text-primary underline">
          الشروط والأحكام
        </a>
      </span>
    </label>
  );
}
