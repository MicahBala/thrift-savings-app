import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if the user exists in local storage
  const user = JSON.parse(localStorage.getItem('thrift_user'));

  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  // If they are logged in, render whatever component is inside
  return children;
};

export default ProtectedRoute;
