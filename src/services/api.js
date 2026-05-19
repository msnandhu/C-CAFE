// Mock data for the application

export const mockFoodItems = [
  { id: 1, name: "Masala Dosa", category: "Breakfast", price: 50, veg: true, available: true, prepTime: 5, image: "https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?auto=format&fit=crop&w=300&q=80", description: "Crispy rice crepe filled with spiced potato." },
  { id: 2, name: "Chicken Biryani", category: "Lunch", price: 120, veg: false, available: true, prepTime: 15, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80", description: "Aromatic basmati rice cooked with tender chicken and spices." },
  { id: 3, name: "Samosa", category: "Snacks", price: 15, veg: true, available: true, prepTime: 2, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=300&q=80", description: "Crispy pastry filled with spiced potatoes and peas." },
  { id: 4, name: "Fresh Lime Soda", category: "Juice", price: 30, veg: true, available: true, prepTime: 3, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300&q=80", description: "Refreshing sweet and salt lime soda." },
  { id: 5, name: "Veg Meals", category: "Lunch", price: 80, veg: true, available: false, prepTime: 10, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80", description: "Complete South Indian vegetarian meal." }
];

let orders = [
  {
    id: "ORD-1234",
    studentId: "20CS001",
    items: [{ ...mockFoodItems[0], quantity: 1 }],
    total: 50,
    status: "Ready", // Received, Preparing, Ready, Delivered
    time: "10:30 AM",
    token: "T-42"
  }
];

export const getFoodItems = () => Promise.resolve(mockFoodItems);
export const getOrders = () => Promise.resolve(orders);

export const placeOrder = (studentId, cartItems, total) => {
  const newOrder = {
    id: `ORD-${Math.floor(Math.random() * 10000)}`,
    studentId,
    items: cartItems,
    total,
    status: "Received",
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    token: `T-${Math.floor(Math.random() * 100)}`
  };
  orders = [newOrder, ...orders];
  return Promise.resolve(newOrder);
};

export const updateOrderStatus = (orderId, status) => {
  orders = orders.map(o => o.id === orderId ? { ...o, status } : o);
  return Promise.resolve(orders.find(o => o.id === orderId));
};
