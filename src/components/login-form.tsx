import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
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
} from "@/components/ui/card";
import MoonLoader from "react-spinners/MoonLoader";
import { useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";

const formSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export function LoginForm() {
  const { loginUser } = useAuthContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false); // State for loading

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true); // Set loading to true when submission starts

    try {
      await loginUser(values);
      navigate("/chat");
    } catch (error: any) {
      console.error("Login failed:", error);
      const errorDescription =
        error.message === "No active account found with the given credentials"
          ? "Invalid username or password. Please try again."
          : "An error occurred. Please try again.";
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: errorDescription,
      });
    } finally {
      setIsLoading(false); // Set loading to false when submission ends
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        {/* <CardTitle className="text-2xl"> Login</CardTitle> */}
        <CardDescription>Login to your account.</CardDescription>
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
                    <Input placeholder="Username" {...field} />
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
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    <span className="flex">
                      <Link
                        to="#"
                        className="ml-auto text-sm underline items-end content-center justify-end"
                      >
                        Forgot your password?
                      </Link>
                    </span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <MoonLoader size={20} color="#fff" /> : "Log In"}
            </Button>

            <FormDescription>
              <span className="mt-4 text-center text-sm justify-center flex">
                Don't have an account? &nbsp;
                <Link className="underline" to="/signup">
                  Sign Up
                </Link>
              </span>
            </FormDescription>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
