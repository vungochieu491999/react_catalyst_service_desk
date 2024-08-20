import { Box, Container, Paper, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import ServiceDeskLayout from '../../../components/layout/ServiceDeskLayout';
import Footer from '../../../components/layout/footer';
import axios from 'axios';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

// Define the types for App component state
interface PortalDetail {
    id: number;
    name: string;
    descriptions: string;
    feature_image?: string;
}

// Define the types for App component state
interface Service {
    id: number;
    name: string;
    descriptions: string;
    feature_image?: string;
}

// This segment contains the logic for loading the application
function PortalDetail() {
    useEffect(() => {
        document.title = "Portal"
    }, []);

    const { id } = useParams();
    console.log(id);

    const [portalItemDetails, setPortalItemDetails] = useState<PortalDetail | null>(null);
    const [serviceItems, setServiceItems] = useState<Service[]>([]);
    const [fetchState, setFetchState] = useState<'init' | 'loading' | 'fetched'>('init');

    useEffect(() => {
        if (fetchState !== 'fetched') {
            axios.get(`/server/service_desk_advanced_function/portal/${id}`)
            .then((response) => {
                const { data: { portalDetails, services } } = response.data;
                setPortalItemDetails(portalDetails);
                setServiceItems(services);
                setFetchState('fetched');
            })
            .catch((err) => {
                console.log(err.response);
            });
        }
    }, [fetchState]);

    console.log("portalDetails", portalItemDetails);
    console.log("services", serviceItems);

    return (
        <ServiceDeskLayout>
            <Box 
                className="main-content"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    minHeight: '100vh', // Ensure it takes at least the full viewport height
                }}
            >
                <Box
                    sx={{
                        backgroundColor: "#205081",
                        backgroundRepeat: "no-repeat",
                        height: '385px', // Fixed height for the header
                        position: 'relative', // Position relative to contain absolute positioning
                        width: '100%', // Full width of the parent
                    }}
                >
                    <Container
                        sx={{
                            position: 'absolute', // Absolute positioning within the Box
                            top: 0, // Align to the top of the Box
                            left: '50%', // Center horizontally
                            transform: 'translateX(-50%)', // Center horizontally with transform
                            backgroundColor: 'white',
                            width: '100%', // Full width of the Box
                            maxWidth: 'md', // Optional: max width for better centering
                            padding: 2, // Padding inside the Container
                            overflow: 'visible', // Ensure overflow is visible
                            boxSizing: 'border-box', // Include padding and border in width and height
                            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)', // Add a bottom shadow on hover
                        }}
                    >
                        <Box sx={{ padding: 6 }}>
                            <Box className="header-text"
                                sx={{
                                    boxSizing: 'border-box',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    width: '100%',
                                    overflow: 'hidden',
                                    position: 'relative', // Ensure the pseudo-element is positioned correctly
                                }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                                    {portalItemDetails?.name}
                                </Typography>
                                <Typography variant="body2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(portalItemDetails?.descriptions || '') }}>
                                </Typography>
                            </Box>
                        </Box>
                        {serviceItems.length ? (
                        serviceItems.map((item, index) => (
                            <Link key={item.id} to={`/app/portal/${item.id}`} style={{ textDecoration: 'none' }}>
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
                            ))
                        ) : (
                        <Box>
                            <Typography>
                                No portal available.
                            </Typography>
                        </Box>
                        )}
                        <Footer/>
                    </Container>
                </Box>

                {/* Content Box that grows with the Container */}
                <Box
                    sx={{
                        flexGrow: 1, // Allow this Box to grow and take available space
                        padding: 2, // Optional padding
                        backgroundColor: 'white', // Optional background color for visibility
                    }}
                >
                    {/* Additional content here if needed */}
                </Box>
            </Box>
        </ServiceDeskLayout>
    );
}

export default PortalDetail;
