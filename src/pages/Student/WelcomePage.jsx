import { useNavigate } from 'react-router-dom';
import { ChefHat, ArrowRight } from 'lucide-react';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container flex-center" style={{ minHeight: '100vh' }}>
      {/* Background decoration */}
      <div style={{ position: 'fixed', top: '-10%', right: '-20%', width: '300px', height: '300px', background: 'var(--accent-primary)', filter: 'blur(150px)', opacity: 0.15, zIndex: -1 }}></div>
      <div style={{ position: 'fixed', bottom: '-10%', left: '-20%', width: '300px', height: '300px', background: 'var(--accent-secondary)', filter: 'blur(150px)', opacity: 0.15, zIndex: -1 }}></div>

      <div className="animate-fade-in" style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '1.5rem', borderRadius: '50%', marginBottom: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
          <ChefHat size={64} className="text-gold" color="var(--accent-primary)" />
        </div>
        
        <h1 className="text-gradient" style={{ marginBottom: '0.5rem' }}>Culinary</h1>
        <h1 className="text-gold" style={{ marginTop: '-1rem', marginBottom: '1.5rem' }}>Excellence</h1>
        
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.2rem', maxWidth: '80%' }}>
          Experience gourmet college dining without the wait.
        </p>
        
        <button className="btn btn-primary pulse-button" style={{ width: '90%', padding: '1.25rem' }} onClick={() => navigate('/login')}>
          Enter Canteen
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
