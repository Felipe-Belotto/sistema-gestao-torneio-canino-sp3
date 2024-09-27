"use client";

import ExitIcon from "@/components/icon/ExitIcon";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import HomeIcon from "../icon/HomeIcon";
import RankingIcon from "../icon/RankingIcon";
import DogIcon from "../icon/DogIcon";
import NavItem from "./sidebar/NavItem";

export default function Header() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

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
    <header className="bg-primary flex items-center justify-between p-4 shadow-md h-[70px]">
      <Link href={"/"}>
        <Image
          src={"/images/logo.png"}
          alt="logo do evento"
          width={150}
          height={100}
          className="mr-6"
        />
      </Link>

      <nav className="flex gap-8">
        <NavItem icon={<HomeIcon />} title="Início" />
        <NavItem icon={<RankingIcon />} title="Ranking" />
        <NavItem icon={<DogIcon />} title="Participantes" />
      </nav>

      <div className="flex items-center gap-4">
        {currentTime && (
          <span className="text-white text-lg">
            {format(currentTime, "HH:mm:ss", { locale: ptBR })}
          </span>
        )}
      </div>
    </header>
  );
}
