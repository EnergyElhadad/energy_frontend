import { ReactNode } from "react";

type SubmitButtonProps = {
  text: string;
  variant?: "default" | "otp" | "submit";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
};

export function SubmitButton({
  text,
  variant = "default",
  icon,
  iconPosition = "left",
}: SubmitButtonProps) {
  const base =
    "font-bold py-2.5 rounded-sm transition cursor-pointer @max-sm:text-sm";

  const variants = {
    default: "w-full bg-primary text-white hover:bg-primary text-[1rem]",
    otp: "w-fit bg-transparent text-primary hover:bg-transparent hover:underline flex mx-auto font-normal text-[0.875rem] p-[5px]",
    submit:
      "w-full bg-primary/90 text-white hover:bg-primary text-[1rem] h-[58px]",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${icon ? "flex items-center justify-center gap-2" : ""}`}
    >
      {icon && iconPosition === "left" && (
        <span className="inline-flex">{icon}</span>
      )}
      <span>{text}</span>
      {icon && iconPosition === "right" && (
        <span className="inline-flex">{icon}</span>
      )}
    </button>
  );
}
