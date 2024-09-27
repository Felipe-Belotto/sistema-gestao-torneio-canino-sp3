"use client";
import { createUser } from "@/lib/prisma";
import type { UserProps } from "@/lib/types";
import type React from "react";
import { useState } from "react";
import { RadioSex } from "./radio-sex";

function CreateUserForm() {
  const [formData, setFormData] = useState<UserProps>({
    name_conductor: "",
    name_dog: "",
    age_dog: 0,
    instituition: "",
    sex_dog: "",
  });

  const handleInputFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "age_dog" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      createUser(formData);
      console.log(formData);
      setFormData({
        name_conductor: "",
        name_dog: "",
        age_dog: 0,
        instituition: "",
        sex_dog: "",
      });
    } catch (error) {
      throw new Error("Failed to create user");
    }
  };

  return (
    <div className="w-full flex flex-col  items-center">
      <h1 className="mb-4 text-xl">Formulario de inscrição</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
        <div className="flex flex-col gap-2">
          <label htmlFor="instituition">Instituição/Cidade</label>
          <input
            type="text"
            id="instituition"
            name="instituition"
            value={formData.instituition}
            onChange={handleInputFormChange}
            required
            className="outline rounded-lg px-4"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name_conductor">Nome do Condutor:</label>
          <input
            type="text"
            id="name_conductor"
            name="name_conductor"
            value={formData.name_conductor}
            onChange={handleInputFormChange}
            required
            className="outline rounded-lg px-4"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name_dog">Nome do Cachorro:</label>
          <input
            type="text"
            id="name_dog"
            name="name_dog"
            value={formData.name_dog}
            onChange={handleInputFormChange}
            required
            className="outline rounded-lg px-4"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="age_dog">Idade do Cachorro:</label>
          <input
            type="number"
            id="age_dog"
            name="age_dog"
            value={formData.age_dog}
            onChange={handleInputFormChange}
            required
            className="outline rounded-lg px-4 "
          />
        </div>

        <RadioSex
          sex_dog={formData.sex_dog}
          handleChange={handleInputFormChange}
        />

        <button type="submit" className="p-4 py-2 rounded-lg bg-green-400 w-60">
          Criar Usuário
        </button>
      </form>
    </div>
  );
}

export default CreateUserForm;
