import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to='/' state={{ from: location.pathname }} replace />;
  }
  // if (!user?.isVerified) {
  //   return (
  //     <Navigate to='/verify-otp' state={{ from: location.pathname }} replace />
  //   );
  // }

  return <>{children}</>;
};
