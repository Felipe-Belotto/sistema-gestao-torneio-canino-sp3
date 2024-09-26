import { getAllUsers, getUserById } from "./prisma";

export async function getUsers() {
  const users = await getAllUsers()
  console.log(users);
}

export async function getById() {
  const user = await getUserById("eacce6c8-1bb9-455e-b566-afe573486003")
  console.log(user);
  return user
}