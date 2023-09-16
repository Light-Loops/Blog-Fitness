import React from "react";
import { Box, Button, TextField, Grid } from "@mui/material";
import { useState } from "react";

export const Suscribe: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: any) => {};

  return (
    <Box>
      <div id="mc_embed_shell">
        <h2>Suscribirse</h2>

        <Grid
          container
          component={"form"}
          action="https://google.us21.list-manage.com/subscribe/post?u=a0c083b45bcb332858d1c4c53&id=7277fce9b9&f_id=004fdde6f0"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          target="_blank"
          noValidate
          onSubmit={handleSubmit}
          display={"flex"}
          alignItems={"center"}
        >
          <Grid item sm={12} md={6} padding={1}>
            <TextField
              label="Dirección de correo electrónico"
              type="email"
              name="EMAIL"
              id="mce-EMAIL"
              value={email}
              onChange={handleEmailChange}
              required
              fullWidth
            />
            <div hidden>
              <input type="hidden" name="tags" value="2969906" />
            </div>
            <div id="mce-responses" className="clear foot">
              <div
                className="response"
                id="mce-error-response"
                style={{ display: "none" }}
              ></div>
              <div
                className="response"
                id="mce-success-response"
                style={{ display: "none" }}
              ></div>
            </div>
            <div
              aria-hidden="true"
              style={{ position: "absolute", left: "-5000px" }}
            >
              <input
                type="text"
                name="b_a0c083b45bcb332858d1c4c53_7277fce9b9"
                defaultValue={""}
              />
            </div>
          </Grid>

          <Grid item sm={12} md={6} padding={1}>
            <div className="optionalParent">
              <div className="clear foot">
                <Button type="submit" variant="contained" color="primary">
                  Subscribirse
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};
