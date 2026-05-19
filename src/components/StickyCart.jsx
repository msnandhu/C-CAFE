import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const StickyCart = ({ cart }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show sticky cart on checkout, track, login, or admin pages
  const hiddenPaths = ['/cart', '/track', '/login', '/', '/admin'];
  if (cart.length === 0 || hiddenPaths.some(path => location.pathname.startsWith(path))) {
    return null;
  }

  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div 
      style={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000,
        background: '#16a34a', // Zomato/Swiggy style green
        color: '#ffffff',
        padding: '1rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        boxShadow: '0 -4px 12px rgba(0,0,0,0.15)',
      }}
      onClick={() => navigate('/cart')}
    >
      <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>
        {itemCount} item{itemCount > 1 ? 's' : ''} added
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.1rem' }}>
        VIEW CART <ShoppingBag size={20} />
      </div>
    </div>
  );
};

export default StickyCart;
