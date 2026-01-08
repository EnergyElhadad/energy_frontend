type SubmitButtonProps = {
  text: string;
  variant?: 'default' | 'otp';
};

export function SubmitButton({
  text,
  variant = 'default',
}: SubmitButtonProps) {
  const base =
    'font-bold py-2.5 rounded-sm transition  cursor-pointer @max-sm:text-sm';

  const variants = {
    default: 'w-full bg-primary text-white hover:bg-primary text-[1rem]',
    otp: 'w-fit bg-transparent text-primary hover:bg-transparent  hover:underline flex mx-auto font-normal text-[0.875rem] p-[5px]',
  };

  return (
    <button className={`${base} ${variants[variant]}`}>
      {text}
    </button>
  );
}
