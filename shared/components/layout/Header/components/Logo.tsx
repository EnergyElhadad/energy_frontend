import { Link } from '@/core/i18n';
import Image from 'next/image';

interface LogoProps {
  src: string | null;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Logo = ({ src, alt, width = 149, height = 48, className = '' }: LogoProps) => {
  return <Link href="/">{src && <Image src={src} alt={alt} width={width} height={height} className={className} />}</Link>;
};
