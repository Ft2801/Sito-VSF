import React, { useState, useEffect } from 'react';
import AnimatedComponent from '../components/AnimatedComponent';
import { fetchDonationInfo } from '../api/client';
import type { DonationInfo } from '../types';

const DonationOption: React.FC<{ icon: string; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg h-full flex flex-col">
        <div className="flex items-center mb-4">
            <i className={`fas ${icon} text-4xl text-amber-400 mr-4`}></i>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
        </div>
        <div className="text-gray-700 dark:text-gray-300 space-y-3 flex-grow">{children}</div>
    </div>
);

const DonationPage: React.FC = () => {
    const [info, setInfo] = useState<DonationInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadInfo = async () => {
            setLoading(true);
            try {
                const data = await fetchDonationInfo();
                setInfo(data);
            } catch (error) {
                console.error("Errore nel recupero informazioni donazioni:", error);
            } finally {
                setLoading(false);
            }
        };
        loadInfo();
    }, []);

  return (
    <div className="bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-6">
        <AnimatedComponent className="text-center mb-16">
          <i className="fas fa-hand-holding-heart text-6xl text-emerald-500 mb-4"></i>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Sostieni le Nostre Attività</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Il tuo contributo è fondamentale per permetterci di continuare ad operare sul territorio. Ogni donazione, grande o piccola, fa la differenza.
          </p>
        </AnimatedComponent>
        
        {loading ? (
             <div className="text-center py-10">
                <i className="fas fa-spinner fa-spin text-4xl text-emerald-500"></i>
            </div>
        ) : info ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <AnimatedComponent delay={100}>
                    <DonationOption icon="fa-landmark" title="5x1000">
                        <p>Nella tua dichiarazione dei redditi, puoi destinare il 5x1000 dell'IRPEF alla nostra associazione.</p>
                        <p>È un gesto che non ti costa nulla ma che per noi vale tantissimo.</p>
                        <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-700">
                            <p className="font-bold text-gray-900 dark:text-white">Il nostro Codice Fiscale:</p>
                            <p className="text-2xl font-mono bg-gray-200 dark:bg-gray-900 p-2 rounded-md text-gray-900 dark:text-white mt-2 text-center break-all">{info.codiceFiscale}</p>
                        </div>
                    </DonationOption>
                </AnimatedComponent>

                <AnimatedComponent delay={200}>
                    <DonationOption icon="fa-money-check-dollar" title="Bonifico Bancario">
                        <p>Puoi effettuare una donazione libera tramite bonifico bancario al nostro conto corrente.</p>
                        <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-700 space-y-2">
                            <p><strong className="text-gray-900 dark:text-white">IBAN:</strong></p>
                            <p className="font-mono text-gray-900 dark:text-white break-all">{info.iban}</p>
                            <p><strong className="text-gray-900 dark:text-white">Intestato a:</strong></p>
                            <p>Volontari Senza Frontiere ODV</p>
                            <p><strong className="text-gray-900 dark:text-white">Causale:</strong></p>
                            <p>Erogazione liberale</p>
                        </div>
                    </DonationOption>
                </AnimatedComponent>
                
                <AnimatedComponent delay={300}>
                    <DonationOption icon="fa-brands fa-paypal" title="PayPal">
                        <p>Usa il modo più semplice e veloce per donare online in tutta sicurezza.</p>
                        <p>Clicca sul pulsante qui sotto per fare la tua donazione tramite PayPal o carta di credito.</p>
                        <div className="mt-6 text-center">
                            <a 
                                href={info.paypalLink} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors duration-300"
                            >
                            Dona con PayPal
                            </a>
                        </div>
                    </DonationOption>
                </AnimatedComponent>
            </div>
        ) : (
             <div className="text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
                <p className="text-xl text-gray-700 dark:text-gray-300">Impossibile caricare le informazioni per le donazioni.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default DonationPage;