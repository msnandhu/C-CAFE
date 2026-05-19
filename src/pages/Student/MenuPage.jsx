import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Minus, Filter, ChefHat, ArrowLeft } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { getFoodItems } from '../../services/api';

const MenuPage = ({ addToCart, cart, updateCartQuantity }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Breakfast', 'Lunch', 'Snacks', 'Juice'];

  useEffect(() => {
    getFoodItems().then(data => setItems(data));
  }, []);

  const filteredItems = activeCategory === 'All' ? items : items.filter(item => item.category === activeCategory);
  
  const cartCount = cart ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <div className="page-container animate-fade-in" style={{ padding: 0 }}>
      <Navbar showCart cartCount={cartCount} />
      
      <div className="container" style={{ padding: '2rem 1.5rem', paddingBottom: '6rem' }}>
        <button className="btn-secondary" style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-full)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }} onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> Back
        </button>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', '@media (min-width: 992px)': { flexDirection: 'row' } }} className="menu-layout">
          
          {/* Sidebar / Topbar */}
          <div className="menu-sidebar" style={{ minWidth: '250px' }}>
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ChefHat color="var(--accent-primary)" /> Our Menu
            </h2>
            
            <div className="input-group" style={{ marginBottom: '2rem' }}>
              <div style={{ position: 'relative' }}>
                <Search size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input type="text" className="input-control" placeholder="Search delicacies..." style={{ paddingLeft: '3.5rem', borderRadius: 'var(--radius-full)', background: 'var(--bg-card)' }} />
              </div>
            </div>

            <div className="category-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <h4 style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Categories</h4>
              {categories.map(cat => (
                <div 
                  key={cat} 
                  className={`card ${activeCategory === cat ? 'glass-intense' : 'glass'}`}
                  style={{ 
                    padding: '1rem 1.5rem', 
                    cursor: 'pointer', 
                    borderRadius: 'var(--radius-lg)',
                    border: activeCategory === cat ? 'var(--glass-border-highlight)' : 'var(--glass-border)',
                    boxShadow: activeCategory === cat ? 'var(--shadow-glow)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                  onClick={() => setActiveCategory(cat)}
                >
                  <span style={{ fontWeight: activeCategory === cat ? 700 : 500, color: activeCategory === cat ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{cat}</span>
                  {activeCategory === cat && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)' }}></div>}
                </div>
              ))}
            </div>
          </div>

          {/* Food Grid */}
          <div style={{ flex: 1 }}>
            <div className="flex-between" style={{ marginBottom: '2rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.8rem' }} className="text-gold">{activeCategory} Delicacies</h3>
              <div className="glass" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <Filter size={18} color="var(--text-secondary)" />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Sort by</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
              {filteredItems.map(item => (
                <div key={item.id} className="card glass food-card" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column' }} onClick={() => navigate(`/item/${item.id}`)}>
                  <div style={{ width: '100%', height: '220px', position: 'relative' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="food-img" />
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.prepTime} min</span>
                    </div>
                  </div>
                  
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                        <h3 style={{ margin: 0, fontSize: '1.4rem' }}>{item.name}</h3>
                        <span style={{ display: 'inline-flex', width: '16px', height: '16px', borderRadius: '50%', border: '2px solid', borderColor: item.veg ? 'var(--success)' : 'var(--danger)', justifyContent: 'center', alignItems: 'center' }}>
                          <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: item.veg ? 'var(--success)' : 'var(--danger)' }}></span>
                        </span>
                      </div>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.4 }}>{item.description}</p>
                    </div>
                    
                    <div className="flex-between" style={{ marginTop: 'auto' }}>
                      <span style={{ fontWeight: 700, fontSize: '1.6rem' }} className="text-gold">₹{item.price}</span>
                      {item.available ? (
                        (() => {
                          const cartItem = cart?.find(c => c.id === item.id);
                          if (cartItem) {
                            return (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.25rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(255,255,255,0.1)' }} onClick={(e) => e.stopPropagation()}>
                                <button className="btn-secondary" style={{ padding: '0.4rem', borderRadius: '50%', border: 'none' }} onClick={() => updateCartQuantity(item.id, -1)}>
                                  <Minus size={16} />
                                </button>
                                <span style={{ fontWeight: 600, width: '20px', textAlign: 'center', fontSize: '1rem' }}>{cartItem.quantity}</span>
                                <button className="btn-secondary" style={{ padding: '0.4rem', borderRadius: '50%', border: 'none' }} onClick={() => updateCartQuantity(item.id, 1)}>
                                  <Plus size={16} />
                                </button>
                              </div>
                            );
                          }
                          return (
                            <button className="btn btn-primary" style={{ padding: '0.75rem', borderRadius: '50%', width: '45px', height: '45px', boxShadow: 'var(--shadow-glow)' }} onClick={(e) => { e.stopPropagation(); addToCart({ ...item, quantity: 1 }); }}>
                              <Plus size={24} />
                            </button>
                          );
                        })()
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
      </div>
      <style>{`
        .food-card:hover .food-img { transform: scale(1.05); }
        @media (max-width: 991px) {
          .menu-layout { flexDirection: column !important; }
          .category-list { flexDirection: row !important; overflow-x: auto; padding-bottom: 1rem; }
          .category-list .card { white-space: nowrap; }
          .category-list h4 { display: none; }
        }
        @media (min-width: 992px) {
          .menu-layout { display: flex; flex-direction: row; }
        }
      `}</style>
    </div>
  );
};

export default MenuPage;
