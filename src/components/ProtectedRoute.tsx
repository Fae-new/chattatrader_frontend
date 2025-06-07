import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to sign-up page if not authenticated
    // Also save the attempted URL to redirect back after login
    return <Navigate to='/' state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};
