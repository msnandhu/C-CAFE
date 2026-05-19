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
      <Navbar title="Dashboard" />
      
      <div className="container" style={{ paddingBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', padding: '0 0.5rem' }}>
          <div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.25rem', fontSize: '1.1rem' }}>Welcome back,</p>
            <h2 className="text-gradient" style={{ margin: 0 }}>{student.name}</h2>
          </div>
          <div className="glass" style={{ padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'var(--glass-border-highlight)' }}>
            <Wallet size={18} color="var(--accent-primary)" />
            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>₹{student.wallet}</span>
          </div>
        </div>

        <div className="card glass-intense" style={{ position: 'relative', overflow: 'hidden', padding: '2.5rem 2rem', marginBottom: '2.5rem', cursor: 'pointer' }} onClick={() => navigate('/menu')}>
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '50%', background: 'radial-gradient(circle at right, rgba(251, 191, 36, 0.2), transparent)', zIndex: 0 }}></div>
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 className="text-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Sparkles size={24} /> Gourmet Menu
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>Explore today's exclusive culinary selections.</p>
            </div>
            <div style={{ background: 'var(--accent-primary)', color: '#000', padding: '1rem', borderRadius: '50%', boxShadow: 'var(--shadow-glow)' }}>
              <Utensils size={28} />
            </div>
          </div>
        </div>

        <div className="flex-between" style={{ marginBottom: '1.5rem', padding: '0 0.5rem' }}>
          <h3 style={{ margin: 0 }}>Active Orders</h3>
        </div>
        
        {recentOrders.length > 0 ? (
          recentOrders.map(order => (
            <div key={order.id} className="card glass" style={{ marginBottom: '1rem', cursor: 'pointer', borderLeft: `4px solid ${order.status === 'Ready' ? 'var(--success)' : 'var(--accent-primary)'}` }} onClick={() => navigate(`/track/${order.id}`)}>
              <div className="flex-between" style={{ marginBottom: '1rem' }}>
                <span className={`badge ${order.status === 'Ready' ? 'badge-success' : 'badge-warning'}`} style={{ padding: '0.5rem 1rem' }}>
                  {order.status}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>{order.time}</span>
              </div>
              <div className="flex-between">
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Token: <span className="text-gold">{order.token}</span></h3>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{order.items.length} items • ₹{order.total}</p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '50%' }}>
                  <ChevronRight size={24} color="var(--accent-primary)" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="card glass flex-center" style={{ padding: '4rem 2rem', flexDirection: 'column', color: 'var(--text-muted)' }}>
            <Clock size={48} style={{ marginBottom: '1.5rem', opacity: 0.3 }} />
            <h4 style={{ color: 'var(--text-secondary)' }}>No active orders</h4>
            <p style={{ textAlign: 'center', maxWidth: '80%', marginTop: '0.5rem' }}>Your culinary journey awaits. Tap the menu above to start.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
