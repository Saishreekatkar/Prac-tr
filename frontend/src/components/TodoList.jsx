import { useState } from "react";
import EmptyState from "./EmptyState";
import TodoItem from "./Todoitem";
import Modal from "./Modal";

function TodoList({
  todos,
  editingId,
  editingTitle,
  setEditingTitle,
  onComplete,
  onEditClick,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [todoToDelete, setTodoToDelete] = useState(null);

  const todosPerPage = 3;

  const lastTodoIndex = currentPage * todosPerPage;
  const firstTodoIndex = lastTodoIndex - todosPerPage;

  const currentTodos = todos.slice(firstTodoIndex, lastTodoIndex);

  const totalPages = Math.ceil(todos.length / todosPerPage);

  const openDeleteModal = (todoId) => {
    setTodoToDelete(todoId);
  };

  const closeDeleteModal = () => {
    setTodoToDelete(null);
  };

  const confirmDelete = () => {
    onDelete(todoToDelete);
    setTodoToDelete(null);
  };

  if (todos.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>
      <div className="space-y-2">
        {currentTodos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            editingId={editingId}
            editingTitle={editingTitle}
            setEditingTitle={setEditingTitle}
            onComplete={onComplete}
            onEditClick={onEditClick}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
            onDelete={openDeleteModal}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded bg-gray-200 px-4 py-2 text-sm text-gray-700 disabled:opacity-50"
          >
            Previous
          </button>

          <p className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </p>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded bg-gray-900 px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      <Modal
        isOpen={todoToDelete !== null}
        title="Delete Todo"
        onClose={closeDeleteModal}
      >
        <p className="mb-6 text-gray-600">
          Are you sure you want to delete this todo?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={closeDeleteModal}
            className="rounded bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={confirmDelete}
            className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default TodoList;