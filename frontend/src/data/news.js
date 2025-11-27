// This file will manage news data.

const MOCK_NEWS_DATA = [
    {
        id: 1,
        title: 'The Future of Gaming: Cloud Streaming vs. High-End PCs',
        summary: 'As internet speeds increase, cloud gaming services are becoming more viable. But can they truly replace the raw power and low latency of a dedicated gaming PC? We dive into the pros and cons.',
        imageUrl: 'https://picsum.photos/800/400?random=101',
        author: 'Jane Doe',
        date: '2023-10-26',
        featured: true,
    },
    {
        id: 2,
        title: 'New CPU Architecture Promises 30% Performance Boost',
        summary: 'A leading chip manufacturer has unveiled a new CPU architecture that could revolutionize computing. Early benchmarks show a significant leap in performance and efficiency.',
        imageUrl: 'https://picsum.photos/400/250?random=102',
        author: 'John Smith',
        date: '2023-10-25',
    },
];

const NEWS_STORAGE_KEY = 'it_news';

/**
 * Initializes and retrieves the news list from localStorage.
 */
export const getNews = () => {
    const newsJSON = localStorage.getItem(NEWS_STORAGE_KEY);
    if (newsJSON) {
        return JSON.parse(newsJSON);
    } else {
        localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(MOCK_NEWS_DATA));
        return MOCK_NEWS_DATA;
    }
};

/**
 * Adds a new news article to the list in localStorage.
 */
export const addNews = (title, summary, author, imageBase64) => {
    const news = getNews();
    const newId = news.length > 0 ? Math.max(...news.map(n => n.id)) + 1 : 1;

    const newArticle = {
        id: newId,
        title,
        summary,
        imageUrl: imageBase64 || `https://picsum.photos/400/250?random=${newId}`,
        author,
        date: new Date().toISOString().split('T')[0],
        featured: false, // New articles are not featured by default
    };

    const updatedNews = [newArticle, ...news];
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(updatedNews));
    return newArticle;
};

/**
 * Retrieves a single news article by its ID.
 * @param {string|number} newsId - The ID of the article to retrieve.
 * @returns {Object|null} The article object or null if not found.
 */
export const getNewsById = (newsId) => {
    const news = getNews();
    return news.find(article => article.id.toString() === newsId.toString()) || null;
};

/**
 * Deletes a news article from the list in localStorage.
 * @param {number} newsId - The ID of the article to delete.
 */
export const deleteNews = (newsId) => {
    let news = getNews().filter(n => n.id !== newsId);
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(news));
};