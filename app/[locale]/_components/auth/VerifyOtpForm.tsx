"use client";
import { useRef, useState } from "react";

export default function VerifyOtpForm() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };
  return (
    <div className="flex justify-center gap-3 mb-6">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-11.25 h-11.25 text-center text-lg border border-signalGray rounded-sm focus:outline-none focus:border-none focus:ring-2 focus:ring-primary bg-Background"
        />
      ))}
    </div>
  );
}
