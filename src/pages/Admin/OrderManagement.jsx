import { useEffect, useState } from 'react';
import { QrCode, CheckCircle } from 'lucide-react';
import { getOrders, updateOrderStatus } from '../../services/api';
import Navbar from '../../components/Navbar';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');

  const fetchOrders = () => {
    getOrders().then(data => setOrders(data));
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDeliver = async (orderId) => {
    await updateOrderStatus(orderId, 'Delivered');
    fetchOrders();
  };

  const filteredOrders = filterStatus === 'All' ? orders : orders.filter(o => o.status === filterStatus);

  return (
    <div className="page-container" style={{ padding: 0, maxWidth: '1000px' }}>
      <Navbar title="Order Management" />
      
      <div className="container" style={{ paddingBottom: '2rem' }}>
        
        {/* Admin Navigation */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem', marginTop: '2rem' }}>
          <a href="/admin/dashboard" className="btn-secondary" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}>Dashboard</a>
          <a href="/admin/menu" className="btn-secondary" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}>Menu Management</a>
          <a href="/admin/orders" className="btn btn-primary" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}>Order Management</a>
          <a href="/admin/kitchen" className="btn-secondary" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}>Kitchen Screen</a>
        </div>

        <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h3 style={{ margin: 0 }}>Orders List</h3>
            <select className="input-control" style={{ padding: '0.25rem 0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-primary)', borderRadius: 'var(--radius-md)' }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Received">Received</option>
              <option value="Preparing">Preparing</option>
              <option value="Ready">Ready</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          <button className="btn btn-secondary">
            <QrCode size={18} /> Scan QR
          </button>
        </div>

        <div className="card glass" style={{ overflowX: 'auto', padding: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)' }}>
                <th style={{ padding: '1rem' }}>Token</th>
                <th style={{ padding: '1rem' }}>Student ID</th>
                <th style={{ padding: '1rem' }}>Items</th>
                <th style={{ padding: '1rem' }}>Total</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--accent-primary)' }}>{order.token}</td>
                  <td style={{ padding: '1rem' }}>{order.studentId}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>₹{order.total}</td>
                  <td style={{ padding: '1rem' }}>
                    <span className={`badge ${order.status === 'Delivered' ? 'badge-success' : order.status === 'Ready' ? 'badge-info' : 'badge-warning'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    {order.status === 'Ready' && (
                      <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }} onClick={() => handleDeliver(order.id)}>
                        <CheckCircle size={16} /> Deliver
                      </button>
                    )}
                    {order.status === 'Delivered' && (
                      <span style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem' }}>
                        <CheckCircle size={16} /> Done
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
