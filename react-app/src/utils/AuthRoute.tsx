import { useEffect, useState } from 'react';
import { Navigate, useLocation, Outlet  } from 'react-router-dom';

const AuthRoute = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        if (window.catalyst && window.catalyst.auth) {
          const result = await window.catalyst.auth.isUserAuthenticated();
          setIsUserAuthenticated(result);
        } else {
          console.error('Zoho Catalyst SDK is not loaded.');
          setIsUserAuthenticated(false);
        }
      } catch (err) {
        console.error('Authentication check failed', err);
        setIsUserAuthenticated(false);
      } finally {
        setIsFetching(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isFetching) {
    return <p>Loading…</p>;
  }

  if (!isUserAuthenticated) return <Navigate to="/app/login" state={{ from: location }} />;
  return <Outlet />;
};

export default AuthRoute;
