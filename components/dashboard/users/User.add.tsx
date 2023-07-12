"use client";
import UiButtonAction from "@/components/ui/Ui.button.action";
import { User } from "@prisma/client";
import React, { useState } from "react";
import UserForm, { defaultUser } from "./User.form";

type UserAddOrCreateProps = {
  usersDB: User[];
  curentUser: User;
  setCurentUser: React.Dispatch<React.SetStateAction<User>>;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenForm: boolean;
  isNew: boolean;
  setIsNew: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function UserAddOrCreate({
  usersDB,
  curentUser,
  setCurentUser,
  setIsOpenForm,
  isOpenForm,
  isNew,
  setIsNew,
}: UserAddOrCreateProps) {
  function handleOpenForm() {
    setCurentUser(defaultUser);
    setIsNew(true);
    setIsOpenForm(true);
  }
  function handleCloseForm() {
    setCurentUser(defaultUser);
    setIsOpenForm(false);
    setIsNew(false);
  }

  return (
    <div>
      <div className="mb-16">
        {isOpenForm ? (
          <UiButtonAction
            text="Fermer le formulaire"
            onClick={handleCloseForm}
            type="button"
            href=""
          />
        ) : (
          <UiButtonAction
            text="Ajouter un utilisateur"
            onClick={handleOpenForm}
            type="button"
            href=""
          />
        )}
      </div>
      {isOpenForm && (
        <UserForm
          isNew={isNew}
          curentUser={curentUser}
          setIsOpenForm={setIsOpenForm}
        />
      )}
    </div>
  );
}
