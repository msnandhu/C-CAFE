import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, CreditCard, QrCode, ShoppingCart, ArrowRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { placeOrder } from '../../services/api';

const CartCheckout = ({ cart, updateCartQuantity, student, clearCart }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('wallet'); // wallet, upi
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxes = Math.round(subtotal * 0.05); // 5% GST
  const total = subtotal + taxes;

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const order = await placeOrder(student.rollNo, cart, total);
      clearCart();
      setTimeout(() => navigate(`/track/${order.id}`), 1000);
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="page-container flex-center" style={{ padding: 0 }}>
        <Navbar title="Your Cart" showBack />
        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          <ShoppingCart size={64} style={{ marginBottom: '1.5rem', opacity: 0.2 }} />
          <h2>Your cart is empty</h2>
          <p style={{ marginBottom: '2rem' }}>Add some delicious items to get started.</p>
          <button className="btn btn-primary pulse-button" onClick={() => navigate('/menu')}>
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
        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShoppingCart size={20} color="var(--accent-primary)" /> Order Summary
        </h3>
        
        <div className="card glass-intense" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
          {cart.map(item => (
            <div key={item.id} className="flex-between" style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, fontSize: '1.2rem' }}>{item.name}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>₹{item.price} each</p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.05)', padding: '0.25rem', borderRadius: 'var(--radius-full)', width: 'fit-content' }}>
                  <button className="btn-secondary" style={{ padding: '0.25rem', borderRadius: '50%', border: 'none' }} onClick={() => updateCartQuantity(item.id, -1)}>
                    {item.quantity === 1 ? <Trash2 size={16} color="var(--danger)" /> : <Minus size={16} />}
                  </button>
                  <span style={{ fontWeight: 600, width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                  <button className="btn-secondary" style={{ padding: '0.25rem', borderRadius: '50%', border: 'none' }} onClick={() => updateCartQuantity(item.id, 1)}>
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                ₹{item.price * item.quantity}
              </div>
            </div>
          ))}
          
          <div style={{ marginTop: '1rem' }}>
            <div className="flex-between" style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex-between" style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              <span>Taxes & Fees (5%)</span>
              <span>₹{taxes}</span>
            </div>
            <div className="flex-between" style={{ borderTop: 'var(--glass-border-highlight)', paddingTop: '1rem', marginTop: '0.5rem' }}>
              <h3 style={{ margin: 0 }}>Total</h3>
              <h2 className="text-gold" style={{ margin: 0 }}>₹{total}</h2>
            </div>
          </div>
        </div>

        <h3 style={{ marginBottom: '1.5rem' }}>Payment Method</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div 
            className={`card ${paymentMethod === 'wallet' ? 'glass-intense' : 'glass'}`}
            style={{ 
              padding: '1.25rem', 
              cursor: 'pointer',
              border: paymentMethod === 'wallet' ? 'var(--glass-border-highlight)' : 'var(--glass-border)',
              boxShadow: paymentMethod === 'wallet' ? 'var(--shadow-glow)' : 'none'
            }}
            onClick={() => setPaymentMethod('wallet')}
          >
            <div className="flex-between">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.75rem', borderRadius: '50%' }}>
                  <CreditCard size={24} color="var(--success)" />
                </div>
                <div>
                  <h4 style={{ margin: 0 }}>Student Wallet</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Balance: ₹{student.wallet}</p>
                </div>
              </div>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: `2px solid ${paymentMethod === 'wallet' ? 'var(--accent-primary)' : 'var(--text-muted)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {paymentMethod === 'wallet' && <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-primary)' }}></div>}
              </div>
            </div>
          </div>

          <div 
            className={`card ${paymentMethod === 'upi' ? 'glass-intense' : 'glass'}`}
            style={{ 
              padding: '1.25rem', 
              cursor: 'pointer',
              border: paymentMethod === 'upi' ? 'var(--glass-border-highlight)' : 'var(--glass-border)',
              boxShadow: paymentMethod === 'upi' ? 'var(--shadow-glow)' : 'none'
            }}
            onClick={() => setPaymentMethod('upi')}
          >
            <div className="flex-between">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.75rem', borderRadius: '50%' }}>
                  <QrCode size={24} color="var(--info)" />
                </div>
                <div>
                  <h4 style={{ margin: 0 }}>UPI / QR Scan</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Pay at counter</p>
                </div>
              </div>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: `2px solid ${paymentMethod === 'upi' ? 'var(--accent-primary)' : 'var(--text-muted)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {paymentMethod === 'upi' && <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-primary)' }}></div>}
              </div>
            </div>
          </div>
        </div>

        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '1.5rem', background: 'rgba(5, 5, 5, 0.9)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.05)', zIndex: 100, display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <button 
              className="btn btn-primary pulse-button" 
              style={{ width: '100%', padding: '1.25rem', fontSize: '1.2rem' }} 
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Swipe to Pay'}
              {!isProcessing && <ArrowRight size={24} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCheckout;
