import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

export default function SignInComponent() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#e6e7ea] w-full">
      <div className="flex flex-col items-center justify-center bg-[#02132f] rounded-md shadow-lg p-6">
        <div className="mb-8">
          <Image
            src="/images/logo.png"
            alt="Logo da Empresa"
            width={213}
            height={138}
          />
        </div>

        {/* Botão de Login */}
        <Button
          className="flex items-center space-x-2 bg-white hover:bg-gray-100 border border-gray-300 text-black"
          onClick={() => signIn("google")}
        >
          <FcGoogle size={24} />
          <span>Login com Google</span>
        </Button>
      </div>
    </div>
  );
}
