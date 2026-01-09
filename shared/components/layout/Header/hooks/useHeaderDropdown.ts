"use client";

import { useState, useRef, useEffect } from "react";
import type { UseHeaderDropdownReturn } from "../types";

interface UseHeaderDropdownOptions {
  trigger?: "click" | "hover";
}

export const useHeaderDropdown = ({
  trigger = "hover",
}: UseHeaderDropdownOptions = {}): UseHeaderDropdownReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTouchDevice] = useState(
    () =>
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0),
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
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

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    setIsOpen,
    toggleOpen,
    containerRef: containerRef as React.RefObject<HTMLDivElement>,
    isTouchDevice,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
  };
};
