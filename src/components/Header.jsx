import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';

const ResponsiveAppBar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box sx={{ felxGrow: 0 }}>
           <Tooltip title="Main site">
             <Link href="https://www.presentconnection.eu/" 
             underline='hover' target="_blank" rel='noopener' sx={{ p: 0 }}>
             <img style={{ height: 45 }} src="/companyLogo.png" alt="Pressent Connection"/>
              </Link>
            </Tooltip>
          </Box>
          <Box>
            <Typography
              variant="h5"
              noWrap
          >
              Intership Qualification Task
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
           <Tooltip title="Github">
             <Link href="https://github.com/Grazvis1988/PresentConnection-Internship-Task" 
             underline='hover' target="_blank" rel='noopener' sx={{ p: 0 }}>
                <Avatar alt="Grazvydas Untulis" src="/myLogo.png" />
              </Link>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
 
