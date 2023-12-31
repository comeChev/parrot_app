import { BsEyeFill, BsFillEyeSlashFill, BsPenFill } from "react-icons/bs";

import { User } from "@prisma/client";
import { UserWithoutPassword } from "@/lib/sql/users";
import { updateUser } from "@/lib/users";

type UserListActionEditProps = {
  user: UserWithoutPassword;
  setCurrent: React.Dispatch<React.SetStateAction<UserWithoutPassword>>;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  list: React.RefObject<HTMLDivElement>;
};

export function UserListActionEdit({
  user,
  setCurrent,
  setOpenForm,
  setIsOpen,
  list,
}: UserListActionEditProps) {
  function handleEdit() {
    setCurrent(user);
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

type UserListActionStatusProps = {
  user: UserWithoutPassword;
  setUsers: React.Dispatch<React.SetStateAction<UserWithoutPassword[]>>;

  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function UserListActionStatus({
  user,
  setUsers,
  setIsOpen,
}: UserListActionStatusProps) {
  const status = user.user_status;

  async function handleActive() {
    //optimistic update
    setUsers((prev) =>
      prev.map((u) => {
        if (u.user_id === user.user_id) {
          return { ...u, user_status: "ACTIVE" };
        }
        return u;
      })
    );

    //update DB
    const res = await updateUser(user.user_id, {
      ...user,
      user_status: "ACTIVE",
    });

    //rollback if error
    if (res === null) {
      setUsers((prev) =>
        prev.map((u) => {
          if (u.user_id === user.user_id) {
            return { ...u, user_status: "INACTIVE" };
          }
          return u;
        })
      );
    }
    setIsOpen(false);
  }
  async function handleInactive() {
    //optimistic update
    setUsers((prev) =>
      prev.map((u) => {
        if (u.user_id === user.user_id) {
          return { ...u, user_status: "INACTIVE" };
        }
        return u;
      })
    );

    //update DB
    const res = await updateUser(user.user_id, {
      ...user,
      user_status: "INACTIVE",
    });

    //rollback if error
    if (!res) {
      setUsers((prev) =>
        prev.map((u) => {
          if (u.user_id === user.user_id) {
            return { ...u, user_status: "ACTIVE" };
          }
          return u;
        })
      );
    }
    setIsOpen(false);
  }

  return user.user_status === "ACTIVE" ? (
    <button
      className="text-md text-red-500 hover:text-red-700 disabled:text-neutral-300 flex items-center justify-between hover:bg-neutral-200 px-4 py-2"
      onClick={handleInactive}
    >
      <span className="text-sm">Bloquer</span>
      <BsFillEyeSlashFill className="" />
    </button>
  ) : (
    <button
      className="text-md text-indigo-500 hover:text-indigo-700 disabled:text-neutral-300 flex items-center justify-between hover:bg-neutral-200 px-4 py-2"
      onClick={handleActive}
      disabled={status === "ARCHIVED"}
    >
      <span className="text-sm">Débloquer</span>
      <BsEyeFill className="" />
    </button>
  );
}
