import React from "react";
import { User } from "../../Types/users.interface";

type CapsuleProps = {
  selectedUser: number | null;
  user: User;
  removeUser: () => void;
};

export const Capsule: React.FC<CapsuleProps> = ({
  selectedUser,
  user,
  removeUser,
}) => {
  return (
    <div
      className={`flex gap-2 rounded-full bg-slate-200 items-center ${
        selectedUser === user.id ? "border-sky-600 border" : "border-slate-200"
      }`}
    >
      <img className="rounded-full bg-slate-100 w-8 h-8" src={user.image} />
      <span className="text-sm">
        {user.firstName} {user.lastName}
      </span>
      <span
        className="mr-2 cursor-pointer text-xs text-semibold"
        onClick={removeUser}
      >
        x
      </span>
    </div>
  );
};
