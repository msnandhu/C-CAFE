import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, Utensils, Clock, ChevronRight, Sparkles } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { getOrders } from '../../services/api';

const Dashboard = ({ student }) => {
  const navigate = useNavigate();
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    getOrders().then(data => {
      setRecentOrders(data.filter(o => o.studentId === student.rollNo && (o.status !== 'Delivered')));
    });
  }, [student]);

  return (
    <div className="page-container animate-fade-in" style={{ padding: 0 }}>
      <Navbar />
      
      <div className="container" style={{ padding: '2rem 1.5rem' }}>
        
        {/* Massive Hero Section */}
        <div className="card glass-intense" style={{ position: 'relative', overflow: 'hidden', padding: '4rem 3rem', marginBottom: '3rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 'var(--radius-xl)' }} onClick={() => navigate('/menu')}>
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '60%', background: 'radial-gradient(ellipse at right, rgba(251, 191, 36, 0.25), transparent)', zIndex: 0 }}></div>
          
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '60%' }}>
            <p style={{ color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600, marginBottom: '0.5rem' }}>Welcome to C-Cafe</p>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', lineHeight: 1.1 }}>{student.name}, <br/>Hungry for more?</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '80%' }}>Discover today's exclusive culinary selections crafted by our master chefs.</p>
            <button className="btn btn-primary pulse-button" style={{ padding: '1rem 2.5rem', fontSize: '1.2rem' }}>
              <Sparkles size={20} /> Explore Gourmet Menu
            </button>
          </div>

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '250px' }}>
             <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '1rem', border: 'var(--glass-border-highlight)' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                <Wallet size={28} color="var(--success)" />
              </div>
              <div>
                <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Wallet Balance</p>
                <span style={{ fontWeight: 700, fontSize: '1.8rem', color: 'var(--text-primary)' }}>₹{student.wallet}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Active Orders Section */}
        <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0 }}>Live Orders</h2>
        </div>
        
        {recentOrders.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
            {recentOrders.map(order => (
              <div key={order.id} className="card glass" style={{ cursor: 'pointer', borderTop: `4px solid ${order.status === 'Ready' ? 'var(--success)' : 'var(--accent-primary)'}` }} onClick={() => navigate(`/track/${order.id}`)}>
                <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                  <span className={`badge ${order.status === 'Ready' ? 'badge-success' : 'badge-warning'}`} style={{ padding: '0.5rem 1rem' }}>
                    {order.status}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>{order.time}</span>
                </div>
                <div className="flex-between" style={{ alignItems: 'flex-end' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '2rem' }}>Token: <span className="text-gold">{order.token}</span></h3>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{order.items.length} items • <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>₹{order.total}</span></p>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '50%', transition: 'var(--transition)' }} className="track-icon">
                    <ChevronRight size={28} color="var(--accent-primary)" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card glass flex-center" style={{ padding: '5rem 2rem', flexDirection: 'column', color: 'var(--text-muted)', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <Clock size={64} style={{ marginBottom: '1.5rem', opacity: 0.2 }} />
            <h3 style={{ color: 'var(--text-secondary)' }}>No active orders</h3>
            <p style={{ textAlign: 'center', maxWidth: '400px', marginTop: '0.5rem', fontSize: '1.1rem' }}>Your culinary journey awaits. Tap the menu above to start your order.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
