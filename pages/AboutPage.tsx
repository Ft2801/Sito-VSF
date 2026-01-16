import React, { useState, useEffect } from 'react';
import AnimatedComponent from '../components/AnimatedComponent';
import TestimonialCard from '../components/TestimonialCard';
import type { Testimonial } from '../types';
import { fetchTestimonialsData } from '../api/client';

const AboutPage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      setLoadingTestimonials(true);
      try {
        const data = await fetchTestimonialsData();
        setTestimonials(data);
      } catch (error) {
        console.error("Errore nel recupero delle testimonianze:", error);
      } finally {
        setLoadingTestimonials(false);
      }
    };
    loadTestimonials();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-6">
        <AnimatedComponent className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">La Nostra Storia</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Passione, impegno e amore per il territorio: il percorso di Volontari Senza Frontiere.
          </p>
        </AnimatedComponent>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <AnimatedComponent delay={200}>
            <h2 className="text-3xl font-bold text-emerald-500 mb-4">Dalle Origini ad Oggi</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              L'associazione "Volontari Senza Frontiere" nasce nel 2005 da un piccolo gruppo di cittadini animati da un forte senso civico e dal desiderio di rendersi utili per la propria comunità. Inizialmente dotati di pochi mezzi ma di tanta buona volontà, abbiamo iniziato con piccoli interventi di monitoraggio e supporto durante eventi locali.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Anno dopo anno, grazie alla fiducia della gente e al supporto delle istituzioni, siamo cresciuti in numero e professionalità. Oggi siamo un punto di riferimento per la protezione civile sul territorio, con mezzi moderni e volontari formati per affrontare ogni tipo di emergenza, senza mai dimenticare lo spirito di solidarietà che ci ha dato vita.
            </p>
          </AnimatedComponent>
          <AnimatedComponent initialClass="animate-fade-in-zoom" className="text-center">
            <img src="https://picsum.photos/500/350?image=1041" alt="Vecchia foto dell'associazione" className="rounded-lg shadow-xl mx-auto" />
          </AnimatedComponent>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-10 rounded-lg mb-16">
           <AnimatedComponent className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">I Nostri Volontari</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mt-2">
              Il cuore pulsante della nostra associazione.
            </p>
          </AnimatedComponent>
           <div className="grid md:grid-cols-2 gap-12 items-center">
             <AnimatedComponent initialClass="animate-fade-in-zoom" className="text-center">
               <img src="https://picsum.photos/500/350?image=823" alt="Gruppo di volontari" className="rounded-lg shadow-xl mx-auto" />
             </AnimatedComponent>
             <AnimatedComponent delay={200}>
              <h3 className="text-2xl font-bold text-emerald-500 mb-4">Persone Comuni, Impegno Straordinario</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                I nostri volontari sono uomini e donne di ogni età e professione: studenti, operai, impiegati, pensionati. Ciò che ci accomuna è il desiderio di fare la differenza. Dedichiamo il nostro tempo libero alla formazione continua e agli interventi, mossi unicamente dalla voglia di aiutare il prossimo.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Ogni volontario porta con sé un bagaglio unico di esperienze e competenze che arricchisce l'intero gruppo, creando una squadra affiatata e polivalente, pronta a rispondere con efficacia e umanità a ogni chiamata.
              </p>
            </AnimatedComponent>
          </div>
        </div>

        <AnimatedComponent>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Le Voci dei Nostri Volontari</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mt-2">
                    Cosa significa far parte della nostra squadra? Lasciamo che siano loro a raccontarlo.
                </p>
            </div>
            {loadingTestimonials ? (
               <div className="text-center py-10">
                <i className="fas fa-spinner fa-spin text-4xl text-emerald-500"></i>
               </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {testimonials.map((testimonial, index) => (
                      <AnimatedComponent key={testimonial.id} delay={index * 150}>
                          <TestimonialCard testimonial={testimonial} />
                      </AnimatedComponent>
                  ))}
              </div>
            )}
        </AnimatedComponent>

      </div>
    </div>
  );
};

export default AboutPage;