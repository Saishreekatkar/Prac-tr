import { useEffect, useState } from "react";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "./api/todoApi";

import TodoForm from "./components/TodoForm";
import ErrorMessage from "./components/ErrorMessage";
import TodoList from "./components/TodoList";

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
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow">
        <h1 className="mb-2 text-2xl font-bold text-gray-800">
          Todo List
        </h1>

        <TodoForm
          title={title}
          setTitle={setTitle}
          onAddTodo={handleAddTodo}
        />

        <ErrorMessage message={error} />

        <TodoList
          todos={todos}
          editingId={editingId}
          editingTitle={editingTitle}
          setEditingTitle={setEditingTitle}
          onComplete={handleComplete}
          onEditClick={handleEditClick}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={handleCancelEdit}
          onDelete={handleDelete}
        />
      </div>
    </main>
  );
}

export default App;