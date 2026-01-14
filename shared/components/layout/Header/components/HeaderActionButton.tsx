"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";

interface HeaderActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  badgeCount?: number;
  badgeColor?: string;
  active?: boolean;
}

export const HeaderActionButton = ({
  icon,
  badgeCount,
  badgeColor = "bg-Alert",
  active = false,
  className = "",
  ...props
}: HeaderActionButtonProps) => {
  return (
    <button
      className={`border-Stroke hover:bg-primary-20 relative flex h-[40px] w-[40px] items-center justify-center rounded-full border transition-colors ${active ? "bg-[#F5F5F5]" : ""} ${className}`}
      {...props}
    >
      {icon}

      {badgeCount !== undefined && badgeCount > 0 && (
        <span
          className={`absolute top-[-2px] right-[-2px] h-[16px] w-[16px] ${badgeColor} flex items-center justify-center rounded-full text-[12px] text-white shadow-sm`}
        >
          {badgeCount}
        </span>
      )}
    </button>
  );
};
