import { useTranslations } from "next-intl";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { HeaderForm } from "@/features/auth/components/HeaderForm";
import { SubmitButton } from "@/features/auth/components/SubmitButton";
import { VerifyOtpForm } from "@/features/auth/components/VerifyOtpForm";


export default function VerifyOtpPage() {
  const t = useTranslations('Auth');
  return (
    <AuthLayout>
      <HeaderForm
        title={t('verify_title')}
        subtitle={t('verify_subtitle')}
      />
      <VerifyOtpForm />
      <SubmitButton text={t('resend_button')} variant="otp" />
    </AuthLayout>
  );
}
