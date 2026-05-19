import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Minus, Plus, ShoppingCart } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { getFoodItems } from '../../services/api';

const ItemDetail = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getFoodItems().then(data => {
      const found = data.find(i => i.id === parseInt(id));
      setItem(found);
    });
  }, [id]);

  if (!item) return <div className="page-container flex-center">Loading...</div>;

  const handleAddToCart = () => {
    addToCart({ ...item, quantity });
    navigate('/menu');
  };

  return (
    <div className="page-container animate-fade-in" style={{ padding: 0 }}>
      <Navbar title="Details" showBack showCart cartCount={0} />
      
      <div style={{ width: '100%', height: '250px', position: 'relative' }}>
        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px', background: 'linear-gradient(to top, var(--bg-primary), transparent)' }}></div>
      </div>
      
      <div className="container" style={{ position: 'relative', top: '-2rem', zIndex: 10 }}>
        <div className="card glass" style={{ padding: '2rem' }}>
          <div className="flex-between" style={{ marginBottom: '1rem' }}>
            <h2 style={{ margin: 0 }}>{item.name}</h2>
            <span className={item.veg ? "badge badge-success" : "badge badge-danger"}>
              {item.veg ? 'Veg' : 'Non-Veg'}
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Clock size={16} color="var(--info)" />
              <span>Prep: {item.prepTime} mins</span>
            </div>
            <div style={{ padding: '0 0.5rem', borderLeft: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>
              {item.category}
            </div>
          </div>
          
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.8 }}>
            {item.description}
          </p>

          <div className="flex-between" style={{ marginBottom: '2rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>₹{item.price * quantity}</span>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--radius-full)', padding: '0.25rem' }}>
              <button className="btn-secondary flex-center" style={{ width: '36px', height: '36px', borderRadius: '50%', padding: 0 }} onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus size={16} />
              </button>
              <span style={{ width: '20px', textAlign: 'center', fontWeight: 600 }}>{quantity}</span>
              <button className="btn-secondary flex-center" style={{ width: '36px', height: '36px', borderRadius: '50%', padding: 0 }} onClick={() => setQuantity(quantity + 1)}>
                <Plus size={16} />
              </button>
            </div>
          </div>

          <button className="btn btn-primary" style={{ width: '100%', padding: '1rem' }} onClick={handleAddToCart} disabled={!item.available}>
            <ShoppingCart size={20} />
            {item.available ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
