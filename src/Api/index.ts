import { db } from '../firebase/config';
import { collection, getDocs, where, query, orderBy,  QueryDocumentSnapshot } from 'firebase/firestore';

export interface Article {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  tags: string[];
  date: string;
  category: string;
}

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
        imageUrl: data.imageURL,
        tags: data.tags,
        date: data.date,
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