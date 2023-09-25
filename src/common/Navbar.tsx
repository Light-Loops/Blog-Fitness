import React, { useState, useEffect } from 'react';
import { AppBar, Box, Container, Grid, IconButton, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close'; 
import {useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {  fetchArticlesData } from '../Api';
import { setArticles } from '../redux/articleSlice';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesList = await fetchArticlesData();
        dispatch(setArticles(articlesList));
      } catch (error) {
        console.error(error);
      }
    };
    fetchArticles();
  }, [dispatch]);

  const handleMobileMenuToggle = () => {
    if (isMobileMenuOpen) {
      setMobileMenuAnchor(null);
    } else {
      setMobileMenuAnchor(document.body);
    }
    setIsMobileMenuOpen(!isMobileMenuOpen); 
  };

  const handleCategoryFilter = (filter:any | null) => {
    navigate(filter.link);
    if (window.innerWidth <= 600) { 
      handleMobileMenuToggle(); 
    }
  };


  const navbarLinks = [
    { label: 'Inicio', category: 'Todos', link: '/'},
    { label: 'Nutrición', category: 'Nutrición', link: '/Nutrición'},
    { label: 'Entrenamiento', category: 'Entrenamiento', link: '/Entrenamiento'},
    { label: 'Estilo de vida', category: 'Estilo de vida', link: '/Estilo-de-vida' },
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
              <Grid item onClick={() => navigate('/')} sx={{ cursor: 'pointer' }} display="flex" alignItems="center" justifyContent="center">
                  <img width="150px" src="logo-horizontal.svg" alt="Logo FIT AWAY" />
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
                    <MenuItem key={filter.category} onClick={() => handleCategoryFilter(filter)}>
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
                    onClick={() => handleCategoryFilter(filter)}
                  >
                    {filter.label}
                  </Typography>
                ))}
              </Grid>
              <Button
                variant="contained"
                href='#footer'
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


