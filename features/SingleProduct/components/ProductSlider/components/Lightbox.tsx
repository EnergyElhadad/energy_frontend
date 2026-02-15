import React from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface LightboxProps {
  image: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Lightbox = ({ image, isOpen, onClose }: LightboxProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="animate-in fade-in fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 transition-all duration-200"
      onClick={onClose}
    >
      <button
        className="hover:text-primary absolute top-6 right-6 cursor-pointer text-white transition-colors"
        onClick={onClose}
      >
        <X size={32} />
      </button>

      <div
        className="relative h-[80vh] w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image}
          alt="Product Full View"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
};
