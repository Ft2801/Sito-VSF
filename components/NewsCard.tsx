import React from 'react';
import type { NewsArticle } from '../types';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
      <img className="w-full h-56 object-cover" src={article.imageUrl} alt={article.title} />
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-amber-400 text-sm font-semibold mb-1">{article.date}</p>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{article.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 flex-grow">{article.description}</p>
      </div>
    </div>
  );
};

export default NewsCard;