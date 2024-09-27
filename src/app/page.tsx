"use client";
import { useRouter, useSearchParams } from "next/navigation";
import HomeSection from "@/components/layout/home/HomeSection";
import ParticipantsSection from "@/components/layout/participants/ParticipantsSection";
import RankingSection from "@/components/layout/ranking/RankingSection";
import { useAdmin } from "@/hook/useAdmin";
import SignInComponent from "@/components/layout/SignInComponent";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const active = searchParams.get("active");
  const { isAdmin, loading } = useAdmin();
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    router.push(`?active=Inicio`);
  }, []);

  if (!session) return <SignInComponent />;

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="w-full flex justify-center text-black text-2xl font-bold">
      {active === "Inicio" && <HomeSection />}
      {active === "Ranking" && <RankingSection />}
      {active === "Participantes" && isAdmin && <ParticipantsSection />}
    </main>
  );
}
