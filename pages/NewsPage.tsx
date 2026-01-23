import React, { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard';
import type { NewsArticle, Category } from '../types';
import AnimatedComponent from '../components/AnimatedComponent';
import { fetchNewsData } from '../api/client';
import SkeletonLoader from '../components/SkeletonLoader';

const categories: ('Tutte' | Category)[] = ['Tutte', 'Interventi', 'Esercitazioni', 'Eventi', 'Formazione'];

const NewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'Tutte' | Category>('Tutte');
  const [allArticles, setAllArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      try {
        const data = await fetchNewsData();
        setAllArticles(data);
        setFilteredArticles(data);
      } catch (error) {
        console.error("Errore nel recupero notizie:", error);
        setFilteredArticles([]);
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'Tutte') {
      setFilteredArticles(allArticles);
    } else {
      setFilteredArticles(allArticles.filter(article => article.category === selectedCategory));
    }
  }, [selectedCategory, allArticles]);

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <AnimatedComponent className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">News e Aggiornamenti</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Rimani aggiornato sulle nostre ultime attività, esercitazioni ed eventi. Qui raccontiamo il nostro impegno quotidiano.
          </p>
        </AnimatedComponent>

        <AnimatedComponent delay={200} className="flex justify-center flex-wrap gap-3 md:gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full font-semibold text-sm md:text-base transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 ${selectedCategory === category
                ? 'bg-emerald-600 text-white shadow-lg scale-105'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-emerald-500 hover:text-white hover:scale-105'
                }`}
            >
              {category}
            </button>
          ))}
        </AnimatedComponent>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full flex flex-col border border-gray-100 dark:border-gray-700">
                <div style={{ height: '192px' }} className="w-full bg-gray-200 dark:bg-gray-700">
                  <SkeletonLoader variant="rectangular" height="100%" className="w-full" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <SkeletonLoader variant="text" width="30%" />
                    <SkeletonLoader variant="text" width="20%" />
                  </div>
                  <SkeletonLoader variant="text" width="80%" className="mb-2" />
                  <SkeletonLoader variant="text" width="60%" className="mb-4" />
                  <SkeletonLoader variant="text" width="100%" />
                  <SkeletonLoader variant="text" width="100%" className="mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <AnimatedComponent key={article.id} delay={index * 100}>
                <NewsCard article={article} />
              </AnimatedComponent>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <i className="fas fa-info-circle text-4xl text-gray-500 mb-4"></i>
            <p className="text-xl text-gray-700 dark:text-gray-300">Nessuna notizia trovata per questa categoria.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default NewsPage;