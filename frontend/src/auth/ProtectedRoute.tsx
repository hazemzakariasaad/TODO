import { useAuth } from '../context/AuthContext';
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className='spinner'></div>; // or show a spinner
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
