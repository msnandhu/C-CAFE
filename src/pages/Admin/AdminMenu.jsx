import { useEffect, useState } from 'react';
import { Plus, Edit2, CheckCircle, XCircle } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { getFoodItems, addFoodItem, updateFoodItem } from '../../services/api';

const AdminMenu = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const initialForm = { name: '', category: 'Lunch', price: '', description: '', image: '', veg: true, available: true, prepTime: '', inventory: '' };
  const [formData, setFormData] = useState(initialForm);

  const fetchItems = () => {
    getFoodItems().then(data => setItems(data));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({ ...item, inventory: item.inventory || '' });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: Number(formData.price),
      prepTime: Number(formData.prepTime),
      inventory: formData.category === 'Snacks' ? Number(formData.inventory) : undefined
    };

    if (editingItem) {
      await updateFoodItem({ ...payload, id: editingItem.id });
    } else {
      await addFoodItem(payload);
    }
    fetchItems();
    setIsModalOpen(false);
  };

  return (
    <div className="page-container animate-fade-in" style={{ padding: 0 }}>
      <Navbar title="Menu Management" />
      
      <div className="container" style={{ padding: '2rem 1.5rem', paddingBottom: '6rem' }}>
        
        {/* Admin Navigation */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          <a href="/admin/dashboard" className="btn-secondary" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}>Dashboard</a>
          <a href="/admin/menu" className="btn btn-primary" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}>Menu Management</a>
          <a href="/admin/orders" className="btn-secondary" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}>Order Management</a>
          <a href="/admin/kitchen" className="btn-secondary" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}>Kitchen Screen</a>
        </div>

        <div className="flex-between" style={{ marginBottom: '2rem' }}>
          <div>
            <h1 style={{ margin: 0 }}>Menu Upgradation</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Manage your dishes, prices, and availability.</p>
          </div>
          <button className="btn btn-primary pulse-button" onClick={openAddModal}>
            <Plus size={20} /> Add New Dish
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {items.map(item => (
            <div key={item.id} className="card glass" style={{ padding: '1.5rem' }}>
              <div className="flex-between" style={{ marginBottom: '1rem' }}>
                <span className="badge badge-warning">{item.category}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                  <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', border: '2px solid', borderColor: item.veg ? 'var(--success)' : 'var(--danger)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', background: item.veg ? 'var(--success)' : 'var(--danger)' }}></span>
                  </span>
                  {item.veg ? 'Veg' : 'Non-Veg'}
                </span>
              </div>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem' }}>{item.name}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', minHeight: '40px' }}>{item.description}</p>
              
              <div className="flex-between" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', marginBottom: '1rem' }}>
                <h2 className="text-gold" style={{ margin: 0, fontSize: '1.8rem' }}>₹{item.price}</h2>
                <div style={{ textAlign: 'right' }}>
                  {item.category === 'Snacks' && (
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Stock: {item.inventory || 0}</div>
                  )}
                  <div style={{ color: item.available ? 'var(--success)' : 'var(--danger)', fontSize: '0.9rem', fontWeight: 600 }}>
                    {item.available ? 'Available' : 'Out of Stock'}
                  </div>
                </div>
              </div>
              
              <button className="btn-secondary" style={{ width: '100%', padding: '0.75rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }} onClick={() => openEditModal(item)}>
                <Edit2 size={16} /> Edit Dish
              </button>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="card glass-intense" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
              <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <h2 style={{ margin: 0 }}>{editingItem ? 'Edit Dish' : 'Add New Dish'}</h2>
                <button className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%', border: 'none' }} onClick={() => setIsModalOpen(false)}>
                  <XCircle size={24} color="var(--danger)" />
                </button>
              </div>

              <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', '@media (min-width: 600px)': { flexDirection: 'row' } }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Dish Name</label>
                    <input type="text" className="input-control" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Category</label>
                    <select className="input-control" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                      <option>Breakfast</option>
                      <option>Lunch</option>
                      <option>Snacks</option>
                      <option>Juice</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Price (₹)</label>
                    <input type="number" className="input-control" required min="0" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Prep Time (mins)</label>
                    <input type="number" className="input-control" required min="1" value={formData.prepTime} onChange={e => setFormData({...formData, prepTime: e.target.value})} />
                  </div>
                </div>

                {formData.category === 'Snacks' && (
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>Snack Inventory (Qty)</label>
                    <input type="number" className="input-control" required min="0" value={formData.inventory} onChange={e => setFormData({...formData, inventory: e.target.value})} placeholder="Number of items available" />
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Description</label>
                  <textarea className="input-control" rows="3" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Image URL</label>
                  <input type="text" className="input-control" required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="https://..." />
                </div>

                <div className="flex-between" style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="checkbox" id="vegToggle" checked={formData.veg} onChange={e => setFormData({...formData, veg: e.target.checked})} style={{ width: '20px', height: '20px' }} />
                    <label htmlFor="vegToggle" style={{ cursor: 'pointer', fontWeight: 600 }}>{formData.veg ? 'Pure Veg' : 'Non-Veg'}</label>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="checkbox" id="availToggle" checked={formData.available} onChange={e => setFormData({...formData, available: e.target.checked})} style={{ width: '20px', height: '20px' }} />
                    <label htmlFor="availToggle" style={{ cursor: 'pointer', fontWeight: 600 }}>Available to Order</label>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary pulse-button" style={{ padding: '1rem', fontSize: '1.1rem', marginTop: '1rem' }}>
                  <CheckCircle size={20} /> Save Changes
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMenu;
