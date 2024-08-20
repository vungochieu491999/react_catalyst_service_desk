import { createRoot } from 'react-dom/client'; // Use createRoot from react-dom/client for React 18
import { ThemeProvider, createTheme } from '@mui/material/styles';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create a Material-UI theme
const theme = createTheme({
  components: {
     MuiTypography: {
       styleOverrides: {
         h1: {
           '&.MuiTypography-gutterBottom': {
             marginBottom: 32
           }
         },
         gutterBottom: {
           marginBottom: 8 //default e.g. body1/paragraphs
         },
         h6: {
          lineHeight: 1.2
         }
       }
     }
   }
 })

// Get the root element from the DOM
const root = createRoot(document.getElementById('root')!);
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
