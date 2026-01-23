import React, { useState, useEffect } from 'react';
import AnimatedComponent from '../components/AnimatedComponent';
import type { Category, GalleryImage } from '../types';
import { fetchAllGalleryImages } from '../api/client';
import SkeletonLoader from '../components/SkeletonLoader';

const categories: ('Tutte' | Category)[] = ['Tutte', 'Interventi', 'Esercitazioni', 'Eventi', 'Formazione'];

const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'Tutte' | Category>('Tutte');
  const [allImages, setAllImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGallery = async () => {
      setLoading(true);
      try {
        const data = await fetchAllGalleryImages();
        setAllImages(data);
        setFilteredImages(data);
      } catch (error) {
        console.error("Errore nel recupero delle immagini della galleria:", error);
      } finally {
        setLoading(false);
      }
    };
    loadGallery();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'Tutte') {
      setFilteredImages(allImages);
    } else {
      setFilteredImages(allImages.filter(image => image.category === selectedCategory));
    }
  }, [selectedCategory, allImages]);

  // Lightbox implementation
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-6">
        <AnimatedComponent className="text-center mb-12">
          <i className="fas fa-images text-6xl text-emerald-500 mb-4"></i>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Galleria Fotografica</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Uno sguardo da vicino al nostro impegno quotidiano. Le immagini delle nostre attività, esercitazioni ed eventi.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-lg overflow-hidden h-64 bg-gray-200 dark:bg-gray-800">
                <SkeletonLoader variant="rectangular" height="100%" className="w-full" />
              </div>
            ))}
          </div>
        ) : filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <AnimatedComponent
                key={image.id}
                delay={index * 100}
                className="group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-gray-100 dark:bg-gray-800 relative"
                onClick={() => openLightbox(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out hover:opacity-100"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <i className="fas fa-search-plus text-white text-4xl drop-shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300"></i>
                </div>
              </AnimatedComponent>
            ))}

          </div>
        ) : !loading ? (
          <div className="text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <i className="fas fa-info-circle text-4xl text-gray-500 mb-4"></i>
            <p className="text-xl text-gray-700 dark:text-gray-300">Nessuna immagine trovata per questa categoria.</p>
          </div>
        ) : null}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm p-4 transition-opacity duration-300"
          onClick={closeLightbox}
        >
          <div className="relative max-w-5xl max-h-screen w-full">
            <button
              className="absolute -top-12 right-0 text-white hover:text-emerald-400 text-3xl transition-colors focus:outline-none"
              onClick={closeLightbox}
              aria-label="Chiudi"
            >
              <i className="fas fa-times"></i>
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto max-h-[85vh] object-contain rounded-md shadow-2xl bg-transparent"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;