import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import { Suscribe } from "../components";
import { Contact } from "../components/Contact";

export const Footer = () => {
  return (
    <AppBar position="static" component={"footer"} id="footer">
      <Toolbar>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Suscribe />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Contact />
            <Typography
              variant="body1"
              color="inherit"
              padding={1}
              textAlign={"end"}
            >
              &copy; 2023 Fit Way
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
