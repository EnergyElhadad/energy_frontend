import Image from 'next/image';
import logoImage from '@/public/images/logo.png';

export function AuthImage() {
  return (
    <div className="mx-auto mb-10 w-fit">
      <Image src={logoImage} alt="Auth Image" width={149} height={48} />
    </div>
  );
}
