"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function ForgotPassword() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">

        <div className="diary-card w-full max-w-md p-8 border border-gray-200 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold text-primary mb-6">
            Forgot Password
          </h2>

          <form className="space-y-5">
            <div>
              <label className="text-sm text-muted">Email</label>

              <div className="relative mt-2">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="diary-input pl-11"
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="diary-button w-full py-3"
            >
              Send Reset Link
            </button>
          </form>

         
        </div>
      </div>
  
  );
}