import React, { useState, useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';
import type { Service } from '../types';
import AnimatedComponent from '../components/AnimatedComponent';
import { fetchServicesData } from '../api/client';
import SkeletonLoader from '../components/SkeletonLoader';

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      setLoading(true);
      try {
        const data = await fetchServicesData();
        setServices(data);
      } catch (error) {
        console.error("Errore nel recupero dei servizi:", error);
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <AnimatedComponent className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Servizi Svolti</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Il nostro impegno concreto sul territorio. Ecco alcuni degli interventi più significativi che abbiamo realizzato quest'anno.
          </p>
        </AnimatedComponent>


        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full border border-gray-100 dark:border-gray-700">
                <div className="p-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-gray-700 mb-4 mx-auto">
                    <SkeletonLoader variant="circular" width="32px" height="32px" />
                  </div>
                  <div className="flex justify-center mb-2">
                    <SkeletonLoader variant="text" width="60%" height="24px" />
                  </div>
                  <SkeletonLoader variant="text" width="100%" className="mb-2" />
                  <SkeletonLoader variant="text" width="100%" className="mb-2" />
                  <SkeletonLoader variant="text" width="80%" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AnimatedComponent key={service.id} delay={index * 100}>
                <ServiceCard service={service} />
              </AnimatedComponent>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;