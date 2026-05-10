"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
 const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (data.success) {
      router.push("/profile");
    } else {
      alert(data.message);
    }
}
  return (
    <div className="flex items-center justify-center bg-background px-4">

        <div className="diary-card w-full max-w-md p-8 border border-gray-200 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold text-primary mb-6">
            Login
          </h2>

          <form className="space-y-5"  onSubmit={handleLogin}>
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
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
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

            <div className="text-right">
              <Link
                href="/?status=3"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="diary-button w-full py-3"
            >
              Sign In
            </button>
          </form>

        

          {/* Signup */}
          <p className="text-center text-sm text-muted mt-6">
            Don’t have an account?{" "}
            <Link
              href="/?status=2"
              className="text-primary font-medium hover:underline"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
  
  );
}