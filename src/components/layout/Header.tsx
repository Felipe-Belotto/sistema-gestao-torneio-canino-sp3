"use client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import HomeIcon from "../icon/HomeIcon";
import RankingIcon from "../icon/RankingIcon";
import DogIcon from "../icon/DogIcon";
import NavItem from "./sidebar/NavItem";
import { useBreakpoint } from "@/hook/useBreakpoint";

export default function Header() {
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

  return (
    <header className="bg-primary flex items-center justify-around p-4 shadow-md h-[70px] ">
      {breakpoint === "desktop" && (
        <Link
          href={"/?active=Participantes"}
          className="flex items-center gap-4"
        >
          {currentTime && (
            <span className="text-white text-lg">
              {format(currentTime, "HH:mm:ss", { locale: ptBR })}
            </span>
          )}
        </Link>
      )}
      {breakpoint === "mobile" && (
        <Link href={"/?active=Inicio"} className="p-4">
          <Image
            src={"/images/logo.png"}
            alt="logo do evento"
            width={150}
            height={100}
            className="mr-6 "
          />
        </Link>
      )}

      <nav className="flex gap-8 ">
        <NavItem icon={<HomeIcon />} title="Inicio" />
        <NavItem icon={<RankingIcon />} title="Ranking" />
      </nav>
    </header>
  );
}
