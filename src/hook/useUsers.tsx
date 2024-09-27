import { useEffect, useState } from "react";
import { getAllUsers } from "@/lib/prisma";
import type { User } from "@prisma/client";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const usersData = await getAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();

    const intervalId = setInterval(() => {
      fetchUsers();
    }, 10000); // Re-fetch every 10 seconds

    return () => clearInterval(intervalId);
  }, []);

  return { users, error, fetchUsers };
};
