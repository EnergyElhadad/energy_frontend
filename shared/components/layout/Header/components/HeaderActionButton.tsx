'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';

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
      className={`flex items-center justify-center w-[40px] h-[40px] rounded-full border border-Stroke relative hover:bg-[#F5F5F5] transition-colors ${active ? "bg-[#F5F5F5]" : ""} ${className}`}
      {...props}
    >
      {icon}

      {badgeCount !== undefined && badgeCount > 0 && (
        <span className={`absolute top-[-6px] right-[-6px] w-[16px] h-[16px] ${badgeColor} text-white text-[12px] rounded-full flex items-center justify-center shadow-sm`}>
          {badgeCount}
        </span>
      )}
    </button>
  );
};
