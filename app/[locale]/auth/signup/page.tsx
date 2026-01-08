import { AuthLayout } from "@/app/[locale]/_components/auth/AuthLayout";
import { HeaderForm } from "@/app/[locale]/_components/auth/HeaderForm";
import SignupForm from "@/app/[locale]/_components/auth/SignupForm";

export const metadata = {
  title: "إنشاء حساب جديد",
  description:
    "قم بإنشاء حساب جديد على منصة إينيرجي الحداد للوصول إلى حلول الطاقة المتكاملة والخدمات المتميزة.",
};

export default function SigninPage() {
  return (
    <AuthLayout>
      <HeaderForm  title=" مرحبا بك في إينيرجي الحداد" subtitle='إنشاء حساب جديد'/>
      <SignupForm />
    </AuthLayout>
  );
}
