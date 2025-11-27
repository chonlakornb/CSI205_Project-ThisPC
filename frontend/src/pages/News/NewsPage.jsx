import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getNews } from '../../data/news';

function NewsPage() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // ดึงข้อมูลข่าวสารล่าสุดจาก localStorage
        setArticles(getNews());
    }, []);


    const featuredArticle = articles.find(article => article.featured);
    const otherArticles = articles.filter(article => !article.featured);

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 border-b pb-4">IT News & Updates</h1>

            {/* Featured Article */}
            {featuredArticle && (
                <div className="mb-12 group">
                    <Link to={`/news/${featuredArticle.id}`}>
                        <div className="relative rounded-lg overflow-hidden shadow-lg">
                            <img src={featuredArticle.imageUrl || `https://picsum.photos/800/400?random=${featuredArticle.id}`} alt={featuredArticle.title} className="w-full h-96 object-cover" />
                            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 text-white">
                                <h2 className="text-3xl font-bold group-hover:underline">{featuredArticle.title}</h2>
                                <p className="mt-2 text-gray-200 max-w-3xl">{featuredArticle.summary}</p>
                                <p className="text-sm mt-4 opacity-80">{featuredArticle.author} • {featuredArticle.date}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            )}

            {/* Other Articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherArticles.map(article => (
                    <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
                        <Link to={`/news/${article.id}`}>
                            <img src={article.imageUrl || `https://picsum.photos/400/250?random=${article.id}`} alt={article.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition">{article.title}</h3>
                                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{article.summary}</p>
                                <p className="text-xs text-gray-400 mt-4">{article.author} • {article.date}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewsPage;