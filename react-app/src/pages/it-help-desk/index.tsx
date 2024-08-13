import TextField from '@mui/material/TextField';
import { Box, Grid, IconButton, Paper, Typography } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ServiceDeskLayout from '../../components/layout/ServiceDeskLayout';
import { useEffect } from 'react';

const services = [
  {
    title: "IT Help Desk",
    description: "Description",
    url: "/app/it-help-desk",
    feature_image: "images/help-desk-svgrepo-com.svg"
  },
  {
    title: "HR Help Desk",
    description: "Description",
    url: "/app/hr-help-desk",
    feature_image: "images/help-desk-svgrepo-com.svg"
  },
  {
    title: "Central Service Desk",
    description: "Description",
    url: "/app/central-service-desk",
    feature_image: "images/help-desk-svgrepo-com.svg"
  }
];


// Define the types for App component state
interface TodoItem {
  id: number;
  notes: string;
}

// This segment contains the logic for loading the application
function ITHelpDesk() {
  useEffect(() => {
    document.title = "IT Help Desk"
 }, []);

  return (
    <ServiceDeskLayout>
      <Box sx={{
          backgroundImage: "url('images/dx-homepage-4.webp')",
          backgroundRepeat: "no-repeat",
          height: '385px',
          display: 'flex',
          flexDirection: 'column', // Use column direction to stack items
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2
        }}
      >
         {/* Header Text */}
         <Typography
          variant="h4" // Adjust the variant as needed
          sx={{
            color: 'white',
            fontWeight: 'bold',
            marginBottom: 2
          }}
        >
          Welcome to the SmartOsc Service Center
        </Typography>

        <form style={{ width: '100%', maxWidth: '600px' }}>
          <TextField
            fullWidth
            id="search-service-desk"
            variant="outlined"
            placeholder="Find help and service"
            sx={{
              backgroundColor: 'white', // Ensure background is white and opaque
              '& .MuiInputBase-root': {
                backgroundColor: 'white' // Ensures the input itself is also opaque
              }
            }}
            InputProps={{
              endAdornment: (
                <IconButton type="submit">
                  <SearchOutlined />
                </IconButton>
              ),
            }}
          />
        </form>
      </Box>

      {/* Grid Layout */}
      <Box sx={{ padding: 6 }}>
        <Grid container spacing={2} justifyContent="center">
          {services.map((item, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Link to={item.url} style={{ textDecoration: 'none' }}>
                <Paper elevation={3} sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
                  <Box 
                    component="img"
                    src={item.feature_image} // Replace with the path to your image
                    alt={item.title}
                    sx={{ width: 100, height: 100, marginRight: 2 }} // Adjust size as needed
                  />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2">
                      {item.description}
                    </Typography>
                  </Box>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ServiceDeskLayout>
  );
}

export default ITHelpDesk;
