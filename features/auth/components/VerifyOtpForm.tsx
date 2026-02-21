'use client';
import { InputOTP, InputOTPSlot } from '@/shared/components/ui/input-otp';
import { Button } from '@/shared/components/ui/Button';
import { useTranslations } from 'next-intl';
import { useVerifyOtp, VerifyOtpConfig } from '../hooks/useVerifyOtp';
import { useResendOtp } from '../hooks/useResendOtp';
import { Display } from '@/shared/components/layout/Display';
import { Spinner } from '@/shared/components/ui/spinner';
import { SubmitButton } from './SubmitButton';

type VerifyOtpFormProps = VerifyOtpConfig;

export function VerifyOtpForm({ verifyFn, onSuccess, fallbackRoute }: VerifyOtpFormProps) {
  const t = useTranslations('Auth');
  const { otp, handleOtpChange, handleSubmit, isSubmitting } = useVerifyOtp({ verifyFn, onSuccess, fallbackRoute });
  const { handleResendOtp, isResending } = useResendOtp();

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit}>
        <InputOTP maxLength={6} value={otp} disabled={isSubmitting} onComplete={handleSubmit} onChange={handleOtpChange}>
          <div className="mb-6 flex w-full justify-center gap-4">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </div>
        </InputOTP>

        <Button className="h-11.25 w-full">
          <Display when={isSubmitting}>
            <Spinner />
          </Display>
          {t('verify_button')}
        </Button>
      </form>

      <SubmitButton text={t('resend_button')} variant="otp" onClick={handleResendOtp} isLoading={isResending} type="button" />
    </>
  );
}
