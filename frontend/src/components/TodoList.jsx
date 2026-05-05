import EmptyState from "./EmptyState";
import TodoItem from "./Todoitem";

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
  if (todos.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
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
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TodoList;