import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Container, Typography, Chip, Grid, ButtonGroup, Button } from '@mui/material';
import { fetchRecentArticles, Article } from '../Api'


export const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filter, setFilter] = useState<string | null>('2d'); // Inicialmente muestra los últimos 2 días

  const fetchArticles = async (timeFilter: string | null) => {
    try {
      const articlesList = await fetchRecentArticles(timeFilter);
      setArticles(articlesList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArticles(filter);
  }, [filter]);

  return (
    <Box maxWidth="lg">
      <Box py={4}>
        <Typography variant="h4" gutterBottom sx={{ color: '#000000' }}>
          Artículos Recientes
        </Typography>
        <ButtonGroup variant="outlined" sx={{ marginBottom: 2 }}>
          <Button onClick={() => setFilter('2d')} variant={filter === '2d' ? 'contained' : 'outlined'}>
            2 días
          </Button>
          <Button onClick={() => setFilter('1w')} variant={filter === '1w' ? 'contained' : 'outlined'}>
            Semana
          </Button>
          <Button onClick={() => setFilter('1m')} variant={filter === '1m' ? 'contained' : 'outlined'}>
            Mes
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
                      <Chip key={tag} label={tag} variant="outlined" size="small"  sx={{ marginRight: 1}} />
                    ))}
                  </Box>
                </CardContent>
              </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
