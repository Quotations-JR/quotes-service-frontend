import { Navigate } from 'react-router-dom';

export default function AdminRoute({ user, children }) {
  if (!user) return <div>Cargando...</div>;

  if (user.role !== 'ADMIN') {
    return <Navigate to="/403" replace />;
  }

  return children;
}