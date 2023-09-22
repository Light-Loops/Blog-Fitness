import React, { Dispatch } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
/* import { UseNotification } from '../../context/notification.context'; */
import { LoginValidate } from '../../utils/validateForm';
import { useFormik } from 'formik';
import { useAppDispatch } from '../../redux/hooks';
import { startLoginWithEmailPassword } from '../../Api';
import { Navigate } from 'react-router-dom';


type LoginType = {
  email: string;
  password: string;
};

export const LoginPage: React.FC<{}> = () => {
  /* const { getSuccess } = UseNotification(); */
  const distpach = useAppDispatch();

  const formik = useFormik<LoginType>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginValidate,
    onSubmit: (values: LoginType) => {
      distpach(startLoginWithEmailPassword(values));
      Navigate({to: "/dashboard"})
    },
  });

  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
      >
        <Grid item>
          <Paper sx={{ padding: '1.2em', borderRadius: '0.5em',backgroundColor:'#061A26' }}>
            <Typography sx={{ mt: 1, mb: 1 }} variant="h5">
              Fit Way
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
              <TextField
                name="email"
                margin="normal"
                type="email"
                fullWidth
                label="Email"
                sx={{ mt: 2, mb: 1.5 }}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={
                  formik.touched.email && Boolean(formik.errors.email)
                }
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                name="password"
                margin="normal"
                type="password"
                fullWidth
                label="Password"
                sx={{ mt: 1.5, mb: 1.5 }}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 1.5, mb: 1 }}
              >
                Iniciar sesión
              </Button>

            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
