import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div className="spinner" />;

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}
