"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">

        <div className="diary-card w-full max-w-md p-8 border border-gray-200 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold text-primary mb-6">
            Create Account
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

            {/* Password */}
            <div>
              <label className="text-sm text-muted">Password</label>

              <div className="relative mt-2">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="diary-input pl-11 pr-11"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>
{/* Confirm Password */}
          <div>
              <label className="text-sm text-muted">Confirm Password</label>

              <div className="relative mt-2">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="diary-input pl-11 pr-11"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
                
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="diary-button w-full py-3"
            >
              Create Account
            </button>
          </form>

        

          {/* Signup */}
          <p className="text-center text-sm text-muted mt-6">
            Already have an account?{" "}
            <Link
              href="/?status=1"
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
  
  );
}