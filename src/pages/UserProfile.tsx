
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, FileText, ExternalLink } from 'lucide-react';

// Define order type
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  date: string;
  status: string;
}

// Define custom request type
interface CustomRequest {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  title: string;
  description: string;
  quantity: number;
  budget: number;
  phone: string;
  image: string | null;
  status: string;
  date: string;
}

const UserProfile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [customRequests, setCustomRequests] = useState<CustomRequest[]>([]);

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Load user's orders from localStorage
  useEffect(() => {
    if (isAuthenticated && user) {
      // Load orders
      const allOrders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
      // In a real application, we would filter by user ID
      // For demo purposes, we'll show all orders
      setOrders(allOrders);
      
      // Load custom requests
      const allRequests: CustomRequest[] = JSON.parse(localStorage.getItem('customRequests') || '[]');
      // Filter requests by current user
      const userRequests = allRequests.filter(request => request.userId === user.id);
      setCustomRequests(userRequests);
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return null;
  }

  // Helper function to get the status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div 
      className="container mx-auto py-24 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-panel p-8 rounded-lg max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">My Profile</h1>
        
        <div className="mb-8">
          <p className="text-towel-gray">Welcome, {user?.name || user?.email}</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className="glass-panel p-6 rounded-lg">
            <h2 className="text-xl font-medium mb-4">Account Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-towel-gray">Name</p>
                <p className="font-medium">{user?.name || "Not provided"}</p>
              </div>
              
              <div>
                <p className="text-sm text-towel-gray">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
              
              <div>
                <p className="text-sm text-towel-gray">Account Type</p>
                <p className="font-medium capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
          
          <div className="glass-panel p-6 rounded-lg">
            <Tabs defaultValue="orders">
              <TabsList className="mb-6">
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  My Orders
                </TabsTrigger>
                <TabsTrigger value="requests" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Custom Requests
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="orders">
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">Order #{order.id.substring(6, 13)}</h3>
                            <p className="text-sm text-towel-gray">
                              {new Date(order.date).toLocaleDateString()} • {order.items.length} items
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                          <p className="font-semibold">₹{order.total.toFixed(2)}</p>
                          <Button 
                            variant="outline" 
                            size="sm"
                            asChild
                            className="text-xs"
                          >
                            <Link to={`/order-details/${order.id}`} className="flex items-center gap-1">
                              View Details <ExternalLink className="h-3 w-3 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-towel-gray">You don't have any orders yet.</p>
                    <Button 
                      variant="default" 
                      className="mt-4"
                      onClick={() => navigate('/')}
                    >
                      Start Shopping
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="requests">
                {customRequests.length > 0 ? (
                  <div className="space-y-4">
                    {customRequests.map(request => (
                      <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{request.title}</h3>
                            <p className="text-sm text-towel-gray">
                              {new Date(request.date).toLocaleDateString()} • Quantity: {request.quantity}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm text-towel-gray line-clamp-2">{request.description}</p>
                          <p className="font-semibold mt-2">Budget: ${request.budget.toFixed(2)} per item</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-towel-gray">You haven't submitted any custom design requests yet.</p>
                    <Button 
                      variant="default" 
                      className="mt-4"
                      onClick={() => navigate('/custom-request')}
                    >
                      Create Custom Request
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <div className="space-y-4">
          <Button variant="outline" className="w-full">
            Edit Profile
          </Button>
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;
