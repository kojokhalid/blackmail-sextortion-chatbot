import { SignUpForm } from "@/components/signup-form";
import { ChevronLeft } from "lucide-react";
import {Link} from 'react-router-dom';
// import safeguardchatlight from "../assets/safeguardchatlight.png";
import safeguardchatdark from "../assets/safeguardchatdark.png";
const Signup = () => {
  return (
    <>
       
      <div className="flex flex-col h-screen w-full items-center justify-center px-4 mb-4">
        <div className="absolute top-[70px] lg:top-[120px] mx-auto left-[100px] lg:left-[400px] mb-12">
          <Link to={'/resourcehub'} className="flex">
        <ChevronLeft className="hover:text-lg pointer:cursor-pointer"/>back</Link>
        </div>
        <div className="flex flex-col items-center py-1.5">
       <img src={safeguardchatdark} className="size-40"/>
        {/* <h3 className="text-xl text-mblack font-medium">Safeguard Chatbot</h3> */}
        <p className="text-sm text-slate-800">
        Awareness and support for a safer digital world.
        </p>
      </div>
        <SignUpForm title="Create an Account" subtitle=""></SignUpForm>
      </div>
    </>
  );
};

export default Signup;
