import { UserCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { collection, getDocs, where, query, orderBy,  QueryDocumentSnapshot, doc, updateDoc, setDoc } from 'firebase/firestore';
import { Dispatch } from '@reduxjs/toolkit';
import { checkingCredentials, login, logout } from '../redux/authSlice';

export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  imageUrl: string;
  tags: string[];
  category: string;
}

export interface Credetials {
  email: string;
  password: string;
  displayName?: string;
}

export interface SignInResult {
  ok: boolean;
  displayName?: string | null;
  email?: string | null;
  uid?: string | null;
  errorMessage?: string | null;
};


export const fetchArticlesByCategory = async (categoryFilter: string | null): Promise<Article[]> => {
  try {
    const articlesCollection = collection(db, 'Articles');
    let articlesQuery = query(articlesCollection, orderBy('date', 'desc'));

    if (categoryFilter && categoryFilter !== 'Todos') {
      articlesQuery = query(
        articlesCollection,
        orderBy('date', 'desc'),
        where('category', '==', categoryFilter)
      );
    }

    const articlesSnapshot = await getDocs(articlesQuery);
    const articlesList: Article[] = articlesSnapshot.docs.map((doc: QueryDocumentSnapshot) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        content: data.content,
        author: data.author,
        imageUrl: data.imageURL,
        tags: data.tags,
        date: data.date,
        category: data.category,
      };
    });

    return articlesList;
  } catch (error) {
    console.error(error);
    throw error;
  }
};




export const fetchArticleDetail = async (id: string | undefined): Promise<Article | null> => {
  try {
    const articleDoc = await getDocs(collection(db, "Articles"));
    const article = articleDoc.docs.find((doc: QueryDocumentSnapshot) => doc.id === id);
    if (article) {
      const data = article.data();
      return {
        id: article.id,
        title: data.title,
        content: data.content,
        author: data.author,
        imageUrl: data.imageURL,
        tags: data.tags,
        category: data.category,
      };
    }
    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchArticlesData = async (): Promise<Article[]> => {
  try {
    const articlesCollection = collection(db, 'Articles');
    let articlesQuery = query(articlesCollection, orderBy('date', 'desc'));

    const articlesSnapshot = await getDocs(articlesQuery);
    const articlesList: Article[] = articlesSnapshot.docs.map((doc: QueryDocumentSnapshot) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        content: data.content,
        author: data.author,
        imageUrl: data.imageURL,
        tags: data.tags,
        date: data.date.seconds,
        category: data.category,
      };
    });

    return articlesList;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const checkingAuthentication = () => {
  return async(dispatch: Dispatch) => {
      dispatch(checkingCredentials());
  }
}

export const loginWithEmailPassword = async({email, password}: Credetials): Promise<SignInResult> => {
  try {
    const result: UserCredential = await signInWithEmailAndPassword(auth,email,password);
    const {displayName, uid} = result.user;
    console.log(result);
    return {
      ok: true,
      uid, 
      email, 
      displayName
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return {
      ok: false,
      errorMessage,
    };
  }
}

export const startLoginWithEmailPassword = ({email,password}:Credetials) => {
  return async(dispatch: Dispatch) => {
      dispatch(checkingCredentials());

      const {ok, displayName, uid, errorMessage} = await loginWithEmailPassword({email,password});
      if(!ok) return dispatch(logout({errorMessage}));

      dispatch(login({uid, displayName, email}))
  }
}

export const logoutFirebase = async() => {
  return await auth.signOut();
}

export const startLogout = () => {
  return async(dispatch : Dispatch) => {
      await logoutFirebase();
      dispatch(logout({}));
  }
}


function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "An unknown error occurred.";
}

export const editArticle = async (id: string, updatedArticle: Article) => {
  try {
    const articleRef = doc(db, 'Articles', id);
    await updateDoc(articleRef, {
      title: updatedArticle.title,
      content: updatedArticle.content,
      imageUrl: updatedArticle.imageUrl,
      tags: updatedArticle.tags,
      category: updatedArticle.category,
    });
    return true;
  } catch (error) {
    console.error('Error al editar el artículo:', error);
    return false; 
  }
};

export const createNewArticle = async (newArticleData: Article) => {
  try {
    const articlesCollection = collection(db, 'Articles');
    const newArticleRef = doc(articlesCollection);

    await setDoc(newArticleRef, {
      title: newArticleData.title,
      content: newArticleData.content,
      author: newArticleData.author,
      imageUrl: newArticleData.imageUrl,
      tags: newArticleData.tags,
      category: newArticleData.category,
      date: new Date(),
    });

    return true;
  } catch (error) {
    console.error('Error al crear el artículo:', error);
    return false;
  }
};