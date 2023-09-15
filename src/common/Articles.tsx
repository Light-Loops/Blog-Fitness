import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Container, Typography, Chip, Grid, ButtonGroup, Button } from '@mui/material';
import { fetchArticlesByCategory, Article } from '../Api';

export const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null); 

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
    <Container maxWidth="lg">
      <Box py={4}>
        <Typography variant="h4" gutterBottom sx={{ color: '#000000' }}>
          Artículos Recientes
        </Typography>
        <ButtonGroup  sx={{ marginBottom: 2 }}>
          <Button onClick={() => setCategoryFilter(null)} variant={categoryFilter === null ? 'contained' : 'outlined'}>
            Todos
          </Button>
          <Button onClick={() => setCategoryFilter('Nutrición')} variant={categoryFilter === 'Nutrición' ? 'contained' : 'outlined'}>
            Nutrición
          </Button>
          <Button onClick={() => setCategoryFilter('Entrenamiento')} variant={categoryFilter === 'Entrenamiento' ? 'contained' : 'outlined'}>
            Entrenamiento
          </Button>
          <Button onClick={() => setCategoryFilter('Estilo de Vida')} variant={categoryFilter === 'Estilo de Vida' ? 'contained' : 'outlined'}>
            Estilo de Vida
          </Button>
        </ButtonGroup>
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
