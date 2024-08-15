import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Avatar, Container } from '@mui/material';
import { styled } from '@mui/system';

// Styled components
const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  padding: 0, // Ensure there's no extra padding
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(10),
  height: theme.spacing(10),
  marginBottom: theme.spacing(2),
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'underline',
}));

const LoginPage: React.FC = () => {
  useEffect(() => {
    // Define configuration for sign-in
    const config = {
      css_url: "/app/embeddediframe.css", // Custom CSS for login page
      is_customize_forgot_password: false, // Whether to customize forgot password page
      forgot_password_id: "login", // ID where forgot password page will be rendered
      forgot_password_css_url: "/app/fpwd.css" // Custom CSS for forgot password page
    };

    // Check if `catalyst` is available before using it
    if (window.catalyst && window.catalyst.auth) {
      window.catalyst.auth.signIn("login", config);
    } else {
      console.error("Zoho Catalyst SDK is not loaded.");
    }
  }, []);

  return (
    <StyledContainer>
      <StyledAvatar
        src="https://cdn2.iconfinder.com/data/icons/user-management/512/profile_settings-512.png"
        alt="User Icon"
      />
      <Typography variant="h4" component="h1" gutterBottom>
        User Authentication
      </Typography>
      <Box
        id="login"
        sx={{
          width: '100%',
          height: '100%',
          maxWidth: 400,
          maxHeight: '80vh', // Prevent the box from growing too large
          overflow: 'hidden', // Prevent scrollbars if the content is too big
        }}
      >
        {/* Login iframe or content will be rendered here */}
      </Box>
      <Typography variant="body1" align="center" mt={2}>
        <b>
          Don't have an account?{' '}
          <StyledLink to="/app/signup">
            Sign-up
          </StyledLink>{' '}
          now!
        </b>
      </Typography>
    </StyledContainer>
  );
};

export default LoginPage;
