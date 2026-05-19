import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Clock } from 'lucide-react';
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
      <Navbar title="" showBack showCart cartCount={0} />
      
      <div style={{ width: '100%', height: '350px', position: 'relative', marginTop: '-5rem' }}>
        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '150px', background: 'linear-gradient(to top, var(--bg-primary), transparent)' }}></div>
      </div>
      
      <div className="container" style={{ paddingBottom: '2rem', position: 'relative', zIndex: 10, marginTop: '-3rem' }}>
        <div className="card glass-intense" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)' }}>
          <div className="flex-between" style={{ marginBottom: '1rem' }}>
            <span className="badge badge-warning" style={{ background: 'rgba(251, 191, 36, 0.15)', border: '1px solid rgba(251, 191, 36, 0.3)', color: 'var(--accent-primary)' }}>{item.category}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
              <Clock size={16} />
              <span style={{ fontSize: '0.9rem' }}>{item.prepTime} mins</span>
            </div>
          </div>
          
          <h1 style={{ marginBottom: '0.5rem', fontSize: '2.5rem' }}>{item.name}</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{ display: 'inline-block', width: '18px', height: '18px', borderRadius: '50%', border: '2px solid', borderColor: item.veg ? 'var(--success)' : 'var(--danger)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: item.veg ? 'var(--success)' : 'var(--danger)' }}></span>
            </span>
            <span style={{ color: 'var(--text-secondary)' }}>{item.veg ? 'Pure Vegetarian' : 'Non-Vegetarian'}</span>
          </div>
          
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.8' }}>
            {item.description}
          </p>
          
          <div className="flex-between" style={{ marginBottom: '2.5rem' }}>
            <h2 className="text-gold" style={{ margin: 0, fontSize: '2.5rem' }}>₹{item.price}</h2>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: 'var(--radius-full)', border: 'var(--glass-border)' }}>
              <button className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%', border: 'none', background: 'transparent' }} onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus size={20} />
              </button>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, width: '20px', textAlign: 'center' }}>{quantity}</span>
              <button className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%', border: 'none', background: 'transparent' }} onClick={() => setQuantity(quantity + 1)}>
                <Plus size={20} />
              </button>
            </div>
          </div>
          
          <button className="btn btn-primary pulse-button" style={{ width: '100%', padding: '1.25rem', fontSize: '1.2rem' }} onClick={handleAddToCart} disabled={!item.available}>
            <ShoppingCart size={24} />
            {item.available ? `Add to Cart • ₹${item.price * quantity}` : 'Currently Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
