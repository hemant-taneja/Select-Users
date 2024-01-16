import React, { useCallback, useEffect, useRef, useState } from "react";
import { Capsule, Dropdown, SearchInput } from "../../Components";
import { User } from "../../Types/users.interface";

type SearchContainerProps = {
  users: User[] | null;
  loading: boolean | null;
  error: string | null;
};

export const SearchContainer: React.FC<SearchContainerProps> = ({
  users,
  loading,
  error,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[] | null>([]);
  const [filterUsers, setFilterUsers] = useState<User[] | null>(users);
  const [selectedUser, setSelectedUser] = useState<number | null>();

  const filterSearch = useCallback(
    (value: string) => {
      setSelectedUser(null);
      setSearch(value);
      setFilterUsers(
        value === ""
          ? users?.filter((user) => {
              return !selectedUsers?.map(({ id }) => id).includes(user.id);
            }) || []
          : users
              ?.filter((user) =>
                `${user.firstName} ${user.lastName}`
                  .toLowerCase()
                  .startsWith(value.toLowerCase())
              )
              .filter(
                ({ id }) => !selectedUsers?.map(({ id }) => id).includes(id)
              ) || []
      );
    },
    [selectedUsers, users]
  );

  const removeUser = (ID: number) => {
    setSelectedUsers(selectedUsers?.filter(({ id }) => id !== ID) || []);
    setSelectedUser(null);
  };

  const handleUser = (user: User) => {
    setSelectedUsers((prev) => [...(prev as []), user]);
    setSearch("");
    setSelectedUser(null);
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event?.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleFocus = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleBackspace = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Backspace" && selectedUsers?.length && search === "") {
      if (selectedUser) {
        removeUser(selectedUser);
      } else {
        setSelectedUser(selectedUsers[selectedUsers?.length - 1].id);
      }
    }
  };

  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("focus", handleFocus);
      inputElement.focus();
      return () => {
        // Clean up the event listener when the component unmounts
        inputElement.removeEventListener("focus", handleFocus);
      };
    }
  }, [handleFocus, filterUsers]);

  useEffect(() => {
    setFilterUsers(users);
  }, [users]);

  useEffect(() => {
    filterSearch(search);
  }, [filterSearch, search, selectedUsers]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  useEffect(() => {
    console.log(users, selectedUsers, search, filterUsers);
  }, [users, selectedUsers, search, filterUsers]);

  return (
    <div className="flex flex-wrap border-b-2 border-sky-600 gap-2 py-2 w-full items-center">
      {selectedUsers?.map((user) => (
        <Capsule
          selectedUser={selectedUser || null}
          key={user.id}
          user={user}
          removeUser={() => removeUser(user.id)}
        />
      ))}
      <div
        className="relative grow"
        ref={dropdownRef}
        onKeyDown={handleBackspace}
      >
        {(loading || selectedUsers?.length !== users?.length) && (
          <SearchInput
            search={search}
            filterSearch={filterSearch}
            ref={inputRef}
          />
        )}

        {isOpen && selectedUsers?.length !== users?.length && (
          <div className="absolute">
            <Dropdown
              search={search}
              users={filterUsers}
              loading={loading}
              error={error}
              handleUser={handleUser}
            />
          </div>
        )}
      </div>
    </div>
  );
};
