import { useEffect, useState } from "react";
import { SearchContainer } from "../../Containers";

export const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = () => {
    try {
      setLoading(true);
      fetch(
        "https://dummyjson.com/users?limit=20&&select=firstName,lastName,email,image"
      )
        .then((res) => res.json())
        .then((res) => {
          setUsers(res.users);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      setError("Error to load the list");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col items-center gap-10 px-20 py-30">
      <h1 className="color text-sky-500 text-3xl font-semibold	">Pick Users</h1>

      <SearchContainer users={users} loading={loading} error={error} />
    </div>
  );
};
