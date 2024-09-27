"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function HomeSection() {
  const { data: session } = useSession();

  if (!session) return null;
  return (
    <section className="flex flex-col gap-14">
      <h2 className="font-bold text-[24px]">
        3º TORNEIO DE CÃES DE POLÍCIA DO INTERIOR PAULISTA
      </h2>
      <Image
        src={"/images/banner.png"}
        width={1130}
        height={414}
        alt="imagem do banner"
      />
      <div className="flex justify-between items-center gap-6 max-w-[1130px]">
        <div className="bg-primary pt-6 px-6 pb-14 rounded-md h-[300px] min-w-[300px] flex flex-col gap-3">
          <h4 className="text-secundary text-[32px] ">Dia</h4>
          <p className="text-[96px] text-white w-full text-center min-h-[116px] flex items-center justify-center">
            27
          </p>
          <p className="text-white text-[16px] text-center">
            de setembro de 2024
          </p>
        </div>
        <div className="bg-primary pt-6 px-6 pb-14 rounded-md  flex flex-col gap-3 flex-1 h-[300px]">
          <h4 className="text-secundary text-[32px] ">Modalidade do torneio</h4>
          <p className="text-[48px] text-white w-full text-center flex-1 flex items-center justify-center">
            Faro de drogas
          </p>
        </div>
      </div>
    </section>
  );
}
