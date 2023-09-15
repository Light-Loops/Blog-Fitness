import React, { useState } from 'react';
import { AppBar, Box, Container, Grid, IconButton, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close'; // Importa el icono de cerrar
import { Link, useNavigate } from 'react-router-dom';

export const Navbar: React.FC<{}> = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="sticky" sx={{color: "white", bgcolor: "#272727"}}>
        <Toolbar>
          <Container maxWidth="xl">
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Fit Way
                </Typography>
              </Grid>
              <Button
                variant="contained"
                color='error'
                onClick={() => navigate('/suscribirse')}
              >
                Suscribirse
              </Button>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
