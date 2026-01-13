import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const cartTotal = getCartTotal();
  const shippingCost = cartTotal >= 100 ? 0 : 9.99;
  const orderTotal = cartTotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart - ModernShop</title>
          <meta name="description" content="View and manage items in your shopping cart at ModernShop." />
        </Helmet>

        <Layout>
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-md mx-auto text-center">
              <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-accent-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Start Shopping
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Shopping Cart ({cartItems.length} items) - ModernShop</title>
        <meta name="description" content="Review your cart and proceed to checkout at ModernShop." />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <article
                  key={item.id}
                  className="flex gap-4 p-4 bg-card rounded-xl border border-border"
                >
                  {/* Product Image */}
                  <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-3">{item.category}</p>

                    <div className="flex items-center justify-between flex-wrap gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-accent transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 font-medium text-foreground">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-accent transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price & Remove */}
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-primary">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Order Summary */}
            <aside className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  {shippingCost > 0 && (
                    <p className="text-xs text-accent-foreground bg-accent p-3 rounded-lg">
                      Add ${(100 - cartTotal).toFixed(2)} more for free shipping!
                    </p>
                  )}
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between font-bold text-foreground text-lg">
                      <span>Total</span>
                      <span>${orderTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  to="/"
                  className="flex items-center justify-center gap-2 w-full py-3 mt-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Cart;
