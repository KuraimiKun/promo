import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import './adminLogin.css';
// Import your logo - adjust the path as needed

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin-dashboard');
    } catch (error) {
      setError('بيانات غير صحيحة. حاول مرة أخرى');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container" style={{ backgroundColor: theme.palette.background.default }}>
      <div className="login-box" style={{ backgroundColor: theme.palette.background.paper }}>
        <img src='/logoWide.png' alt="الشعار" className="login-logo" />
        <h1 style={{ color: theme.palette.primary.main }}>تسجيل دخول المشرف</h1>
        {error && <div className="error-message" style={{ color: theme.palette.error.main }}>{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="البريد الإلكتروني"
              required
              style={{ fontFamily: theme.typography.fontFamily }}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Fixed the password setter
              placeholder="كلمة المرور"
              required
              style={{ fontFamily: theme.typography.fontFamily }}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              backgroundColor: theme.palette.primary.main,
              color: '#fff',
              fontFamily: theme.typography.fontFamily 
            }}
          >
            {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
