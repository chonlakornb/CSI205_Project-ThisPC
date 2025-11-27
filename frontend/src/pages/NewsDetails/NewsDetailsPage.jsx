import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNewsById } from '../../data/news';

function NewsDetailsPage() {
    const { newsId } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const foundArticle = getNewsById(newsId);
        setArticle(foundArticle);
    }, [newsId]);

    if (!article) {
        return (
            <div className="text-center py-20 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800">Article Not Found</h1>
                <p className="text-gray-600 mt-2">Sorry, we couldn't find the article you're looking for.</p>
                <Link to="/it-news" className="mt-6 inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                    Back to IT News
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="mb-6">
                    <Link to="/it-news" className="text-sm text-blue-600 hover:underline">← Back to IT News</Link>
                </div>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img src={article.imageUrl || `https://picsum.photos/800/400?random=${article.id}`} alt={article.title} className="w-full h-96 object-cover" />
                    <div className="p-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
                        <div className="flex items-center text-sm text-gray-500 mb-6">
                            <span>By {article.author}</span>
                            <span className="mx-2">•</span>
                            <span>{article.date}</span>
                        </div>
                        {/* For now, using summary as the full content. In a real app, you'd have a 'content' field. */}
                        <div className="prose max-w-none text-gray-700 leading-relaxed">
                            <p className="text-lg font-medium">{article.summary}</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsDetailsPage;