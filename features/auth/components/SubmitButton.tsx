import { Spinner } from '@/shared/components/ui/spinner';

type SubmitButtonProps = {
  text: string;
  variant?: 'default' | 'otp' | 'submit' | 'outline';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

export function SubmitButton({ text, variant = 'default', disabled, isLoading = false, onClick, type = 'submit' }: SubmitButtonProps) {
  const base =
    'font-bold py-2.5 rounded-sm transition cursor-pointer @max-sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2';

  const variants = {
    default: 'w-full bg-primary text-white hover:bg-primary text-[1rem]',
    otp: 'w-fit bg-transparent text-primary hover:bg-transparent hover:underline flex mx-auto font-normal text-[0.875rem] p-[5px]',
    submit: 'w-full bg-primary/90 text-white hover:bg-primary text-[1rem] h-[58px]',
    outline: 'w-full bg-transparent text-primary border border-primary  hover:bg-primary hover:text-white text-sm font-semibold h-[42px]',
  };

  return (
    <button type={type} className={`${base} ${variants[variant]}`} disabled={disabled || isLoading} onClick={onClick}>
      {isLoading && <Spinner className={variant === 'default' ? 'text-white' : 'text-primary'} />}
      {text}
    </button>
  );
}
