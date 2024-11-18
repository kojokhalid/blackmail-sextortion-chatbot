import { LoginForm } from "@/components/login-form";
import { Command } from "lucide-react";
export default function Login() {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center px-4">
      <div className="flex flex-col items-center py-1.5">
        <Command size={100} className="text-mblue" />
        <h3 className="text-xl text-mblack font-medium">Sign In to Eve</h3>
        <p className="text-sm text-slate-800">
          Sextortion and Blackmail Awareness{" "}
        </p>
      </div>

      <LoginForm />
    </div>
  );
}
