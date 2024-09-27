"use client";

import ExitIcon from "@/components/icon/ExitIcon";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import DogIcon from "../../icon/DogIcon";
import HomeIcon from "../../icon/HomeIcon";
import RankingIcon from "../../icon/RankingIcon";

import Link from "next/link";
import NavItem from "./NavItem";

import { useBreakpoint } from "@/hook/useBreakpoint";

export default function Sidebar() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  const breakpoint = useBreakpoint();

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (breakpoint === "mobile" || breakpoint === "tablet") return null;

  const renderSideBar = () => {
    return (
      <nav className="w-[262px] bg-primary h-screen py-6 pl-6 flex flex-col">
        <div className="flex-grow flex flex-col gap-14">
          <Link href={"/"}>
            <Image
              src={"/images/logo.png"}
              alt="logo do evento"
              width={213}
              height={138}
              className="mr-6"
            />
          </Link>
          <div className="min-h-[27px]">
            <div className="w-full flex gap-3 pl-4">
              <div className="w-6 h-6 bg-gray-500/50 rounded-full" />
              <span className="text-[18px]">Usuário</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <NavItem icon={<HomeIcon />} title="Inicio" />
            <NavItem icon={<RankingIcon />} title="Ranking" />
            {<NavItem icon={<DogIcon />} title="Participantes" />}
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-6 mr-6">
          <div className="w-full flex justify-center bg-[#010f24] text-[20px] py-4 rounded-md">
            {currentTime && format(currentTime, "HH:mm:ss", { locale: ptBR })}
          </div>
          <button
            onClick={() => {
              alert("Sair");
            }}
          >
            <NavItem icon={<ExitIcon />} title="Sair" />
          </button>
        </div>
      </nav>
    );
  };

  return breakpoint === "desktop" || breakpoint === "small-laptop"
    ? renderSideBar()
    : null;
}
