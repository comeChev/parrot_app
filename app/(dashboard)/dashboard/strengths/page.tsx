"use client";

import {
  createStrength,
  deleteStrength,
  getStrengths,
  updateStrength,
} from "@/lib/strengths";
import { Strength } from "@prisma/client";
import { useEffect, useState } from "react";

export default function page() {
  const [strengths, setStrengths] = useState<Strength[]>([]);

  async function handleCreate() {
    const strength: Partial<Strength> = {
      strength_name: "Bluetoooth",
    };
    const response = await createStrength(strength);
    if (response) {
      setStrengths([...strengths, response]);
    }
  }

  async function handleUpdate(id: number) {
    const strength: Partial<Strength> = {
      strength_name: "Boîte automatique",
    };

    //optimistic update
    const oldStrengths = strengths;
    setStrengths((prev) =>
      prev.map((s) => (s.strength_id === id ? { ...s, ...strength } : s))
    );

    //update in database
    const response = await updateStrength(id, strength);

    //on error, rollback
    if (!response) {
      setStrengths(oldStrengths);
    }
  }

  async function handleDelete(id: number) {
    const strength: Partial<Strength> = {
      strength_name: "Boîte automatique",
    };

    //optimistic update
    const oldStrengths = strengths;
    setStrengths((prev) => prev.filter((s) => s.strength_id !== id));

    //update in database
    const response = await deleteStrength(id);

    //on error, rollback
    if (!response) {
      setStrengths(oldStrengths);
    }
  }

  useEffect(() => {
    async function fetchStrengths() {
      const response = await getStrengths();
      if (response) {
        setStrengths(response);
      }
    }
    fetchStrengths();
  }, []);
  return (
    <div>
      <h1>Points forts</h1>
      <button onClick={handleCreate}>Créer un point fort</button>
      ------------------------
      <div>
        {strengths.map((s) => (
          <div>
            <h2>
              {s.strength_id} - {s.strength_name}
            </h2>
            <button onClick={() => handleUpdate(s.strength_id)}>
              Modifier
            </button>
            <button onClick={() => handleDelete(s.strength_id)}>
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
