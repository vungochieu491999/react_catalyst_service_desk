import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Avatar, Button as MuiButton, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

// Define the type for userDetails
interface UserDetails {
  firstName: string;
  lastName: string;
  mailid: string;
  timeZone: string;
  createdTime: string;
}

// Define the type for the API result
interface AuthResult {
  content: {
    first_name: string;
    last_name: string;
    email_id: string;
    time_zone: string;
    created_time: string;
  };
}

// Styled Card component with shadow
const StyledCard = styled(Card)({
  maxWidth: 600,
  margin: '20px auto',
  padding: '20px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
});

const UserProfile: React.FC = () => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    firstName: '',
    lastName: '',
    mailid: '',
    timeZone: '',
    createdTime: '',
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const result = (await window.catalyst.auth.isUserAuthenticated()) as AuthResult;
        setUserDetails({
          firstName: result.content.first_name,
          lastName: result.content.last_name,
          mailid: result.content.email_id,
          timeZone: result.content.time_zone,
          createdTime: result.content.created_time,
        });
      } catch (err) {
        console.error('Failed to fetch user details:', err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchUserDetails();
  }, []);

  const logout = async () => {
    try {
      const auth = window.catalyst.auth;
      await auth.signOut('/');
      // Redirect user after logout if needed
      // window.location.href = '/login'; // For example, redirect to login page
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (isFetching) {
    return (
      <StyledCard>
        <CardContent style={{ textAlign: 'center' }}>
          <CircularProgress />
        </CardContent>
      </StyledCard>
    );
  }

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          User Profile Information
        </Typography>
        <Avatar
          alt="User Profile"
          src="https://cdn2.iconfinder.com/data/icons/user-management/512/profile_settings-512.png"
          sx={{ width: 100, height: 100, margin: '0 auto', display: 'block' }}
        />
        <Typography variant="body1" gutterBottom>
          <strong>First Name:</strong> {userDetails.firstName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Last Name:</strong> {userDetails.lastName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Email Address:</strong> {userDetails.mailid}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Time Zone:</strong> {userDetails.timeZone}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Joined On:</strong> {userDetails.createdTime}
        </Typography>
        <MuiButton 
          variant="contained" 
          color="primary" 
          style={{ marginTop: '20px' }} 
          onClick={logout} // Connect the logout function to the button's onClick event
        >
          Logout
        </MuiButton>
      </CardContent>
    </StyledCard>
  );
};

export default UserProfile;
