import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight } from 'lucide-react';

const LoginPage = ({ setStudent }) => {
  const navigate = useNavigate();
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (rollNo.length > 3) {
      setStudent({ rollNo, name: 'Alex Doe', wallet: 250 });
      navigate('/dashboard');
    }
  };

  return (
    <div className="page-container flex-center">
      <div className="card glass animate-fade-in" style={{ width: '100%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Student Login</h2>
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Roll Number / Register Number</label>
            <div style={{ position: 'relative' }}>
              <User size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                className="input-control" 
                placeholder="e.g. 20CS001" 
                style={{ paddingLeft: '3rem' }}
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="input-group" style={{ marginBottom: '2rem' }}>
            <label>Password or OTP</label>
            <div style={{ position: 'relative' }}>
              <Lock size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="password" 
                className="input-control" 
                placeholder="Enter password" 
                style={{ paddingLeft: '3rem' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Login securely
            <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
