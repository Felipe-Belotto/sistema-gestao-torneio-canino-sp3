"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  console.log(session);
  return (
    <main className="h-screen flex flex-col gap-14 justify-center items-center">
      {session && (
        <div className="flex flex-col gap-14 justify-center items-center">
          <h1>Welcome {session?.user?.name}</h1>
          <p>{session?.user?.email}</p>
          <button
            onClick={() => {
              signOut();
            }}
            className="text-2xl text-white px-4 bg-red-800"
          >
            Logout
          </button>
        </div>
      )}
      {!session && (
        <button
          onClick={() => {
            signIn("google");
          }}
          className="text-2xl text-white px-4 bg-green-800"
        >
          Login
        </button>
      )}
    </main>
  );
}
