import { useEffect, useState } from 'react';
import { ChefHat, CheckCircle, Package } from 'lucide-react';
import { getOrders, updateOrderStatus } from '../../services/api';
import Navbar from '../../components/Navbar';

const KitchenDashboard = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    getOrders().then(data => {
      // Kitchen only sees Received and Preparing orders
      setOrders(data.filter(o => o.status === 'Received' || o.status === 'Preparing'));
    });
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    await updateOrderStatus(orderId, newStatus);
    fetchOrders();
  };

  return (
    <div className="page-container" style={{ padding: 0, maxWidth: '800px' }}>
      <Navbar title="Kitchen Display System" />
      
      <div className="container" style={{ paddingBottom: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {orders.map(order => (
            <div key={order.id} className="card glass" style={{ borderTop: `4px solid ${order.status === 'Received' ? 'var(--warning)' : 'var(--info)'}` }}>
              <div className="flex-between" style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <h2 style={{ margin: 0, color: 'var(--accent-primary)' }}>{order.token}</h2>
                <div style={{ textAlign: 'right' }}>
                  <span className={`badge ${order.status === 'Received' ? 'badge-warning' : 'badge-info'}`}>{order.status}</span>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{order.time}</div>
                </div>
              </div>
              
              <div style={{ marginBottom: '1.5rem', minHeight: '100px' }}>
                {order.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                    <span style={{ fontWeight: 600 }}>{item.quantity}x</span>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {order.status === 'Received' && (
                  <button className="btn btn-primary" style={{ flex: 1, background: 'var(--info)' }} onClick={() => handleUpdateStatus(order.id, 'Preparing')}>
                    <ChefHat size={18} /> Start Prep
                  </button>
                )}
                {order.status === 'Preparing' && (
                  <button className="btn btn-primary" style={{ flex: 1, background: 'var(--success)' }} onClick={() => handleUpdateStatus(order.id, 'Ready')}>
                    <CheckCircle size={18} /> Mark Ready
                  </button>
                )}
              </div>
            </div>
          ))}
          
          {orders.length === 0 && (
            <div className="card glass flex-center" style={{ gridColumn: '1 / -1', padding: '4rem', flexDirection: 'column', color: 'var(--text-muted)' }}>
              <Package size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
              <h3>No active orders</h3>
              <p>Kitchen is clear!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KitchenDashboard;
