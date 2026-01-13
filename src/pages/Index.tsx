import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import ProductGrid from '@/components/product/ProductGrid';
import { products } from '@/data/products';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>ModernShop - Premium Quality Products for Modern Living</title>
        <meta
          name="description"
          content="Discover premium quality products at ModernShop. Shop electronics, accessories, bags, and footwear with free shipping on orders over Rs1000."
        />
        <meta name="keywords" content="online shopping, premium products, electronics, accessories, fashion, modern lifestyle" />
      </Helmet>

      <Layout>
        <Hero />
        <Features />
        <div className="container mx-auto px-4">
          <ProductGrid products={products} title="Featured Products" />
        </div>
      </Layout>
    </>
  );
};

export default Index;
