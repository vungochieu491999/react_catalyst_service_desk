import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel, Snackbar, Alert, SelectChangeEvent, Link, Breadcrumbs } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import ServiceDeskLayout from '../../../components/layout/ServiceDeskLayout';
import Footer from '../../../components/layout/footer';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// Define the types for App component state
interface Service {
    id: number;
    name: string;
    descriptions: string;
    portalName: string;
    feature_image?: string;
}

// Define the form state type
interface FormState {
    title: string;
    descriptions: string;
    approvalByEmailId: string;
    expireDate: string;
    serviceId: string | '';
    serviceName: string;
    portalId: string | '';
    portalName: string;
}

function CreateServiceRequest() {
    const navigate = useNavigate();
    const { id, serviceId } = useParams<{ id: string; serviceId: string }>();

    const [serviceItem, setServiceItem] = useState<Service | null>(null);
    const [fetchServiceItemState, setFetchServiceItemState] = useState<'init' | 'loading' | 'fetched'>('init');
    const [formState, setFormState] = useState<FormState>({
        title: '',
        descriptions: '',
        approvalByEmailId: '',
        expireDate: '',
        serviceId: serviceId || '',
        serviceName: '',
        portalId: id || '',
        portalName: '',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    useEffect(() => {
        if (fetchServiceItemState !== 'fetched') {
            setFetchServiceItemState('loading');
            axios.get(`/server/service_desk_advanced_function/service/${serviceId}`)
                .then((response) => {
                    const { data: { serviceItem } } = response.data;
                    console.log("serviceItem", serviceItem);
                    setServiceItem(serviceItem);
                    setFormState(prevState => ({
                        ...prevState,
                        serviceName: serviceItem.name,
                        portalName: serviceItem.portalName,
                    }));
                    setFetchServiceItemState('fetched');
                })
                .catch((err) => {
                    console.log(err.response);
                });
        }
    }, [fetchServiceItemState, serviceId, id]);

    const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name as keyof FormState]: value
        }));
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name as keyof FormState]: value
        }));
    };

    const handleEditorChange = (event: any, editor: any) => {
        const data = editor.getData();
        setFormState(prevState => ({
            ...prevState,
            descriptions: data
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post(`/server/service_desk_advanced_function/portal/${id}/create/${serviceId}`, formState)
            .then(response => {
                console.log('Request successful', response.data);
                setSnackbarMessage('Request successfully submitted!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                setTimeout(() => navigate('/app'), 2000); // Redirect after 2 seconds
            })
            .catch(error => {
                console.error('Error submitting request', error);
                setSnackbarMessage('Error submitting request. Please try again.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            });
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <ServiceDeskLayout>
            <Box
                className="main-content"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    minHeight: '100vh',
                }}
            >
                <Box
                    sx={{
                        backgroundColor: "#205081",
                        backgroundRepeat: "no-repeat",
                        height: '385px',
                        position: 'relative',
                        width: '100%',
                    }}
                >
                    <Container
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: 'white',
                            width: '900px',
                            maxWidth: 'md',
                            padding: 2,
                            overflow: 'visible',
                            boxSizing: 'border-box',
                            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <Box sx={{ padding: 6 }}>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link
                                    underline="hover"
                                    color="inherit"
                                    href="/app/"
                                >
                                    All Portals
                                </Link>
                                <Link
                                    underline="hover"
                                    color="inherit"
                                    href={`/app/portal/${id}`}
                                >
                                    Portal
                                </Link>
                                <Typography color="text.primary">{serviceItem?.name}</Typography>
                            </Breadcrumbs>

                            <Box className="header-text"
                                sx={{
                                    boxSizing: 'border-box',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    width: '100%',
                                    overflow: 'hidden',
                                    position: 'relative',
                                }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                                    {serviceItem?.name}
                                </Typography>
                            </Box>
                        </Box>

                        <Container maxWidth="sm">
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    label="Title"
                                    name="title"
                                    value={formState.title}
                                    onChange={handleTextInputChange}
                                    sx={{ marginBottom: 2 }}
                                    required
                                />

                                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        config={{
                                            toolbar: {
                                                items: [
                                                    'undo', 'redo', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
                                                    'outdent', 'indent', '|', 'blockQuote', 'insertTable', 'mediaEmbed', 'redo', 'undo',
                                                ],
                                            },
                                            language: 'vi',
                                            table: {
                                                contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
                                            },
                                        }}
                                        data={formState.descriptions}
                                        onChange={handleEditorChange}
                                    />
                                </FormControl>

                                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                                    <InputLabel>Approval</InputLabel>
                                    <Select
                                        name="approvalByEmailId"
                                        value={formState.approvalByEmailId}
                                        onChange={handleSelectChange}
                                        label="Approval"
                                        required
                                    >
                                        <MenuItem value="hieuvn@smartosc.com">hieuvn@smartosc.com</MenuItem>
                                        <MenuItem value="kiendb@smartosc.com">kiendb@smartosc.com</MenuItem>
                                        <MenuItem value="vungochieu491999@gmail.com">vungochieu491999@gmail.com</MenuItem>
                                        <MenuItem value="vnhddh2017@gmail.com">vnhddh2017@gmail.com</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    fullWidth
                                    label="Expire Date"
                                    name="expireDate"
                                    type="date"
                                    value={formState.expireDate}
                                    onChange={handleTextInputChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{ marginBottom: 2 }}
                                    required
                                />
                                <Button variant="contained" color="primary" type="submit">
                                    Submit
                                </Button>
                            </form>
                        </Container>
                        <Footer />
                    </Container>
                </Box>

                {/* Content Box that grows with the Container */}
                <Box
                    sx={{
                        flexGrow: 1,
                        padding: 2,
                        backgroundColor: 'white',
                    }}
                >
                </Box>
            </Box>

            {/* Snackbar for success/error messages */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </ServiceDeskLayout>
    );
}

export default CreateServiceRequest;
