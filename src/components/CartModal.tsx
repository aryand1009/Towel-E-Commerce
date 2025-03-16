
import { useState } from 'react';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  removeFromCart: (id: string) => void;
}

const CartModal = ({ isOpen, onClose, cartItems, removeFromCart }: CartModalProps) => {
  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Cart panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="py-4 px-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center">
                <ShoppingBag className="mr-2" size={20} />
                Your Cart
              </h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Cart items */}
            <div className="flex-1 overflow-y-auto py-4 px-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-towel-gray">
                  <ShoppingBag size={48} className="mb-4 opacity-30" />
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <p className="mt-2 text-sm text-center">Looks like you haven't added any items to your cart yet.</p>
                  <button 
                    onClick={onClose}
                    className="mt-6 premium-button"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="divide-y">
                  {cartItems.map(item => (
                    <li key={item.id} className="py-4 flex gap-4">
                      {/* Product image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-towel-beige/50 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Product details */}
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-towel-gray text-sm mb-2">Quantity: {item.quantity}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                          <button 
                            className="text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors"
                            aria-label="Remove item"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {/* Footer with summary */}
            {cartItems.length > 0 && (
              <div className="py-4 px-6 border-t bg-towel-beige/30">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-towel-gray">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-towel-gray">Shipping</span>
                  <span className="font-semibold">Calculated at checkout</span>
                </div>
                <button className="premium-button w-full mb-3">
                  Checkout
                </button>
                <button 
                  onClick={onClose}
                  className="w-full text-center text-towel-dark hover:text-towel-blue transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
