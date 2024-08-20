import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

export default function MainNav() {
  const [auth, setAuth] = React.useState(true);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#205081" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <RouterLink to={process.env.PUBLIC_URL || '/'} style={{ textDecoration: 'none', color: 'inherit' }}>
              Service Desk
            </RouterLink>
          </Typography>
          {auth && (
            <div>
              <Link to={`/app/profile/`} style={{ textDecoration: 'none' }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  sx={{ color: 'white' }} // Set icon color to white
                >
                  <AccountCircle />
                </IconButton>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
