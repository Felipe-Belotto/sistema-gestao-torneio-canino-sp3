"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useAdmin } from "@/hook/useAdmin";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import HomeSection from "@/components/layout/HomeSection";
import RankingSection from "@/components/layout/ranking/RankingSection";
import ParticipantsSection from "@/components/layout/participants/ParticipantsSection";
import SignInComponent from "@/components/layout/SignInComponent";

export default function Home() {
  const searchParams = useSearchParams();
  const active = searchParams.get("active");

  const router = useRouter();
  useEffect(() => {
    router.push(`?active=Inicio`);
  }, []);

  return (
    <main className="w-full flex justify-center text-black text-2xl font-bold">
      {active === "Inicio" && <HomeSection />}
      {active === "Ranking" && <RankingSection />}
      {active === "Participantes" && <ParticipantsSection />}
    </main>
  );
}
