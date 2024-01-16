import React from "react";
import { User } from "../../Types/users.interface";

type DropdownProps = {
  search: string;
  users: User[] | null;
  loading: boolean | null;
  error: string | null;
  handleUser: (x: User) => void;
};

export const Dropdown: React.FC<DropdownProps> = ({
  search,
  users,
  loading,
  error,
  handleUser,
}) => {
  return (
    <div className="border max-h-48 bg-white min-w-36 overflow-auto shadow-lg mt-1 rounded-md">
      {error ? (
        <div className="flex items-center min-h-24 justify-center text-slate-400">
          Error
        </div>
      ) : loading ? (
        <div className="flex items-center min-h-24 justify-center text-slate-400">
          Loading ...
        </div>
      ) : users?.length === 0 ? (
        <div className="flex items-center min-h-24 justify-center text-slate-400">
          No Users
        </div>
      ) : (
        users?.map((user) => (
          <div
            className="flex  h-auto gap-4 justify-between items-center px-2 py-4 hover:bg-slate-100"
            key={user.id}
            onClick={() => {
              handleUser(user);
            }}
          >
            <div className="flex gap-2 items-center">
              <img
                className="rounded-full border bg-white	w-8 h-8"
                src={user.image}
              />{" "}
              <div className=" text-sm flex items-center">
                <span className="text-slate-300 whitespace-break-spaces	">
                  {(user.firstName + " " + user.lastName).slice(
                    0,
                    search.length
                  )}
                </span>
                <span className="whitespace-break-spaces	">
                  {(user.firstName + " " + user.lastName).slice(search.length)}
                </span>
              </div>
            </div>
            <div className="text-xs text-slate-400 break-all">{user.email}</div>
          </div>
        ))
      )}
    </div>
  );
};
