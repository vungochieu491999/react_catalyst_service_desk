import { useEffect } from 'react';
import PortalList from './client/portal';

// This segment contains the logic for loading the application
function Home() {
  useEffect(() => {
    document.title = "Home"
  }, []);

  return (
    <PortalList />
  );
}

export default Home;
