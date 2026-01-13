import { Truck, Shield, RotateCcw, CreditCard } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free shipping on all orders over $100',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: 'Your payment information is safe with us',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day hassle-free return policy',
  },
  {
    icon: CreditCard,
    title: 'Flexible Payment',
    description: 'Multiple payment options available',
  },
];

const Features = () => {
  return (
    <section className="py-12 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-6 bg-background rounded-xl"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
