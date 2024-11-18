import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import MoonLoader from "react-spinners/MoonLoader";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z
  .object({
    username: z.string().min(1, { message: "Username required" }),
    email: z.string().email().min(1, { message: "Enter Email" }),
    password: z.string().min(1, { message: "Enter Password" }),
    confirm_password: z.string().min(1, { message: "Confirm Password" }),
  })
  .superRefine(({ confirm_password, password }, ctx) => {
    if (confirm_password !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirm_password"],
      });
    }
  });
async function getCsrfToken() {
  const response = await fetch(
    "https://djangoredeploy.onrender.com/api/get-csrf-token/",
    {
      credentials: "include",
    }
  );
  const data = await response.json();
  return data.csrfToken;
}

export function SignUpForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [csrfToken, setCsrfToken] = useState("");
  const [message] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });
  // Fetch CSRF token on component mount
  useEffect(() => {
    const fetchCsrfToken = async () => {
      const token = await getCsrfToken();
      setCsrfToken(token);
    };
    fetchCsrfToken();
  }, []);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true); // Set loading to true when submission starts
    try {
      const response = await axios.post(
        "https://djangoredeploy.onrender.com/api/sign-up/",
        values,
      );

      toast({
        title: "Check your email!",
        description: "We’ve sent you an OTP to verify your account.",
      }); // Show success toast

      // Store the OTP token from the response
      const otpToken = response.data.otp_token; // Assuming the backend returns otp_token
      sessionStorage.setItem("otp_token", otpToken); // Store OTP token in sessionStorage

      // Store access and refresh tokens
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      navigate("/verify-otp"); // Navigate to OTP verification page
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Check for specific error message
        if (error.response?.data?.email) {
          toast({
            title: "Error",
            description: "Email already in use. Please use another one.",
            variant: "destructive",
          }); // Show error toast for email conflict
        } else {
          toast({
            title: "Sign-up failed",
            description: error.response?.data || "An error occurred.",
            variant: "destructive",
          }); // Show general error toast
        }
      } else {
        toast({
          title: "Unexpected error",
          description: "An unexpected error occurred, please try again.",
          variant: "destructive",
        }); // General error handling
      }
    } finally {
      setIsLoading(false); // Set loading to false when submission ends
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>Provide the details below to sign up.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Username" {...field} type="text" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} type="email" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Password" {...field} type="password" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Confirm Passord"
                      {...field}
                      type="password"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <MoonLoader size={20} color="#fff" /> : "Sign Up"}
            </Button>
            <FormDescription>
              <span className="mt-4 text-center text-sm justify-center flex ">
                Already have an account ? &nbsp;
                <Link className="underline" to="/">
                  Log in
                </Link>
              </span>
            </FormDescription>
          </form>
        </Form>
        {message && <p>{message}</p>}
      </CardContent>
    </Card>
  );
}
