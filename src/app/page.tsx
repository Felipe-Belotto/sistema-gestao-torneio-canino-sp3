"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const active = searchParams.get("active");
  const { data: session } = useSession();

  console.log(session);
  return (
    <main className="w-full flex justify-center items-center">
      <div className="bg-black">{active}</div>
    </main>
  );
}
