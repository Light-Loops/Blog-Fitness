import { db } from '../firebase/config';
import { collection, getDocs, where, query, orderBy, limit, QueryDocumentSnapshot, getDoc, doc } from 'firebase/firestore';

export interface Article {
  id: string ;
  title: string;
  content: string;
  imageUrl: string;
  tags: string[];
  date: string;
}

export const fetchRecentArticles = async (timeFilter: string | null): Promise<Article[]> => {
  try {
    const articlesCollection = collection(db, 'Articles');
    let articlesQuery = query(articlesCollection, orderBy('date', 'desc'), limit(2));

    if (timeFilter === '2d') {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      articlesQuery = query(articlesCollection, orderBy('date', 'desc'), where('date', '>=', twoDaysAgo));
    } else if (timeFilter === '1w') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      articlesQuery = query(articlesCollection, orderBy('date', 'desc'), where('date', '>=', oneWeekAgo));
    } else if (timeFilter === '1m') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      articlesQuery = query(articlesCollection, orderBy('date', 'desc'), where('date', '>=', oneMonthAgo));
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
      };
    }
    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};