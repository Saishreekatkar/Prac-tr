import { useState } from "react";

const images = [
  "https://picsum.photos/id/1015/600/300",
  "https://picsum.photos/id/1016/600/300",
  "https://picsum.photos/id/1018/600/300",
]

export default function carousel(){
  const [current,setCurrent]= useState(0)

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current=== images.length-1 ? 0 : current+1);
  }

  return (
    <div>
      <img src={images[current]}
      alt="slide" ></img>
      <button onClick={prevSlide}>prev</button>
      <button onClick={nextSlide}>next</button>
    </div>
  )
}