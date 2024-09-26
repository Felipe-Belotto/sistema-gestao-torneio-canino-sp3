'use client'
import { createUser, deleteUser, getAllUsers, getUserById } from '@/lib/prisma';
import { UserProps } from '@/lib/types';
import React, { use, useState } from 'react'


function CreateUserForm() {
  const [formData, setFormData] = useState<UserProps>({
    name_conductor: '',
    name_dog: '',
    age_dog: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'age_dog' ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createUser(formData)
    console.log(formData);
    setFormData({
      name_conductor: '',
      name_dog: '',
      age_dog: 0,
    })

  };

  async function getUsers() {
    const users = await getAllUsers()
    console.log(users);
  }

  async function getById(){
    const user = await getUserById("eacce6c8-1bb9-455e-b566-afe573486003")
    console.log(user);
    return user
  }
  return (
    <div>
      <h1>{}</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
        <div className='flex gap-2'>
          <label htmlFor="name_conductor">Nome do Condutor:</label>
          <input
            type="text"
            id="name_conductor"
            name="name_conductor"
            value={formData.name_conductor}
            onChange={handleChange}
            required
            className='outline rounded-lg'
          />
        </div>
        <div className='flex gap-2'>
          <label htmlFor="name_dog">Nome do Cachorro:</label>
          <input
            type="text"
            id="name_dog"
            name="name_dog"
            value={formData.name_dog}
            onChange={handleChange}
            required
            className='outline rounded-lg'
          />
        </div>
        <div className='flex gap-2'>
          <label htmlFor="age_dog">Idade do Cachorro:</label>
          <input
            type="number"
            id="age_dog"
            name="age_dog"
            value={formData.age_dog}
            onChange={handleChange}
            required
            className='outline rounded-lg'
          />
        </div>
        <button type="submit" className='p-4 py-2 rounded-lg bg-green-400'>Criar Usuário</button>
      </form>
      <div className='flex gap-4'>
        <button onClick={getUsers} className='py-2 px-4 rounded-lg bg-red-600'>Buscar usuarios</button>
        <button onClick={() => deleteUser("780663a9-5315-4d02-8b9e-a438569495ac")} className='py-2 px-4 rounded-lg bg-red-600 text-white'>Deletar</button>
        <button onClick={getById} className='py-2 px-4 rounded-lg bg-red-600 text-white'>Buscar use by ID</button>
      </div>

    </div>
  )
}

export default CreateUserForm