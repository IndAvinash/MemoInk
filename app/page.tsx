"use client";

import { use, useEffect, useState } from "react";
import { redirect, RedirectType, useSearchParams } from "next/navigation";
import LoginPage from "@/components/ui/login-form";
import SignUp from "@/components/ui/signup-form";
import ForgotPassword from "@/components/ui/forgot-pass";
import { Book } from "lucide-react";
import Button from "@/components/ui/button";
// import toast from "react-hot-toast";
type LogStatus = 0 | 1 | 2 | 3; 
// 0 ->getStarted, 1->login, 2->signup, 3->forgotPassword

export default function HomePage() {
  var status: LogStatus = 0;
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");
  const[logStatus, setLogStatus] = useState(0);

  useEffect(() => {
    if (statusParam === "1") {
      setLogStatus(1);
    }
    if (statusParam === "2") {
      setLogStatus(2);
    }
    if (statusParam === "3") {
      setLogStatus(3);
    }
  }, [statusParam]);

  return (

    <>
    <Book size={48} className="text-primary mb-4" />
    {logStatus === 0 &&(<div className="space-y-4">
      <h1 className="text-4xl font-bold text-[#5c3d2e]">
        Welcome to MemoInk
      </h1>
      <Button 
        onClick={() => setLogStatus(1)}
        className="bg-primary text-white py-2 px-4 rounded-2xl hover:bg-primary/90 transition-colors"
      >
        Get Started
      </Button>
      <p className="text-gray-600 text-lg">
        Capture your thoughts, memories, and emotions beautifully.
      </p></div>)}

      {logStatus === 1 && <LoginPage />}
      {logStatus === 2 && <SignUp />}
      {logStatus === 3 && <ForgotPassword />}
      </>
    
  );
}