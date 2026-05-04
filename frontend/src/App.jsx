import { useEffect, useState } from "react";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "./api/todoApi";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [error, setError] = useState("");

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      setError("Could not load todos");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Please enter a todo");
      return;
    }

    try {
      setError("");
      const newTodo = await createTodo(title);
      setTodos([newTodo, ...todos]);
      setTitle("");
    } catch (error) {
      setError("Could not add todo");
      console.error(error);
    }
  };

  const handleComplete = async (todo) => {
    try {
      const updatedTodo = await updateTodo(todo._id, {
        isCompleted: !todo.isCompleted,
      });

      setTodos(
        todos.map((item) => (item._id === todo._id ? updatedTodo : item))
      );
    } catch (error) {
      setError("Could not update todo");
      console.error(error);
    }
  };

  const handleEditClick = (todo) => {
    setEditingId(todo._id);
    setEditingTitle(todo.title);
  };

  const handleSaveEdit = async (id) => {
    if (!editingTitle.trim()) {
      setError("Todo cannot be empty");
      return;
    }

    try {
      setError("");
      const updatedTodo = await updateTodo(id, {
        title: editingTitle,
      });

      setTodos(
        todos.map((todo) => (todo._id === id ? updatedTodo : todo))
      );

      setEditingId(null);
      setEditingTitle("");
    } catch (error) {
      setError("Could not save todo");
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      setError("Could not delete todo");
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow">
        <h1 className="mb-2 text-2xl font-bold text-gray-800">
          Todo List
        </h1>

        

        <form onSubmit={handleAddTodo} className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder="enter task"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="flex-1 rounded border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Add
          </button>
        </form>

        {error && (
          <p className="mb-4 rounded bg-red-100 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="space-y-2">
          {todos.length === 0 ? (
            <p className="py-6 text-center text-gray-500">
              No todos found.
            </p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo._id}
                className="flex items-center justify-between rounded border border-gray-200 px-3 py-2"
              >
                {editingId === todo._id ? (
                  <div className="flex w-full gap-2">
                    <input
                      type="text"
                      value={editingTitle}
                      onChange={(event) =>
                        setEditingTitle(event.target.value)
                      }
                      className="flex-1 rounded border border-gray-300 px-2 py-1 outline-none focus:border-blue-500"
                    />

                    <button
                      onClick={() => handleSaveEdit(todo._id)}
                      className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
                    >
                      Save
                    </button>

                    <button
                      onClick={handleCancelEdit}
                      className="rounded bg-gray-300 px-3 py-1 text-sm text-gray-800 hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={todo.isCompleted}
                        onChange={() => handleComplete(todo)}
                      />

                      <span
                        className={
                          todo.isCompleted
                            ? "text-gray-400 line-through"
                            : "text-gray-800"
                        }
                      >
                        {todo.title}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(todo)}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(todo._id)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

export default App;