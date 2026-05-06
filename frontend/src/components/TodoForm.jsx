function TodoForm({ title, setTitle, onAddTodo }) {
  return (
    <form onSubmit={onAddTodo} className="mb-4 flex gap-2">
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
  );
}

export default TodoForm;