import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/products';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
    });
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <article className="group bg-card rounded-xl shadow-md overflow-hidden border border-border hover:shadow-lg transition-all duration-300">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden aspect-square">
          <img
            src={product.image}
            alt={`${product.name} - ${product.category} product`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
              {product.category}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-foreground text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium text-sm"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;
