import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Container, Typography, Chip, Grid, ButtonGroup, Button } from '@mui/material';
import { db } from '../firebase/config';
import { collection, getDocs, where, query, orderBy, limit } from 'firebase/firestore';

export const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filter, setFilter] = useState<string | null>('2d'); // Inicialmente muestra los últimos 2 días

  interface Article {
    id: string;
    title: string;
    imageUrl: string;
    tags: string[];
    date: string;
  }

  const fetchArticles = async (timeFilter: string | null) => {
    try {
      const articlesCollection = collection(db, 'Articles');
      let articlesQuery = query(articlesCollection, orderBy('date', 'desc'), limit(2)); // Mostrar solo los 2 más recientes por defecto

      // Aplicar filtros de tiempo si se selecciona uno
      if (timeFilter === '2d') {
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
        articlesQuery = query(articlesCollection, orderBy('date', 'desc'), where('date', '>=', twoDaysAgo));
      } else if (timeFilter === '1w') {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        articlesQuery = query(articlesCollection, orderBy('date', 'desc'), where('date', '>=', oneWeekAgo));
      } else if (timeFilter === '1m') {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        articlesQuery = query(articlesCollection, orderBy('date', 'desc'), where('date', '>=', oneMonthAgo));
      }

      const articlesSnapshot = await getDocs(articlesQuery);
      const articlesList = articlesSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          imageUrl: data.imageURL,
          tags: data.tags,
          date: data.date,
        } as Article;
      });
      setArticles(articlesList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArticles(filter);
  }, [filter]);

  return (
    <Container maxWidth="lg">
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
              <Card sx={{ height: '100%' }}>
                <CardMedia component="img" height="200" image={article.imageUrl} alt={article.title} />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {article.title}
                  </Typography>
                  <Box mt={1}>
                    {article.tags.map((tag) => (
                      <Chip key={tag} label={tag} variant="outlined" size="small" color="primary" sx={{ marginRight: 1 }} />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
