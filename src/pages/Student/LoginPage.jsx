import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, LogIn } from 'lucide-react';

const LoginPage = ({ setStudent }) => {
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (rollNo && password) {
      setStudent({
        name: 'Alex Johnson',
        rollNo: rollNo.toUpperCase(),
        wallet: 500
      });
      navigate('/dashboard');
    }
  };

  return (
    <div className="page-container flex-center" style={{ minHeight: '100vh', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '10%', left: '-10%', width: '300px', height: '300px', background: 'var(--accent-primary)', filter: 'blur(150px)', opacity: 0.15, zIndex: -1 }}></div>
      <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: '300px', height: '300px', background: 'var(--accent-secondary)', filter: 'blur(150px)', opacity: 0.15, zIndex: -1 }}></div>

      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="text-gradient">Welcome Back</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Sign in to continue your culinary journey</p>
        </div>

        <form onSubmit={handleLogin} className="card glass-intense" style={{ padding: '2.5rem 2rem' }}>
          <div className="input-group">
            <label>Roll Number</label>
            <div style={{ position: 'relative' }}>
              <User size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                className="input-control" 
                style={{ paddingLeft: '3.5rem' }}
                placeholder="e.g. 20CS001" 
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="input-group" style={{ marginBottom: '2.5rem' }}>
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="password" 
                className="input-control"
                style={{ paddingLeft: '3.5rem' }} 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.25rem' }}>
            <LogIn size={20} />
            Secure Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
