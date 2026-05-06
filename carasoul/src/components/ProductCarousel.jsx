import { useRef } from "react";

export default function ProductCarousel({ products }) {
  const sliderRef = useRef(null);

  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500">No products found.</p>;
  }

  const scrollPrevious = () => {
    sliderRef.current.scrollBy({
      left: -320,
      behavior: "smooth",
    });
  };

  const scrollNext = () => {
    sliderRef.current.scrollBy({
      left: 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-[#faf7f2] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
              New Arrivals
            </p>

            <h2 className="mt-2 text-3xl font-bold text-stone-900">
              Featured Products
            </h2>
          </div>

          <div className="hidden gap-3 sm:flex">
            <button
              onClick={scrollPrevious}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 bg-white text-3xl text-stone-900 shadow-sm transition hover:bg-stone-900 hover:text-white"
            >
              ‹
            </button>

            <button
              onClick={scrollNext}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 bg-white text-3xl text-stone-900 shadow-sm transition hover:bg-stone-900 hover:text-white"
            >
              ›
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto scroll-smooth pb-5"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[250px] overflow-hidden rounded-3xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl sm:min-w-[290px]"
            >
              <div className="h-[300px] overflow-hidden bg-stone-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div className="p-5">
                <p className="text-sm font-medium text-amber-700">
                  {product.category}
                </p>

                <h3 className="mt-2 text-lg font-bold text-stone-900">
                  {product.name}
                </h3>

                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xl font-bold text-stone-900">
                    ₹{product.price}
                  </span>

                  {product.oldPrice && (
                    <span className="text-sm text-stone-400 line-through">
                      ₹{product.oldPrice}
                    </span>
                  )}
                </div>

                <button className="mt-5 w-full rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition ">
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}