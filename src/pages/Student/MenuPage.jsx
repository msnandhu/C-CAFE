import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter } from 'lucide-react';
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
      <Navbar title="Culinary Menu" showBack showCart cartCount={0} />
      
      <div className="container" style={{ paddingBottom: '3rem' }}>
        <div className="input-group" style={{ marginBottom: '2rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={22} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input type="text" className="input-control" placeholder="Search for delicacies..." style={{ paddingLeft: '3.5rem', borderRadius: 'var(--radius-full)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
            <Filter size={20} style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-primary)', cursor: 'pointer' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '1.5rem', marginBottom: '1rem', WebkitOverflowScrolling: 'touch' }}>
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius-full)', padding: '0.6rem 1.5rem', whiteSpace: 'nowrap', fontSize: '0.95rem' }}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
          {filteredItems.map(item => (
            <div key={item.id} className="card glass" style={{ display: 'flex', gap: '1.25rem', padding: '1rem', cursor: 'pointer', position: 'relative' }} onClick={() => navigate(`/item/${item.id}`)}>
              <div style={{ width: '100px', height: '100px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="flex-between">
                  <h3 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {item.name}
                    <span style={{ display: 'inline-block', width: '14px', height: '14px', borderRadius: '50%', border: '2px solid', borderColor: item.veg ? 'var(--success)' : 'var(--danger)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: item.veg ? 'var(--success)' : 'var(--danger)' }}></span>
                    </span>
                  </h3>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{item.category}</p>
                <div className="flex-between">
                  <span style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)' }}>₹{item.price}</span>
                  {item.available ? (
                    <button className="btn btn-primary" style={{ padding: '0.5rem', borderRadius: '50%', width: '36px', height: '36px' }} onClick={(e) => { e.stopPropagation(); navigate(`/item/${item.id}`); }}>
                      <Plus size={20} />
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
