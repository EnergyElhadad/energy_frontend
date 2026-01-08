import { Form } from "react-hook-form";
import { AuthImage } from "./AuthImage";
import { FormLayout } from "./FormLayout";

export function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" w-full mx-auto  max-w-147">
      <AuthImage />
      <FormLayout>{children}</FormLayout>
    </div>
  );
}
