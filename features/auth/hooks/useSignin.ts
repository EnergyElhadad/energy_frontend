import * as z from "zod";
import { useState } from "react";
import { useRouter } from "@/core/i18n";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";

export function useSignin() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const [globalError, setGlobalError] = useState("");

  const signInSchema = z.object({
    phone_number: z
      .string()
      .regex(/^01[0125][0-9]{8}$/, t("invalid_phone_number")),
    password: z.string().min(1, t("password_required")),
  });

  type SignInValues = z.infer<typeof signInSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInValues) => {
    setGlobalError("");
    try {
      const result = await signIn("credentials", {
        redirect: false,
        phone_number: data.phone_number,
        password: data.password,
      });

      if (result?.error) {
        setGlobalError(t("invalid_credentials") || "Invalid credentials");
      } else {
        router.refresh();
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      setGlobalError(t("generic_error") || "Something went wrong");
    }
  };

  return {
    t,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    globalError,
  };
}
