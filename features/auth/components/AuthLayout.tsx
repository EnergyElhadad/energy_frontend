import { AuthImage } from './AuthImage';
import { FormLayout } from './FormLayout';

export function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto w-full max-w-147">
      <AuthImage />
      <FormLayout>{children}</FormLayout>
    </div>
  );
}
