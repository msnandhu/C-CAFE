import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, History, Wallet, ChevronRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { getOrders } from '../../services/api';

const ProfilePage = ({ student, setStudent }) => {
  const navigate = useNavigate();
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    getOrders().then(data => {
      // Show all orders for this student
      setOrderHistory(data.filter(o => o.studentId === student.rollNo));
    });
  }, [student]);

  const handleLogout = () => {
    setStudent(null);
    navigate('/login');
  };

  return (
    <div className="page-container animate-fade-in" style={{ padding: 0 }}>
      <Navbar title="My Profile" showBack />
      
      <div className="container" style={{ paddingBottom: '2rem' }}>
        <div className="card glass flex-center" style={{ flexDirection: 'column', padding: '2rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), var(--bg-card))' }}>
          <div style={{ background: 'var(--accent-primary)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem', boxShadow: 'var(--shadow-glow)' }}>
            <User size={48} color="white" />
          </div>
          <h2 style={{ margin: 0 }}>{student.name}</h2>
          <p style={{ color: 'var(--text-secondary)' }}>{student.rollNo}</p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', background: 'rgba(16, 185, 129, 0.1)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}>
            <Wallet size={18} color="var(--success)" />
            <span style={{ fontWeight: 600, color: 'var(--success)' }}>Wallet Balance: ₹{student.wallet}</span>
          </div>
        </div>

        <div className="flex-between" style={{ marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <History size={20} color="var(--accent-primary)" /> Order History
          </h3>
        </div>

        {orderHistory.length > 0 ? (
          orderHistory.map(order => (
            <div key={order.id} className="card glass" style={{ marginBottom: '1rem' }}>
              <div className="flex-between" style={{ marginBottom: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{order.time}</span>
                <span className={`badge ${order.status === 'Delivered' ? 'badge-success' : 'badge-info'}`}>
                  {order.status}
                </span>
              </div>
              <div className="flex-between" style={{ marginTop: '0.5rem' }}>
                <div>
                  <h5 style={{ margin: 0 }}>{order.items.map(i => i.name).join(', ')}</h5>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>Total: ₹{order.total}</p>
                </div>
                {order.status !== 'Delivered' && (
                  <button className="btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }} onClick={() => navigate(`/track/${order.id}`)}>
                    Track <ChevronRight size={16} />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="card glass flex-center" style={{ padding: '2rem', color: 'var(--text-muted)' }}>
            No past orders found.
          </div>
        )}

        <button className="btn" style={{ width: '100%', marginTop: '2rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', border: '1px solid var(--danger)' }} onClick={handleLogout}>
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
