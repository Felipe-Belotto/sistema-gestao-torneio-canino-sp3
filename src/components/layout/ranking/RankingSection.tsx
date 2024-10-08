"use client";
import { useBreakpoint } from "@/hook/useBreakpoint";
import { useUsers } from "@/hook/useUsers";
import Link from "next/link";
import type React from "react";
import { useMemo } from "react";

// Função para converter o tempo no formato "00m 00s" para segundos
const convertTimeToSeconds = (time: string) => {
  const [minutes, seconds] = time.split(/[ms]/).map(Number);
  return minutes * 60 + seconds;
};

export default function RankingSection() {
  const { users, error } = useUsers();
  const breakpoint = useBreakpoint();

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      // Ordenar por pontuação (descrescente)
      if (b.pontuation !== a.pontuation) {
        return b.pontuation - a.pontuation;
      }

      // Ordenar por tempo (crescente)
      const timeA = convertTimeToSeconds(a.test_time);
      const timeB = convertTimeToSeconds(b.test_time);
      if (timeA !== timeB) {
        return timeA - timeB;
      }

      // Ordenar por idade (crescente)
      return a.age_dog - b.age_dog;
    });
  }, [users]);

  if (users.length === 0) {
    return <p className="text-center mt-14">Loading...</p>;
  }

  return (
    <div className="p-5 bg-white rounded-lg mt-14 mb-24 lg:mb-0">
      {error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : (
        <>
          <div className="bg-primary px-6 rounded-md flex justify-between items-center gap-3 flex-1 h-[100px] w-[calc(100vw-48px)] lg:w-full">
            <h4 className="text-secundary lg:text-[32px]">Ranking</h4>
            <p className="lg:text-[48px] text-white">Faro de drogas</p>
          </div>

          <div className="flex flex-col mt-7 lg:mt-14">
            {/* Table for desktop */}
            <div className="hidden lg:block">
              <table className="2xl:w-[1130px] mx-auto shadow-md rounded-lg mt-14">
                <caption className="sr-only">Ranking Data</caption>
                <thead>
                  <tr className="bg-primary text-white uppercase text-sm">
                    <th className="text-left px-4 py-3 rounded-tl-md">
                      Colocação
                    </th>
                    <th className="text-left px-1 py-3">Pontuação</th>
                    <th className="text-left px-8 py-3">Nome</th>
                    <th className="text-left px-8 py-3">Condutor</th>
                    <th className="text-left px-8 py-3">Tempo</th>
                    <th className="text-left px-4 py-3">Idade</th>
                    <th className="text-left px-4 py-3 rounded-tr-md">
                      Súmula
                    </th>
                  </tr>
                </thead>
                <tbody className="h-full">
                  {sortedUsers.map((user, index) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-100 text-base max-h-12"
                    >
                      <TableTd text={index + 1} />
                      <TableTd text={user.pontuation} />
                      <TableTd text={user.name_dog} />
                      <TableTd text={user.name_conductor} />
                      <TableTd text={user.test_time} />
                      <TableTd text={user.age_dog} />
                      <TableTd>
                        <Link
                          href={user.fileURL || ""}
                          className="p-2 bg-primary text-white text-center rounded-md"
                          target="_blank"
                        >
                          Ver Súmula
                        </Link>
                      </TableTd>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards for mobile */}
            <div className="lg:hidden grid gap-4">
              {sortedUsers.map((user, index) => (
                <div
                  key={user.id}
                  className="bg-tertiary text-white rounded-lg p-4 shadow-md"
                >
                  <p className="text-lg font-bold flex items-center gap-2">
                    <span>{index + 1}°</span>
                    <span className="font-bold text-2xl text-secundary">
                      {user.name_dog}
                    </span>
                  </p>
                  <ul className="list-none pl-4 mt-2 flex flex-col gap-4 text-sm">
                    <div className="flex justify-between">
                      <li>Pontuação: {user.pontuation}</li>
                      <li>Tempo: {user.test_time}</li>
                    </div>
                    <div className="flex justify-between">
                      <li>Idade: {user.age_dog}</li>
                      <li>Condutor: {user.name_conductor}</li>
                    </div>
                    <div className="flex justify-between">
                      <li>Instituição: {user.institution}</li>
                    </div>
                    <Link
                      href={user.fileURL || ""}
                      className="p-4 bg-primary text-center rounded-md"
                      target="_blank"
                    >
                      Sumula
                    </Link>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

type TableTdProps = {
  text?: string | number;
  children?: React.ReactNode;
};

const TableTd = ({ text, children }: TableTdProps) => {
  return (
    <td className="text-left px-8 py-3 border-b border-gray-200 ">
      {text}
      {children}
    </td>
  );
};
