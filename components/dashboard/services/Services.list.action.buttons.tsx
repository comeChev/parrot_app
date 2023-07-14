"use client";

import {
  ServiceWithPicturesAndCategory,
  deleteService,
  updateService,
} from "@/lib/services";
import { deleteFile } from "@/utils/supabase.upload";
import { useState } from "react";
import {
  BsExclamationDiamondFill,
  BsEyeFill,
  BsFillEyeSlashFill,
  BsPenFill,
  BsTrash2Fill,
} from "react-icons/bs";

type ServicesListActionEditProps = {
  service: ServiceWithPicturesAndCategory;
  setCurrent: React.Dispatch<
    React.SetStateAction<ServiceWithPicturesAndCategory>
  >;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNew: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ServicesListActionEdit({
  service,
  setCurrent,
  setOpenForm,
  setIsOpen,
  setIsNew,
}: ServicesListActionEditProps) {
  function handleEdit() {
    setCurrent(service);
    setIsNew(false);
    setOpenForm(true);
    setIsOpen(false);
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

type ServicesListActionStatusProps = {
  service: ServiceWithPicturesAndCategory;
  setServices: React.Dispatch<
    React.SetStateAction<ServiceWithPicturesAndCategory[]>
  >;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ServicesListActionStatus({
  service,
  setServices,
  setIsOpen,
}: ServicesListActionStatusProps) {
  const status = service.service_status;

  async function handleActive() {
    //optimistic update
    setServices((prev) =>
      prev.map((s) => {
        if (s.service_id === service.service_id) {
          return { ...s, service_status: "ONLINE" };
        }
        return s;
      })
    );

    //update DB
    const res = await updateService(service.service_id, {
      ...service,
      service_status: "ONLINE",
    });

    //rollback if error
    if (res === null) {
      setServices((prev) =>
        prev.map((s) => {
          if (s.service_id === service.service_id) {
            return { ...s, service_status: "OFFLINE" };
          }
          return s;
        })
      );
    }
    setIsOpen(false);
  }

  async function handleInactive() {
    //optimistic update
    setServices((prev) =>
      prev.map((s) =>
        s.service_id === service.service_id
          ? { ...s, service_status: "OFFLINE" }
          : s
      )
    );

    //update DB
    const res = await updateService(service.service_id, {
      ...service,
      service_status: "OFFLINE",
    });

    //rollback if error
    if (!res) {
      setServices((prev) =>
        prev.map((s) =>
          s.service_id === service.service_id
            ? { ...s, service_status: "ONLINE" }
            : s
        )
      );
    }
    setIsOpen(false);
  }

  return service.service_status === "ONLINE" ? (
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

export function ServicesListActionDelete({
  service,
  setServices,
  setIsOpen,
}: ServicesListActionStatusProps) {
  const [isConfirm, setIsConfirm] = useState(false);

  async function handleDelete() {
    //optimistic update
    setServices((prev) =>
      prev.filter((s) => s.service_id !== service.service_id)
    );

    //Delete service in supabase
    if (service.service_images.length > 0) {
      service.service_images.map(async (image) => {
        const { data, success } = await deleteFile(
          image.service_picture_fileKey as string
        );
        if (!success) {
          setServices((prev) => [...prev, service]);
          setIsOpen(false);
          return;
        }
      });
    }

    //update DB
    const res = await deleteService(service.service_id);
    if (!res) {
      setServices((prev) => [
        ...prev,
        {
          ...service,
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
