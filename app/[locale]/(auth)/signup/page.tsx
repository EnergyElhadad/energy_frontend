import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { HeaderForm } from "@/features/auth/components/HeaderForm";
import { SignupForm } from "@/features/auth/components/SignupForm";
import { FooterForm } from "@/features/auth/components/FooterForm";

export const metadata: Metadata = {
  title: "إنشاء حساب جديد",
  description:
    "قم بإنشاء حساب جديد على منصة إينيرجي الحداد للوصول إلى حلول الطاقة المتكاملة والخدمات المتميزة.",
};

export default function SigninPage() {
  const t = useTranslations('Auth');
  return (
    <AuthLayout>
      <HeaderForm title={t('signup_title')} subtitle={t('signup_subtitle')} />
      <SignupForm />
      <FooterForm title={t('have_account')} linkurl="/signin" linktext={t('login_button')} />
    </AuthLayout>
  );
}
