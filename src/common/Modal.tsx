import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { editArticle } from '../Api';
import { useDispatch } from 'react-redux';
import { updateArticle } from '../redux/articleSlice';

interface ArticleModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (editedArticle: any) => void;
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  imageUrl: string;
}

const ArticleModal: React.FC<ArticleModalProps> = ({
  open,
  onClose,
  onSave,
  id,
  title,
  content,
  category,
  tags,
  imageUrl,
}) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [editedCategory, setEditedCategory] = useState(category);
  const [editedTags, setEditedTags] = useState(tags.join(', '));
  const [editedImageUrl, setEditedImageUrl] = useState(imageUrl);
  const dispatch = useDispatch();
  
  useEffect(() => {
    setEditedTitle(title);
    setEditedContent(content);
    setEditedCategory(category);
    setEditedTags(tags.join(', '));
    setEditedImageUrl(imageUrl);
  }, [title, content, category, tags, imageUrl]);

  const handleSave = () => {
    const tagsArray = editedTags.split(', ').map(tag => tag.trim());
    const editedArticle = {
      id,
      title: editedTitle,
      content: editedContent,
      category: editedCategory,
      tags: tagsArray,
      imageUrl: editedImageUrl,
    };
    editArticle(id, editedArticle);
    onSave(editedArticle);
    dispatch(updateArticle(editedArticle));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Artículo</DialogTitle>
      <DialogContent>
        <TextField
          label="Título"
          fullWidth
          value={editedTitle}
          multiline
          onChange={(e) => setEditedTitle(e.target.value)}
          error={!editedTitle} 
          helperText={!editedTitle ? 'Este campo es requerido' : ''}
          sx={{ mb: 2, mt: 2 }}
        />
        <TextField
          label="Contenido"
          fullWidth
          value={editedContent}
          multiline
          onChange={(e) => setEditedContent(e.target.value)}
          error={!editedTitle} 
          helperText={!editedTitle ? 'Este campo es requerido' : ''}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Categoría"
          fullWidth
          value={editedCategory}
          multiline
          onChange={(e) => setEditedCategory(e.target.value)}
          error={!editedTitle} 
          helperText={!editedTitle ? 'Este campo es requerido' : ''}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Tags"
          fullWidth
          value={editedTags}
          multiline
          onChange={(e) => setEditedTags(e.target.value)}
          error={!editedTitle} 
          helperText={!editedTitle ? 'Este campo es requerido' : ''}
          sx={{ mb: 2 }}
        />
        <TextField
          label="URL de la Imagen"
          fullWidth
          value={editedImageUrl}
          multiline
          onChange={(e) => setEditedImageUrl(e.target.value)}
          error={!editedTitle} 
          helperText={!editedTitle ? 'Este campo es requerido' : ''}
          sx={{ mb: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ArticleModal;
