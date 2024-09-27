"use client";
import React from "react";
import Image from "next/image";

export default function HomeSection() {
  return (
    <section className="flex flex-col gap-14 my-14 px-6">
      <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl text-center ">
        3º TORNEIO DE CÃES DE POLÍCIA DO INTERIOR PAULISTA
      </h2>
      <Image
        src={"/images/banner.png"}
        width={1130}
        height={414}
        alt="imagem do banner"
        className="w-full h-auto object-cover" // Add object-cover for better image scaling
      />
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 2xl:max-w-[1130px] mx-auto">
        <div className="bg-primary pt-6 px-6 pb-14 rounded-md h-[300px] w-full flex flex-col gap-3">
          <h4 className="text-secundary text-2xl">Dia</h4>
          <p className="text-[96px] text-white w-full text-center min-h-[116px] flex items-center justify-center">
            27
          </p>
          <p className="text-white text-lg text-center">de setembro de 2024</p>
        </div>
        <div className="bg-primary pt-6 lg:px-6 w-[calc(100vw-48px)] md:min-w-[400px] rounded-md flex flex-col gap-3 flex-1 min-h-[300px]">
          <h4 className="text-secundary text-2xl pl-6">
            Modalidade do torneio
          </h4>
          <p className=" lg:text-[48px] text-white w-full text-center flex-1 flex items-center justify-center">
            Faro de drogas
          </p>
        </div>
      </div>
    </section>
  );
}
