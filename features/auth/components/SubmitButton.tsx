import { Spinner } from "@/shared/components/ui/spinner";

type SubmitButtonProps = {
  text: string;
  variant?: "default" | "otp";
  disabled?: boolean;
  isLoading?: boolean;
};

export function SubmitButton({
  text,
  variant = "default",
  disabled,
  isLoading = false,
}: SubmitButtonProps) {
  const base =
    "font-bold py-2.5 rounded-sm transition cursor-pointer @max-sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";

  const variants = {
    default: "w-full bg-primary text-white hover:bg-primary text-[1rem]",
    otp: "w-fit bg-transparent text-primary hover:bg-transparent  hover:underline flex mx-auto font-normal text-[0.875rem] p-[5px]",
  };

  return (
    <button
      className={`${base} ${variants[variant]}`}
      disabled={disabled || isLoading}
    >
      {isLoading && (
        <Spinner
          className={variant === "default" ? "text-white" : "text-primary"}
        />
      )}
      {text}
    </button>
  );
}
