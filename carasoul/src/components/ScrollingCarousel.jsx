import { useEffect, useRef } from "react";

export default function ScrollingCarousel({ images }) {
  const sliderRef = useRef(null);
  const isPaused = useRef(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  if (!images || images.length === 0) {
    return <p className="text-center text-gray-500">No images found.</p>;
  }

  const repeatedImages = [...images, ...images];

  useEffect(() => {
    const slider = sliderRef.current;
    let animationId;

    const scroll = () => {
      if (!isPaused.current && !isDragging.current && slider) {
        slider.scrollLeft += 1;

        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
        }
      }

      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, []);

  const handlePointerDown = (event) => {
    const slider = sliderRef.current;

    isDragging.current = true;
    isPaused.current = true;

    startX.current = event.pageX - slider.offsetLeft;
    scrollLeft.current = slider.scrollLeft;

    slider.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!isDragging.current) return;

    const slider = sliderRef.current;
    const x = event.pageX - slider.offsetLeft;
    const distance = x - startX.current;

    slider.scrollLeft = scrollLeft.current - distance;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    isPaused.current = false;
  };

  return (
    <section className="w-full overflow-hidden bg-gray-100 py-10">
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
        Scrolling Carousel
      </h2>

      <div
        ref={sliderRef}
        onMouseEnter={() => {
          isPaused.current = true;
        }}
        onMouseLeave={() => {
          isPaused.current = false;
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="flex cursor-grab gap-5 overflow-x-auto px-6 active:cursor-grabbing"
      >
        {repeatedImages.map((image, index) => (
          <div
            key={index}
            className="min-w-[260px] overflow-hidden rounded-3xl bg-white shadow-lg sm:min-w-[320px] lg:min-w-[380px]"
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              draggable="false"
              className="h-[220px] w-full select-none object-cover sm:h-[260px]"
            />
          </div>
        ))}
      </div>
    </section>
  );
}