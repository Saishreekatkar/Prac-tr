import { useState } from "react";

function KeyExample() {
  const [users, setUsers] = useState([
    { id: 1, name: "" },
    { id: 2, name: "" },
    { id: 3, name: "" }
  ]);

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Key Demo
      </h1>

      {users.map((user, index) => (
        <div
          key={index}
          className="flex gap-3 items-center bg-white p-4 rounded-xl shadow"
        >
          <input
            type="text"
            placeholder="Enter name"
            className="border p-2 rounded w-full"
          />

          <button
            onClick={() => deleteUser(user.id)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default KeyExample;