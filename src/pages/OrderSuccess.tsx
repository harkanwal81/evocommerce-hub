import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const OrderSuccess = () => {
  const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}`;

  return (
    <>
      <Helmet>
        <title>Order Confirmed - ModernShop</title>
        <meta name="description" content="Your order has been successfully placed. Thank you for shopping with ModernShop." />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-4">Order Confirmed!</h1>
            
            <p className="text-muted-foreground mb-6">
              Thank you for your purchase. We've received your order and will begin processing it right away.
            </p>

            <div className="bg-card rounded-xl border border-border p-6 mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Package className="w-6 h-6 text-primary" />
                <span className="font-semibold text-foreground">Order Number</span>
              </div>
              <p className="text-2xl font-bold text-primary">{orderNumber}</p>
              <p className="text-sm text-muted-foreground mt-2">
                A confirmation email has been sent to your email address.
              </p>
            </div>

            <div className="space-y-4 text-left bg-accent/50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-foreground">What happens next?</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">1</span>
                  <span>We'll prepare your items for shipment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">2</span>
                  <span>You'll receive a shipping confirmation with tracking info</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">3</span>
                  <span>Your order will be delivered within 3-5 business days</span>
                </li>
              </ul>
            </div>

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Continue Shopping
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default OrderSuccess;
