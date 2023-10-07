import React, { useEffect, useState } from "react";
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
  Button,
  IconButton,
  BottomNavigationAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
} from "@mui/material";

import { RootState } from "../../redux/store";
import { setCategory } from "../../redux/categorySlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchBar from "../../common/SearchBar";
import FilterButtons from "../../common/FilterButtons";
import ArticleModal from "../../common/Modal";
import { Grid } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import {
  startCreateNewArticle,
  startDeleteArticle,
  startEditArticle,
  startLogout,
} from "../../Api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { UseNotification } from "../../context/notification.context";
const articleInitial = {
  id: "",
  title: "",
  content: "",
  author: "",
  category: "",
  date: new Date().getTime(),
  tags: [],
  imageUrl: "",
  url: "",
};

const DashboardPage: React.FC = () => {
  const { getSuccess, getError } = UseNotification();
  const dispatch = useAppDispatch();
  const categoryFilter = useAppSelector((state: RootState) => state.category);
  const { articles } = useAppSelector((state: RootState) => state.article);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(6); // Número de artículos por página
  const [search, setSearch] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [selectedArticle, setSelectedArticle] = useState(articleInitial);

  // Nuevo estado y objeto de artículo para la creación
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newArticle, setNewArticle] = useState(articleInitial);

  useEffect(() => {
    dispatch(setCategory(""));
  }, [dispatch]);

  const clearCategoryFilter = () => {
    dispatch(setCategory(""));
  };

  const setCategoryFilter = (newCategory: string) => {
    console.log(newCategory);
    dispatch(setCategory(newCategory));
  };

  const filteredArticles = articles.filter((article) => {
    return categoryFilter === "" || article.category === categoryFilter;
  });

  const filteredByTitle = filteredArticles.filter(
    (article) =>
      search === "" ||
      article.title.toLowerCase().includes(search.toLowerCase())
  );

  const openEditModal = (article: any) => {
    setSelectedArticle(article);
    setIsEditModalOpen(true);
  };

  const onCreateNewArticle = (newArticleData: any) => {
    dispatch(startCreateNewArticle(newArticleData));
    getSuccess("Artículo creado");
    setNewArticle(articleInitial);
  };

  const saveEditedArticle = (editedArticle: any) => {
    dispatch(startEditArticle(editedArticle));
    getSuccess("Artículo editado");
    setSelectedArticle(articleInitial);
  };

  const onDeleteArticle = (id: string) => {
    dispatch(startDeleteArticle(id));
    console.log(`Articulo ${id} Eliminado`);
    getError("Artículo Eliminado");
    setHandleDelete({id: "", title:"", state: false});
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleLogout = () => {
    dispatch(startLogout());
    setOpen(false);
  };

  const [handleDelete, setHandleDelete] = React.useState({ id: "", title:"", state: false});


  const handleDeleteOpenDialog = (id:string, title:string) => {
    setHandleDelete({id, title, state: true});
  };

  const handleDeleteCloseDialog = () => {
    setHandleDelete({id: "", title:"", state: false});
  };

  return (
    <Container maxWidth="xl">
      <Box py={4}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "#1D3354", fontWeight: "bold", textAlign: "center" }}
        >
          PANEL
        </Typography>

        <Grid position={"absolute"} right={12} top={12}>
          <BottomNavigationAction
            label="Salir"
            icon={<ExitToApp />}
            onClick={handleOpenDialog}
            sx={{ bgcolor: "#DA0037", borderRadius: 2 }}
          ></BottomNavigationAction>
        </Grid>

        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogTitle>Confirmar Cierre de Sesión</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Estás seguro de que deseas cerrar la sesión?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleLogout} color="primary">
              Cerrar Sesión
            </Button>
          </DialogActions>
        </Dialog>

        <SearchBar
          search={search}
          onSearchChange={(newSearch) => setSearch(newSearch)}
          onClearSearch={() => setSearch("")}
        />
        <FilterButtons
          onClearCategoryFilter={clearCategoryFilter}
          onSetCategoryFilter={setCategoryFilter}
        />
        <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
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
                      onClick={() => openEditModal(article)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      aria-label="Eliminar"
                      onClick={() => handleDeleteOpenDialog(article.id, article.title)}
                      size="small"
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
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddBoxIcon />}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Crear Artículo
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
        date={new Date(selectedArticle.date * 1000).getTime()}
        imageUrl={selectedArticle.imageUrl}
        url={selectedArticle.url}
      />

      <ArticleModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={onCreateNewArticle}
        id={newArticle.id}
        title={newArticle.title}
        content={newArticle.content}
        author={newArticle.author}
        category={newArticle.category}
        tags={newArticle.tags}
        date={newArticle.date}
        imageUrl={newArticle.imageUrl}
        url={newArticle.url}
      />

      <Dialog open={handleDelete.state} onClose={handleDeleteCloseDialog}>
        <DialogTitle>Confirmar para eliminar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar el artículo: {handleDelete.title}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => onDeleteArticle(handleDelete.id)} color="primary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DashboardPage;
