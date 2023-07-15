"use client";
import UiButtonAction from "@/components/ui/Ui.button.action";
import { User } from "@prisma/client";
import UserForm, { defaultUser } from "./User.form";
import { useRef } from "react";

type UserAddOrCreateProps = {
  usersDB: User[];
  curentUser: User;
  setCurentUser: React.Dispatch<React.SetStateAction<User>>;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenForm: boolean;
  isNew: boolean;
  setIsNew: React.Dispatch<React.SetStateAction<boolean>>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};
export default function UserAddOrCreate({
  setUsers,
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

  const list = useRef(null);
  return (
    <div>
      <div className="mb-16" ref={list}>
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
          setUsers={setUsers}
          isNew={isNew}
          curentUser={curentUser}
          setIsOpenForm={setIsOpenForm}
        />
      )}
    </div>
  );
}
