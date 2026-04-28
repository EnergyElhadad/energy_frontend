'use client';

import type { CartItem, Product } from '@/shared/types/cart';

const STORAGE_KEY = 'guest_cart';

export const readGuestCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
};

const writeGuestCart = (items: CartItem[]): void => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  // Notify listeners in the same tab (storage event only fires across tabs).
  window.dispatchEvent(new Event('guest-cart-changed'));
};

export const addToGuestCart = (product: Product, quantity: number = 1): CartItem[] => {
  const items = readGuestCart();
  const existing = items.find(item => String(item.id) === String(product.id));

  const price = typeof product.price === 'number' ? product.price : 0;

  if (existing) {
    existing.quantity += quantity;
    existing.itemTotal = (existing.price ?? price) * existing.quantity;
  } else {
    items.push({
      id: product.id,
      title: product.title,
      category: product.category ?? '',
      image: product.image ?? '',
      price,
      quantity,
      itemTotal: price * quantity,
    });
  }

  writeGuestCart(items);
  return items;
};

export const removeFromGuestCart = (id: string | number): CartItem[] => {
  const items = readGuestCart().filter(item => String(item.id) !== String(id));
  writeGuestCart(items);
  return items;
};

export const updateGuestCartQuantity = (id: string | number, quantity: number): CartItem[] => {
  if (quantity <= 0) return removeFromGuestCart(id);
  const items = readGuestCart().map(item => {
    if (String(item.id) !== String(id)) return item;
    const price = item.price ?? 0;
    return { ...item, quantity, itemTotal: price * quantity };
  });
  writeGuestCart(items);
  return items;
};

export const clearGuestCart = (): void => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event('guest-cart-changed'));
};

export const getGuestCartTotal = (items: CartItem[]): number =>
  items.reduce((sum, item) => sum + (item.itemTotal ?? (item.price ?? 0) * item.quantity), 0);

export const getGuestCartCount = (items: CartItem[]): number =>
  items.reduce((sum, item) => sum + item.quantity, 0);
