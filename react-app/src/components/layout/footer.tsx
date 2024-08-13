import { Link, Typography } from '@mui/material';
import Box from '@mui/material/Box';

export default function Footer() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
      >
        {"Copyright © "}
        {new Date().getFullYear()}
        {" "}
        <Link color="inherit" href="https://www.smartosc.com/">
          SmartOSC
        </Link>
        {". All rights reserved."}
      </Typography>
    </Box>
  );
}
