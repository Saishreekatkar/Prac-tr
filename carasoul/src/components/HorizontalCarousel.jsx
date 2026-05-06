import { useRef } from "react";

export default function HorizontalCarousel({ images }) {
  const sliderRef = useRef(null);

  if (!images || images.length === 0) {
    return <p className="text-center text-gray-500">No images found.</p>;
  }

  const scrollPrevious = () => {
    sliderRef.current.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  const scrollNext = () => {
    sliderRef.current.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full py-10">
      <div className="mb-5 flex items-center justify-between px-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Horizontal Carousel
        </h2>

        <div className="flex gap-3">
          <button
            onClick={scrollPrevious}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-2xl text-white transition hover:bg-gray-700"
          >
            ‹
          </button>

          <button
            onClick={scrollNext}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-2xl text-white transition hover:bg-gray-700"
          >
            ›
          </button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="flex gap-5 overflow-x-auto scroll-smooth px-6 pb-5"
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="min-w-[260px] overflow-hidden rounded-3xl bg-white shadow-lg sm:min-w-[320px] lg:min-w-[380px]"
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="h-[220px] w-full object-cover sm:h-[260px]"
            />
          </div>
        ))}
      </div>
    </section>
  );
}