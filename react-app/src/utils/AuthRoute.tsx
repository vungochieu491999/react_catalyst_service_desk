import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthRouteProps {
  element: React.ComponentType<any>;
  [key: string]: any; // Allow any additional props
}

const AuthRoute: React.FC<AuthRouteProps> = ({ element: Component, ...rest }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const result = await window.catalyst.auth.isUserAuthenticated();
        console.log(result);
        setIsUserAuthenticated(result);
      } catch (err) {
        console.error('Authentication check failed', err);
      } finally {
        setIsFetching(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isFetching) {
    return <p>Loading…</p>;
  }

  return isUserAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/app/login" state={{ from: location }} />
  );
};

export default AuthRoute;