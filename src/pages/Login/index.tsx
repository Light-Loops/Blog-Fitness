import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { UseNotification } from '../../context/notification.context';
import { LoginValidate } from '../../utils/validateForm';
import { useFormik } from 'formik';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';

type LoginType = {
  username: string;
  password: string;
};

export const LoginPage: React.FC<{}> = () => {
  const { getSuccess } = UseNotification();
  const formik = useFormik<LoginType>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginValidate,
    onSubmit: (values: LoginType) => {
      getSuccess(JSON.stringify(values));
    },
  });

  const handleFacebookLogin = () => {
    // Handle Facebook login logic here
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
  };

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
              Welcome warrior!
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
              <TextField
                name="username"
                margin="normal"
                type="email"
                fullWidth
                label="Email"
                sx={{ mt: 2, mb: 1.5 }}
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
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

              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                startIcon={<FacebookIcon />}
                onClick={handleFacebookLogin}
                sx={{ mt: 1, mb: 1 }}
              >
                Login with Facebook
              </Button>

              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleLogin}
                sx={{ mt: 1, mb: 3 }}
              >
                Login with Google
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
