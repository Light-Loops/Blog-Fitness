import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setCategory } from '../../redux/categorySlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchBar from '../../common/SearchBar';
import FilterButtons from '../../common/FilterButtons';
import ArticleModal from '../../common/Modal'; 

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch();
  const categoryFilter = useSelector((state: RootState) => state.category);
  const { articles } = useSelector((state: RootState) => state.article);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(6); // Número de artículos por página
  const [search, setSearch] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState({
    id: '',
    title: '',
    content: '',
    author: '',
    category: '',
    date: 0,
    tags: [],
    imageUrl: '',
  });

  useEffect(() => {
    dispatch(setCategory(''));
  }, [dispatch]);

  const clearCategoryFilter = () => {
    dispatch(setCategory('')); 
  };
  const setCategoryFilter = (newCategory: string) => {
    dispatch(setCategory(newCategory));
  };
  const filteredArticles = articles.filter(
    (article) => categoryFilter === '' || article.category === categoryFilter
  );
  const filteredByTitle = filteredArticles.filter(
    (article) =>
      search === '' || article.title.toLowerCase().includes(search.toLowerCase())
  );
  const openEditModal = (article: any) => {
    setSelectedArticle(article);
    setIsEditModalOpen(true);
  };

  const saveEditedArticle = (editedArticle: any) => {
    console.log('Artículo editado:', editedArticle);
  };

  return (
    <Container maxWidth="xl">
      <Box py={4}>
        <Typography variant="h4" gutterBottom sx={{ color: '#1D3354', fontWeight: 'bold', textAlign: 'center' }}>
          Dashboard
        </Typography>
        <SearchBar
          search={search}
          onSearchChange={(newSearch) => setSearch(newSearch)}
          onClearSearch={() => setSearch('')}
        />
        <FilterButtons
          onClearCategoryFilter={clearCategoryFilter}
          onSetCategoryFilter={setCategoryFilter}
        />
        <TableContainer component={Paper} sx={{ borderRadius: '10px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell>Categoría</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredByTitle.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>{article.title}</TableCell>
                  <TableCell>{article.category}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      aria-label="Editar"
                      size="small"
                      onClick={() => openEditModal(article)} // Abre el modal de edición
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      aria-label="Eliminar"
                      size="small"
                      //onClick={() => handleDelete(article.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={2} display="flex" justifyContent="center" gap={4}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Anterior
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setPage(page + 1)}
            disabled={filteredByTitle.length <= page * rowsPerPage}
          >
            Siguiente
          </Button>
        </Box>
      </Box>
      <ArticleModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={saveEditedArticle}
        id={selectedArticle.id}
        title={selectedArticle.title}
        content={selectedArticle.content}
        author={selectedArticle.author}
        category={selectedArticle.category}
        tags={selectedArticle.tags}
        date={selectedArticle.date}
        imageUrl={selectedArticle.imageUrl}
      />
    </Container>
  );
};

export default DashboardPage;
