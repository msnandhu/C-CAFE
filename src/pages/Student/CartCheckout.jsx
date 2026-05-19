import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, CreditCard, QrCode, ShoppingCart } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { placeOrder } from '../../services/api';

const CartCheckout = ({ cart, updateCartQuantity, student, clearCart }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const gst = subtotal * 0.05; // 5% GST
  const total = subtotal + gst;

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const order = await placeOrder(student?.rollNo || 'GUEST', cart, total);
      clearCart();
      navigate(`/track/${order.id}`);
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="page-container animate-fade-in" style={{ padding: 0 }}>
        <Navbar title="Your Cart" showBack />
        <div className="container flex-center" style={{ height: '70vh', flexDirection: 'column', color: 'var(--text-muted)' }}>
          <ShoppingCart size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h3>Your cart is empty</h3>
          <button className="btn btn-primary" style={{ marginTop: '2rem' }} onClick={() => navigate('/menu')}>
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in" style={{ padding: 0 }}>
      <Navbar title="Checkout" showBack />
      
      <div className="container" style={{ paddingBottom: '8rem' }}>
        <div className="card glass" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
          <h4 style={{ marginBottom: '1rem' }}>Order Summary</h4>
          {cart.map(item => (
            <div key={item.id} className="flex-between" style={{ paddingBottom: '1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ flex: 1 }}>
                <h5 style={{ margin: 0, marginBottom: '0.25rem' }}>{item.name}</h5>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>₹{item.price} x {item.quantity}</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                <span style={{ fontWeight: 600 }}>₹{item.price * item.quantity}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)', padding: '0.2rem' }}>
                  <button className="btn-secondary flex-center" style={{ width: '24px', height: '24px', borderRadius: '50%', padding: 0, border: 'none' }} onClick={() => updateCartQuantity(item.id, -1)}>
                    {item.quantity === 1 ? <Trash2 size={12} color="var(--danger)" /> : <Minus size={12} />}
                  </button>
                  <span style={{ width: '16px', textAlign: 'center', fontSize: '0.875rem' }}>{item.quantity}</span>
                  <button className="btn-secondary flex-center" style={{ width: '24px', height: '24px', borderRadius: '50%', padding: 0, border: 'none' }} onClick={() => updateCartQuantity(item.id, 1)}>
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <div style={{ paddingTop: '0.5rem' }}>
            <div className="flex-between" style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex-between" style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
              <span>GST (5%)</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>
            <div className="flex-between" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed var(--border-color)' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>Total</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-primary)' }}>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <h4 style={{ marginBottom: '1rem' }}>Payment Method</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem', marginBottom: '2rem' }}>
          <label className={`card ${paymentMethod === 'wallet' ? 'glass' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', cursor: 'pointer', border: paymentMethod === 'wallet' ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)', background: paymentMethod === 'wallet' ? 'rgba(59, 130, 246, 0.1)' : 'transparent' }}>
            <input type="radio" name="payment" value="wallet" checked={paymentMethod === 'wallet'} onChange={() => setPaymentMethod('wallet')} style={{ accentColor: 'var(--accent-primary)' }} />
            <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '0.5rem', borderRadius: '50%' }}>
              <CreditCard size={20} color="var(--success)" />
            </div>
            <div style={{ flex: 1 }}>
              <h5 style={{ margin: 0 }}>Student Wallet</h5>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Balance: ₹{student?.wallet || 0}</span>
            </div>
          </label>
          
          <label className={`card ${paymentMethod === 'upi' ? 'glass' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', cursor: 'pointer', border: paymentMethod === 'upi' ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)', background: paymentMethod === 'upi' ? 'rgba(59, 130, 246, 0.1)' : 'transparent' }}>
            <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} style={{ accentColor: 'var(--accent-primary)' }} />
            <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '0.5rem', borderRadius: '50%' }}>
              <QrCode size={20} color="var(--accent-primary)" />
            </div>
            <div>
              <h5 style={{ margin: 0 }}>UPI / QR Code</h5>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>GPay, PhonePe, Paytm</span>
            </div>
          </label>
        </div>
      </div>

      <div className="glass" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '1.5rem', borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0', zIndex: 100, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.125rem' }} onClick={handleCheckout} disabled={isProcessing}>
          {isProcessing ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
};

export default CartCheckout;
