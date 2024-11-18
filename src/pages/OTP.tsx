import React from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

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

  // Retrieve OTP token from sessionStorage
  const otpToken = sessionStorage.getItem("otp_token");

  const handleSubmit = async (otp: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/verify-otp/",
        {
          otp_token: otpToken, // Send the OTP token with the OTP
          otp,
        }
      );

      // Show success toast
      toast({
        title: "OTP Verified!",
        description: response.data.message,
      });

      // Redirect or perform further actions (e.g., redirect to login)
      navigate("/");
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
            <Toaster />
          </div>
          <Toaster />
        </CardContent>
      </Card>
    </div>
  );
};

export default OTP;
