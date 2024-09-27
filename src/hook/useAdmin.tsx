// hooks/useAdmin.js
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getAdminByEmail } from "@/lib/prisma";

export function useAdmin() {
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (status === "loading") {
        return; // Wait until the session is loaded
      }

      setLoading(true);

      if (session?.user?.email) {
        try {
          const adminStatus = await getAdminByEmail(session.user.email);
          console.log("Admin status:", adminStatus); // Log the admin status
          setIsAdmin(adminStatus);
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("No session or email"); // Log when there's no session
        setIsAdmin(false);
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [session, status]);

  return { isAdmin, loading };
}
