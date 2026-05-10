"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { UserModel } from "@/types/user";
import { BookOpen, Mail, Lock, Eye, EyeOff, User } from "lucide-react";


export default  function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [diaryName, setDiaryName] = useState("Kitty");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 
  const newUser: UserModel = {
    username,
    email,
    password_hash: password, // This will be hashed in the backend, so we can send the plain password here
    diary_name: diaryName,
    profile: {
      display_name: username, 
      avatar_url: "https://default-avatar.com/avatar.png", 
    },
    settings: {
      theme: "dark",
      daily_reminder_time: "08:30",
      is_private: true,
    },
    created_at: new Date(),
  };
  const registerUser = () => {
    
    return async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
        }else {
            fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
            })  .then((res) => res.json()) .then((data) => {
                if (data.error) {
                   alert(data.error);
                } else {
                   alert("Registration successful! Please log in.");
                }
            })
            .catch((err) => {
                // ToastProvider.showToast("Registration failed. Please try again.", "error");
                alert("Registration failed. Please try again.");
            });
            //   useToast().showToast("Registration successful!", "success");
        }
                


    };
  };
  const handleInvalidUsername = (e: React.InputEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).setCustomValidity(
      "Usernames can only contain letters, numbers, and underscores."
    );
  };
  const handleInputUsername = (e: React.InputEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).setCustomValidity("");
  };
  return (
    <div className="flex items-center justify-center bg-background px-4">

        <div className="diary-card w-full max-w-md p-8 border border-gray-200 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold text-primary mb-6">
            Create Account
          </h2>

          <form onSubmit={registerUser()} className="space-y-4">
              <div>
              <div className="flex gap-1 items-center">
                 <label htmlFor="username-input"  className="text-sm text-muted">Username</label> <User size={18} className="text-muted"/>
            </div>
              <div className="relative mt-2">
               
                <input type="text" id="username-input" pattern="[a-zA-Z0-9_]+" placeholder="jack_dorsey" onChange={(e)=>setUsername(e.target.value)} className="diary-input MemoInk" required onInvalid={handleInvalidUsername} title="username can only contain alphabets,numbers and underscores" onInput={handleInputUsername} />
              </div>
            </div>
            {/*email*/}
            <div>
              <div className="flex gap-1 items-center">
                 <label htmlFor="email-input"  className="text-sm text-muted">Email</label> <Mail size={18} className="text-muted"/>
            </div>
              <div className="relative mt-2">
                <input type="email" id="email-input" placeholder="you@example.com" className="diary-input" onChange={(e) => setEmail(e.target.value)}  required/>
              </div>
            </div>
        <div>
            <div className="flex gap-1 items-center">
                 <label htmlFor="diary-name-input"  className="text-sm text-muted">Diary Name</label> <BookOpen size={18} className="text-muted"/>
            </div>
           
            <div className="relative mt-2 ">
            <input type="text" id="diary-name-input" className="diary-input MemoInk" required value={diaryName} onChange={(e) => setDiaryName(e.target.value)}/>

            </div>
        </div>
            {/* Password */}
            <div>
                <div className="flex gap-1 items-center">
                    <label htmlFor="password-input"  className="text-sm text-muted">Password</label> <Lock size={18} className="text-muted"/></div>
              <div className="relative mt-2">
                <input type={showPassword ? "text" : "password"}placeholder="••••••••"id="password-input" className="diary-input MemoInk pr-11" onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary">{showPassword ? (<EyeOff size={18} />) : (<Eye size={18} />)}
                </button></div>
            </div>
{/* Confirm Password */}
          <div>
              <div className="flex gap-1 items-center">
                  <label htmlFor="confirm-password-input"  className="text-sm text-muted">Confirm Password</label> <Lock size={18} className="text-muted"/></div>
              <div className="relative mt-2">
                <input type={showConfirmPassword ? "text" : "password"}placeholder="••••••••"id="confirm-password-input" className="diary-input MemoInk pr-11" onChange={(e) => setConfirmPassword(e.target.value)} />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary">
                  {showConfirmPassword ? (<EyeOff size={18} />) : (<Eye size={18} />)}
                </button>
              </div>
            </div>

            {/* Button */}
            <button type="submit" className="diary-button w-full py-3">
              Create Account
            </button>
          </form>

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