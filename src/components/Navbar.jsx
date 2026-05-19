import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, User } from 'lucide-react';

const Navbar = ({ title, showBack = false, showCart = false, cartCount = 0 }) => {
  const navigate = useNavigate();

  return (
    <div className="navbar glass">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {showBack && (
          <button className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%' }} onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
        )}
        <h3 style={{ margin: 0 }}>{title}</h3>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {showCart && (
          <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => navigate('/cart')}>
            <ShoppingCart size={24} color="var(--text-primary)" />
            {cartCount > 0 && (
              <span className="badge badge-danger" style={{ position: 'absolute', top: '-8px', right: '-8px', padding: '0.15rem 0.4rem' }}>
                {cartCount}
              </span>
            )}
          </div>
        )}
        <div style={{ background: 'var(--bg-secondary)', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer' }}>
          <User size={20} color="var(--accent-primary)" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
