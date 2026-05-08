import { useState } from "react";
import Pagination from "./components/Pagination";

function App() {
  const data = [
    " Apple",
    " Banana",
    " Mango",
    " Orange",
    " Grapes",
    " Kiwi",
    " Pineapple",
    " Watermelon",
    " Papaya",
    " Cherry",
    " Strawberry",
    " Blueberry"
  ];

  const itemsPerPage = 3;

  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const currentItems = data.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-slate-100 p-10">
     

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {currentItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-8 text-center text-2xl font-semibold text-slate-700 hover:scale-105 transition duration-300"
          >
            {item}
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;