import React from "react";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Footer } from "../../common/Footer";

export const SuscribePage: React.FC = () => {
  return (
    <Box>
      <Container sx={{ mt: 2, height: "90vh" }} maxWidth="sm" >
        <Typography variant="h5" gutterBottom color="primary">
          Suscribirse
        </Typography>

        <Grid container display={"flex"} alignItems={"center"} >
          <Grid item xs={8} paddingRight={2}>
            <TextField label="Correo" type="email" color="secondary" fullWidth required/>
          </Grid>
          <Grid item xs={4}>
            <Button variant="outlined" color="secondary">Suscribirse</Button>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};
