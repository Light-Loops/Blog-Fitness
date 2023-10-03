import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Container, Typography, Chip, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setCategory } from '../redux/categorySlice';

export const ArticleList: React.FC = () => {
 
  const location = useLocation();
  const dispatch = useDispatch();
  const categoryFilter = useSelector((state: RootState) => state.category); 
  const {articles} = useSelector((state: RootState) => state.article); 
  
  useEffect(() => {
      try {
        const category = decodeURIComponent(location.pathname.replace(/\//g, '').replace(/-/g, ' ')).normalize("NFC");
        dispatch(setCategory(category));
      } catch (error) {
        console.error(error);
      }
  }, [dispatch, location]);
  
  return (
    <Container maxWidth="lg" sx={{alignItems:'center'}}>
      <Box py={4}>
        <Typography variant="h4" gutterBottom sx={{ color: '#000000' }}>
          Artículos Recientes
        </Typography>
        <Grid container spacing={3}>
          { articles
            .filter((article) => categoryFilter === "" || article.category === categoryFilter)
            .map((article) => (
            <Grid key={article.id} item xs={12} sm={6} md={4}>
              <Link to={`/article/${article.url}`} style={{ textDecoration: 'none' }}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia component="img" height="200" image={article.imageUrl} alt={article.title} />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {article.title}
                    </Typography>
                    <Box mt={1}>
                      {article.tags.map((tag) => (
                        <Chip key={tag} label={tag} variant="outlined" size="small" sx={{ marginRight: 1 }} />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
