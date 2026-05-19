import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, Utensils, Bell, Clock, ChevronRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { getOrders } from '../../services/api';

const Dashboard = ({ student }) => {
  const navigate = useNavigate();
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    getOrders().then(data => {
      setRecentOrders(data.filter(o => o.studentId === student.rollNo));
    });
  }, [student]);

  return (
    <div className="page-container animate-fade-in" style={{ padding: 0 }}>
      <Navbar title="Dashboard" />
      
      <div className="container" style={{ paddingBottom: '2rem' }}>
        <div className="card glass" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, var(--bg-card), rgba(59, 130, 246, 0.1))' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Welcome back,</p>
          <h2>{student.name}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
            <Wallet size={18} color="var(--success)" />
            <span style={{ fontWeight: 600 }}>Wallet Balance: ₹{student.wallet}</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div className="card glass" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/menu')}>
            <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '1rem', borderRadius: '50%', marginBottom: '0.75rem' }}>
              <Utensils size={24} color="var(--accent-primary)" />
            </div>
            <h4 style={{ margin: 0 }}>Order Food</h4>
          </div>
          <div className="card glass" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
            <div style={{ background: 'rgba(245, 158, 11, 0.2)', padding: '1rem', borderRadius: '50%', marginBottom: '0.75rem' }}>
              <Bell size={24} color="var(--warning)" />
            </div>
            <h4 style={{ margin: 0 }}>Notifications</h4>
          </div>
        </div>

        <h3 style={{ marginBottom: '1rem' }}>Active Orders</h3>
        {recentOrders.length > 0 ? (
          recentOrders.map(order => (
            <div key={order.id} className="card glass" style={{ marginBottom: '1rem', cursor: 'pointer' }} onClick={() => navigate(\`/track/\${order.id}\`)}>
              <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                <span className="badge badge-info">{order.status}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{order.time}</span>
              </div>
              <div className="flex-between">
                <div>
                  <h4 style={{ margin: 0 }}>Token: {order.token}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{order.items.length} items • ₹{order.total}</p>
                </div>
                <ChevronRight size={20} color="var(--text-muted)" />
              </div>
            </div>
          ))
        ) : (
          <div className="card glass flex-center" style={{ padding: '3rem 1rem', flexDirection: 'column', color: 'var(--text-muted)' }}>
            <Clock size={40} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p>No active orders right now.</p>
            <button className="btn btn-secondary" style={{ marginTop: '1rem' }} onClick={() => navigate('/menu')}>
              Browse Menu
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
