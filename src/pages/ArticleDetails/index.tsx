import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Chip,
  Card,
  CardContent,
  CardMedia,
  Box,
  CircularProgress,
  Grid,
  Divider,
  Button,
  Hidden,
} from "@mui/material"; // Importa la función de API
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setActiveArticle } from "../../redux/articleSlice";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export const ArticleDetail: React.FC = () => {
  const { title } = useParams();
  const { articles, active } = useSelector((state: RootState) => state.article);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
 

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const activated = articles.find((article) => article.title === title);
        dispatch(setActiveArticle(activated));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchDetail();
  }, [title, dispatch, articles]);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box py={4} sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!active) {
    return (
      <Container maxWidth="lg">
        <Box py={4}>
          <Typography variant="h4" gutterBottom>
            Artículo no encontrado
          </Typography>
        </Box>
      </Container>
    );
  }

  const handleFacebookShare = () => {
    const url = encodeURIComponent(window.location.href);
    const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(facebookShareURL, "_blank");
  };

  const handleTwitterShare = () => {
    const url = encodeURIComponent(window.location.href);
    const twitterShareURL = `https://twitter.com/intent/tweet?url=${url}`;
    window.open(twitterShareURL, "_blank");
  };

  const handleWhatsAppShare = () => {
    const url = encodeURIComponent(window.location.href);
    const whatsappShareURL = `https://api.whatsapp.com/send?text=${url}`;
    window.open(whatsappShareURL, "_blank");
  };

  return (
    <Container maxWidth="xl">
      <Box py={4}>
        <Card>
          <CardContent>
            <Grid container spacing={2} marginTop={4} marginBottom={4} display={'flex'} >
              
              <Hidden mdDown >
              <Grid item md={4} padding={4} zeroMinWidth position={'fixed'}>
                <Box mt={1} >
                  <Typography variant="h4" component={"h2"} gutterBottom>
                    {active.title}
                  </Typography>
                  <Divider />

                  <Typography
                    variant="h6"
                    component={"h3"}
                    gutterBottom
                    margin={2}
                  >
                    {active.author}
                  </Typography>

                  <Typography
                    variant="h6"
                    component={"h3"}
                    gutterBottom
                    margin={2}
                  >
                    Publicado el {active.date}
                  </Typography>

                  <Box margin={2}>
                    {active.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        variant="outlined"
                        size="small"
                        sx={{ margin: 0.5 }}
                      />
                    ))}
                  </Box>
                  
                  <Divider />

                  <Typography
                    variant="h6"
                    component={"h3"}
                    gutterBottom
                    margin={2}
                    marginBottom={0}
                    marginLeft={0}
                    color={'#c2c2c2a2'}
                  >
                    Compartir
                  </Typography>

                  <Box display={'flex'} >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleFacebookShare}
                      sx={{marginRight:'8px'}}
                    >
                      <FacebookIcon/>
                    </Button>
                    
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleTwitterShare}
                      sx={{marginRight:'8px'}}
                    >
                      <TwitterIcon/>
                    </Button>
                    
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleWhatsAppShare}
                      sx={{marginRight:'8px'}}
                    >
                      <WhatsAppIcon/>
                    </Button>
                  </Box>
                </Box>
              </Grid>
              
              </Hidden>

              <Hidden mdUp>
              <Grid item md={4} padding={2} zeroMinWidth position={'static'}>
              <Box mt={1} >
                  <Typography variant="h4" component={"h2"} gutterBottom>
                    {active.title}
                  </Typography>
                  <Divider />

                  <Typography
                    variant="h6"
                    component={"h3"}
                    gutterBottom
                    margin={2}
                  >
                    {active.author}
                  </Typography>

                  <Typography
                    variant="h6"
                    component={"h3"}
                    gutterBottom
                    margin={2}
                  >
                    Publicado el {active.date}
                  </Typography>

                  <Box margin={2}>
                    {active.tags.map((tag) => (
                      <Chip 
                        key={tag}
                        label={tag}
                        variant="outlined"
                        size="small"
                        sx={{ margin: 0.5 }}
                      />
                    ))}
                  </Box>
                  
                  <Divider />
                  
                  <Typography
                    variant="h6"
                    component={"h3"}
                    gutterBottom
                    margin={2}
                    marginBottom={0}
                    marginLeft={0}
                    color={'#c2c2c2a2'}
                  >
                    Compartir
                  </Typography>

                  <Box display={'flex'} position={'sticky'} top={0} left={0}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleFacebookShare}
                      sx={{marginRight:'8px'}}
                    >
                      <FacebookIcon/>
                    </Button>
                    
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleTwitterShare}
                      sx={{marginRight:'8px'}}
                    >
                      <TwitterIcon/>
                    </Button>
                    
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleWhatsAppShare}
                      sx={{marginRight:'8px'}}
                    >
                      <WhatsAppIcon/>
                    </Button>
                  </Box>
                </Box>
              </Grid>
              </Hidden>

              

              

              <Grid item md={4} zeroMinWidth>
              <Divider  orientation="vertical" />
              </Grid>
              
              <Grid item md={8} padding={2}>
                <CardMedia
                  component="img"
                  height="auto"
                  sx={{ maxHeight: 600 }}
                  image={active.imageUrl}
                  alt={active.title}
                />

                <Container>
                  <Typography
                    variant="h6"
                    sx={{ sm: { padding: "16rem" } }}
                    textAlign={"justify"}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: active.content }}
                      style={{
                        fontSize: "16px",
                        lineHeight: "1.5",
                      }}
                    />
                  </Typography>
                </Container>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
