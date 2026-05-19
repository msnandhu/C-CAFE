import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ChefHat, Package, ArrowLeft } from 'lucide-react';
import { getOrders } from '../../services/api';

const LiveTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = () => {
      getOrders().then(data => {
        const found = data.find(o => o.id === orderId);
        setOrder(found);
      });
    };
    
    fetchOrder();
    // Simulate real-time updates
    const interval = setInterval(fetchOrder, 3000);
    return () => clearInterval(interval);
  }, [orderId]);

  if (!order) return <div className="page-container flex-center">Loading...</div>;

  const steps = [
    { id: 'Received', title: 'Order Received', icon: <CheckCircle size={24} /> },
    { id: 'Preparing', title: 'Preparing', icon: <ChefHat size={24} /> },
    { id: 'Ready', title: 'Ready for Pickup', icon: <Package size={24} /> },
    { id: 'Delivered', title: 'Delivered', icon: <CheckCircle size={24} /> }
  ];

  const currentStepIndex = steps.findIndex(s => s.id === order.status);

  return (
    <div className="page-container animate-fade-in" style={{ padding: 0 }}>
      <div className="navbar glass" style={{ marginBottom: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%' }} onClick={() => navigate('/dashboard')}>
            <ArrowLeft size={20} />
          </button>
          <h3 style={{ margin: 0 }}>Order Tracking</h3>
        </div>
      </div>

      <div style={{ background: 'linear-gradient(135deg, var(--bg-primary), var(--bg-secondary))', padding: '3rem 2rem', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Your Token Number</p>
        <h1 style={{ fontSize: '4rem', color: 'var(--accent-primary)', textShadow: 'var(--shadow-glow)', margin: 0 }}>{order.token}</h1>
        {order.status === 'Ready' && (
          <div className="badge badge-success" style={{ marginTop: '1rem', fontSize: '1rem', padding: '0.5rem 1rem' }}>
            Ready to collect!
          </div>
        )}
      </div>
      
      <div className="container" style={{ paddingTop: '2rem' }}>
        <div className="card glass" style={{ padding: '2rem 1.5rem' }}>
          <h4 style={{ marginBottom: '2rem', textAlign: 'center' }}>Live Status</h4>
          
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '24px', top: '24px', bottom: '24px', width: '2px', background: 'var(--border-color)', zIndex: 0 }}></div>
            <div style={{ position: 'absolute', left: '24px', top: '24px', height: `${currentStepIndex * 33}%`, width: '2px', background: 'var(--accent-primary)', zIndex: 1, transition: 'height 0.5s ease' }}></div>
            
            {steps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const isActive = index === currentStepIndex;
              
              return (
                <div key={step.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: index === steps.length - 1 ? 0 : '2rem', position: 'relative', zIndex: 2 }}>
                  <div style={{ 
                    width: '50px', height: '50px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', 
                    background: isCompleted ? 'var(--accent-primary)' : 'var(--bg-secondary)', 
                    color: isCompleted ? 'white' : 'var(--text-muted)',
                    boxShadow: isActive ? 'var(--shadow-glow)' : 'none',
                    border: '2px solid',
                    borderColor: isCompleted ? 'var(--accent-primary)' : 'var(--border-color)',
                    transition: 'all 0.3s ease'
                  }}>
                    {step.icon}
                  </div>
                  <div style={{ paddingTop: '0.5rem' }}>
                    <h5 style={{ margin: 0, color: isCompleted ? 'var(--text-primary)' : 'var(--text-muted)', fontSize: '1.1rem' }}>{step.title}</h5>
                    {isActive && index < steps.length - 1 && (
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>Estimated time: 5-10 mins</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card glass" style={{ marginTop: '1.5rem' }}>
          <h4 style={{ marginBottom: '1rem' }}>Order Details</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>Order ID: {order.id}</p>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex-between" style={{ marginBottom: '0.5rem' }}>
              <span>{item.quantity} x {item.name}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="flex-between" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed var(--border-color)', fontWeight: 600 }}>
            <span>Total Paid</span>
            <span style={{ color: 'var(--accent-primary)' }}>₹{order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;
