import React, { useState, useEffect } from 'react';
import AnimatedComponent from '../components/AnimatedComponent';
import { fetchContactInfo } from '../api/client';
import type { ContactInfo } from '../types';

const CollaboratePage: React.FC = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContactInfo = async () => {
      setLoading(true);
      try {
        const data = await fetchContactInfo();
        setContactInfo(data);
      } catch (error) {
        console.error("Errore nel recupero informazioni di contatto:", error);
      } finally {
        setLoading(false);
      }
    };
    loadContactInfo();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-6">
        <AnimatedComponent className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Collabora con Noi</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Diventa protagonista della sicurezza e della solidarietà nella tua comunità. Il tuo aiuto è prezioso.
          </p>
        </AnimatedComponent>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <AnimatedComponent initialClass="animate-fade-in-zoom" className="text-center">
            <img src="https://picsum.photos/500/350?image=312" alt="Stretta di mano" className="rounded-lg shadow-xl mx-auto" />
          </AnimatedComponent>
          <AnimatedComponent delay={200}>
            <h2 className="text-3xl font-bold text-emerald-500 mb-4">Perché Diventare Volontario?</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Entrare in "Volontari Senza Frontiere" non significa solo donare il proprio tempo, ma intraprendere un percorso di crescita personale e collettiva. È un'opportunità per acquisire nuove competenze, conoscere persone straordinarie e fare la differenza in modo concreto.
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Formazione Specialistica:</strong> Offriamo corsi di primo soccorso, antincendio, uso di attrezzature e molto altro.</li>
              <li><strong>Spirito di Squadra:</strong> Entrerai a far parte di una grande famiglia, dove il supporto reciproco è fondamentale.</li>
              <li><strong>Crescita Personale:</strong> Metterti alla prova in situazioni complesse ti aiuterà a scoprire risorse che non pensavi di avere.</li>
              <li><strong>Soddisfazione:</strong> L'aiuto che darai alla comunità sarà la ricompensa più grande.</li>
            </ul>
          </AnimatedComponent>
        </div>

        <AnimatedComponent>
          <div className="bg-emerald-700 text-white p-12 rounded-lg shadow-lg text-center">
              <h2 className="text-3xl font-bold mb-4">Contattaci e Unisciti al Gruppo!</h2>
              <p className="text-emerald-100 max-w-2xl mx-auto mb-8">
                Siamo sempre alla ricerca di nuove energie. Se hai più di 18 anni e vuoi dare il tuo contributo, non esitare a contattarci. Ti aspettiamo!
              </p>
              {loading ? (
                <div className="py-4"><i className="fas fa-spinner fa-spin text-2xl"></i></div>
              ) : contactInfo ? (
                <div className="flex flex-wrap justify-center items-center gap-8 text-lg">
                    <div className="flex items-center gap-2">
                        <i className="fas fa-envelope"></i>
                        <a href={`mailto:${contactInfo.email}`} className="hover:underline">{contactInfo.email}</a>
                    </div>
                    <div className="flex items-center gap-2">
                        <i className="fas fa-phone"></i>
                        <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="hover:underline">{contactInfo.phone}</a>
                    </div>
                </div>
              ) : (
                <p className="text-red-300">Informazioni di contatto non disponibili.</p>
              )}
              <div className="mt-8 flex justify-center space-x-6">
                  <a href="https://m.facebook.com/volontarisenzafrontierepescara/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-400 transition-colors"><i className="fab fa-facebook fa-2x"></i></a>
                  <a href="https://www.instagram.com/volontari_senza_frontiere_pe/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-400 transition-colors"><i className="fab fa-instagram fa-2x"></i></a>
              </div>
          </div>
        </AnimatedComponent>
      </div>
    </div>
  );
};

export default CollaboratePage;