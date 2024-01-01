"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

interface DeleteButtonProps {
  listId: string;
}

const DeleteButton = ({ listId }: DeleteButtonProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/listing/${listId}`);
      if (res.status === 200) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="p-2 rounded-md bg-red-500 text-white hover:opacity-45 transition"
    >
      Detete
    </button>
  );
};

export default DeleteButton;
