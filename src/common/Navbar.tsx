import React, { useState } from 'react';
import { AppBar, Box, Container, Grid, IconButton, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close'; // Importa el icono de cerrar
import { Link, useNavigate } from 'react-router-dom';

export const Navbar: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Agrega un estado para controlar la apertura del menú

  const handleMobileMenuToggle = () => {
    if (isMobileMenuOpen) {
      setMobileMenuAnchor(null);
    } else {
      setMobileMenuAnchor(document.body);
    }
    setIsMobileMenuOpen(!isMobileMenuOpen); // Cambia el estado del menú desplegable
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleMobileMenuToggle(); // Cierra el menú al hacer clic en un enlace
  };

  const navbarLinks = [
    { label: 'Inicio', path: '/' },
    { label: 'Nutricion', path: '/nutricion' },
    { label: 'Entrenamiento', path: '/entrenamiento' },
    { label: 'Estilo de Vida', path: '/estilo-de-vida' },
    { label: 'Contacto', path: '/contacto' },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
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
                  {navbarLinks.map((link) => (
                    <MenuItem key={link.path} onClick={() => handleNavigation(link.path)}>
                      {link.label}
                    </MenuItem>
                  ))}
                </Menu>
              </Grid>
              <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
                {navbarLinks.map((link) => (
                  <Link key={link.path} to={link.path} style={{ textDecoration: 'none' }}>
                    <Typography  variant="button" sx={{color:'#e9fff9', mr:'30px'}}>
                      {link.label}
                    </Typography>
                  </Link>
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
