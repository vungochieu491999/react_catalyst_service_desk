import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Container, Grid, IconButton, Paper, Typography } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ServiceDeskLayout from '../../../components/layout/ServiceDeskLayout';
import Footer from '../../../components/layout/footer';

// Define the types for App component state
interface Portal {
  id: number;
  name: string;
  descriptions: string;
  feature_image?: string;
}

// This segment contains the logic for loading the application
function PortalList() {
    useEffect(() => {
        document.title = "All Portals"
    }, []);

    const [page, setPage] = useState(1);
    const [notes, setNotes] = useState('');
    const [portalItems, setPortalItems] = useState<Portal[]>([]);
    const [hasMore, setHasMore] = useState(false);
    const [fetchState, setFetchState] = useState<'init' | 'loading' | 'fetched'>('init');

    const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
        setNotes(value);
    }, []);

    useEffect(() => {
        if (fetchState !== 'fetched') {
            axios.get('/server/service_desk_advanced_function/portal', { params: { page, perPage: 200 } })
            .then((response) => {
                const { data: { portals: portalItems, hasMore } } = response.data;
                setPortalItems(portalItems);
                setHasMore(hasMore);
                setFetchState('fetched');
            })
            .catch((err) => {
                console.log(err.response);
            });
        }
    }, [fetchState, page]);

    return (
    <ServiceDeskLayout>
        <Box sx={{
        backgroundColor: "#205081",
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
        Welcome to the SmartOSC Service Center
        </Typography>

        <form style={{ width: '100%', maxWidth: '600px' }}>
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

        <Container>
            <Box sx={{
                padding:2
            }}>
                <Typography variant='h5'>All portals</Typography>
            </Box>
            {/* Grid Layout */}
            <Box sx={{ padding: 2 }}>
                <Grid container spacing={2} justifyContent="center">
                    {portalItems.length ? (
                        portalItems.map((item, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Link to={`/app/portal/${item.id}`} style={{ textDecoration: 'none' }}>
                                    <Paper
                                    elevation={3} 
                                    sx={{
                                    boxSizing: 'border-box',
                                    display: 'flex',
                                    height: '10rem',
                                    width: '100%', // Make the width 100% for responsive design
                                    maxWidth: '24rem',
                                    padding: "1.5rem",
                                    alignItems: 'center',
                                    transition: 'transform 0.3s', // Add transition for animation
                                    '&:hover': {
                                        transform: 'translateY(-5px)', // Slightly lift the card on hover
                                        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)', // Add a bottom shadow on hover
                                    }
                                    }}>
                                        {item.feature_image && (
                                            <Box 
                                            component="img"
                                            src={`${process.env.PUBLIC_URL}/${item.feature_image}`}
                                            alt={item.name}
                                            sx={{ 
                                                width: 50, 
                                                height: 50, 
                                                marginRight: 2 
                                            }} 
                                            />
                                        )}
                                        <Box 
                                        sx={{
                                            boxSizing: 'border-box',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '100%',
                                            width: '100%',
                                            overflow: 'hidden',
                                            position: 'relative', // Ensure the pseudo-element is positioned correctly
                                            '&::after': {
                                                content: '""',
                                                position: 'absolute',
                                                display: "block",
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                width: '100%',
                                                height: '10px', // Adjust the height as needed
                                                background: "linear-gradient(hsla(0, 0%, 100%, 0), #fff)"
                                            }
                                        }}>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                                                {item.name}
                                            </Typography>
                                            <Typography variant="body2" >
                                                {item.descriptions}
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Link>
                            </Grid>
                        ))
                    ) : (
                    <Box>
                        <Typography>
                            No portal available.
                        </Typography>
                    </Box>
                    )}
                </Grid>
            </Box>

            <Footer/>
        </Container>
    </ServiceDeskLayout>
    );
}

export default PortalList;
