import { Box, Breadcrumbs, Container, Paper, Typography } from '@mui/material';
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

    const [portalItemDetails, setPortalItemDetails] = useState<PortalDetail>({ id: 0, name: '', descriptions: '' });
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
                            width: '900px', // Full width of the Box
                            maxWidth: 'md', // Optional: max width for better centering
                            padding: 2, // Padding inside the Container
                            overflow: 'visible', // Ensure overflow is visible
                            boxSizing: 'border-box', // Include padding and border in width and height
                            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)', // Add a bottom shadow on hover
                        }}
                    >
                        <Box sx={{ padding: 6 }}>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link
                                    to="/app/"
                                    color="inherit"
                                    style={{ textDecoration: 'none' }}
                                    onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                    onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                                >
                                    All Portals
                                </Link>
                                <Typography color="text.primary">{portalItemDetails && portalItemDetails.name}</Typography>
                            </Breadcrumbs>
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
                                    {portalItemDetails && portalItemDetails.name}
                                </Typography>
                                <Typography variant="body2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(portalItemDetails?.descriptions || '') }}>
                                </Typography>
                            </Box>
                        </Box>
                        {serviceItems.length ? (
                            <Box sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Box className="servicedesk-service-card" sx={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: 6
                                    }}>
                                        {serviceItems.map((item, index) => (
                                            <Box sx={{
                                                display: 'flex',
                                                height: '100%',
                                                width: '100%',
                                                alignItems: 'center',
                                            }} key={index}>
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
                                                    position: 'relative',
                                                    padding: 2,
                                                }}>
                                                    <Box sx={{
                                                        display: 'inline-block',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        maxWidth: '100%', // Adjust the maxWidth as needed
                                                    }}>
                                                        <Link to={`/app/portal/${portalItemDetails.id}/create/${item.id}`} style={{ textDecoration: 'none' }}>
                                                            {item.name}
                                                        </Link>
                                                    </Box>
                                                    
                                                    <Typography variant="body2" sx={{
                                                        display: 'inline-block',
                                                        maxWidth: '100%', // Adjust the maxWidth as needed
                                                    }}>
                                                        {item?.descriptions}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                                
                            ) : ( fetchState === 'loading' ? (
                                <Box sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 6
                                }}>
                                    <Typography>Loading...</Typography>
                                </Box>
                                ) : (
                                    <Box sx={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: 6
                                    }}>
                                        <Box sx={{
                                            width: "100%",
                                            height: "64px",
                                            backgroundSize: "contain",
                                            background: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 194.192 147.609'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='416.308' y1='75.048' x2='584.856' y2='75.048' gradientTransform='rotate(-13.798 286.608 1896.145)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23fff'/%3E%3Cstop offset='.691' stop-color='%23fff' stop-opacity='.1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg data-name='Layer 2'%3E%3Cpath d='M131.113 94.93l-9.888-5.988-8.33 13.752 9.888 5.989a15.603 15.603 0 015.88 6.383 15.603 15.603 0 005.88 6.384l40.115 24.296a12.866 12.866 0 0017.67-4.34 12.866 12.866 0 00-4.34-17.67l-40.113-24.297a15.603 15.603 0 00-8.381-2.254 15.603 15.603 0 01-8.381-2.254z' fill='%23cfd4db'/%3E%3Cpath data-name='%26lt;Path%26gt;' d='M131.113 94.93l-3.012-1.824a8.039 8.039 0 00-11.041 2.712 8.039 8.039 0 002.711 11.04l3.012 1.824a15.603 15.603 0 015.88 6.384 15.603 15.603 0 005.88 6.383l40.114 24.297a12.866 12.866 0 0017.671-4.34 12.866 12.866 0 00-4.34-17.671l-40.113-24.296a15.603 15.603 0 00-8.381-2.254 15.603 15.603 0 01-8.381-2.254z' fill='%238777d9'/%3E%3Cpath d='M139.144 97.18a15.597 15.597 0 01-8.032-2.25l-3.011-1.824a8.039 8.039 0 00-11.041 2.712 8.039 8.039 0 002.711 11.04l3.012 1.824a15.597 15.597 0 015.707 6.065 67.848 67.848 0 0010.654-17.568z' style='mix-blend-mode:multiply' fill='%238777d9'/%3E%3Cpath d='M83.254 132.556A67.235 67.235 0 019.71 32.429 66.797 66.797 0 0151.184 1.967a66.796 66.796 0 0150.867 7.785 67.235 67.235 0 01-18.797 122.804z' fill='%230065ff'/%3E%3Cpath data-name='%26lt;Path%26gt;' d='M23.439 40.748a51.19 51.19 0 0087.571 53.04 51.19 51.19 0 00-87.571-53.04z' fill='%23cce0ff'/%3E%3Cpath d='M79.433 116.982a51.216 51.216 0 0038.991-49.945 49.14 49.14 0 01-5.087 2.279c-15.703 5.96-29.69 2.11-36.498.13-20.431-5.938-24.79-17.378-39.042-24.582a48.31 48.31 0 00-14.094-4.53c-.086.14-.179.273-.264.414a51.19 51.19 0 0055.994 76.234z' fill='url(/s/u0paun/9120007/1u2g4u7/5.12.7-REL-0001/_/download/resources/com.atlassian.servicedesk.frontend-webpack-plugin:344/%23a)'/%3E%3C/g%3E%3C/svg%3E") no-repeat 50%`,
                                        }}></Box>
                                        <Typography sx={{ fontWeight: 'bold' }}>No service.</Typography>
                                    </Box>
                                )
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
