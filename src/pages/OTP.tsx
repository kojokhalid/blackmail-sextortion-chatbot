import React, { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import MoonLoader from "react-spinners/MoonLoader";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const OTP = () => {
  const [value, setValue] = React.useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false); // State for loading
  // Retrieve OTP token from sessionStorage
  const accessToken = sessionStorage.getItem("accessToken");

  const handleSubmit = async (otp: string) => {
    try {
      const response = await axios.post(
        "https://eve-chatbot-stmh.onrender.com/api/user/verifyotp/",
        { otp }, // Send OTP only in the body
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Attach accessToken as Bearer
          },
        }
      );
      if (response.status === 200) {
        setIsLoading(false); // Set loading to false after successful OTP verification
        // Show success toast
        toast({
          title: "OTP Verified!",
          description: response.data.message,
        });
        navigate("/resourcehub");
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Show error toast if OTP verification fails
        toast({
          title: "OTP Verification Failed",
          description:
            error.response?.data.message ||
            "Invalid OTP token. Please try again.",
          variant: "destructive",
        });
      }
    }
  };
  const handleChange = (value: string) => {
    setValue(value);
    if (value.length === 6) {
      handleSubmit(value);
    }
  };
  const handleResendOTP = async () => {
    try {
      setIsLoading(true); // Set loading to true when submission starts
      const username = localStorage.getItem("uname");
      const password = localStorage.getItem("upass");
      const response = await axios.post(
        "https://eve-chatbot-stmh.onrender.com/api/user/resendotp/",
        // Send username and password in the body
        {
          username: username,
          password: password,
        }
      );
      if (response.status === 200) {
        sessionStorage.setItem("accessToken", response.data.accessToken);
        // Show success toast
        toast({
          title: "OTP Resent!",
          description: response.data.message,
          variant: "default",
        });
        setValue("");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Show error toast if OTP resend fails
        toast({
          title: "OTP Resend Failed",
          description: error.response?.data.message || "Failed to resend OTP",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false); // Set loading to false when submission ends
    }
  };
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Complete OTP Verification</CardTitle>
          <CardDescription>
            Provide the 6 digits sent to your email address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <InputOTP maxLength={6} value={value} onChange={handleChange}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            <Button
              className="mt-4"
              onClick={handleResendOTP}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <MoonLoader size={10} color="#fff" /> Sending..
                </>
              ) : (
                "Resend OTP"
              )}
            </Button>
          </div>
          <Toaster />
        </CardContent>
      </Card>
    </div>
  );
};

export default OTP;
