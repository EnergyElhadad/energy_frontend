"use client";

import * as React from "react";
import { toast } from "sonner";
import * as z from "zod";

import { FieldGroup } from "@/shared/components/ui/field";
import { useFormAddress } from "../hooks/useFormAddress";
import { InputForm } from "./components/InputForm";
import { SelectCity } from "./components/SelectCity";
import { SelectCountry } from "./components/SelectCountry";

export const AddAddress = () => {
  const { formSchema, form } = useFormAddress();

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  }

  return (
    <form id="form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <div className="flex gap-4">
          <InputForm name="firstName" form={form} label="الاسم الأول" />
          <InputForm name="secondName" form={form} label="الاسم الثاني" />
        </div>
        <InputForm name="companyName" form={form} label="اسم الشركة اختياري" />

        <SelectCountry name={"country"} form={form} />
        <SelectCity name={"city"} form={form} />

        <InputForm name="streetAddress" form={form} label="اسم الشارع" />

        <InputForm name="phone" form={form} label="رقم الموبايل" />

        <InputForm name="email" form={form} label="الايميل" />

        <InputForm
          name="description"
          form={form}
          label="ملاحظات الطلب"
          textarea
        />
      </FieldGroup>
    </form>
  );
};
