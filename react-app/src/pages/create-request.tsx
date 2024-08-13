import React, { useEffect, useState } from 'react';
import { Box, Button, MenuItem, TextField, Typography, Paper } from '@mui/material';
import ServiceDeskLayout from '../components/layout/ServiceDeskLayout';

const approvalOptions = [
  { value: 'kiendb@smartosc.com', label: 'kiendb@smartosc.com' },
  { value: 'hieuvn@smartosc.com', label: 'hieuvn@smartosc.com' },
];

interface FormData {
  need: string;
  description: string;
  approval: string;
  dueDate: string;
}

function CreateRequest() {
  const [formData, setFormData] = useState<FormData>({
    need: '',
    description: '',
    approval: '',
    dueDate: '',
  });

  useEffect(() => {
    document.title = "Create Request";
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <ServiceDeskLayout>
      <Box sx={{
        backgroundImage: "url('images/dx-homepage-4.webp')",
        backgroundRepeat: "no-repeat",
        height: '385px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2
      }}>
        {/* Header Text */}
        <Typography
          variant="h4"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            marginBottom: 2
          }}
        >
          Welcome to the SmartOsc Service Center
        </Typography>
      </Box>

      <Box sx={{ padding: 6, display: 'flex', justifyContent: 'center' }}>
        <Paper elevation={3} sx={{ padding: 4, maxWidth: '600px', width: '100%' }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Create a New Service Request
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id="need"
              name="need"
              label="What do you need?"
              variant="outlined"
              value={formData.need}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              id="approval"
              name="approval"
              label="Approval"
              variant="outlined"
              select
              value={formData.approval}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            >
              {approvalOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              id="dueDate"
              name="dueDate"
              label="Due Date"
              type="date"
              variant="outlined"
              value={formData.dueDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              sx={{ marginBottom: 2 }}
            />
            <Button type="submit" variant="contained" color="primary">
              Submit Request
            </Button>
          </form>
        </Paper>
      </Box>
    </ServiceDeskLayout>
  );
}

export default CreateRequest;
