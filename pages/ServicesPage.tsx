import React, { useState, useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';
import type { Service } from '../types';
import AnimatedComponent from '../components/AnimatedComponent';
import { fetchServicesData } from '../api/client';

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
          <div className="text-center py-10">
            <i className="fas fa-spinner fa-spin text-4xl text-emerald-500"></i>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Caricamento servizi...</p>
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