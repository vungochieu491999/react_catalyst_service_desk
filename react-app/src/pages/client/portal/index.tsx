import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Container, Grid, IconButton, Paper, Typography } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ServiceDeskLayout from '../../../components/layout/ServiceDeskLayout';
import Footer from '../../../components/layout/footer';
import DOMPurify from 'dompurify';
import { debounce } from 'lodash';

// Define the types for App component state
interface Portal {
    id: number;
    name: string;
    descriptions: string;
    feature_image?: string;
}

interface Service {
    id: number;
    name: string;
    descriptions: string;
    feature_image?: string;
    portalId?: string;
    portalName?: string;
}

function PortalList() {
    useEffect(() => {
        document.title = "All Portals";
    }, []);

    const [portalItems, setPortalItems] = useState<Portal[]>([]);
    const [serviceItems, setServiceItems] = useState<Service[]>([]);
    const [fetchServiceItems, setFetchServiceItems] = useState<'init' | 'loading' | 'fetched'>('init');
    const [fetchState, setFetchState] = useState<'init' | 'loading' | 'fetched'>('init');
    const [searchQuery, setSearchQuery] = useState('');

    // Debounced search function to avoid making too many requests
    const fetchServices = useCallback(
        debounce((query: string) => {
            axios.get('/server/service_desk_advanced_function/service/search', { params: { query } })
                .then(response => {
                    const { data: { serviceItems } } = response.data;
                    console.log(serviceItems);
                    setServiceItems(serviceItems);
                    setFetchServiceItems('fetched');
                })
                .catch(err => {
                    console.error(err.response);
                });
        }, 300), // Adjust debounce delay as needed
        []
    );

    const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value) {
            setFetchServiceItems('loading');
            fetchServices(value); // Fetch services based on the input value
        } else {
            setServiceItems([]); // Clear the service items if the input value is empty
        }
        setSearchQuery(value);
    }, [fetchServices]);

    useEffect(() => {
        if (fetchState !== 'fetched') {
            axios.get('/server/service_desk_advanced_function/portal', { params: { page: 1, perPage: 200 } })
                .then((response) => {
                    const { data: { portals: portalItems } } = response.data;
                    setPortalItems(portalItems);
                    setFetchState('fetched');
                })
                .catch((err) => {
                    console.log(err.response);
                });
        }
    }, [fetchState]);

    return (
        <ServiceDeskLayout>
            <Box sx={{
                backgroundColor: "#205081",
                backgroundRepeat: "no-repeat",
                height: '385px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2
            }}>
                <Typography
                    variant="h4"
                    sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        marginBottom: 2
                    }}
                >
                    Welcome to the SmartOSC Service Center
                </Typography>

                <Box sx={{
                    maxWidth: "600px",
                    width: '100%',
                }}>
                    <TextField
                        fullWidth
                        id="search-service-desk"
                        variant="outlined"
                        placeholder="Find help and service"
                        onChange={onChange}
                        sx={{
                            backgroundColor: 'white',
                            '& .MuiInputBase-root': {
                                backgroundColor: 'white'
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
                </Box>
            </Box>

            <Container>
                {searchQuery ? (
                    serviceItems.length ? (
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 2,
                        }}>
                            <Box className="servicedesk-service-card" sx={{
                                width: '700px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
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
                                                <Link to={`/app/portal/${item.portalId}/create/${item.id}`} style={{ textDecoration: 'none' }}>
                                                    {item.name}
                                                </Link>
                                                {' ○ '}
                                                <Link to={`/app/portal/${item.portalId}`} style={{ textDecoration: 'none' }}>
                                                    {item.portalName}
                                                </Link>
                                            </Box>
                                            
                                            <Typography variant="body2" sx={{
                                                display: 'inline-block',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                maxWidth: '100%', // Adjust the maxWidth as needed
                                            }}>
                                                {item?.descriptions}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                        
                    ) : ( fetchServiceItems === 'loading' ? (
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 2,
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
                                padding: 2,
                            }}>
                                <Box sx={{
                                    width: "100%",
                                    height: "64px",
                                    backgroundSize: "contain",
                                    background: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 194.192 147.609'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='416.308' y1='75.048' x2='584.856' y2='75.048' gradientTransform='rotate(-13.798 286.608 1896.145)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23fff'/%3E%3Cstop offset='.691' stop-color='%23fff' stop-opacity='.1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg data-name='Layer 2'%3E%3Cpath d='M131.113 94.93l-9.888-5.988-8.33 13.752 9.888 5.989a15.603 15.603 0 015.88 6.383 15.603 15.603 0 005.88 6.384l40.115 24.296a12.866 12.866 0 0017.67-4.34 12.866 12.866 0 00-4.34-17.67l-40.113-24.297a15.603 15.603 0 00-8.381-2.254 15.603 15.603 0 01-8.381-2.254z' fill='%23cfd4db'/%3E%3Cpath data-name='%26lt;Path%26gt;' d='M131.113 94.93l-3.012-1.824a8.039 8.039 0 00-11.041 2.712 8.039 8.039 0 002.711 11.04l3.012 1.824a15.603 15.603 0 015.88 6.384 15.603 15.603 0 005.88 6.383l40.114 24.297a12.866 12.866 0 0017.671-4.34 12.866 12.866 0 00-4.34-17.671l-40.113-24.296a15.603 15.603 0 00-8.381-2.254 15.603 15.603 0 01-8.381-2.254z' fill='%238777d9'/%3E%3Cpath d='M139.144 97.18a15.597 15.597 0 01-8.032-2.25l-3.011-1.824a8.039 8.039 0 00-11.041 2.712 8.039 8.039 0 002.711 11.04l3.012 1.824a15.597 15.597 0 015.707 6.065 67.848 67.848 0 0010.654-17.568z' style='mix-blend-mode:multiply' fill='%238777d9'/%3E%3Cpath d='M83.254 132.556A67.235 67.235 0 019.71 32.429 66.797 66.797 0 0151.184 1.967a66.796 66.796 0 0150.867 7.785 67.235 67.235 0 01-18.797 122.804z' fill='%230065ff'/%3E%3Cpath data-name='%26lt;Path%26gt;' d='M23.439 40.748a51.19 51.19 0 0087.571 53.04 51.19 51.19 0 00-87.571-53.04z' fill='%23cce0ff'/%3E%3Cpath d='M79.433 116.982a51.216 51.216 0 0038.991-49.945 49.14 49.14 0 01-5.087 2.279c-15.703 5.96-29.69 2.11-36.498.13-20.431-5.938-24.79-17.378-39.042-24.582a48.31 48.31 0 00-14.094-4.53c-.086.14-.179.273-.264.414a51.19 51.19 0 0055.994 76.234z' fill='url(/s/u0paun/9120007/1u2g4u7/5.12.7-REL-0001/_/download/resources/com.atlassian.servicedesk.frontend-webpack-plugin:344/%23a)'/%3E%3C/g%3E%3C/svg%3E") no-repeat 50%`,
                                }}></Box>
                                <Typography sx={{ fontWeight: 'bold' }}>No matching search results.</Typography>
                                <Typography>Browse the list of portals below to raise a request.</Typography>
                            </Box>
                        )
                    )
                ) : (<></>)}

                <Box className="servicedesk-portal-card">
                    <Box sx={{ padding: 2 }}>
                        <Typography variant='h5'>All Portals</Typography>
                    </Box>
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
                                                    width: '100%',
                                                    maxWidth: '24rem',
                                                    padding: "1.5rem",
                                                    alignItems: 'center',
                                                    transition: 'transform 0.3s',
                                                    '&:hover': {
                                                        transform: 'translateY(-5px)',
                                                        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
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
                                                        position: 'relative',
                                                        '&::after': {
                                                            content: '""',
                                                            position: 'absolute',
                                                            display: "block",
                                                            bottom: 0,
                                                            left: 0,
                                                            right: 0,
                                                            width: '100%',
                                                            height: '10px',
                                                            background: "linear-gradient(hsla(0, 0%, 100%, 0), #fff)"
                                                        }
                                                    }}>
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                                                        {item.name}
                                                    </Typography>
                                                    <Typography variant="body2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.descriptions || '') }}>
                                                    </Typography>
                                                </Box>
                                            </Paper>
                                        </Link>
                                    </Grid>
                                ))
                            ) : (
                                <Box>
                                    <Typography>No portal available.</Typography>
                                </Box>
                            )}
                        </Grid>
                    </Box>
                </Box>

                <Footer />
            </Container>
        </ServiceDeskLayout>
    );
}

export default PortalList;
