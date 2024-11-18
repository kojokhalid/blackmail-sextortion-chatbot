import { LoginForm } from "@/components/login-form";

export default function Login() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <div>
        <h3>Sign In to Eve</h3>
      </div>

      <LoginForm />
    </div>
  );
}
