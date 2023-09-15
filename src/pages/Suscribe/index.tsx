import React, { useState } from "react";
import {
  Box,
  Container,
  /* Button,
  Grid,
  TextField,
  Typography, */
} from "@mui/material";
import { Footer } from "../../common/Footer";

export const SuscribePage: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event:any) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event:any) => {};

  return (
    <Box>
      <Container sx={{ mt: 2, height: "90vh" }} maxWidth="sm">
        {/* <Typography variant="h5" gutterBottom color="primary">
          Suscribirse
        </Typography>

        <Grid container display={"flex"} alignItems={"center"} >
          <Grid item xs={8} paddingRight={2}>
            <TextField label="Correo" type="email" color="secondary" fullWidth required/>
          </Grid>
          <Grid item xs={4}>
            <Button variant="outlined" color="secondary">Suscribirse</Button>
          </Grid>
        </Grid> */}

        <div id="mc_embed_shell">
          <link
            href="//cdn-images.mailchimp.com/embedcode/classic-061523.css"
            rel="stylesheet"
            type="text/css"
          />
          
          <div id="mc_embed_signup">
            <form
              action="https://gmail.us21.list-manage.com/subscribe/post?u=a0c083b45bcb332858d1c4c53&id=7277fce9b9&f_id=004fdde6f0"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              className="validate"
              target="_blank"
              onSubmit={handleSubmit} 
            >
              <div id="mc_embed_signup_scroll">
                <h2>Suscribirse</h2>
                
                <div className="mc-field-group">
                  <label htmlFor="mce-EMAIL">
                    Dirección de correo electrónico{" "}
                    <span className="asterisk">*</span>
                  </label>
                  <input
                    type="email"
                    name="EMAIL"
                    className="required email"
                    id="mce-EMAIL"
                    required
                    value={email} 
                    onChange={handleEmailChange}
                  />
                </div>
                <div hidden>
                  <input type="hidden" name="tags" value="2969905" />
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
                <div className="optionalParent">
                  <div className="clear foot">
                    <input
                      type="submit"
                      name="subscribe"
                      id="mc-embedded-subscribe"
                      className="button"
                      value="Subscribirse"
                    />
                    <p style={{ margin: "0px auto" }}>
                      <a
                        href="http://eepurl.com/izL_6k"
                        title="Mailchimp: marketing por correo electrónico fácil y divertido"
                      >
                        <span
                          style={{
                            display: "inline-block",
                            backgroundColor: "black",
                            borderRadius: "4px",
                          }}
                        >
                          <img
                            className="refferal_badge"
                            src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-light.svg"
                            alt="Intuit Mailchimp"
                            style={{
                              width: "220px",
                              height: "40px",
                              display: "flex",
                              padding: "2px 0px",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          />
                        </span>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <script
            type="text/javascript"
            src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"
          ></script>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
            (function($) {
              window.fnames = new Array();
              window.ftypes = new Array();
              fnames[0] = 'EMAIL';
              ftypes[0] = 'email';
              fnames[1] = 'FNAME';
              ftypes[1] = 'text';
              fnames[2] = 'LNAME';
              ftypes[2] = 'text';
              fnames[3] = 'ADDRESS';
              ftypes[3] = 'address';
              fnames[4] = 'PHONE';
              ftypes[4] = 'phone';
              fnames[5] = 'BIRTHDAY';
              ftypes[5] = 'birthday';
            }(jQuery));
            var $mcj = jQuery.noConflict(true);
          `,
            }}
          ></script>
        </div>
      </Container>
      <Footer />
    </Box>
  );
};
