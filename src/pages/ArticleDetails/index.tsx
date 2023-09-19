import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Chip, Card, CardContent, CardMedia, Box, CircularProgress } from '@mui/material';// Importa la función de API
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setActiveArticle } from '../../redux/articleSlice';


export const ArticleDetail: React.FC = () => {
  const { title } = useParams();
  const {articles,active} = useSelector((state: RootState) => state.article); 
  const [loading, setLoading] = useState(true); 
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const activated = articles.find((article) => article.title === title);
        dispatch(setActiveArticle(activated))
        setLoading(false); 
      } catch (error) {
        console.error(error);
        setLoading(false); 
      }
    };
    fetchDetail();
  }, [title,dispatch,articles]);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box py={4} sx={{ display: 'flex', justifyContent: 'center' }}>
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

  return (
    <Container maxWidth="xl">
      <Box py={4}>
        <Card sx={{ display: 'flex' }}>
          <CardContent>
          <Typography variant="h6" gutterBottom>
          {active.title}
        </Typography>
        <CardMedia component="img" height="auto" sx={{maxHeight:600}} image={active.imageUrl} alt={active.title} />
            <Typography  variant='h6'>
            <div dangerouslySetInnerHTML={{ __html: active.content }}
             style={{
              fontSize: '16px', 
              lineHeight: '1.5', 
            }}            
            />
            </Typography>
            <Box mt={1}>
              {active.tags.map((tag) => (
                <Chip key={tag} label={tag} variant="outlined" size="small" sx={{ marginRight: 1 }} />
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
