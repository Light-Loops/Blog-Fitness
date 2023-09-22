import React from 'react';
import { AppBar, Grid, Toolbar, Typography, Box, Container } from '@mui/material';
import { Suscribe } from '../components/Suscribe';
import { Contact } from '../components/Contact';

export const Footer = () => {
  return (
    <AppBar position="static" component="footer" id="footer">
      <Toolbar>
        <Container maxWidth="xl">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Suscribe />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Contact />
              <Box mt={1} textAlign="end">
                <Typography variant="body1" color="inherit">
                  &copy; 2023 Fit Way
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
};


