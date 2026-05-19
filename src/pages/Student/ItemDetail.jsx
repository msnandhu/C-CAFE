import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Clock, ArrowLeft } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { getFoodItems } from '../../services/api';

const ItemDetail = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getFoodItems().then(data => {
      const foundItem = data.find(i => i.id === parseInt(id));
      if (foundItem) setItem(foundItem);
    });
  }, [id]);

  if (!item) return <div className="page-container flex-center">Loading delicacy...</div>;

  const handleAddToCart = () => {
    addToCart({ ...item, quantity });
    navigate('/menu');
  };

  return (
    <div className="page-container animate-fade-in" style={{ padding: 0 }}>
      <Navbar showCart cartCount={0} />
      
      <div className="container" style={{ padding: '2rem 1.5rem', paddingBottom: '6rem' }}>
        <button className="btn-secondary" style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-full)', marginBottom: '2rem' }} onClick={() => navigate('/menu')}>
          <ArrowLeft size={20} /> Back to Menu
        </button>

        <div className="item-detail-layout" style={{ display: 'grid', gap: '3rem', gridTemplateColumns: '1fr', '@media (min-width: 992px)': { gridTemplateColumns: '1fr 1fr' } }}>
          
          {/* Left: Image */}
          <div style={{ width: '100%', height: '500px', borderRadius: 'var(--radius-xl)', overflow: 'hidden', position: 'relative', boxShadow: 'var(--shadow-lg)' }}>
            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-primary), transparent)', opacity: 0.5 }}></div>
          </div>
          
          {/* Right: Details */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
              <span className="badge badge-warning" style={{ padding: '0.5rem 1.5rem', fontSize: '1rem' }}>{item.category}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}>
                <Clock size={18} />
                <span style={{ fontSize: '1rem', fontWeight: 600 }}>{item.prepTime} mins</span>
              </div>
            </div>
            
            <h1 style={{ marginBottom: '1rem', fontSize: '3.5rem', lineHeight: 1.1 }}>{item.name}</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <span style={{ display: 'inline-block', width: '24px', height: '24px', borderRadius: '50%', border: '2px solid', borderColor: item.veg ? 'var(--success)' : 'var(--danger)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: item.veg ? 'var(--success)' : 'var(--danger)' }}></span>
              </span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>{item.veg ? 'Pure Vegetarian' : 'Non-Vegetarian'}</span>
            </div>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', marginBottom: '3rem', lineHeight: '1.8' }}>
              {item.description}
            </p>
            
            <div className="card glass-intense" style={{ padding: '2rem', border: 'var(--glass-border-highlight)' }}>
              <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <div>
                  <p style={{ color: 'var(--text-secondary)', margin: 0, marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>Total Price</p>
                  <h2 className="text-gold" style={{ margin: 0, fontSize: '3rem' }}>₹{item.price * quantity}</h2>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'rgba(0,0,0,0.5)', padding: '0.5rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <button className="btn-secondary" style={{ padding: '1rem', borderRadius: '50%', border: 'none', background: 'transparent' }} onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus size={24} />
                  </button>
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, width: '30px', textAlign: 'center' }}>{quantity}</span>
                  <button className="btn-secondary" style={{ padding: '1rem', borderRadius: '50%', border: 'none', background: 'transparent' }} onClick={() => setQuantity(quantity + 1)}>
                    <Plus size={24} />
                  </button>
                </div>
              </div>
              
              <button className="btn btn-primary pulse-button" style={{ width: '100%', padding: '1.5rem', fontSize: '1.25rem' }} onClick={handleAddToCart} disabled={!item.available}>
                <ShoppingCart size={24} />
                {item.available ? 'Add to Order' : 'Currently Unavailable'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (min-width: 992px) {
          .item-detail-layout { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default ItemDetail;
