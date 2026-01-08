"use client";
import PasswordInput from "./PasswordInput";
import FooterForm from "./FooterForm";
import { SubmitButton } from "./SubmitButton";


export default function SigninForm() {
  return (
    <form onSubmit={(e)=>e.preventDefault()} className="w-full max-w-md mx-auto">
      <div className="mb-2">
        <label className="block text-sm mb-2 font-semibold @max-sm:text-xs @max-sm:">
          البريد الإلكتروني / رقم الموبايل
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

      <div className="mb-6 @max-sm:mb-4">
        <a href="#" className="text-sm text-signalGray hover:underline @max-sm:text-xs ">
          نسيت كلمة المرور؟
        </a>
      </div>

     <SubmitButton text="تسجيل الدخول" />

     <FooterForm title="ليس لديك حساب؟" linkurl="/auth/signup" linktext="إنشاء حساب جديد"/>
    </form>
  );
}
