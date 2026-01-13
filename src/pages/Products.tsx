import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/product/ProductGrid';
import { products, getAllCategories } from '@/data/products';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', ...getAllCategories()];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>All Products - ModernShop</title>
        <meta
          name="description"
          content="Browse our complete collection of premium products. Find electronics, accessories, bags, footwear and more."
        />
        <meta name="keywords" content="shop all products, electronics, accessories, fashion, premium quality" />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-foreground mb-4">All Products</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our curated collection of premium products designed for the modern lifestyle.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-foreground hover:bg-accent'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <ProductGrid products={filteredProducts} />

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No products found in this category.</p>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Products;
