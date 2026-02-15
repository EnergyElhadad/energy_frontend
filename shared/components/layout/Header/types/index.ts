import { ReactNode } from 'react';
import { CartItem, Product, UseCartReturn } from '@/shared/types/cart';

export { type CartItem, type Product };

// ============================================
// Product & Item Types
// ============================================

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
  'aria-label'?: string;
  className?: string;
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

export { type UseCartReturn };

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
