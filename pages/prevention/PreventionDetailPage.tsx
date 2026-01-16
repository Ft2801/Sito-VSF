import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AnimatedComponent from '../../components/AnimatedComponent';
import { fetchPreventionArticleDetail } from '../../api/client';
import type { PreventionArticleDetail, PreventionContentSection } from '../../types';

const ContentSection: React.FC<{ section: PreventionContentSection, delay: number }> = ({ section, delay }) => (
    <AnimatedComponent delay={delay}>
        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md h-full">
            <div className="flex items-center mb-4">
                <i className={`fas ${section.icon} text-3xl text-amber-400 mr-4`}></i>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{section.title}</h2>
            </div>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                {section.points.map((point, index) => <li key={index}>{point}</li>)}
            </ul>
        </div>
    </AnimatedComponent>
);

const PreventionDetailPage: React.FC = () => {
    const { articleSlug } = useParams<{ articleSlug: string }>();
    const [article, setArticle] = useState<PreventionArticleDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadArticle = async () => {
            if (!articleSlug) return;
            setLoading(true);
            setError(null);
            try {
                const data = await fetchPreventionArticleDetail(articleSlug);
                if (data) {
                    setArticle(data);
                } else {
                    setError('Articolo non trovato.');
                }
            } catch (err) {
                setError('Impossibile caricare l\'articolo.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadArticle();
    }, [articleSlug]);

    if (loading) {
        return (
            <div className="py-16 bg-white dark:bg-gray-900 text-center min-h-[50vh] flex flex-col justify-center">
                <i className="fas fa-spinner fa-spin text-4xl text-emerald-500"></i>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Caricamento...</p>
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="py-16 bg-white dark:bg-gray-900 text-center min-h-[50vh] flex flex-col justify-center">
                <i className="fas fa-exclamation-triangle text-4xl text-red-500"></i>
                <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{error || 'Articolo non trovato'}</h1>
                 <p className="text-gray-600 dark:text-gray-400 mt-2">L'articolo che stai cercando potrebbe non esistere o essere stato spostato.</p>
            </div>
        );
    }
    
    const gridColsClass = 
        article.content.length === 2 ? 'md:grid-cols-2' : 
        'lg:grid-cols-3 md:grid-cols-2';

    return (
        <div className="bg-white dark:bg-gray-900 py-16">
            <div className="container mx-auto px-6">
                <AnimatedComponent className="text-center mb-16">
                    <i className={`fas ${article.mainIcon} text-6xl text-emerald-500 mb-4`}></i>
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">{article.title}</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        {article.subtitle}
                    </p>
                </AnimatedComponent>

                <div className={`grid grid-cols-1 ${gridColsClass} gap-8`}>
                    {article.content.map((section, index) => (
                        <ContentSection key={index} section={section} delay={100 * (index + 1)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PreventionDetailPage;