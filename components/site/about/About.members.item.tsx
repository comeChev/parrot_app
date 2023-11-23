import { PublicUser } from "@/app/api/users/route";
import React from "react";
import { User } from "@prisma/client";

type AboutMembersItemProps = {
  user: PublicUser;
};

function getInitials(user: User | PublicUser) {
  if (user.user_last_name === "") {
    return user.user_first_name[0].toUpperCase();
  }
  let initials = user.user_first_name[0] + user.user_last_name[0];
  return initials.toUpperCase();
}

function getFullName(user: User | PublicUser) {
  if (user.user_last_name === "") {
    return `${user.user_first_name}`;
  }
  return `${user.user_first_name} ${user.user_last_name.toUpperCase()}`;
}

const ProfilePicture = ({ user }: { user: User | PublicUser }) => {
  return user.user_image !== null ? (
    <img
      src={user.user_image}
      alt={getFullName(user)}
      className="w-10 h-10 rounded-full object-cover"
    />
  ) : (
    <div
      className={`w-10 h-10 ${
        !user.user_gender || user.user_gender === "MALE"
          ? "bg-neutral-700"
          : "bg-pink-600"
      } rounded-full flex items-center justify-center text-neutral-100`}
    >
      {getInitials(user)}
    </div>
  );
};

export default function AboutMembersItem({ user }: AboutMembersItemProps) {
  return (
    <div className="flex items-center mb-5">
      <ProfilePicture user={user} />
      <div className="ml-3">
        <h6 className="text-base font-semibold font-title leading-4">
          {getFullName(user)}
        </h6>

        {user.user_job && (
          <p className="text-sm font-semibold text-neutral-500">
            {user.user_job}
          </p>
        )}
        <p className="text-sm italic text-neutral-400">{`${
          user.user_gender === ("MALE" || "") ? "Arrivé en " : "Arrivée en "
        } ${
          user.user_arrival ? new Date(user.user_arrival).getFullYear() : 2020
        }`}</p>
      </div>
    </div>
  );
}
