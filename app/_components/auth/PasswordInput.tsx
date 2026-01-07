
"use client";

import { useState } from "react";
import { EyeIcon } from "../icons/EyeIcon";
import { EyeOffIcon } from "../icons/EyeOffIcon";

export default function PasswordInput() {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        className="w-full min-h-11.25 rounded-sm bg-Background border border-Stroke px-3 py-2  focus:outline-none focus:ring-2 focus:ring-primary  @max-sm:min-h-8"
      />

      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute inset-y-0 end-3 flex items-center text-gray-500"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOffIcon />  :<EyeIcon /> }
      </button>
    </div>
  );
}
