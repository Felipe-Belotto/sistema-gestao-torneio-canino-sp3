"use client";
import SignInComponent from "@/auth/signIn";
import { signIn, signOut, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const active = searchParams.get("active");
  const { data: session } = useSession();

  if (!session) {
    return <SignInComponent />;
  }

  console.log(session);
  return (
    <main className="w-full flex justify-center items-center text-black text-2xl font-bold">
      {active}
    </main>
  );
}
