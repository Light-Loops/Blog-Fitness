import React, { useState } from 'react';
import { AppBar, Box, Container, Grid, IconButton, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close'; 
import {useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCategory } from '../redux/categorySlice';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const dispatch = useDispatch();

  const handleMobileMenuToggle = () => {
    if (isMobileMenuOpen) {
      setMobileMenuAnchor(null);
    } else {
      setMobileMenuAnchor(document.body);
    }
    setIsMobileMenuOpen(!isMobileMenuOpen); 
  };

  const handleCategoryFilter = (category: string | null) => {
    dispatch(setCategory(category));
    if (window.innerWidth <= 600) { 
      handleMobileMenuToggle(); 
    }
  };

  const navbarLinks = [
    { label: 'Inicio', category: 'Todos' },
    { label: 'Nutricion', category: 'Nutrición' },
    { label: 'Entrenamiento', category: 'Entrenamiento' },
    { label: 'Estilo de Vida', category: 'Estilo de Vida' },
    { label: 'Contact', category: 'Contact' },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Container maxWidth="xl">
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Fit Way
                </Typography>
              </Grid>
              <Grid item sx={{ display: { xs: 'block', sm: 'none' } }}>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMobileMenuToggle}
                >
                  {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
                <Menu
                  id="mobile-menu"
                  anchorEl={mobileMenuAnchor}
                  keepMounted
                  open={isMobileMenuOpen}
                  onClose={handleMobileMenuToggle}
                  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                >
                  {navbarLinks.map((filter) => (
                    <MenuItem key={filter.category} onClick={() => handleCategoryFilter(filter.category)}>
                      {filter.label}
                    </MenuItem>
                  ))}
                </Menu>
              </Grid>
              <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
                {navbarLinks.map((filter) => (
                  <Typography
                    key={filter.category}
                    variant="button"
                    sx={{ color: '#e9fff9', mr: '30px', cursor: 'pointer' }}
                    onClick={() => handleCategoryFilter(filter.category)}
                  >
                    {filter.label}
                  </Typography>
                ))}
              </Grid>
              <Button
                variant="contained"
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


