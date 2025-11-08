import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: 'passenger' | 'driver';
}

export const ProtectedRoute = ({ children, requiredUserType }: ProtectedRouteProps) => {
  const { user, loading, userType } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login');
      } else if (requiredUserType && userType !== requiredUserType) {
        // Redirect to appropriate dashboard if user type doesn't match
        navigate(userType === 'driver' ? '/driver-dashboard' : '/home');
      }
    }
  }, [user, loading, userType, requiredUserType, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (requiredUserType && userType !== requiredUserType) {
    return null;
  }

  return <>{children}</>;
};
