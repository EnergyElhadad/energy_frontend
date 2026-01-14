import Image from "next/image";

export function MainLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="animate-pulse">
        <Image
          src="/images/logo.png" // Assuming this path based on Logo.tsx usage (or I should check Logo.tsx default or usage)
          alt="Energy Engineers Logo"
          width={200}
          height={65}
          className="h-auto w-auto"
          priority
        />
      </div>
    </div>
  );
}
