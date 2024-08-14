import axios from 'axios';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Grid, IconButton, Paper, Typography } from '@mui/material';
import { Add, SearchOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ServiceDeskLayout from '../../../components/layout/ServiceDeskLayout';

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
function PortalDetail() {
  useEffect(() => {
    document.title = "Home"
 }, []);
  const [page, setPage] = useState(1);
  const [notes, setNotes] = useState('');
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fetchState, setFetchState] = useState<'init' | 'loading' | 'fetched'>('init');

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNotes(value);
  }, []);

  useEffect(() => {
    if (fetchState !== 'fetched') {
      axios
        .get('/server/todo_list_advanced_function/all', { // Ensure correct URL
          params: { page, perPage: 200 } // The parameters contain the start limit and the end limit of data (tasks) that can be fetched from the data store
        })
        .then((response) => {
          console.log(response.data);
          const { data: { todoItems, hasMore } } = response.data;
          if (page === 1) {
            setTodoItems(todoItems);
          } else {
            // Assuming setTodoItems is a function that takes a callback
            setTodoItems((prev: TodoItem[]): TodoItem[] => {
              const mergedItems = prev.concat(todoItems);
              const uniqueItems = mergedItems.reduce((acc: TodoItem[], current: TodoItem) => {
                if (!acc.some(item => item.id === current.id)) {
                  acc.push(current);
                }
                return acc;
              }, []);
              return uniqueItems;
            });
          }
          setHasMore(hasMore);
          setFetchState('fetched');
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }, [fetchState, page]);

  // This segment contains the logic for creating a new task
  const createTodo = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSubmitting(true);
      axios
        .post('/server/todo_list_advanced_function/add', { notes }) // Ensure correct URL
        .then((response) => {
          const { data: { todoItem } } = response.data;
          setNotes('');
          setTodoItems((prev) => [{ ...todoItem }, ...prev]);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
    [notes]
  );

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

        <form onSubmit={createTodo} style={{ width: '100%', maxWidth: '600px' }}>
          <TextField
            fullWidth
            id="search-service-desk"
            variant="outlined"
            placeholder="Find help and service"
            value={notes}
            onChange={onChange}
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

export default PortalDetail;
