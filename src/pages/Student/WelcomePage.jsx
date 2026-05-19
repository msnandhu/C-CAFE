import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Coffee, ArrowRight, Clock } from 'lucide-react';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container flex-center">
      <div className="card glass animate-fade-in" style={{ width: '100%', textAlign: 'center', padding: '3rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{ background: 'var(--accent-primary)', padding: '1rem', borderRadius: '50%', boxShadow: 'var(--shadow-glow)' }}>
            <Coffee size={48} color="white" />
          </div>
        </div>
        
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Smart Canteen</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Fresh food, zero queues.</p>
        
        <div className="card" style={{ background: 'rgba(0,0,0,0.2)', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <Clock size={20} color="var(--info)" />
          <span>Open Today: 8:00 AM - 6:00 PM</span>
        </div>
        
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigate('/login')}>
          Get Started
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
