"use server";

import { Admin, type Prisma, PrismaClient, User } from "@prisma/client";
import type { UserProps } from "./types";
const prisma = new PrismaClient();

export async function createUser({
  name_conductor,
  name_dog,
  age_dog,
  institution,
  sex_dog,
  pontuation,
  test_time,
  fileURL,
}: User) {
  const user = await prisma.user.create({
    data: {
      institution: institution,
      name_conductor: name_conductor,
      name_dog: name_dog,
      age_dog: age_dog,
      sex_dog: sex_dog,
      test_time: test_time,
      pontuation: pontuation,
      fileURL: fileURL,
    },
  });
  await prisma.$disconnect();
}

export async function deleteUser(id: string) {
  await prisma.user.delete({
    where: { id },
  });
  await prisma.$disconnect();
}
export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();

    return users;
  } catch (error) {
    throw new Error("Não foi possível encontrar todos os usuários.");
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    throw new Error("Não foi possível encontrar o usuário com esse ID.");
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateUser(id: string, data: UserProps) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: data as Prisma.UserUpdateInput,
    });

    return updatedUser;
  } catch (error) {
    throw new Error("Não foi possível atualizar o usuário.");
  } finally {
    await prisma.$disconnect();
  }
}

export async function getAdminByEmail(email: string) {
  try {
    const admin = await prisma.admin.findFirst({
      where: { email },
    });

    console.log("Admin query result:", admin); // Log the raw result

    if (admin) {
      return true; // Return true if admin is found
      // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
      return false; // Return false if no admin is found
    }
  } catch (error) {
    console.error("Error in getAdminByEmail:", error);
    return false; // Return false on error
  } finally {
    await prisma.$disconnect();
  }
}
