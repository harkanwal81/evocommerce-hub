import headphonesImg from '@/assets/products/headphones.jpg';
import watchImg from '@/assets/products/watch.jpg';
import backpackImg from '@/assets/products/backpack.jpg';
import sneakersImg from '@/assets/products/sneakers.jpg';
import speakerImg from '@/assets/products/speaker.jpg';
import sunglassesImg from '@/assets/products/sunglasses.jpg';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  features: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 299.99,
    image: headphonesImg,
    description: 'Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions for all-day wear.',
    category: 'Electronics',
    features: ['Active Noise Cancellation', '30-Hour Battery', 'Bluetooth 5.0', 'Premium Comfort'],
  },
  {
    id: 2,
    name: 'Classic Leather Watch',
    price: 189.99,
    image: watchImg,
    description: 'Elegant timepiece with genuine leather strap and rose gold finish. Swiss movement ensures precision, while the minimalist design complements any outfit.',
    category: 'Accessories',
    features: ['Swiss Movement', 'Genuine Leather', 'Water Resistant', 'Rose Gold Finish'],
  },
  {
    id: 3,
    name: 'Urban Travel Backpack',
    price: 129.99,
    image: backpackImg,
    description: 'Versatile backpack designed for the modern traveler. Features a padded laptop compartment, multiple organization pockets, and water-resistant fabric.',
    category: 'Bags',
    features: ['Laptop Compartment', 'Water Resistant', 'Ergonomic Design', 'USB Charging Port'],
  },
  {
    id: 4,
    name: 'Performance Running Sneakers',
    price: 159.99,
    image: sneakersImg,
    description: 'Lightweight and responsive running shoes engineered for peak performance. Advanced cushioning technology provides exceptional comfort mile after mile.',
    category: 'Footwear',
    features: ['Lightweight Design', 'Advanced Cushioning', 'Breathable Mesh', 'Durable Outsole'],
  },
  {
    id: 5,
    name: 'Wireless Bluetooth Speaker',
    price: 79.99,
    image: speakerImg,
    description: 'Powerful portable speaker with 360-degree sound. IPX7 waterproof rating makes it perfect for outdoor adventures and poolside parties.',
    category: 'Electronics',
    features: ['360° Sound', 'IPX7 Waterproof', '24-Hour Playtime', 'Portable Design'],
  },
  {
    id: 6,
    name: 'Aviator Sunglasses',
    price: 149.99,
    image: sunglassesImg,
    description: 'Iconic aviator sunglasses with polarized lenses and gold metal frame. 100% UV protection ensures your eyes stay protected in style.',
    category: 'Accessories',
    features: ['Polarized Lenses', '100% UV Protection', 'Gold Metal Frame', 'Premium Case Included'],
  },
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getAllCategories = (): string[] => {
  return [...new Set(products.map(product => product.category))];
};
