import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
<<<<<<< HEAD
=======

export async function getById() {
  const user = await getUserById("eacce6c8-1bb9-455e-b566-afe573486003")
  console.log(user);
  return user
}

>>>>>>> 0a351a669ea8f74ebb2c1cd214b742eaf5a74814
