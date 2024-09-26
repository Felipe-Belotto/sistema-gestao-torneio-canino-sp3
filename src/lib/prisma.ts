import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createUser() {
    const user = await prisma.user.create({
        data: {
            name: 'Alice',
        },
    })
    await prisma.$disconnect()
}

createUser()