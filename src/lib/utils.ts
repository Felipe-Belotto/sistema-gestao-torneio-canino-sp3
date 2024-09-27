import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getUserById } from "./prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getById() {
  const user = await getUserById("eacce6c8-1bb9-455e-b566-afe573486003");

  return user;
}
