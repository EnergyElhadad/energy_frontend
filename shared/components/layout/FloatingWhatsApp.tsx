'use client';

import Image from 'next/image';
import Link from 'next/link';

interface FloatingWhatsAppProps {
  phoneNumber: string;
}

export const FloatingWhatsApp = ({ phoneNumber }: FloatingWhatsAppProps) => {
  if (!phoneNumber) return null;

  // Clean the phone number from non-numeric characters for the link
  const cleanedNumber = phoneNumber.replace(/\D/g, '');

  return (
    <Link
      href={`https://wa.me/${cleanedNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-6 bottom-6 z-50 flex items-center justify-center drop-shadow-lg transition-transform hover:scale-110 ltr:right-6 rtl:right-auto rtl:left-6"
      aria-label="Chat on WhatsApp"
    >
      <Image src="/images/whatsapp.webp" alt="Whatsapp" width={100} height={100} />
    </Link>
  );
};
