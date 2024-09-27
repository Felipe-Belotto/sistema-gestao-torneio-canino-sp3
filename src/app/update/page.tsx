'use client'
import { getAllUsers } from '@/lib/prisma'
import { UserProps } from '@/lib/types'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function page() {
  const [users, setUsers] = useState<UserProps[]>([])

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    const data = await getAllUsers()
    setUsers(data ? data : [])
  }
  return (
    <section className='flex flex-col gap-8 w-full  items-center'>
      <h1>Participantes</h1>
      {users.map((user) => (
        <div key={user.id} className='flex rounded-lg shadow-sm w-[500px] gap-8'>
          <div className='flex flex-col gap-2'>
            <p className='font-semibold text-xl'>Participante</p>
            <p>{user.name_dog}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='font-semibold text-xl'>Cidade</p>
            <p>{user.institution}</p>
          </div>

          

          <Link href={`update/${user.id}`} className='px-4 py-2 h-fit w-fit bg-yellow-500 cursor-pointer ml-auto '>
            Editar
          </Link>
        </div>
      ))}
    </section>
  )
}

export default page