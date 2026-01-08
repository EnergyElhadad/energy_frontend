import { AuthLayout } from "@/app/_components/auth/AuthLayout";
import { HeaderForm } from "@/app/_components/auth/HeaderForm";
import { SubmitButton } from "@/app/_components/auth/SubmitButton";
import VerifyOtpForm from "@/app/_components/auth/VerifyOtpForm";


export default function VerifyOtpPage() {
  return (
    <AuthLayout>
      <HeaderForm
        title="تأكيد رقم الجوال"
        subtitle="سيتم إرسال كود إلي رقم الجوال"
      />
      <VerifyOtpForm />
      <SubmitButton text="إعادة ارسال" variant="otp" />
    </AuthLayout>
  );
}
