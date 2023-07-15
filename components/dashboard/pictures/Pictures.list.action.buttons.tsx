"use client";

import { deletePicture, updatePicture } from "@/lib/pictures";
import { deleteFile } from "@/utils/supabase.upload";
import { Picture } from "@prisma/client";
import { useState } from "react";
import {
  BsExclamationDiamondFill,
  BsEyeFill,
  BsFillDiamondFill,
  BsFillEyeSlashFill,
  BsPenFill,
  BsTrash2Fill,
} from "react-icons/bs";

type PicturesListActionEditProps = {
  picture: Picture;
  setCurrent: React.Dispatch<React.SetStateAction<Picture>>;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNew: React.Dispatch<React.SetStateAction<boolean>>;
  list: React.RefObject<HTMLDivElement>;
};

export function PicturesListActionEdit({
  picture,
  setCurrent,
  setOpenForm,
  setIsOpen,
  setIsNew,
  list,
}: PicturesListActionEditProps) {
  function handleEdit() {
    setCurrent(picture);
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

type PicturesListActionStatusProps = {
  picture: Picture;
  setPictures: React.Dispatch<React.SetStateAction<Picture[]>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function PicturesListActionStatus({
  picture,
  setPictures,
  setIsOpen,
}: PicturesListActionStatusProps) {
  const status = picture.picture_status;

  async function handleActive() {
    //optimistic update
    setPictures((prev) =>
      prev.map((p) => {
        if (p.picture_id === picture.picture_id) {
          return { ...p, picture_status: "ONLINE" };
        }
        return p;
      })
    );

    //update DB
    const res = await updatePicture(picture.picture_id, {
      ...picture,
      picture_status: "ONLINE",
    });

    //rollback if error
    if (res === null) {
      setPictures((prev) =>
        prev.map((p) => {
          if (p.picture_id === picture.picture_id) {
            return { ...p, picture_status: "OFFLINE" };
          }
          return p;
        })
      );
    }
    setIsOpen(false);
  }

  async function handleInactive() {
    //optimistic update
    setPictures((prev) =>
      prev.map((p) =>
        p.picture_id === picture.picture_id
          ? { ...p, picture_status: "OFFLINE" }
          : p
      )
    );

    //update DB
    const res = await updatePicture(picture.picture_id, {
      ...picture,
      picture_status: "OFFLINE",
    });

    //rollback if error
    if (!res) {
      setPictures((prev) =>
        prev.map((p) =>
          p.picture_id === picture.picture_id
            ? { ...p, picture_status: "ONLINE" }
            : p
        )
      );
    }
    setIsOpen(false);
  }

  return picture.picture_status === "ONLINE" ? (
    <button
      className="text-md text-amber-600 hover:text-amber-700 disabled:text-neutral-300 flex items-center justify-between hover:bg-neutral-200 px-4 py-2"
      onClick={handleInactive}
    >
      <span className="text-sm">Retirer</span>
      <BsFillEyeSlashFill className="" />
    </button>
  ) : (
    <button
      className="text-md text-indigo-500 hover:text-indigo-700 disabled:text-neutral-300 flex items-center justify-between hover:bg-neutral-200 px-4 py-2"
      onClick={handleActive}
    >
      <span className="text-sm">Publier</span>
      <BsEyeFill className="" />
    </button>
  );
}

export function PicturesListActionDelete({
  picture,
  setPictures,
  setIsOpen,
}: PicturesListActionStatusProps) {
  const [isConfirm, setIsConfirm] = useState(false);

  async function handleDelete() {
    //optimistic update
    setPictures((prev) =>
      prev.filter((p) => p.picture_id !== picture.picture_id)
    );

    //Delete picture in supabase
    const { data, success } = await deleteFile(picture.picture_fileKey);
    if (!success) {
      setPictures((prev) => [...prev, picture]);
      setIsOpen(false);
      return;
    }

    //update DB
    const res = await deletePicture(picture.picture_id);
    if (!res) {
      setPictures((prev) => [
        ...prev,
        {
          ...picture,
          picture_fileKey: "",
          picture_status: "OFFLINE",
          picture_image: "",
        },
      ]);
      return;
      setIsOpen(false);
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
      <span className="text-sm">Confirmer la suppression</span>
      <BsExclamationDiamondFill className="" />
    </button>
  ) : (
    <button
      className="text-md text-red-700 hover:text-red-800 disabled:text-neutral-300 flex items-center justify-between hover:bg-neutral-200 px-4 py-2"
      onClick={handleConfirm}
    >
      <span className="text-sm">Supprimer</span>
      <BsTrash2Fill className="" />
    </button>
  );
}
