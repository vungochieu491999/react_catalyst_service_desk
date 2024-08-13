import '../../App.css';
import '../../helper.css';
import * as React from 'react'
import { Box, Container } from '@mui/material';
import MainNav from './horizontal/main-nav';
import Footer from './footer';

interface Props {
    children: React.ReactNode
}

export default function ServiceDeskLayout({ children }: Props) {
  return (
    <Box>
        <MainNav/>

        <div id="page-content-wrapper">
            {children}
        </div>

        <Footer/>
    </Box>
  );
}
