import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, ChevronUp, ChevronDown, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';

const StickyCart = ({ cart, updateCartQuantity }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show sticky cart on checkout, track, login, or admin pages
  const hiddenPaths = ['/cart', '/track', '/login', '/', '/admin'];
  if (cart.length === 0 || hiddenPaths.some(path => location.pathname.startsWith(path))) {
    return null;
  }

  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      {/* Overlay when open */}
      {isOpen && (
        <div 
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', zIndex: 999 }} 
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sticky Bottom Bar / Drawer */}
      <div 
        style={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          zIndex: 1000,
          background: 'var(--bg-card)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.5)',
          borderTopLeftRadius: isOpen ? '1.5rem' : '0',
          borderTopRightRadius: isOpen ? '1.5rem' : '0',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          maxHeight: isOpen ? '70vh' : 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Drawer Content */}
        {isOpen && (
          <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
            <div className="flex-between" style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShoppingCart size={20} color="var(--accent-primary)" /> Order Summary
              </h3>
              <button className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%', border: 'none' }} onClick={() => setIsOpen(false)}>
                <ChevronDown size={20} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              {cart.map(item => (
                <div key={item.id} className="flex-between" style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{item.name}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0.25rem 0' }}>₹{item.price} each</p>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>₹{item.price * item.quantity}</div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.05)', padding: '0.25rem', borderRadius: 'var(--radius-full)' }}>
                    <button className="btn-secondary" style={{ padding: '0.4rem', borderRadius: '50%', border: 'none' }} onClick={() => updateCartQuantity(item.id, -1)}>
                      {item.quantity === 1 ? <Trash2 size={16} color="var(--danger)" /> : <Minus size={16} />}
                    </button>
                    <span style={{ fontWeight: 600, width: '20px', textAlign: 'center', fontSize: '1rem' }}>{item.quantity}</span>
                    <button className="btn-secondary" style={{ padding: '0.4rem', borderRadius: '50%', border: 'none' }} onClick={() => updateCartQuantity(item.id, 1)}>
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Persistent Bottom Bar */}
        <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: isOpen ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', flex: 1 }} onClick={() => setIsOpen(!isOpen)}>
            <div style={{ background: 'var(--accent-primary)', color: '#000', padding: '0.75rem', borderRadius: '50%', position: 'relative' }}>
              <ShoppingCart size={24} />
              <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'var(--danger)', color: '#fff', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 }}>
                {itemCount}
              </span>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Total ({itemCount} items)</p>
              <h3 style={{ margin: 0, fontSize: '1.4rem' }} className="text-gold">₹{total}</h3>
            </div>
            {!isOpen && <ChevronUp size={20} color="var(--text-muted)" style={{ marginLeft: 'auto', marginRight: '1rem' }} />}
          </div>
          
          <button 
            className="btn btn-primary pulse-button" 
            style={{ padding: '0.75rem 1.5rem', fontSize: '1.1rem' }}
            onClick={() => {
              setIsOpen(false);
              navigate('/cart');
            }}
          >
            Checkout <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default StickyCart;
