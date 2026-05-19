import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { getFoodItems } from '../../services/api';

const MenuPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Breakfast', 'Lunch', 'Snacks', 'Juice'];

  useEffect(() => {
    getFoodItems().then(data => setItems(data));
  }, []);

  const filteredItems = activeCategory === 'All' ? items : items.filter(item => item.category === activeCategory);

  return (
    <div className="page-container animate-fade-in" style={{ padding: 0 }}>
      <Navbar title="Menu" showBack showCart cartCount={0} />
      
      <div className="container" style={{ paddingBottom: '2rem' }}>
        <div className="input-group" style={{ marginBottom: '1.5rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input type="text" className="input-control" placeholder="Search food items..." style={{ paddingLeft: '3rem', borderRadius: 'var(--radius-full)' }} />
            <Filter size={20} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', cursor: 'pointer' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '1rem', WebkitOverflowScrolling: 'touch' }}>
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius-full)', padding: '0.5rem 1rem', whiteSpace: 'nowrap' }}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
          {filteredItems.map(item => (
            <div key={item.id} className="card glass" style={{ display: 'flex', gap: '1rem', padding: '1rem', cursor: 'pointer' }} onClick={() => navigate(`/item/${item.id}`)}>
              <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="flex-between">
                  <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {item.name}
                    <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', border: '2px solid', borderColor: item.veg ? 'var(--success)' : 'var(--danger)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: item.veg ? 'var(--success)' : 'var(--danger)' }}></span>
                    </span>
                  </h4>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{item.category}</p>
                <div className="flex-between">
                  <span style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>₹{item.price}</span>
                  {item.available ? (
                    <button className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-md)' }} onClick={(e) => { e.stopPropagation(); navigate(`/item/${item.id}`); }}>
                      <Plus size={16} />
                    </button>
                  ) : (
                    <span className="badge badge-danger">Out of stock</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
