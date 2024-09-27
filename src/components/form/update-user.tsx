"use client";
import { getUserById, updateUser } from "@/lib/prisma";
import type { UserProps } from "@/lib/types";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RadioSex } from "../radio-sex";

const initialForm = {
  name_conductor: "",
  name_dog: "",
  age_dog: 0,
  institution: "",
  sex_dog: "",
};

export function UpdateUserForm({ id }: { id: string }) {
  const router = useRouter();
  const [formData, setFormData] = useState<UserProps>(initialForm);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    findUser(id);
  }, [id]);

  async function findUser(id: string): Promise<UserProps | null> {
    try {
      const user = await getUserById(id);
      console.log(user);
      setFormData(user ? user : initialForm);
      setLoading(false);
      return user;
    } catch (error) {
      console.error("Failed to find user:", error);
      throw new Error("Failed to find user");
    }
  }

  const handleInputFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "age_dog" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUser(id, formData);
      router.push("/update");
    } catch (error) {
      console.error("Failed to update user:", error);
      throw new Error("Failed to update user");
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="mb-4 text-xl">Atualizar dados</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="institution">Instituição/Cidade</label>
          <input
            type="text"
            id="institution"
            name="institution"
            value={formData.institution}
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
          Atualizar dados
        </button>
      </form>
    </div>
  );
}
