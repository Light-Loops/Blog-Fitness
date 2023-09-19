import { createSlice } from '@reduxjs/toolkit'

export interface Article {
  id: string;
  title: string;
  content: string;
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
    }
  }
});

export const {setArticles,setActiveArticle} = articleSlice.actions

export default articleSlice.reducer