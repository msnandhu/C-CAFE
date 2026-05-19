import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Student Pages
import WelcomePage from './pages/Student/WelcomePage';
import LoginPage from './pages/Student/LoginPage';
import Dashboard from './pages/Student/Dashboard';
import MenuPage from './pages/Student/MenuPage';
import ItemDetail from './pages/Student/ItemDetail';
import CartCheckout from './pages/Student/CartCheckout';
import LiveTracking from './pages/Student/LiveTracking';
import ProfilePage from './pages/Student/ProfilePage';
import StickyCart from './components/StickyCart';

// Admin Pages
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import OrderManagement from './pages/Admin/OrderManagement';
import KitchenDashboard from './pages/Admin/KitchenDashboard';

import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [student, setStudent] = useState(null);
  
  const addToCart = (item) => {
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      setCart(cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i));
    } else {
      setCart([...cart, item]);
    }
  };

  const updateCartQuantity = (id, change) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + change;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const clearCart = () => setCart([]);

  return (
    <Router>
      <div className="app-wrapper">
        <Routes>
          {/* Student Routes */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage setStudent={setStudent} />} />
          <Route path="/dashboard" element={student ? <Dashboard student={student} /> : <Navigate to="/login" />} />
          <Route path="/menu" element={<MenuPage addToCart={addToCart} />} />
          <Route path="/item/:id" element={<ItemDetail addToCart={addToCart} />} />
          <Route path="/cart" element={<CartCheckout cart={cart} updateCartQuantity={updateCartQuantity} student={student} clearCart={clearCart} />} />
          <Route path="/track/:orderId" element={<LiveTracking />} />
          <Route path="/profile" element={student ? <ProfilePage student={student} setStudent={setStudent} /> : <Navigate to="/login" />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<OrderManagement />} />
          <Route path="/admin/kitchen" element={<KitchenDashboard />} />
        </Routes>
        <StickyCart cart={cart} updateCartQuantity={updateCartQuantity} />
      </div>
    </Router>
  );
}

export default App;
