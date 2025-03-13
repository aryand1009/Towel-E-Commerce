
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

// Mock product data
const products = [
  {
    id: '1',
    name: 'Ultra Soft Bath Towel',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Bath',
    isNew: true
  },
  {
    id: '2',
    name: 'Premium Hand Towel Set',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1583845112203-29329902332e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Hand',
    isBestseller: true
  },
  {
    id: '3',
    name: 'Luxury Face Towel',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1616627561950-9f746e330187?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Face',
  },
  {
    id: '4',
    name: 'Organic Cotton Beach Towel',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1602446256091-ec9408672d87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Beach',
    isNew: true
  },
  {
    id: '5',
    name: 'Microfiber Gym Towel',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Sport',
    isBestseller: true
  },
  {
    id: '6',
    name: 'Bamboo Bath Sheet',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1613545405832-ef47cb0e255f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Bath',
  },
  {
    id: '7',
    name: 'Waffle Weave Hand Towel',
    price: 26.99,
    image: 'https://images.unsplash.com/photo-1551854838-212c9a5d7325?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Hand',
  },
  {
    id: '8',
    name: 'Kids Hooded Towel',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1629392554711-1b50db125f1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Kids',
    isNew: true
  }
];

// Filter categories
const categories = ['All', 'Bath', 'Hand', 'Face', 'Beach', 'Sport', 'Kids'];

const ProductGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [visibleProducts, setVisibleProducts] = useState(4);
  
  // Filter products when category changes
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Our Collection</h2>
          <p className="text-towel-gray max-w-2xl mx-auto">
            Explore our range of premium towels designed for luxury, comfort, and durability. 
            Each piece is crafted with attention to detail and the finest materials.
          </p>
        </div>
        
        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${selectedCategory === category 
                  ? 'bg-towel-dark text-white' 
                  : 'bg-towel-beige text-towel-dark hover:bg-towel-accent/50'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, visibleProducts).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        
        {/* Load more button */}
        {visibleProducts < filteredProducts.length && (
          <div className="text-center mt-12">
            <button 
              onClick={() => setVisibleProducts(prev => prev + 4)}
              className="border border-towel-dark text-towel-dark px-6 py-2.5 rounded-lg font-medium transition-all duration-300 hover:bg-towel-dark hover:text-white"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
