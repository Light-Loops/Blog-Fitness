import React from "react";
import { Box, Button, Link } from "@mui/material";

export const Contact: React.FC = () => {
  return (
    <Box>
      <h2>Contacto</h2>
      <p><b>Correo electrónico:</b>
      <Link href="mailto:lghtlp@gmail.com" color="inherit" underline="always">
        lghtlp@gmail.com
      </Link>
      </p>
      <Button href="https://us21.list-manage.com/contact-form?u=a0c083b45bcb332858d1c4c53&form_id=4e63398b0d6d5946f15c1cf32363a40f" target="_blank" variant="text">
        Continuar al Formulario de Contacto
      </Button>
    </Box>
  );
};
