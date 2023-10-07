import React from 'react';
import { Box, Button } from '@mui/material';

interface FilterButtonsProps {
  onClearCategoryFilter: () => void;
  onSetCategoryFilter: (category: string) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ onClearCategoryFilter, onSetCategoryFilter }) => {
  return (
    <Box mb={2} display="flex" justifyContent="center">
      <Button
        variant="outlined"
        color="primary"
        onClick={onClearCategoryFilter}
        sx={{ mr: 1 }}
      >
        Todos
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => onSetCategoryFilter('Entrenamiento')}
        sx={{ mr: 1 }}
      >
        Entrenamiento
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => onSetCategoryFilter('Nutrición')}
        sx={{ mr: 1 }}
      >
        Nutrición
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => onSetCategoryFilter('Estilo de vida')}
      >
        Estilo de vida
      </Button>
    </Box>
  );
};

export default FilterButtons;
