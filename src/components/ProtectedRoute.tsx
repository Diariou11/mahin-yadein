import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: 'passenger' | 'driver';
}

export const ProtectedRoute = ({ children, requiredUserType }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('demo_authenticated') === 'true';
  const userType = localStorage.getItem('demo_user_type') as 'passenger' | 'driver' || 'passenger';

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (requiredUserType && userType !== requiredUserType) {
      navigate(userType === 'driver' ? '/driver-dashboard' : '/home');
    }
  }, [isAuthenticated, userType, requiredUserType, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  if (requiredUserType && userType !== requiredUserType) {
    return null;
  }

  return <>{children}</>;
};
