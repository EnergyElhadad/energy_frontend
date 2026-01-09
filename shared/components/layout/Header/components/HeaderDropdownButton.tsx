'use client';

import { ReactNode, useState, useRef, useEffect } from "react";
import { HeaderActionButton } from "./HeaderActionButton";

interface HeaderDropdownButtonProps {
  icon: ReactNode;
  badgeCount?: number;
  dropdownTitle: string;
  trigger?: "click" | "hover";
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
}

export const HeaderDropdownButton = ({
  icon,
  badgeCount,
  dropdownTitle,
  trigger = "hover",
  children,
  className,
  'aria-label': ariaLabel,
}: HeaderDropdownButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTouchDevice] = useState(() =>
    typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleMouseEnter = () => {
    // Only use hover on non-touch devices
    if (trigger === "hover" && !isTouchDevice) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    // Only use hover on non-touch devices
    if (trigger === "hover" && !isTouchDevice) {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 300);
    }
  };

  const handleClick = () => {
    // Use click on touch devices or when trigger is click
    if (trigger === "click" || isTouchDevice) {
      setIsOpen(!isOpen);
    }
  };



  return (
    <div
      className={`relative ${className || ''}`}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <HeaderActionButton
        icon={icon}
        badgeCount={badgeCount}
        onClick={handleClick}
        active={isOpen}
        aria-label={ariaLabel}
      />

      {isOpen && (
        <div
          className="absolute top-[55px] w-[calc(100vw-32px)] max-w-[370px] bg-white rounded-[12px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] z-50 p-4 sm:p-5 cursor-default end-0 lg:start-1/2 lg:-translate-x-1/2 lg:rtl:translate-x-1/2 sm:w-[370px]"
        >
          {/* Arrow */}
          <div className="arrow-up w-[20px] absolute top-[-12px] border-[6px] border-transparent border-b-white z-10 end-4 lg:start-1/2 lg:-translate-x-1/2 lg:rtl:translate-x-1/2"></div>

          <div className="">
            <h3 className="text-[14px] font-semibold mb-[7px]">{dropdownTitle}</h3>
            <div className="flex flex-col gap-[8px] max-h-[300px] overflow-y-auto custom-scrollbar">
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
