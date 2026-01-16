import React from 'react';
import { Link } from 'react-router-dom';
import type { PreventionArticle } from '../types';

interface ArticleCardProps {
  article: PreventionArticle;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link to={`/prevenzione/${article.slug}`} className="block bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-8 h-full text-center transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
      <i className={`fas ${article.icon} text-4xl text-emerald-500 mb-6`}></i>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{article.title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{article.description}</p>
    </Link>
  );
};

export default ArticleCard;