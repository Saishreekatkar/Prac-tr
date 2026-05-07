import { useEffect, useState } from "react";

export default function Carousel({ images }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;

    const intervalId = setInterval(() => {
      setCurrent((prev) => {
        if (prev === images.length - 1) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [images]);

  if (!images || images.length === 0) {
    return <p className="text-center text-gray-500">No images found.</p>;
  }

  const prevSlide = () => {
    setCurrent((prev) => {
      if (prev === 0) {
        return images.length - 1;
      } else {
        return prev - 1;
      }
    });
  };

  const nextSlide = () => {
    setCurrent((prev) => {
      if (prev === images.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  };

  const getSlideStyle = (index) => {
    let prevIndex;
    let nextIndex;

    if (current === 0) {
      prevIndex = images.length - 1;
    } else {
      prevIndex = current - 1;
    }

    if (current === images.length - 1) {
      nextIndex = 0;
    } else {
      nextIndex = current + 1;
    }

    if (index === current) {
      return "translate-x-[-50%] scale-100 opacity-100 z-30";
    } else if (index === prevIndex) {
      return "translate-x-[-105%] scale-[0.85] opacity-50 z-20";
    } else if (index === nextIndex) {
      return "translate-x-[5%] scale-[0.85] opacity-50 z-20";
    } else {
      return "translate-x-[-50%] scale-75 opacity-0 z-10 pointer-events-none";
    }
  };

  return (
    <div className="mx-auto mt-10 w-full max-w-4xl px-4">
      <div className="relative h-[340px] overflow-hidden rounded-3xl bg-gray-100">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`absolute left-1/2 top-0 h-full w-[70%] rounded-3xl object-cover shadow-2xl transition-all duration-500 ease-in-out ${getSlideStyle(
              index
            )}`}
          />
        ))}

        <button
          onClick={prevSlide}
          className="absolute left-5 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-4xl text-gray-900 shadow-lg transition hover:bg-gray-900 hover:text-white"
        >
          ‹
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-5 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-4xl text-gray-900 shadow-lg transition hover:bg-gray-900 hover:text-white"
        >
          ›
        </button>
      </div>

      <div className="mt-5 flex justify-center gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full transition ${
              index === current ? "bg-gray-900" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}