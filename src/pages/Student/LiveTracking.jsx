import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, ChefHat, Package, ArrowLeft } from 'lucide-react';
import { getOrders } from '../../services/api';

const LiveTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = () => {
      getOrders().then(data => {
        const found = data.find(o => o.id === orderId);
        if (found) setOrder(found);
      });
    };
    
    fetchOrder();
    const interval = setInterval(fetchOrder, 3000);
    return () => clearInterval(interval);
  }, [orderId]);

  if (!order) return <div className="page-container flex-center">Loading order details...</div>;

  const steps = [
    { status: 'Received', icon: Clock, title: 'Order Received', desc: 'We have received your order.' },
    { status: 'Preparing', icon: ChefHat, title: 'In the Kitchen', desc: 'Your food is being prepared.' },
    { status: 'Ready', icon: Package, title: 'Ready for Pickup', desc: 'Your order is ready. Show token to collect.' },
    { status: 'Delivered', icon: CheckCircle, title: 'Delivered', desc: 'Enjoy your meal!' }
  ];

  const currentStepIndex = steps.findIndex(s => s.status === order.status);

  return (
    <div className="page-container animate-fade-in" style={{ padding: 0 }}>
      <div className="navbar glass" style={{ margin: '1rem', background: 'transparent', border: 'none', boxShadow: 'none' }}>
        <button className="btn-secondary" style={{ padding: '0.75rem', borderRadius: '50%' }} onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={24} />
        </button>
      </div>
      
      <div className="container" style={{ paddingBottom: '2rem', maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem', marginTop: '1rem' }}>
          <p style={{ color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600, marginBottom: '0.5rem' }}>Your Token</p>
          <h1 className="text-gold" style={{ fontSize: '5rem', margin: 0, textShadow: 'var(--shadow-glow-intense)' }}>{order.token}</h1>
        </div>

        <div className="card glass-intense" style={{ padding: '2.5rem 1.5rem', borderRadius: 'var(--radius-xl)' }}>
          <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Live Status</h3>
          
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '28px', top: '24px', bottom: '24px', width: '3px', background: 'rgba(255,255,255,0.05)', zIndex: 0 }}></div>
            <div style={{ position: 'absolute', left: '28px', top: '24px', height: `${currentStepIndex * 33}%`, width: '3px', background: 'var(--accent-primary)', boxShadow: 'var(--shadow-glow)', zIndex: 1, transition: 'height 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}></div>
            
            {steps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const Icon = step.icon;
              
              return (
                <div key={index} style={{ display: 'flex', gap: '1.5rem', marginBottom: index < steps.length - 1 ? '2.5rem' : '0', position: 'relative', zIndex: 2 }}>
                  <div style={{ 
                    width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isCompleted ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                    color: isCompleted ? '#000' : 'var(--text-muted)',
                    border: `2px solid ${isCompleted ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)'}`,
                    boxShadow: isCurrent ? 'var(--shadow-glow-intense)' : 'none',
                    transition: 'all 0.5s ease',
                    flexShrink: 0
                  }}>
                    <Icon size={28} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', opacity: isCompleted ? 1 : 0.4 }}>
                    <h4 style={{ margin: 0, fontSize: '1.25rem', color: isCompleted ? 'var(--text-primary)' : 'var(--text-muted)' }}>{step.title}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;
