import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";

export default function UsersListProfile({ user }: { user: User }) {
  function getFullName(user: User) {
    if (user.user_last_name) {
      return `${user.user_last_name.toUpperCase()} ${user.user_first_name}`;
    }
    return user.user_first_name;
  }
  function getInitials(user: User) {
    if (user.user_last_name) {
      return `${user.user_last_name[0]}${user.user_first_name[0]}`;
    }
    return user.user_first_name[0];
  }
  return (
    <div className="flex items-center">
      {/* Picture */}
      {user.user_image ? (
        <Image
          height={30}
          width={30}
          src={user.user_image}
          alt={getFullName(user)}
          className="rounded-full mr-2 h-[30px] w-[30px] hidden lg:block"
        />
      ) : (
        <div
          aria-label={getFullName(user)}
          className="w-[30px] h-[30px] rounded-full text-sm items-center justify-center mr-2 text-neutral-100 bg-violet-700 hidden lg:flex"
        >
          {getInitials(user)}
        </div>
      )}
      <p className="truncate">{getFullName(user)}</p>
    </div>
  );
}
