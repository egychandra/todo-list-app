import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, registerSuccess } from '../redux/slices/authSlice';
import { useSearchParams, useNavigate } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';

const AuthPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const urlMode = searchParams.get('mode');
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    setIsLogin(urlMode !== 'register');
  }, [urlMode]);

  const handleSwitchToRegister = () => {
    setIsLogin(false);
    window.history.replaceState(null, '', '/auth?mode=register');
  };

  const handleSwitchToLogin = () => {
    setIsLogin(true);
    window.history.replaceState(null, '', '/auth?mode=login');
  };

  const handleLoginSuccess = (token, username) => {
    dispatch(loginSuccess({ token, username }));
    navigate('/checklists', { replace: true });
  };

  const handleRegisterSuccess = (token, username) => {
    dispatch(registerSuccess({ token, username }));
    navigate('/checklists', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {isLogin ? (
        <LoginForm
          onLoginSuccess={handleLoginSuccess}
          onSwitchToRegister={handleSwitchToRegister}
        />
      ) : (
        <RegisterForm
          onRegisterSuccess={handleRegisterSuccess}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
    </div>
  );
};

export default AuthPage;