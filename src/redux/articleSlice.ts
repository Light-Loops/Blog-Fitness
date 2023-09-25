import { createSlice } from '@reduxjs/toolkit'

export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  imageUrl: string;
  tags: string[];
  date: string;
  category: string;
}

export interface AppState {
  articles: Article[];
  active: Article | null;
}

const initialState: AppState = {
  articles: [],
  active: null
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    setActiveArticle: (state, action) =>{
      state.active = action.payload;
    },
    updateArticle: (state, action) => {
      const updatedArticle = action.payload;
      const articleIndex = state.articles.findIndex(article => article.id === updatedArticle.id);
      if (articleIndex !== -1) {
        state.articles[articleIndex] = updatedArticle;
      }
    },
  }
});

export const {setArticles,setActiveArticle,updateArticle} = articleSlice.actions

export default articleSlice.reducer