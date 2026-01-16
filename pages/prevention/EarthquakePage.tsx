import React from 'react';
import AnimatedComponent from '../../components/AnimatedComponent';

const AdviceSection: React.FC<{ title: string; icon: string; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md h-full">
        <div className="flex items-center mb-4">
            <i className={`fas ${icon} text-3xl text-amber-400 mr-4`}></i>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
        </div>
        <div className="text-gray-700 dark:text-gray-300 space-y-2">
            {children}
        </div>
    </div>
);

const EarthquakePage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-6">
        <AnimatedComponent className="text-center mb-16">
          <i className="fas fa-house-crack text-6xl text-emerald-500 mb-4"></i>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Cosa Fare in Caso di Terremoto</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Un terremoto è un evento improvviso. Essere preparati può fare la differenza.
          </p>
        </AnimatedComponent>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedComponent delay={100}>
                <AdviceSection title="Prima del Terremoto" icon="fa-shield-halved">
                    <ul className="list-disc list-inside">
                        <li>Individua i punti sicuri in casa (sotto tavoli robusti, contro muri portanti).</li>
                        <li>Fissa alle pareti mobili alti, librerie e scaffali.</li>
                        <li>Tieni a portata di mano un kit di emergenza.</li>
                        <li>Chiudi i rubinetti di gas, acqua e l'interruttore generale della luce.</li>
                        <li>Informa i tuoi familiari sui comportamenti da adottare.</li>
                    </ul>
                </AdviceSection>
            </AnimatedComponent>
            
            <AnimatedComponent delay={200}>
                <AdviceSection title="Durante il Terremoto" icon="fa-person-shelter">
                    <ul className="list-disc list-inside">
                        <li>Cerca riparo nel punto sicuro più vicino.</li>
                        <li>Non precipitarti fuori, le scale potrebbero essere danneggiate.</li>
                        <li>Stai lontano da vetri, finestre e oggetti che potrebbero cadere.</li>
                        <li>Se sei all'aperto, allontanati da edifici, alberi e linee elettriche.</li>
                        <li>Se sei in auto, non fermarti sotto ponti o cavalcavia.</li>
                    </ul>
                </AdviceSection>
            </AnimatedComponent>
            
            <AnimatedComponent delay={300}>
                <AdviceSection title="Dopo il Terremoto" icon="fa-first-aid">
                     <ul className="list-disc list-inside">
                        <li>Assicurati del tuo stato di salute e di quello degli altri.</li>
                        <li>Non usare l'ascensore e fai attenzione alle scale.</li>
                        <li>Non usare il telefono se non per emergenze, per non intasare le linee.</li>
                        <li>Raggiungi le aree di attesa individuate dal piano di protezione civile.</li>
                        <li>Limita l'uso dell'auto per non intralciare i soccorsi.</li>
                    </ul>
                </AdviceSection>
            </AnimatedComponent>
        </div>
      </div>
    </div>
  );
};

export default EarthquakePage;