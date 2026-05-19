import { useNavigate, useLocation } from 'react-router-dom';
import { ChefHat, ShoppingCart, User } from 'lucide-react';

const Navbar = ({ showCart = true, cartCount = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/menu', label: 'Menu' },
  ];

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(5, 5, 5, 0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '1rem 0' }}>
      <div className="container flex-between">
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <div style={{ background: 'linear-gradient(135deg, var(--accent-primary), #eab308)', padding: '0.5rem', borderRadius: '50%', color: '#000' }}>
              <ChefHat size={24} />
            </div>
            <h2 style={{ margin: 0, fontSize: '1.5rem', letterSpacing: '1px' }} className="text-gradient">C-CAFE</h2>
          </div>

          {/* Desktop Navigation Links */}
          <div style={{ display: 'none', '@media (min-width: 768px)': { display: 'flex' } }} className="desktop-nav">
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {navLinks.map(link => (
                <span 
                  key={link.path}
                  style={{ 
                    cursor: 'pointer', 
                    fontWeight: 600, 
                    color: location.pathname.includes(link.path) ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    transition: 'color 0.3s ease'
                  }}
                  onClick={() => navigate(link.path)}
                >
                  {link.label}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {showCart && (
            <div style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }} onClick={() => navigate('/cart')}>
              <ShoppingCart size={20} color={cartCount > 0 ? "var(--accent-primary)" : "var(--text-primary)"} />
              <span style={{ fontWeight: 600, color: cartCount > 0 ? "var(--accent-primary)" : "var(--text-primary)" }}>Cart</span>
              {cartCount > 0 && (
                <span style={{ background: 'var(--accent-primary)', color: '#000', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, marginLeft: '0.25rem' }}>
                  {cartCount}
                </span>
              )}
            </div>
          )}
          <div style={{ background: 'var(--bg-card)', padding: '0.6rem', borderRadius: '50%', cursor: 'pointer', border: 'var(--glass-border)' }} onClick={() => navigate('/profile')}>
            <User size={20} color="var(--accent-primary)" />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Links */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem', padding: '0 1rem', overflowX: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }} className="mobile-nav">
        {navLinks.map(link => (
          <span 
            key={link.path}
            style={{ 
              cursor: 'pointer', 
              fontWeight: 600, 
              fontSize: '0.9rem',
              color: location.pathname.includes(link.path) ? 'var(--accent-primary)' : 'var(--text-secondary)',
            }}
            onClick={() => navigate(link.path)}
          >
            {link.label}
          </span>
        ))}
      </div>
      <style>{`
        @media (min-width: 768px) {
          .mobile-nav { display: none !important; }
          .desktop-nav { display: flex !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Navbar;
