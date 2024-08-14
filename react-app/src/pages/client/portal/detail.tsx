import { Box, Container } from '@mui/material';
import ServiceDeskLayout from '../../../components/layout/ServiceDeskLayout';
import Footer from '../../../components/layout/footer';

// This segment contains the logic for loading the application
function PortalDetail() {
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
                            <h1>test</h1>
                            <h1>test</h1>
                            <h1>test</h1>
                            <h1>test</h1>
                            <h1>test</h1>
                            <h1>test</h1>
                            <h1>test</h1>
                            <h1>test</h1>
                            <h1>test</h1>
                            <h1>test</h1>
                            <h1>test</h1>
                            <h1>test</h1>
                            <h1>test</h1>
                            <h1>test</h1>
                            <h1>test</h1>
                            <h1>test</h1>
                            <h1>test</h1>
                            <h1>test</h1>
                            <h1>test</h1>
                            <h1>test</h1>
                            <h1>test</h1>
                        </Box>

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
