import React from 'react';
import { Box,  CircularProgress, Container, Typography,} from '@mui/material';
import { ArticleList } from '../../common/Articles';


interface Page {
  title?: String
}

export const HomePage: React.FC<Page> = ({title}) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [page, setPage] = React.useState<number>(1);


  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [page]);

  return (
    <Container sx={{ mt: 2 }} maxWidth="xl" >
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {
            title &&
            <Typography variant="h5" gutterBottom color="primary" sx={{opacity: 0.5}}>
            {title}
            </Typography>
          }
          <ArticleList />
        </>
        
      )}
    </Container>
  );
};
