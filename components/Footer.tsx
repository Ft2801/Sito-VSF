import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { ContactInfo } from '../types';
import { fetchContactInfo } from '../api/client';


const SocialIcon: React.FC<{ href: string; iconClass: string }> = ({ href, iconClass }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-emerald-500 transition-colors duration-300">
    <i className={`fab ${iconClass} fa-2x`}></i>
  </a>
);

const Footer: React.FC = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

  useEffect(() => {
      const loadContactInfo = async () => {
          try {
              const data = await fetchContactInfo();
              setContactInfo(data);
          } catch (error) {
              console.error("Errore nel recupero delle informazioni di contatto:", error);
          }
      };
      loadContactInfo();
  }, []);

  return (
    <footer className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
               <span className="text-green-500 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)] dark:[text-shadow:none]">Volontari</span> <span className="text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6)] dark:[text-shadow:none]">Senza</span> <span className="text-red-500 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)] dark:[text-shadow:none]">Frontiere</span>
            </h3>
            <div className="mt-4 flex space-x-6">
              <SocialIcon href="https://m.facebook.com/volontarisenzafrontierepescara/" iconClass="fa-facebook" />
              <SocialIcon href="https://www.instagram.com/volontari_senza_frontiere_pe/" iconClass="fa-instagram" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Link Utili</h3>
            <ul className="space-y-2">
              <li><Link to="/servizi" className="text-gray-600 dark:text-gray-400 hover:text-emerald-500">Servizi</Link></li>
              <li><Link to="/news" className="text-gray-600 dark:text-gray-400 hover:text-emerald-500">News</Link></li>
              <li><Link to="/galleria" className="text-gray-600 dark:text-gray-400 hover:text-emerald-500">Galleria</Link></li>
              <li><Link to="/prevenzione" className="text-gray-600 dark:text-gray-400 hover:text-emerald-500">Prevenzione</Link></li>
              <li><Link to="/allerte" className="text-gray-600 dark:text-gray-400 hover:text-emerald-500">Allerte</Link></li>
              <li><Link to="/chi-siamo" className="text-gray-600 dark:text-gray-400 hover:text-emerald-500">Chi Siamo</Link></li>
              <li><Link to="/dove-siamo" className="text-gray-600 dark:text-gray-400 hover:text-emerald-500">Dove Siamo</Link></li>
              <li><Link to="/collabora" className="text-gray-600 dark:text-gray-400 hover:text-emerald-500">Collabora</Link></li>
              <li><Link to="/donazioni" className="text-gray-600 dark:text-gray-400 hover:text-emerald-500">Sostienici</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Sede Legale</h3>
            {contactInfo ? (
              <p className="text-gray-600 dark:text-gray-400">
                  {contactInfo.addressLine1}<br/>
                  {contactInfo.addressLine2}<br/><br/>
                  <a href={`mailto:${contactInfo.email}`} className="hover:text-emerald-500">{contactInfo.email}</a><br/>
                  <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="hover:text-emerald-500">{contactInfo.phone}</a>
              </p>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">Caricamento contatti...</p>
            )}
          </div>
          <div>
             <h3 className="text-xl font-bold mb-4">Emergenze</h3>
             <p className="text-gray-600 dark:text-gray-400">
                Numero Unico Emergenze<br/>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">112</span>
             </p>
             <p className="text-gray-600 dark:text-gray-400 mt-2">
                Guardia Costiera<br/>
                <span className="text-xl font-bold text-gray-900 dark:text-white">1530</span>
             </p>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-300 dark:border-gray-700 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Volontari Senza Frontiere. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;