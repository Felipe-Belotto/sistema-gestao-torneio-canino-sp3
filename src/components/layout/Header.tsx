"use client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import HomeIcon from "../icon/HomeIcon";
import RankingIcon from "../icon/RankingIcon";

import NavItem from "./sidebar/NavItem";
import { useBreakpoint } from "@/hook/useBreakpoint";

export default function Header() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return null;
  if (breakpoint === "desktop" || breakpoint === "small-laptop") return null;

  return (
    <header className="bg-primary flex items-center justify-around p-4 shadow-md h-[70px] fixed w-full bottom-0 ">
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

      <nav className="flex gap-8 ">
        <NavItem icon={<HomeIcon />} title="Inicio" />
        <NavItem icon={<RankingIcon />} title="Ranking" />
      </nav>
    </header>
  );
}
