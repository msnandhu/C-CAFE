import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, CreditCard, QrCode, ShoppingCart, ArrowRight, ArrowLeft } from 'lucide-react';
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
    if (!student) {
      navigate('/login');
      return;
    }
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
      <div className="page-container animate-fade-in" style={{ padding: 0 }}>
        <Navbar showCart={false} />
        <div className="container flex-center" style={{ minHeight: '80vh', flexDirection: 'column' }}>
          <ShoppingCart size={100} style={{ marginBottom: '2rem', opacity: 0.1 }} />
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Your cart is empty</h1>
          <p style={{ marginBottom: '3rem', fontSize: '1.2rem', maxWidth: '400px', textAlign: 'center', color: 'var(--text-muted)' }}>Your culinary journey hasn't started yet. Add some delicious items to get started.</p>
          <button className="btn btn-primary pulse-button" style={{ padding: '1.25rem 3rem' }} onClick={() => navigate('/menu')}>
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in" style={{ padding: 0 }}>
      <Navbar />
      
      <div className="container" style={{ padding: '2rem 1.5rem', paddingBottom: '6rem' }}>
        <button className="btn-secondary" style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-full)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }} onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> Back
        </button>
        <h1 style={{ marginBottom: '3rem' }}>Secure Checkout</h1>

        <div className="checkout-layout" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', '@media (min-width: 992px)': { flexDirection: 'row' } }}>
          
          {/* Left: Cart Items */}
          <div style={{ flex: '1 1 60%' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.5rem' }}>
              <ShoppingCart color="var(--accent-primary)" /> Review Items
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {cart.map(item => (
                <div key={item.id} className="card glass" style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', alignItems: 'center' }}>
                  <div style={{ width: '100px', height: '100px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', flexShrink: 0 }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                      <h3 style={{ margin: 0, fontSize: '1.4rem' }}>{item.name}</h3>
                      <div style={{ fontWeight: 700, fontSize: '1.4rem', color: 'var(--text-primary)' }}>
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '1rem' }}>₹{item.price} each</p>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: 'var(--radius-full)', width: 'fit-content', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <button className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%', border: 'none' }} onClick={() => updateCartQuantity(item.id, -1)}>
                        {item.quantity === 1 ? <Trash2 size={18} color="var(--danger)" /> : <Minus size={18} />}
                      </button>
                      <span style={{ fontWeight: 700, width: '30px', textAlign: 'center', fontSize: '1.2rem' }}>{item.quantity}</span>
                      <button className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%', border: 'none' }} onClick={() => updateCartQuantity(item.id, 1)}>
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right: Payment & Summary */}
          <div style={{ flex: '1 1 40%' }} className="checkout-sidebar">
            <div style={{ position: 'sticky', top: '100px' }}>
              
              <div className="card glass-intense" style={{ padding: '2.5rem', marginBottom: '2rem', border: 'var(--glass-border-highlight)' }}>
                <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Order Summary</h3>
                
                <div className="flex-between" style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex-between" style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                  <span>Taxes & Fees (5%)</span>
                  <span>₹{taxes}</span>
                </div>
                
                <div className="flex-between" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', marginTop: '1rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Total</h3>
                  <h2 className="text-gold" style={{ margin: 0, fontSize: '2.5rem' }}>₹{total}</h2>
                </div>
              </div>

              <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Payment Method</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <div 
                  className={`card ${paymentMethod === 'wallet' ? 'glass-intense' : 'glass'}`}
                  style={{ 
                    padding: '1.5rem', 
                    cursor: 'pointer',
                    border: paymentMethod === 'wallet' ? 'var(--glass-border-highlight)' : 'var(--glass-border)',
                    boxShadow: paymentMethod === 'wallet' ? 'var(--shadow-glow)' : 'none'
                  }}
                  onClick={() => setPaymentMethod('wallet')}
                >
                  <div className="flex-between">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                      <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                        <CreditCard size={28} color="var(--success)" />
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '1.2rem' }}>Student Wallet</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: 0, marginTop: '0.25rem' }}>Balance: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>₹{student?.wallet || 0}</span></p>
                      </div>
                    </div>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: `2px solid ${paymentMethod === 'wallet' ? 'var(--accent-primary)' : 'var(--text-muted)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {paymentMethod === 'wallet' && <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'var(--accent-primary)' }}></div>}
                    </div>
                  </div>
                </div>

                <div 
                  className={`card ${paymentMethod === 'upi' ? 'glass-intense' : 'glass'}`}
                  style={{ 
                    padding: '1.5rem', 
                    cursor: 'pointer',
                    border: paymentMethod === 'upi' ? 'var(--glass-border-highlight)' : 'var(--glass-border)',
                    boxShadow: paymentMethod === 'upi' ? 'var(--shadow-glow)' : 'none'
                  }}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <div className="flex-between">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                      <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                        <QrCode size={28} color="var(--info)" />
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '1.2rem' }}>UPI / QR Scan</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: 0, marginTop: '0.25rem' }}>Pay at counter</p>
                      </div>
                    </div>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: `2px solid ${paymentMethod === 'upi' ? 'var(--accent-primary)' : 'var(--text-muted)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {paymentMethod === 'upi' && <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'var(--accent-primary)' }}></div>}
                    </div>
                  </div>
                </div>
              </div>

              <button 
                className="btn btn-primary pulse-button" 
                style={{ width: '100%', padding: '1.5rem', fontSize: '1.4rem' }} 
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing Transaction...' : 'Complete Payment'}
                {!isProcessing && <ArrowRight size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 991px) {
          .checkout-layout { flex-direction: column !important; }
        }
        @media (min-width: 992px) {
          .checkout-layout { flex-direction: row !important; }
        }
      `}</style>
    </div>
  );
};

export default CartCheckout;
