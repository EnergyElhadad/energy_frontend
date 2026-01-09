import { ReactNode } from "react";

// ============================================
// Product & Item Types
// ============================================

export interface Product {
  id: string | number;
  title: string;
  category: string;
  image: string;
  price?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface WishlistItem extends Product {
  quantity: number;
  addedAt?: Date;
}

// ============================================
// Component Props
// ============================================

export interface HeaderProps {
  className?: string;
}

export interface ToolsbarProps {
  className?: string;
}

export interface SearchProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export interface LogoProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export interface HeaderActionButtonProps {
  icon: ReactNode;
  badgeCount?: number;
  badgeColor?: string;
  active?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
  className?: string;
}

export interface HeaderDropdownButtonProps {
  icon: ReactNode;
  badgeCount?: number;
  dropdownTitle: string;
  trigger?: "click" | "hover";
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}

export interface CartItemProps {
  product: Product;
  quantity: number;
  onQuantityChange: (val: number) => void;
  onRemove?: () => void;
}

export interface CounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

// ============================================
// Hook Return Types
// ============================================

export interface UseCartReturn {
  items: CartItem[];
  count: number;
  addItem: (product: Product) => void;
  removeItem: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  clearCart: () => void;
}

export interface UseWishlistReturn {
  items: WishlistItem[];
  count: number;
  addItem: (product: Product) => void;
  removeItem: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  isInWishlist: (id: string | number) => boolean;
  clearWishlist: () => void;
}

export interface UseHeaderDropdownReturn {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleOpen: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
  isTouchDevice: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleClick: () => void;
}
