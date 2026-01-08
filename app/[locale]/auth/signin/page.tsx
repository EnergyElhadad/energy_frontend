import { AuthLayout } from "@/app/[locale]/_components/auth/AuthLayout";
import { HeaderForm } from "@/app/[locale]/_components/auth/HeaderForm";
import LoginForm from "@/app/[locale]/_components/auth/SigninForm";

export const metadata = {
  title: "تسجيل الدخول",
  description:
    "قم بتسجيل الدخول إلى حسابك في إينيرجي الحداد للوصول إلى خدماتنا ومنتجاتنا.",
};

export default function SigninPage() {
  return (
    <AuthLayout>
      <HeaderForm  title=" مرحبا بك في إينيرجي الحداد" subtitle="استخدم بريدك الإلكتروني أو رقم الهاتف لتسجيل الدخول"/>
      <LoginForm />
    </AuthLayout>
  );
}
