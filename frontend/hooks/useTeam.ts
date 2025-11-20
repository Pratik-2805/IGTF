"use client";

import { useState, useEffect } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Define the team user interface
export interface TeamUser {
  id: number;
  name: string;
  email: string;
  role: "manager" | "sales";
}

// Define what data createUser accepts
interface CreateUserPayload {
  name: string;
  email: string;
  role: "manager" | "sales";
}

export function useTeam() {
  const [team, setTeam] = useState<TeamUser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTeam = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/team/list/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      const data = await res.json();
      if (res.ok) setTeam(data);
    } catch (err) {
      console.log("Team fetch error:", err);
    }

    setLoading(false);
  };

  const createUser = async ({ name, email, role }: CreateUserPayload) => {
    try {
      await fetch(`${BASE_URL}/api/team/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: JSON.stringify({ name, email, role }),
      });

      await fetchTeam();
    } catch (err) {
      console.log("Team create error:", err);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await fetch(`${BASE_URL}/api/team/delete/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      await fetchTeam();
    } catch (err) {
      console.log("Team delete error:", err);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  return { team, loading, createUser, deleteUser, refresh: fetchTeam };
}
