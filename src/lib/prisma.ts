'use server'

import { Prisma, PrismaClient } from '@prisma/client'
import { UserProps } from './types'
const prisma = new PrismaClient()

export async function createUser({name_conductor, name_dog, age_dog, instituition, sex_dog} : UserProps) {
    const user = await prisma.user.create({
        data: {
          name_conductor: name_conductor,
          name_dog: name_dog,
          age_dog: age_dog,
          institution: instituition,
          sex_dog: sex_dog,
        },
    })
    await prisma.$disconnect()
}

export async function deleteUser(id: string) {
  await prisma.user.delete({
    where: { id },
  })
  await prisma.$disconnect()
}
export async function getAllUsers() {
  const users = await prisma.user.findMany()
  await prisma.$disconnect()
  return users
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
  })
  await prisma.$disconnect()
  return user
}

export async function updateUser(id: string, data: Partial<UserProps>) {
  const updatedUser = await prisma.user.update({
    where: { id },
    data: data as Prisma.UserUpdateInput
  })
  await prisma.$disconnect()
  return updatedUser
}
