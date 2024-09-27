"use client";

import SignInComponent from "@/components/layout/SignInComponent";
import HomeSection from "@/components/layout/home/HomeSection";
import ParticipantsSection from "@/components/layout/participants/ParticipantsSection";

import RankingSection from "@/components/layout/ranking/RankingSection";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const active = searchParams.get("active");
  const { data: session } = useSession();

  if (!session) {
    return <SignInComponent />;
  }

  return (
    <main className="w-full flex justify-center items-center text-black text-2xl font-bold">
      {active === "Inicio" && <HomeSection />}
      {active === "Ranking" && <RankingSection />}
      {active === "Participantes" && <ParticipantsSection />}
    </main>
  );
}
