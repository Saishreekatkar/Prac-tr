import Carousel from "./components/Carousel";
import HorizontalCarousel from "./components/HorizontalCarousel";
import ProductCarousel from "./components/ProductCarousel";


const carouselImages = [
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=400&fit=crop",
];

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Audio",
    price: "4,999",
    oldPrice: "6,299",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=800&fit=crop",
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Wearables",
    price: "7,499",
    oldPrice: "8,999",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=800&fit=crop",
  },
  {
    id: 3,
    name: "Laptop Setup",
    category: "Computers",
    price: "52,999",
    oldPrice: "59,999",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=800&fit=crop",
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    category: "Accessories",
    price: "3,999",
    oldPrice: "5,299",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=800&fit=crop",
  },
  {
    id: 5,
    name: "Gaming Mouse",
    category: "Accessories",
    price: "1,499",
    oldPrice: "2,199",
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&h=800&fit=crop",
  },
  {
    id: 6,
    name: "Smart Speaker",
    category: "Smart Home",
    price: "4,299",
    oldPrice: "5,499",
    image:
      "https://images.unsplash.com/photo-1543512214-318c7553f230?w=600&h=800&fit=crop",
  },
];

function App() {
  return (
    <div>
      <Carousel images={carouselImages} />

      <HorizontalCarousel images={carouselImages} />

      <ProductCarousel products={products} />
    </div>
  );
}

export default App;