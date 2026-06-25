'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/input';
import { InputOTP, InputOTPSlot } from '@/shared/components/ui/input-otp';
import { useChangePhone } from '@/features/profile/hooks/useChangePhone';
import { useLocale, useTranslations } from 'next-intl';

const makePhoneSchema = (t: ReturnType<typeof useTranslations<'Profile'>>) =>
  z.object({
    new_phone_number: z.string().min(10, t('phone_invalid')).regex(/^\d+$/, t('phone_digits_only')),
  });

type ChangePhoneFormValues = z.infer<ReturnType<typeof makePhoneSchema>>;

interface ChangePhoneModalProps {
  trigger: React.ReactNode;
}

export const ChangePhoneModal = ({ trigger }: ChangePhoneModalProps) => {
  const t = useTranslations('Profile');
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'input' | 'verify'>('input');
  const [newPhone, setNewPhone] = useState('');
  const [otp, setOtp] = useState('');
  const locale = useLocale();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  const { requestChangePhone, isRequesting, confirmChangePhone, isConfirming } = useChangePhone();

  const phoneSchema = useMemo(() => makePhoneSchema(t), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePhoneFormValues>({
    resolver: zodResolver(phoneSchema),
  });

  const onSubmitPhone = async (data: ChangePhoneFormValues) => {
    try {
      const response = await requestChangePhone({ new_phone_number: data.new_phone_number });
      if (response.status) {
        setNewPhone(data.new_phone_number);
        setStep('verify');
      }
    } catch {
      // Error handled in hook
    }
  };

  const handleVerify = async () => {
    if (otp.length !== 6) return;
    try {
      await confirmChangePhone({ new_phone_number: newPhone, otp });
      // On success, standard logout flow happens via hook
    } catch {
      // Error handled in hook
    }
  };

  const handleResend = async () => {
    try {
      await requestChangePhone({ new_phone_number: newPhone });
    } catch {
      // Error handled in hook
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Reset state when closing
      setTimeout(() => {
        setStep('input');
        setNewPhone('');
        setOtp('');
        reset();
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="flex max-w-[480px] flex-col rounded-3xl border-0 bg-white p-0 shadow-2xl">
        <DialogTitle className="sr-only">{t('change_phone')}</DialogTitle>

        <div className="relative p-10">
          {step === 'input' ? (
            <>
              <h2 className="mb-6 text-center text-xl font-bold text-black">{t('add_new_phone')}</h2>
              <form onSubmit={handleSubmit(onSubmitPhone)} className="space-y-6">
                <div>
                  <label className="mb-2 block text-right text-sm font-semibold" htmlFor="new_phone_number">
                    {t('phone_field')}
                  </label>
                  <Input
                    id="new_phone_number"
                    {...register('new_phone_number')}
                    className={`bg-Background text-right ${errors.new_phone_number ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder={t('phone_field')}
                    dir={dir}
                  />
                  {errors.new_phone_number && <p className="mt-1 text-right text-xs text-red-500">{errors.new_phone_number.message}</p>}
                </div>

                <Button type="submit" disabled={isRequesting} className="h-11.25 w-full bg-green-600 hover:bg-green-700">
                  <span className="relative z-10">{isRequesting ? t('sending') : t('save')}</span>
                </Button>
              </form>
            </>
          ) : (
            <>
              <h2 className="mb-2 text-center text-xl font-bold text-black">{t('verify_identity')}</h2>
              <p className="mb-6 text-center text-gray-600">{t('otp_sent_hint')}</p>

              <div className="flex flex-col items-center space-y-6">
                <InputOTP autoFocus maxLength={6} value={otp} onChange={setOtp} disabled={isConfirming}>
                  <div className="flex w-full justify-center gap-2" dir="ltr">
                    <InputOTPSlot index={0} className="h-12 w-12 rounded-md border" />
                    <InputOTPSlot index={1} className="h-12 w-12 rounded-md border" />
                    <InputOTPSlot index={2} className="h-12 w-12 rounded-md border" />
                    <InputOTPSlot index={3} className="h-12 w-12 rounded-md border" />
                    <InputOTPSlot index={4} className="h-12 w-12 rounded-md border" />
                    <InputOTPSlot index={5} className="h-12 w-12 rounded-md border" />
                  </div>
                </InputOTP>

                {/* Counter or Timer placeholder if needed, skipping for now based on strict requirements */}

                <Button onClick={handleVerify} disabled={isConfirming || otp.length !== 6} className="h-11.25 w-full bg-green-600 hover:bg-green-700">
                  <span className="relative z-10">{isConfirming ? t('verifying') : t('verify')}</span>
                </Button>

                <div className="flex w-full justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setStep('input')}
                    className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-500 hover:bg-gray-50"
                  >
                    {t('change_number')}
                  </button>
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={isRequesting}
                    className="rounded-full border border-green-600 bg-white px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                  >
                    {t('resend')}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
