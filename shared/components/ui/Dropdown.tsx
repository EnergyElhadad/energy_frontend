"use client";

import {
  ReactElement,
  useState,
  useRef,
  useEffect,
  cloneElement,
  HTMLAttributes,
} from "react";

export interface DropdownProps {
  trigger: ReactElement<HTMLAttributes<HTMLElement> & { active?: boolean }>;
  triggerMode?: "click" | "hover";
  children: React.ReactNode;
  className?: string;
  menuClassName?: string;
  activeClassName?: string;
  showArrow?: boolean;
  menuAlign?: "start" | "center" | "end";
}

export const Dropdown = ({
  trigger,
  triggerMode = "hover",
  children,
  className,
  menuClassName,
  activeClassName = "active",
  showArrow = true,
  menuAlign,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTouchDevice] = useState(
    () =>
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0),
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen && menuRef.current && containerRef.current) {
      const menu = menuRef.current;
      const rect = menu.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const padding = 16;
      const containerRect = containerRef.current.getBoundingClientRect();

      const styleUpdates: Partial<CSSStyleDeclaration> = {};
      let hasUpdates = false;

      // Reset styling to ensure correct measurement next time or if resized
      // However, rect is already measured.
      // If we are overflowing right:
      if (rect.right > viewportWidth - padding) {
        const availableWidth = viewportWidth - 2 * padding;

        // If the menu is naturally wider than available width, constrain it
        if (rect.width > availableWidth) {
          styleUpdates.width = `${availableWidth}px`;
          styleUpdates.maxWidth = "none";
        }

        // Always shift to fit within right padding
        // New left position relative to container:
        // (viewportWidth - padding - (menuWidth or availableWidth)) - containerLeft
        const finalWidth =
          rect.width > availableWidth ? availableWidth : rect.width;
        const newRelativeLeft =
          viewportWidth - padding - finalWidth - containerRect.left;

        styleUpdates.left = `${newRelativeLeft}px`;
        styleUpdates.right = "auto";
        styleUpdates.transform = "none";
        hasUpdates = true;
      }

      // If overflowing left (e.g. unexpected negative left due to transform or whatever)
      else if (rect.left < padding) {
        const newRelativeLeft = padding - containerRect.left;
        styleUpdates.left = `${newRelativeLeft}px`;
        styleUpdates.right = "auto";
        styleUpdates.transform = "none";
        hasUpdates = true;
      }

      if (hasUpdates) {
        Object.assign(menu.style, styleUpdates);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is inside the dropdown container
      const isInsideContainer =
        containerRef.current &&
        containerRef.current.contains(event.target as Node);

      // Check if click is inside an AlertDialog (which is rendered in a Portal)
      const target = event.target as HTMLElement;
      const isInsideAlertDialog =
        target.closest('[data-slot="alert-dialog-content"]') ||
        target.closest('[data-slot="alert-dialog-overlay"]');

      if (!isInsideContainer && !isInsideAlertDialog) {
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
    if (triggerMode === "hover" && !isTouchDevice) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (triggerMode === "hover" && !isTouchDevice) {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 300);
    }
  };

  const handleClick = () => {
    if (triggerMode === "click" || isTouchDevice) {
      setIsOpen(!isOpen);
    }
  };

  const isNativeTag = typeof trigger.type === "string";

  const triggerWithProps = cloneElement(trigger, {
    onClick: handleClick,
    ...(isNativeTag
      ? { "data-active": isOpen ? "true" : undefined }
      : { active: isOpen }),
    className:
      `${trigger.props.className || ""} ${isOpen ? activeClassName : ""}`.trim(),
    "aria-expanded": isOpen,
    "aria-haspopup": true,
  });

  // Calculate alignment classes
  const getAlignmentClasses = () => {
    if (menuAlign === "start") return "start-0";
    if (menuAlign === "end") return "end-0";
    if (menuAlign === "center")
      return "start-1/2 -translate-x-1/2 rtl:translate-x-1/2";
    // Default responsive behavior
    return "end-0 lg:start-1/2 lg:-translate-x-1/2 lg:rtl:translate-x-1/2";
  };

  return (
    <div
      className={`relative ${className || ""}`}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {triggerWithProps}

      {isOpen && (
        <>
          {showArrow && (
            <div className="arrow-up absolute top-[43px] left-1/2 z-50 w-[20px] -translate-x-1/2 border-[6px] border-transparent border-b-white"></div>
          )}
          <div
            ref={menuRef}
            className={`absolute top-[55px] z-50 w-[calc(100vw-32px)] max-w-[370px] cursor-default rounded-[12px] bg-white p-4 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] sm:w-[370px] sm:p-5 ${getAlignmentClasses()} ${menuClassName || ""}`}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
};
