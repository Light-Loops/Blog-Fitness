import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Container, Typography, Chip, Grid } from '@mui/material';
import { fetchArticlesByCategory, Article } from '../Api';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const categoryFilter = useSelector((state: RootState) => state.category); 

  const fetchArticles = async (categoryFilter: string | null) => {
    try {
      const articlesList = await fetchArticlesByCategory(categoryFilter);
      setArticles(articlesList);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchArticles(categoryFilter);
  }, [categoryFilter]);

  return (
    <Container maxWidth="lg" sx={{alignItems:'center'}}>
      <Box py={4}>
        <Typography variant="h4" gutterBottom sx={{ color: '#000000' }}>
          Artículos Recientes
        </Typography>
        <Grid container spacing={3}>
          {articles.map((article) => (
            <Grid key={article.id} item xs={12} sm={6} md={4}>
              <Link to={`/article/${article.id}`} style={{ textDecoration: 'none' }}>
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
