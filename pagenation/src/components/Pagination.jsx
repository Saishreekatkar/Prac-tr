function Pagination({
  currentPage,
  totalPages,
  setCurrentPage
}) {
  return (
    <div className="flex justify-center items-center gap-4 mt-10">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-5 py-2 rounded-xl font-semibold text-white transition
        ${
          currentPage === 1
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        ← Prev
      </button>

      <div className="bg-white shadow-md px-6 py-2 rounded-xl text-lg font-bold">
        Page {currentPage} of {totalPages}
      </div>

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-5 py-2 rounded-xl font-semibold text-white transition
        ${
          currentPage === totalPages
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        Next →
      </button>
    </div>
  );
}

export default Pagination;