"use client";

import { deleteCategory } from "@/lib/categories";
import { deleteFile } from "@/utils/supabase.upload";
import { Category } from "@prisma/client";
import { useState } from "react";
import {
  BsExclamationDiamondFill,
  BsPenFill,
  BsTrash2Fill,
} from "react-icons/bs";

type CategoriesListActionEditProps = {
  category: Category;
  setCurrent: React.Dispatch<React.SetStateAction<Category>>;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNew: React.Dispatch<React.SetStateAction<boolean>>;
  list: React.RefObject<HTMLDivElement>;
};

export function CategoriesListActionEdit({
  category,
  setCurrent,
  setOpenForm,
  setIsOpen,
  setIsNew,
  list,
}: CategoriesListActionEditProps) {
  function handleEdit() {
    setCurrent(category);
    setIsNew(false);
    setOpenForm(true);
    setIsOpen(false);
    setTimeout(() => {
      list.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }

  return (
    <button
      type="button"
      onClick={handleEdit}
      className="text-md text-teal-500 hover:text-teal-700 disabled:text-neutral-300 flex items-center justify-between hover:bg-neutral-200 px-4 py-2"
    >
      <p className="text-sm">Éditer</p>
      <BsPenFill className="" />
    </button>
  );
}

type CategoriesListActionStatusProps = {
  category: Category;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CategoriesListActionDelete({
  category,
  setCategories,
  setIsOpen,
}: CategoriesListActionStatusProps) {
  const [isConfirm, setIsConfirm] = useState(false);

  async function handleDelete() {
    //optimistic update
    setCategories((prev) =>
      prev.filter((c) => c.category_id !== category.category_id)
    );

    //Delete category image in supabase
    if (category.category_picture) {
      const { data, success } = await deleteFile(category.category_fileKey);
      if (!success) {
        setCategories((prev) => [...prev, category]);
        setIsOpen(false);
        console.log("error deleting file");
        return;
      }
    }

    //update DB
    const res = await deleteCategory(category.category_id);
    if (!res) {
      setCategories((prev) => [
        ...prev,
        {
          ...category,
        },
      ]);
      setIsOpen(false);
      return;
    }

    setIsOpen(false);
  }

  async function handleConfirm() {
    setIsConfirm(true);
    setTimeout(() => {
      setIsConfirm(false);
    }, 2000);
  }

  return isConfirm ? (
    <button
      className="text-md text-red-700 hover:text-red-800 bg-red-200 disabled:text-neutral-300 flex items-center justify-between hover:bg-neutral-200 px-4 py-2"
      onClick={handleDelete}
    >
      <span className="text-sm mr-2">Confirmer la suppression</span>
      <BsExclamationDiamondFill className="" />
    </button>
  ) : (
    <button
      className="text-md text-red-700 hover:text-red-800 disabled:text-neutral-300 flex items-center justify-between hover:bg-neutral-200 px-4 py-2"
      onClick={handleConfirm}
    >
      <span className="text-sm mr-2">Supprimer</span>
      <BsTrash2Fill className="" />
    </button>
  );
}
