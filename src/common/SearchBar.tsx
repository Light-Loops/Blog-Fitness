import React from 'react';
import { TextField, Button, Grid } from '@mui/material';

interface SearchBarProps {
  search: string;
  onSearchChange: (newSearch: string) => void;
  onClearSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, onSearchChange, onClearSearch }) => {
  return (
    <Grid container padding={2} mb={2} justifyContent="space-between" 
      sx={{
        backgroundColor: '#1b1b1b',
        borderRadius: '10px',
      }}
    >
      <Grid item xs={12} sm={8}>
        <TextField
          fullWidth
          label="Buscar en títulos de artículos"
          variant="outlined"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={4} marginTop={2} textAlign="center">
        <Button variant="outlined" color="primary" onClick={onClearSearch}>
          Limpiar Búsqueda
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
