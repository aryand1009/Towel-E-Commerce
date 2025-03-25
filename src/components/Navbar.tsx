
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import CartModal from './CartModal';
import NavLinks from './navbar/NavLinks';
import UserMenu from './navbar/UserMenu';
import CartButton from './navbar/CartButton';
import MobileMenu from './navbar/MobileMenu';
import { loadCartFromStorage, addItemToCart, CartItem } from './navbar/cartUtils';

// Define CartItem type for global access
declare global {
  interface Window {
    addToCart: (item: {
      id: string;
      name: string;
      price: number;
      quantity?: number;
      image: string;
    }) => void;
  }
}

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Load cart items from localStorage on component mount
  useEffect(() => {
    setCartItems(loadCartFromStorage());
    
    // Create global addToCart function
    window.addToCart = (item) => {
      setCartItems(prevItems => addItemToCart(item, prevItems));
    };
    
    // Clean up on unmount
    return () => {
      delete window.addToCart;
    };
  }, []);

  // Create a new useEffect to listen for storage events
  useEffect(() => {
    const handleStorageChange = () => {
      setCartItems(loadCartFromStorage());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  // Remove item from cart
  const removeFromCart = (id: string) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== id);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  // Calculate total items in cart
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-towel-blue mr-8">DTex</Link>
          <NavLinks isAdmin={isAdmin} />
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <UserMenu user={user} onLogout={logout} />
              
              {!isAdmin && (
                <CartButton 
                  cartItemsCount={cartItemsCount} 
                  onClick={() => setIsCartOpen(true)} 
                />
              )}
              
              <MobileMenu 
                user={user} 
                isAdmin={isAdmin} 
                onLogout={logout} 
                cartItemsCount={cartItemsCount}
                onCartOpen={() => setIsCartOpen(true)}
              />
            </>
          ) : (
            <UserMenu user={null} onLogout={logout} />
          )}
        </div>
      </nav>
      
      {/* Cart Modal */}
      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
      />
    </header>
  );
};

export default Navbar;
