"use client";
import AddIcon from "@/components/icon/AddIcon";
import ExitIcon from "@/components/icon/ExitIcon";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DogIcon from "../../icon/DogIcon";
import ExamIcon from "../../icon/ExamIcon";
import HomeIcon from "../../icon/HomeIcon";
import RankingIcon from "../../icon/RankingIcon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import CreateParticipantDialog from "./CreateParticipantDialog";
import NavItem from "./NavItem";

export default function Sidebar() {
  const { data: session } = useSession();
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <nav className="w-[262px] bg-primary h-screen py-6 pl-6 flex flex-col">
      <div className="flex-grow flex flex-col gap-14">
        <Image
          src={"/images/logo.png"}
          alt="logo do evento"
          width={213}
          height={138}
          className="mr-6"
        />
        <div className="min-h-[27px]">
          {session && (
            <div className="w-full flex gap-3 pl-4">
              <Avatar className="w-6 h-6">
                <AvatarImage src={session.user?.image || ""} />
                <AvatarFallback>DS</AvatarFallback>
              </Avatar>
              <span className="text-[18px]">{session.user?.name}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <NavItem icon={<HomeIcon />} title="Inicio" />
          <NavItem icon={<RankingIcon />} title="Ranking" />
          <NavItem icon={<DogIcon />} title="Participantes" />
          <NavItem icon={<ExamIcon />} title="Provas" />
          <hr className="w-full h-[1px] opacity-50" />

          <button onClick={() => setIsDialogOpen(true)}>
            <NavItem icon={<AddIcon />} title="Criar participante" />
          </button>
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-6 mr-6">
        <div className="w-full flex justify-center bg-[#010f24] text-[20px] py-4 rounded-md">
          {currentTime && format(currentTime, "HH:mm:ss", { locale: ptBR })}
        </div>
        <NavItem icon={<ExitIcon />} title="Sair" />
      </div>

      <CreateParticipantDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </nav>
  );
}
