import React, { useState, useEffect } from 'react';
import AnimatedComponent from '../components/AnimatedComponent';
import ArticleCard from '../components/ArticleCard';
import type { PreventionArticle } from '../types';
import { fetchPreventionArticles } from '../api/client';


const DownloadableResource: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="bg-gray-200 dark:bg-gray-950 p-6 rounded-lg flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <i className="fas fa-file-pdf text-4xl text-red-500"></i>
            <div>
                <h4 className="font-bold text-gray-900 dark:text-white">{title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
            </div>
        </div>
        <a href="#" download className="bg-emerald-600 text-white font-bold py-2 px-4 rounded-full hover:bg-emerald-700 transition-colors duration-300 flex-shrink-0">
            <i className="fas fa-download mr-2"></i>
            Scarica
        </a>
    </div>
);

const PreventionPage: React.FC = () => {
  const [articles, setArticles] = useState<PreventionArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
        setLoading(true);
        try {
            const data = await fetchPreventionArticles();
            setArticles(data);
        } catch (error) {
            console.error("Errore nel recupero degli articoli di prevenzione:", error);
        } finally {
            setLoading(false);
        }
    };
    loadArticles();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-6">
        <AnimatedComponent className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Blog sulla Prevenzione</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            La conoscenza è il primo strumento di difesa. Impara con noi le buone pratiche di protezione civile.
          </p>
        </AnimatedComponent>
        
        <AnimatedComponent delay={200} className="mb-16">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="text-center md:text-left">
                <i className="fas fa-book-open text-6xl text-emerald-500 mb-4 md:mb-0"></i>
            </div>
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Piano di Protezione Civile - Comune di Pescara</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Il Piano Comunale di Protezione Civile è il documento fondamentale che stabilisce le procedure operative per affrontare ogni tipo di emergenza sul nostro territorio. Conoscerlo è un dovere e un diritto di ogni cittadino per contribuire attivamente alla sicurezza collettiva.
                </p>
                <a 
                    href="https://bura.regione.abruzzo.it/sites/bura.regione.abruzzo.it/files/bollettini/2023-05-02/all-piano-provinciale-di-protezione-civile-pe-def-0.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-block bg-emerald-600 text-white font-bold py-2 px-6 rounded-full hover:bg-emerald-700 transition-colors duration-300"
                >
                    Consulta il Piano
                </a>
            </div>
          </div>
        </AnimatedComponent>
        
        {loading ? (
             <div className="text-center py-10">
                <i className="fas fa-spinner fa-spin text-4xl text-emerald-500"></i>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Caricamento articoli...</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {articles.map((article, index) => (
                    <AnimatedComponent key={article.id} delay={index * 100}>
                    <ArticleCard article={article} />
                    </AnimatedComponent>
                ))}
            </div>
        )}

        <AnimatedComponent delay={300}>
            <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
                <div className="text-center mb-8">
                    <i className="fas fa-folder-open text-5xl text-emerald-500 mb-4"></i>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Risorse Utili da Scaricare</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-2">
                        Consulta e scarica i nostri materiali informativi per essere sempre preparato.
                    </p>
                </div>
                <div className="space-y-4 max-w-4xl mx-auto">
                    <DownloadableResource 
                        title="Guida al Kit di Emergenza"
                        description="Un pratico opuscolo su come preparare il tuo zaino per le emergenze."
                    />
                     <DownloadableResource 
                        title="Piano Familiare di Emergenza"
                        description="Un modello da compilare per creare il piano di emergenza per la tua famiglia."
                    />
                     <DownloadableResource 
                        title="Norme Antincendio Boschivo"
                        description="Le 10 regole d'oro per prevenire gli incendi e proteggere i nostri boschi."
                    />
                </div>
            </div>
        </AnimatedComponent>

      </div>
    </div>
  );
};

export default PreventionPage;