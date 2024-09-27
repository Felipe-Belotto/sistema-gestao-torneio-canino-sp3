'use server'

import { Prisma, PrismaClient } from '@prisma/client'
import { UserProps } from './types'
const prisma = new PrismaClient()

export async function createUser({ name_conductor, name_dog, age_dog, institution, sex_dog }: UserProps) {
  const user = await prisma.user.create({
    data: {
      institution: institution,
      name_conductor: name_conductor,
      name_dog: name_dog,
      age_dog: age_dog,
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
  try {
    const users = await prisma.user.findMany()
    console.log(users)
    return users
  } catch (error) {
    throw new Error('Não foi possível encontrar todos os usuários.');
  } finally {
    await prisma.$disconnect()
  }
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    })
    return user
  } catch (error) {
    throw new Error('Não foi possível encontrar o usuário com esse ID.');

  } finally {
    await prisma.$disconnect()
  }
}

export async function updateUser(id: string, data: UserProps) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: data as Prisma.UserUpdateInput
    })

    return updatedUser
  } catch (error) {
    throw new Error('Não foi possível atualizar o usuário.');
  } finally {
    await prisma.$disconnect()
  }
}
