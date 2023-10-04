import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { editArticle } from "../Api";
import { useDispatch } from "react-redux";
import { updateArticle } from "../redux/articleSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface ArticleModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (editedArticle: any) => void;
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  date: number; 
  imageUrl: string;
  url: string;
}

const ArticleModal: React.FC<ArticleModalProps> = ({
  open,
  onClose,
  onSave,
  id,
  title,
  content,
  author,
  category,
  tags,
  date,
  imageUrl,
  url
}) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [editedCategory, setEditedCategory] = useState(category);
  const [editedAuthor, setEditedAuthor] = useState(author);
  const [editedTags, setEditedTags] = useState(tags.join(', '));
  const [editedDate, setEditedDate] = useState(date);
  const [editedUrl, setEditedUrl] = useState(url); 
  const [editedImageUrl, setEditedImageUrl] = useState(imageUrl);
  

  useEffect(() => {
    setEditedTitle(title);
    setEditedContent(content);
    setEditedAuthor(author);
    setEditedCategory(category);
    setEditedTags(tags.join(', '));
    setEditedDate(date);
    setEditedImageUrl(imageUrl);
    setEditedUrl(url);
  }, [title, content, author, category, tags, date, imageUrl, url]);


  const setEditUrlFriendly = (title: string) => {
    
    let urlFriendly = title.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    urlFriendly = urlFriendly
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, ""); 
      
    setEditedUrl(urlFriendly);
  }
  
  

  const handleSave = () => {
    const tagsArray = editedTags.split(", ").map((tag) => tag.trim());
    const editedArticle = {
      id,
      title: editedTitle,
      content: editedContent,
      author: editedAuthor,
      category: editedCategory,
      tags: tagsArray,
      date: editedDate, 
      imageUrl: editedImageUrl,
      url: editedUrl,
    };
    onSave(editedArticle);
    onClose();
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Artículo</DialogTitle>
      <DialogContent>
        <TextField
          label="Título"
          fullWidth
          value={editedTitle}
          multiline
          onChange={(e) => {
            setEditedTitle(e.target.value);
            setEditUrlFriendly(e.target.value);
          }
          }
          error={!editedTitle}
          helperText={!editedTitle ? "Este campo es requerido" : ""}
          sx={{ mb: 1, mt: 2 }}
        />
        <TextField
          fullWidth
          value={editedUrl}
          disabled={true}
          multiline
          error={!editedTitle}
          helperText={!editedTitle ? "Este campo es requerido" : ""}
          sx={{ mb: 2, mt: 1 }}
        />
        <TextField
          label="Autor"
          fullWidth
          value={editedAuthor}
          multiline
          onChange={(e) => setEditedAuthor(e.target.value)}
          error={!editedAuthor}
          helperText={!editedAuthor ? "Este campo es requerido" : ""}
          sx={{ mb: 2 }}
        />
        <Grid marginBottom={2}>
          <ReactQuill
            theme="snow"
            defaultValue={content}
            onChange={setEditedContent}
            modules={modules}
            formats={formats}
          />
        </Grid>
        <TextField
          label="Categoría"
          fullWidth
          value={editedCategory}
          multiline
          onChange={(e) => setEditedCategory(e.target.value)}
          error={!editedTitle}
          helperText={!editedTitle ? "Este campo es requerido" : ""}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Tags"
          fullWidth
          value={editedTags}
          multiline
          onChange={(e) => setEditedTags(e.target.value)}
          error={!editedTags}
          helperText={!editedTags ? 'Este campo es requerido' : ''}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Fecha"
          fullWidth
          value={new Date(editedDate).toLocaleString()} 
          multiline
          error={!editedDate}
          helperText={!editedDate ? 'Este campo es requerido' : ''}
          sx={{ mb: 2 }}
        />
        <TextField
          label="URL de la Imagen"
          fullWidth
          value={editedImageUrl}
          multiline
          onChange={(e) => setEditedImageUrl(e.target.value)}
          error={!editedImageUrl}
          helperText={!editedImageUrl ? 'Este campo es requerido' : ''}
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
