"use client";
import PasswordInput from "./PasswordInput";
import FooterForm from "./FooterForm";
import TermsCheckbox from "./TermsCheckbox";
import { SubmitButton } from "./SubmitButton";


export default function SignupForm() {
  return (
    <form onSubmit={(e)=>e.preventDefault()} className="w-full max-w-md mx-auto">
      <div className="mb-2">
        <label className="block text-sm mb-2 font-semibold @max-sm:text-xs">
         الاسم
        </label>
        <input
          type="text"
          className="w-full min-h-11.25 rounded-sm border bg-Background border-Stroke px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary  @max-sm:min-h-8"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm mb-2 font-semibold @max-sm:text-xs">
         رقم الموبايل
        </label>
        <input
          type="number"
          className="w-full min-h-11.25 rounded-sm border bg-Background border-Stroke px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary  @max-sm:min-h-8"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm mb-2 font-semibold @max-sm:text-xs">
          البريد الإلكتروني 
        </label>
        <input
          type="text"
          className="w-full min-h-11.25 rounded-sm border bg-Background border-Stroke px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary  @max-sm:min-h-8"
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm mb-2 font-semibold  @max-sm:text-xs">كلمة المرور</label>
        <PasswordInput />
      </div>

 
      <TermsCheckbox />

  <SubmitButton text="إنشاء حساب جديد" />

 <FooterForm title="هل لديك حساب؟" linkurl="/auth/signin" linktext="تسجيل الدخول"/>
    </form>
  );
}
