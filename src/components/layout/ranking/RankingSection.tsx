"use client";
import { useBreakpoint } from "@/hook/useBreakpoint";
import { useUsers } from "@/hook/useUsers";
import type React from "react";
import { useMemo } from "react";

export default function RankingSection() {
  const { users, error } = useUsers();
  const breakpoint = useBreakpoint();

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => b.pontuation - a.pontuation);
  }, [users]);

  if (users.length === 0) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="p-5 bg-white rounded-lg mt-14">
      {error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : (
        <>
          <div className="bg-primary px-6 rounded-md flex justify-between items-center gap-3 flex-1 h-[100px]">
            <h4 className="text-secundary text-[32px]">Ranking</h4>
            <p className="text-[48px] text-white">Faro de drogas</p>
          </div>
          <table className="2xl:w-[1130px] mx-auto shadow-md rounded-lg mt-14">
            <caption className="sr-only">Ranking Data</caption>
            <thead>
              <tr className="bg-primary text-white uppercase text-sm">
                <th className="text-left px-4 py-3 rounded-tl-md">Colocação</th>
                <th className="text-left px-1 py-3 ">Pontuação</th>
                <th className="text-left px-8 py-3">Tempo</th>
                {breakpoint === "desktop" && (
                  <>
                    <th className="text-left px-8 py-3">Instituição</th>
                    <th className="text-left px-8 py-3">Condutor</th>
                  </>
                )}
                <th className="text-left px-8 py-3">Nome</th>
                <th className="text-left px-4 py-3">Idade</th>
                <th className="text-left px-8 py-3 rounded-tr-md">Sexo</th>
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
                  <TableTd text={user.test_time} />
                  {breakpoint === "desktop" && (
                    <>
                      <TableTd text={user.institution} />
                      <TableTd text={user.name_conductor} />
                    </>
                  )}

                  <TableTd text={user.name_dog} />
                  <TableTd text={user.age_dog} />
                  <TableTd text={user.sex_dog} />
                </tr>
              ))}
            </tbody>
          </table>
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
