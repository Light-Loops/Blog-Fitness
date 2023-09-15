import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Chip, Card, CardContent, CardMedia, Box, CircularProgress } from '@mui/material';
import { fetchArticleDetail, Article } from '../../Api'; // Importa la función de API


export const ArticleDetail: React.FC = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const articleDetail = await fetchArticleDetail(id);
        setArticle(articleDetail);
        setLoading(false); 
      } catch (error) {
        console.error(error);
        setLoading(false); 
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box py={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!article) {
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

  return (
    <Container maxWidth="xl">
      <Box py={4}>
        <Card sx={{ display: 'flex' }}>
          <CardContent>
          <Typography variant="h6" gutterBottom>
          {article.title}
        </Typography>
        <CardMedia component="img" height="auto" sx={{maxHeight:600}} image={article.imageUrl} alt={article.title} />
            <Typography  variant='h6'>
            <div dangerouslySetInnerHTML={{ __html: article.content }}
             style={{
              fontSize: '16px', 
              lineHeight: '1.5', 
            }}            
            />
            </Typography>
            <Box mt={1}>
              {article.tags.map((tag) => (
                <Chip key={tag} label={tag} variant="outlined" size="small" sx={{ marginRight: 1 }} />
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
