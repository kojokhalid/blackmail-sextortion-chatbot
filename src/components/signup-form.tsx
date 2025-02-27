import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {  useState } from "react";
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
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[\W_]/, { message: "Password must contain at least one special character" }),
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


  interface FormDetails {title:string, subtitle:string}
export function SignUpForm({title,subtitle}:FormDetails) {
  const navigate = useNavigate();
  const { toast } = useToast();
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

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true); // Set loading to true when submission starts
    try {
      const response = await axios.post(
        "https://eve-chatbot-stmh.onrender.com/api/user/register",
        values
      );
      if (response)
        if (response.status == 400) {
          {
            toast({
              title: "User exist",
              description: "User already exist with this email!",
            }); // Show success toast
          }
          return;
        }
      if (response.status == 200) {
        toast({
          title: "Verify email",
          description: "Please verify your email to continue",
        });
        // Store the OTP token from the response
        const accessToken = response.data.accessToken; // Assuming the backend returns otp_token
        sessionStorage.setItem("accessToken", accessToken); // Store OTP token in sessionStorage

        // Store access and refresh tokens
        // localStorage.setItem("access_token", response.data.access);
        // localStorage.setItem("refresh_token", response.data.refresh);

        navigate("/verify-otp"); // Navigate to OTP verification page
        
      }
    } catch (error:any) {
      if (error.response) {
        toast({
          title: "Error",
          description: error.response.data.message,
          variant: "destructive",
        }); // Show error toast
      }
      // toast({
      //   title: "Error",
      //   description: error.message,
      // }); // Show error toast
    } finally {
      setIsLoading(false); // Set loading to false when submission ends
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
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
                <Link className="underline" to="/login">
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
