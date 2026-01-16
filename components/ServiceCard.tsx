import React from 'react';
import type { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
      <img className="w-full h-56 object-cover" src={service.imageUrl} alt={service.title} />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;