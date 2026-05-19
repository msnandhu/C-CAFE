import { useState } from 'react';
import { BarChart, TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';
import Navbar from '../../components/Navbar';

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('Day');
  const ranges = ['Day', 'Week', 'Month', 'Quarterly', 'Half-Yearly', 'Annually'];

  // Mock data based on selected time range
  const mockAnalytics = {
    'Day': { sales: 2450, orders: 45, customers: 38, growth: '+12%' },
    'Week': { sales: 15800, orders: 310, customers: 250, growth: '+5%' },
    'Month': { sales: 65400, orders: 1250, customers: 980, growth: '+18%' },
    'Quarterly': { sales: 195000, orders: 3800, customers: 2800, growth: '+22%' },
    'Half-Yearly': { sales: 380000, orders: 7500, customers: 5400, growth: '+15%' },
    'Annually': { sales: 750000, orders: 15200, customers: 11000, growth: '+30%' }
  };

  const currentData = mockAnalytics[timeRange];

  return (
    <div className="page-container animate-fade-in" style={{ padding: 0 }}>
      <Navbar title="Analytics Dashboard" />
      
      <div className="container" style={{ padding: '2rem 1.5rem', paddingBottom: '6rem' }}>
        
        {/* Admin Navigation */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          <a href="/admin/dashboard" className="btn btn-primary" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}>Dashboard</a>
          <a href="/admin/menu" className="btn-secondary" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}>Menu Management</a>
          <a href="/admin/orders" className="btn-secondary" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}>Order Management</a>
          <a href="/admin/kitchen" className="btn-secondary" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}>Kitchen Screen</a>
        </div>

        {/* Header & Time Range Filter */}
        <div className="flex-between" style={{ marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <BarChart color="var(--accent-primary)" /> Business Overview
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Track your canteen's performance across different time periods.</p>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: 'var(--radius-lg)', overflowX: 'auto' }}>
            {ranges.map(range => (
              <button 
                key={range}
                onClick={() => setTimeRange(range)}
                style={{ 
                  background: timeRange === range ? 'var(--accent-primary)' : 'transparent',
                  color: timeRange === range ? '#000' : 'var(--text-secondary)',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          
          <div className="card glass" style={{ borderTop: '4px solid var(--accent-primary)' }}>
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: '0.75rem', borderRadius: '50%' }}>
                <DollarSign size={24} color="var(--accent-primary)" />
              </div>
              <span className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <TrendingUp size={14} /> {currentData.growth}
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Revenue</p>
            <h2 style={{ margin: '0.5rem 0 0 0', fontSize: '2.5rem' }} className="text-gold">₹{currentData.sales}</h2>
          </div>

          <div className="card glass">
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.75rem', borderRadius: '50%' }}>
                <ShoppingBag size={24} color="var(--info)" />
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Orders</p>
            <h2 style={{ margin: '0.5rem 0 0 0', fontSize: '2.5rem' }}>{currentData.orders}</h2>
          </div>

          <div className="card glass">
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.75rem', borderRadius: '50%' }}>
                <Users size={24} color="var(--success)" />
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Unique Customers</p>
            <h2 style={{ margin: '0.5rem 0 0 0', fontSize: '2.5rem' }}>{currentData.customers}</h2>
          </div>

        </div>

        {/* Charts Mockup */}
        <div className="card glass-intense" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '2rem' }}>Sales Trend ({timeRange})</h3>
          
          <div style={{ height: '250px', display: 'flex', alignItems: 'flex-end', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            {/* Simple CSS Bar Chart Mockup */}
            {[40, 65, 30, 80, 55, 90, 45, 70, 60, 100].map((height, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ 
                  width: '100%', 
                  height: `${height}%`, 
                  background: 'linear-gradient(to top, var(--accent-primary), rgba(251, 191, 36, 0.3))',
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 1s cubic-bezier(0.16, 1, 0.3, 1)'
                }}></div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '1rem' }}>
            <span>Start</span>
            <span>Middle</span>
            <span>End</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
