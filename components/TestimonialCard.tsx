import React from 'react';
import type { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white dark:bg-gray-950 p-8 rounded-lg shadow-xl flex flex-col items-center text-center h-full">
      <img 
        src={testimonial.imageUrl} 
        alt={`Foto di ${testimonial.name}`}
        className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-emerald-500"
      />
      <blockquote className="text-gray-600 dark:text-gray-300 italic mb-4 flex-grow">
        <p>"{testimonial.quote}"</p>
      </blockquote>
      <footer>
        <p className="font-bold text-gray-900 dark:text-white text-lg">{testimonial.name}</p>
        <p className="text-sm text-amber-400">{testimonial.role}</p>
      </footer>
    </div>
  );
};

export default TestimonialCard;