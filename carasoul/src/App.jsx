import Carousel from "./component/Carousel";

const carouselImages = [
  "https://picsum.photos/id/1015/600/300",
  "https://picsum.photos/id/1016/600/300",
  "https://picsum.photos/id/1018/600/300",
  "https://picsum.photos/id/1020/600/300",
  "https://picsum.photos/id/1024/600/300",
];

function App() {
  return (
    <div>
      <h1>Reusable Carousel</h1>

      <Carousel images={carouselImages} />
    </div>
  );
}

export default App;