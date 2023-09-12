import React from 'react';
import { Box,  CircularProgress, Container,} from '@mui/material';
import { ArticleList } from '../../common/Articles';



export const HomePage: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [page, setPage] = React.useState<number>(1);


  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [page]);

  return (
    <Container sx={{ mt: 2 }} maxWidth="xl">
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        
        <ArticleList />
        
      )}
    </Container>
  );
};
