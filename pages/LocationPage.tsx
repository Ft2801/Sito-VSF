import React from 'react';
import AnimatedComponent from '../components/AnimatedComponent';

const LocationPage: React.FC = () => {
  return (
    <div className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <AnimatedComponent className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Dove Siamo</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Vieni a trovarci nella nostra sede operativa. Siamo sempre felici di accogliere chi vuole conoscerci meglio.
          </p>
        </AnimatedComponent>

        <AnimatedComponent initialClass="animate-fade-in-zoom" className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow-xl overflow-hidden mb-12">
          <div className="aspect-w-16 aspect-h-9">
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2980.255955372332!2d14.20172637659555!3d42.44641322880153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1331a77488820c75%3A0x6c6b2b2b2e8f1727!2sVia%20Lago%20Sant'Angelo%2C%209%2F1%2C%2065129%20Pescara%20PE!5e0!3m2!1sit!2sit!4v1721303000000!5m2!1sit!2sit"
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full rounded-md"
            ></iframe>
          </div>
        </AnimatedComponent>

        <div className="grid md:grid-cols-2 gap-8">
            <AnimatedComponent delay={100}>
                <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md h-full">
                    <h2 className="text-2xl font-bold text-emerald-500 mb-4">La Nostra Sede</h2>
                    <p className="text-gray-700 dark:text-gray-300">
                        <strong>Indirizzo:</strong> Via Lago Sant'Angelo, 9/1 - 65129 Pescara PE
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                        <strong>Orari di apertura segreteria:</strong>
                    </p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-2">
                        <li>Lunedì - Venerdì: 9:00 - 13:00</li>
                        <li>Martedì e Giovedì: 15:00 - 18:00</li>
                    </ul>
                </div>
            </AnimatedComponent>
            <AnimatedComponent delay={200}>
                <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md h-full">
                    <h2 className="text-2xl font-bold text-emerald-500 mb-4">Come Raggiungerci</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                        <strong>In auto:</strong> Dall'Asse Attrezzato (SS 16 dir/C), prendere l'uscita Pescara Ovest. Seguire le indicazioni per Via Tirino e successivamente per Via Lago Sant'Angelo. La nostra sede si trova nelle vicinanze, con possibilità di parcheggio.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <strong>Con i mezzi pubblici:</strong> La nostra sede è raggiungibile con l'autobus. Scendere alla fermata più vicina in Via Tirino e proseguire a piedi per pochi minuti.
                    </p>
                </div>
            </AnimatedComponent>
        </div>

      </div>
    </div>
  );
};

export default LocationPage;