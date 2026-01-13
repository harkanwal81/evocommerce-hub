import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, CreditCard, Check, Lock } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

interface FormErrors {
  [key: string]: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const cartTotal = getCartTotal();
  const shippingCost = cartTotal >= 100 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const orderTotal = cartTotal + shippingCost + tax;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Invalid ZIP code';
    }
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Invalid card number';
    }
    if (!formData.expiry.trim()) {
      newErrors.expiry = 'Expiry is required';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = 'Use MM/YY format';
    }
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Invalid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors in the form.',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    clearCart();
    setIsProcessing(false);
    
    toast({
      title: 'Order Confirmed!',
      description: 'Thank you for your purchase. Check your email for confirmation.',
    });

    navigate('/order-success');
  };

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h1>
          <Link to="/" className="text-primary hover:underline">
            Continue Shopping
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout - ModernShop</title>
        <meta name="description" content="Complete your purchase securely at ModernShop." />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Sections */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Information */}
              <section className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">Shipping Information</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.firstName ? 'border-destructive' : 'border-border'
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-destructive text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.lastName ? 'border-destructive' : 'border-border'
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-destructive text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.email ? 'border-destructive' : 'border-border'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                      className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.phone ? 'border-destructive' : 'border-border'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-destructive text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.address ? 'border-destructive' : 'border-border'
                      }`}
                    />
                    {errors.address && (
                      <p className="text-destructive text-sm mt-1">{errors.address}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.city ? 'border-destructive' : 'border-border'
                      }`}
                    />
                    {errors.city && (
                      <p className="text-destructive text-sm mt-1">{errors.city}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.state ? 'border-destructive' : 'border-border'
                        }`}
                      />
                      {errors.state && (
                        <p className="text-destructive text-sm mt-1">{errors.state}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        ZIP *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.zipCode ? 'border-destructive' : 'border-border'
                        }`}
                      />
                      {errors.zipCode && (
                        <p className="text-destructive text-sm mt-1">{errors.zipCode}</p>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Payment Information */}
              <section className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Payment Information</h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    Secure
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Card Number *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pr-12 ${
                          errors.cardNumber ? 'border-destructive' : 'border-border'
                        }`}
                      />
                      <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    </div>
                    {errors.cardNumber && (
                      <p className="text-destructive text-sm mt-1">{errors.cardNumber}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.expiry ? 'border-destructive' : 'border-border'
                        }`}
                      />
                      {errors.expiry && (
                        <p className="text-destructive text-sm mt-1">{errors.expiry}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        maxLength={4}
                        className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.cvv ? 'border-destructive' : 'border-border'
                        }`}
                      />
                      {errors.cvv && (
                        <p className="text-destructive text-sm mt-1">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Order Summary */}
            <aside className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

                {/* Cart Items Preview */}
                <div className="space-y-4 mb-6">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-sm font-medium text-primary">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between font-bold text-foreground text-lg">
                      <span>Total</span>
                      <span>${orderTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex items-center justify-center gap-2 w-full py-4 mt-6 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Place Order
                    </>
                  )}
                </button>
              </div>
            </aside>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Checkout;
