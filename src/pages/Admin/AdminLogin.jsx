import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('admin');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password) {
      if (role === 'admin' || role === 'cashier') navigate('/admin/orders');
      if (role === 'kitchen') navigate('/admin/kitchen');
    }
  };

  return (
    <div className="page-container flex-center">
      <div className="card glass animate-fade-in" style={{ width: '100%', borderColor: 'var(--accent-secondary)' }}>
        <div className="flex-center" style={{ marginBottom: '1rem' }}>
          <Shield size={48} color="var(--accent-secondary)" />
        </div>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Staff Portal</h2>
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Select Role</label>
            <select className="input-control" value={role} onChange={(e) => setRole(e.target.value)} style={{ WebkitAppearance: 'none', appearance: 'none', background: 'rgba(255,255,255,0.05)' }}>
              <option value="admin">Admin Manager</option>
              <option value="cashier">Cashier</option>
              <option value="kitchen">Kitchen Staff</option>
            </select>
          </div>
          
          <div className="input-group" style={{ marginBottom: '2rem' }}>
            <label>Passcode</label>
            <div style={{ position: 'relative' }}>
              <Lock size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="password" 
                className="input-control" 
                placeholder="Enter staff passcode" 
                style={{ paddingLeft: '3rem' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', background: 'linear-gradient(135deg, var(--accent-secondary), #fbbf24)', color: 'black' }}>
            Access Portal
            <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
