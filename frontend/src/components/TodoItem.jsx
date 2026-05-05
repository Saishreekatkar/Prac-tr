function TodoItem({
  todo,
  editingId,
  editingTitle,
  setEditingTitle,
  onComplete,
  onEditClick,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}) {
  // Checks whether this row is currently in edit mode
  const isEditing = editingId === todo._id;

  return (
    <div className="flex items-center justify-between rounded border border-gray-200 px-3 py-2">
      {isEditing ? (
        // Edit mode UI
        <div className="flex w-full gap-2">
          <input
            type="text"
            value={editingTitle}
            onChange={(event) => setEditingTitle(event.target.value)}
            className="flex-1 rounded border border-gray-300 px-2 py-1 outline-none focus:border-blue-500"
          />

          <button
            onClick={() => onSaveEdit(todo._id)}
            className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
          >
            Save
          </button>

          <button
            onClick={onCancelEdit}
            className="rounded bg-gray-300 px-3 py-1 text-sm text-gray-800 hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      ) : (
        // Normal row UI
        <>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => onComplete(todo)}
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
              onClick={() => onEditClick(todo)}
              className="text-sm text-blue-600 hover:underline"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(todo._id)}
              className="text-sm text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TodoItem;