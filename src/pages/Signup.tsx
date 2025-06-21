import { SignUpForm } from "@/components/signup-form";
import { ChevronLeft, Command } from "lucide-react";
import {Link} from 'react-router-dom';
const Signup = () => {
  return (
    <>
       
      <div className="flex flex-col h-screen w-full items-center justify-center px-4">
        <div className="absolute top-[70px] lg:top-[120px] mx-auto left-[100px] lg:left-[400px] mb-12">
          <Link to={'/resourcehub'} className="flex">
        <ChevronLeft className="hover:text-lg pointer:cursor-pointer"/>back</Link>
        </div>
        <div className="flex flex-col items-center py-1.5">
        <Command size={100} className="text-mblue" />
        <h3 className="text-xl text-mblack font-medium">Safeguard Chatbot</h3>
        <p className="text-sm text-slate-800">
          Sextortion and Blackmail Awareness{" "}
        </p>
      </div>
        <SignUpForm title="" subtitle="Create an Account"></SignUpForm>
      </div>
    </>
  );
};

export default Signup;
